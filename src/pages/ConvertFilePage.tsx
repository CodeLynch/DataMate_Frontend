import { useEffect, useState } from "react";
import FileService from "../services/FileService"
import { useLocation, useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx'
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent,} from "@mui/material";
import { start } from "repl";
import styled from "@emotion/styled";
import axios from "axios";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import '@inovua/reactdatagrid-community/index.css'
import '@inovua/reactdatagrid-community/index.css'
import '@inovua/reactdatagrid-community/theme/green-light.css'

// type ConvertProps = {
//     stopLoading: () => void,
// }
interface HeaderConfig {
    name: string;
    header: string;
    defaultVisible?: boolean,
    defaultFlex: number,
    headerProps?: {
        style: {
        backgroundColor: string;
        color: string;
        fontWeight: string;
    };},
}

interface TableRow {
    [key: string]: string | number;
}

export default function ConvertFilePage() {
    const loc = useLocation();
    const nav = useNavigate();
    const fileId = loc.state.fileid;
    const [tblCtr, setTblCtr] = useState<number>(0)
    const [workbook, setWB] = useState<XLSX.WorkBook | null>()
    const [sheetNames, setSheetNames] = useState<string[]>([]);
    const [visibleSheetNames, setVSheets] = useState<string[]>([]);
    const [sheetData, setSData] = useState<Object>({});
    const [currentSheet, setCurrentSheet] = useState("");
    const [currSheetID, setCurrSheetID] = useState("");
    const [startCount, setStart] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [HeaderArr, setHArr] = useState<[][] | undefined>(undefined)
    const [BodyArr, setBArr] = useState<[][] | undefined>(undefined)
    const [isLoading, setLoading] = useState(true);
    const [convertToDS, setConvertToDS] = useState(false);
    const [dataCols, setDataCols] = useState<HeaderConfig[]>();
    const [dataSrc, setDataSrc] = useState<Object[]>();
    const gridstyle = {
        fontSize:"10px",
        maxHeight:"50vh",
    }



    // Sheet Data functions -----------------------------------------------------------------------
    //function to remove empty rows in Sheet Object Data
    function sheetjs_cleanEmptyRows(sd:XLSX.SheetType) {
        const data = []
            for (var row = 0; row < sd.length; row++) {
                  var i = sd[row].length;
                  var j = 0;
                for ( var cell = 0; cell < sd[row].length; cell++){
    
                    if (sd[row][cell].length == 0 ) { j++}
                }
              if (j < i) {
                data.push(sd[row]);
              }
            }
            return data;
     }

    const readData = (wb: XLSX.WorkBook) => {
        console.log("and this workbook is passed ", wb);
        setSheetNames(wb.SheetNames)
        let sheetdata:Object = {}
        wb.SheetNames.map((sheet, i) => 
        {
            const worksheet = wb.Sheets[sheet];
            const jsondata = XLSX.utils.sheet_to_json(worksheet,{
                header: 1,
                raw: false,
                defval: "",
            }) as unknown;
            const sd = sheetjs_cleanEmptyRows(jsondata as XLSX.SheetType)
            const js = sd as Object
            sheetdata = {...sheetdata, [sheet]: js}            
        })
        console.log("sheetdata on readData: ",sheetdata)
        setSData(sheetdata)
    }


    //call backend for xlsx data
    const fetchData = async () =>{
        FileService.getFile(fileId).then((res)=>{
            const wb = XLSX.read(res.data);
            setWB(wb);
        }).catch((err)=>{
            console.log(err);
        }) 
    }

    //fetch data on load
    useEffect(()=>{
        setVSheets([]);
        fetchData();
    },[])

    

    //read workbook and toggle start count if workbook state and sheetnames state is changed
    useEffect(()=>{
        if(workbook !== undefined){
            console.log("this is called");
           readData(workbook!); 
        }
    },[workbook])

    useEffect(()=>{
        if(sheetNames !== undefined && sheetNames !== null){
            sheetNames.map((name) => {
                if(!visibleSheetNames.includes(name)){
                   visibleSheetNames.push(name);     
                }
            })
            setCurrentSheet(visibleSheetNames[0]);
            console.log("sheetData state: ",sheetData);
        }
    }, [sheetData])

    

    const changeSheet = (event: SelectChangeEvent) =>{
        setCurrSheetID(event.target.value);
        let SheetName = workbook!.SheetNames[event.target.value as unknown as number];
        setCurrentSheet(SheetName!);
    }

    useEffect(()=>{
        //typing currentSheet as key of sheetData
        const currSheet = currentSheet as keyof typeof sheetData
        //typing object value as unknown before converting to row
        const row =  sheetData[currSheet] as unknown
        let rowArr = row as [][]
        setHArr(rowArr)
    },[currentSheet])

    useEffect(()=>{
        if(HeaderArr !== undefined){
            let rowsArr = [];
            //copy rowArr
            rowsArr = HeaderArr.slice(0); 
            console.log("Before", rowsArr);
            //remove header values
            rowsArr.splice(1 - 1, 1);
            console.log("After", rowsArr);
            setBArr(rowsArr);
        }
    },[HeaderArr])

    useEffect(()=>{
        if(HeaderArr !== undefined && BodyArr !== undefined){            
            setConvertToDS(true);
        }
    }, [BodyArr])
    //-----------------------------------------------------------------------------------------------------

    //Data Grid Functions----------------------------------------------------------------------------------
    useEffect(()=>{
        if(convertToDS){
            let sdata = JSON.parse(JSON.stringify(sheetData[currentSheet as keyof typeof sheetData] as unknown as [][]));
            console.log("Setting data columns to ", createColumns(sdata[0]));
            setDataCols([]);
            setDataCols(createColumns(sdata[0]));
        }
    }, [convertToDS, currentSheet])

    useEffect(()=>{
        if(dataCols !== null && dataCols !== undefined){
            let sdata = JSON.parse(JSON.stringify(sheetData[currentSheet as keyof typeof sheetData] as unknown as [][]));
            sdata.shift();
            let datasrc = createDataSrc(dataCols, sdata);
            console.log("setting dataSrc to ", datasrc);
            setDataSrc([]);
            setDataSrc(datasrc);
        }
    },[dataCols])
    
    
    function createDataSrc(headerConfigs: HeaderConfig[], values:[][]): TableRow[]{
        const table:TableRow[] = [];
        const headers: string[] = headerConfigs.map(config => config.name);
    
        values.forEach(rowValues => {
          if (rowValues.length !== headers.length) {
            throw new Error('Number of values does not match number of headers.');
          }
          const row: TableRow = {};
          
          headers.forEach((header, index) => {
              if(typeof rowValues[index] === "boolean"){
                let strval = rowValues[index] as string;
                row[header] = strval.toString();
              }else{
                row[header] = rowValues[index]; 
              }          
          });
    
          table.push(row);
        });
        return table;
      }
    
    function createColumns(strings: string[]): HeaderConfig[] {
        let strArr:HeaderConfig[] = [];
    
        strings.map((str, i)=>
        {
          strArr.push({
            name: str,
            header: str,
            defaultFlex: 1,
            headerProps:{
              style: { backgroundColor: '#71C887', color:"white", fontWeight: 'bold' 
            },
            }
          } 
          );
        });
      
        return strArr;
    }
    
    //-----------------------------------------------------------------------------------------------------
    //Button functions ------------------------------------------------------------------------------------
    function handleBack(){
        nav('/file',{
            state:{
              fileid: fileId
            }
        });
    }

    //-----------------------------------------------------------------------------------------------------
    return(
        <>
            <div style={{marginRight:'50px', marginLeft:'50px', maxHeight:'80vh', marginTop:'50px'}}>
            <h1 style={{textAlign:'center'}}>Convert Spreadsheet to Database?</h1>
                <div style={{marginTop:"1em"}}>
                    <div style={{marginLeft:"10%"}}>
                        <FormControl fullWidth>
                            <InputLabel id="input-label0id">Table</InputLabel>
                                <Select
                                labelId="select-table"
                                id="select-table-id"
                                value={currSheetID}
                                label="Table"
                                onChange={changeSheet}
                                sx={{width: 200, color:"black"}}
                                >
                                {visibleSheetNames.length > 0? 
                                visibleSheetNames.map((sheet, i) =>{
                                    return <MenuItem value={i} key={i}>{sheet}</MenuItem>
                                }):<MenuItem value={0} key={0}>None</MenuItem>   
                                }
                                </Select>
                        </FormControl>
                    </div>
                    <Box sx={{ width: '100%', display:"flex", justifyContent:"center"}}>
                        <Paper style={{width: '80%'}}>
                        <div style={{width: '100%'}}>
                        {/* for table preview */}
                        {dataCols !== undefined && dataSrc !== undefined? <>
                            <Paper elevation={0} sx={{ maxHeight:'500px', overflow: 'auto', border:"5px", borderRadius: 0}}>
                            {/* //code for the table */}
                            <ReactDataGrid
                                idProperty="id"
                                style={gridstyle}
                                columns={dataCols}
                                dataSource={dataSrc}
                                theme="green-light"
                            />
                            </Paper>     
                            </>:
                            <><CircularProgress size="10rem" 
                            color="success" />
                            </>}
                        </div>
                        </Paper>
                    </Box>
                    <div>
                        <p style={{fontStyle:"italic", fontSize:"14px", textAlign:"center"}}>Preview</p>
                    </div>
                    <div style={{display:"flex", flexDirection:'row', justifyContent:"space-around"}}>
                            <Button
                            onClick={handleBack}
                            sx={{fontWeight: 'bold', color:'black', paddingInline: 4, margin:'5px', boxShadow:5, borderRadius:5}}>
                                Back
                            </Button>
                            <Button variant="contained" 
                            sx={{fontWeight: 'bold', backgroundColor: '#347845', color:'white', paddingInline: 4, margin:'5px', boxShadow:5, borderRadius:5}}>
                                Confirm
                            </Button>
                    </div>            
                </div>
            </div>
        </> 
    )
}