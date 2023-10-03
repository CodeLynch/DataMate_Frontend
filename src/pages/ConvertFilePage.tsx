import { useEffect, useState } from "react";
import FileService from "../services/FileService"
import { useLocation } from "react-router-dom";
import * as XLSX from 'xlsx'
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select,} from "@mui/material";
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


export default function ConvertFilePage() {
    const loc = useLocation();
    const fileId = loc.state.fileid;
    const [tblCtr, setTblCtr] = useState<number>(0)
    const [workbook, setWB] = useState<XLSX.WorkBook | null>()
    const [sheetNames, setSheetNames] = useState<string[]>([]);
    const [visibleSheetNames, setVSheets] = useState<string[]>([]);
    const [sheetData, setSData] = useState<Object>({});
    const [currentSheet, setCurrentSheet] = useState("");
    const [startCount, setStart] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [HeaderArr, setHArr] = useState<[][] | undefined>(undefined)
    const [BodyArr, setBArr] = useState<[][] | undefined>(undefined)
    const [isLoading, setLoading] = useState(true);
    const gridstyle = {
        fontSize:"10px",
        height:"50vh",
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
        setSheetNames(wb.SheetNames)
        let sheetdata:Object = {}
        sheetNames.map((sheet, i) => 
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
        setSData(sheetdata)
         //typing currentSheet as key of sheetData
         const currSheet = currentSheet as keyof typeof sheetData
         //typing object value as unknown before converting to row
         const row =  sheetData[currSheet] as unknown
         let rowArr = row as [][]
         setHArr(rowArr)
         console.log(sheetNames);
         console.log(visibleSheetNames);
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
    //only start count if sheetname is more than 0 
    useEffect(()=>{
        if(workbook !== undefined){
           readData(workbook!) 
        }
        if(sheetNames.length > 0){
            setStart(true);
        }
       
    },[workbook, sheetNames])

    //start counting sheet amount once start count boolean is changed
    useEffect(()=>{
        if(startCount){
            let ctr = 0
            sheetNames.map((sheet, i) => {
                const sheetAttr = sheet as keyof typeof sheetData
                const row =  sheetData[sheetAttr] as unknown
                let rowArr = row as [][]
                ctr++;
            })
            setTblCtr(ctr)
            sheetNames.map((name) => {
                visibleSheetNames.push(name);    
            })
            setCurrentSheet(visibleSheetNames[0]);
        }
    }, [startCount])

    //alert once table counter is changed and start count is true
    useEffect(()=>{
        if(startCount){
            //stop loading
        }
    },[tblCtr])
    

    const changeSheet = (stringevent: React.SyntheticEvent, newValue: string) =>{
        setCurrentSheet(newValue);
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
            let rowsArr = []
            //copy rowArr
            rowsArr = HeaderArr.slice(0); 
            console.log("Before", rowsArr)
            //remove header values
            rowsArr.splice(1 - 1, 1);
            console.log("After", rowsArr)
            setBArr(rowsArr)
        }
        console.log("BArr",BodyArr)
    },[HeaderArr])
    //-----------------------------------------------------------------------------------------------------

    //Data Grid Functions----------------------------------------------------------------------------------
    const columns = [
        {
          name: 'firstName',
          header: 'First Name',
          defaultFlex: 1,
          headerProps:{
            style: { backgroundColor: '#71C887', color:"white", fontWeight: 'bold' 
          },
          }
        },
        {
          name: 'lastName',
          header: 'Last Name',
          defaultFlex: 1,
          headerProps:{
            style: { backgroundColor: '#71C887', color:"white", fontWeight: 'bold' 
          },
          }
        },
        {
          name: 'country',
          header: 'Country',
          defaultFlex: 1,
          headerProps:{
            style: { backgroundColor: '#71C887', color:"white", fontWeight: 'bold' 
          },
          }
        },
      ]
    
    const dataSource = [
        {"id": 1, "firstName": "Alice", "lastName": "Johnson", "country": "USA"},
        {"id": 2, "firstName": "Bob", "lastName": "Smith", "country": "Canada"},
        {"id": 3, "firstName": "Charlie", "lastName": "Brown", "country": "UK"},
        {"id": 4, "firstName": "David", "lastName": "Wilson", "country": "Australia"},
        {"id": 5, "firstName": "Eva", "lastName": "Lee", "country": "New Zealand"},
        {"id": 6, "firstName": "Frank", "lastName": "Williams", "country": "Germany"},
        {"id": 7, "firstName": "Grace", "lastName": "Davis", "country": "France"},
        {"id": 8, "firstName": "Henry", "lastName": "Moore", "country": "Spain"},
        {"id": 9, "firstName": "Isabel", "lastName": "Clark", "country": "Italy"},
        {"id": 10, "firstName": "Jack", "lastName": "Anderson", "country": "Netherlands"},
        {"id": 11, "firstName": "Katherine", "lastName": "Young", "country": "Sweden"},
        {"id": 12, "firstName": "Liam", "lastName": "Miller", "country": "Norway"},
        {"id": 13, "firstName": "Mia", "lastName": "Thompson", "country": "Denmark"},
        {"id": 14, "firstName": "Noah", "lastName": "Martinez", "country": "Brazil"},
        {"id": 15, "firstName": "Olivia", "lastName": "Hernandez", "country": "Mexico"}
    ]
    //-----------------------------------------------------------------------------------------------------

    return(
        <>
            <div style={{marginRight:'50px', marginLeft:'50px', height:'80vh', marginTop:'50px'}}>
            <h1 style={{textAlign:'center'}}>Convert Spreadsheet to Database?</h1>
                <div style={{marginTop:"1em"}}>
                    <div style={{marginLeft:"10%"}}>
                        <FormControl fullWidth>
                            <InputLabel id="input-label0id">Table</InputLabel>
                                <Select
                                labelId="select-table"
                                id="select-table-id"
                                value={0}
                                label="Table"
                                sx={{width: 200, color:"black"}}
                                >
                                    <MenuItem value={0}>Table 1</MenuItem>
                                    <MenuItem value={1}>Table 2</MenuItem>
                                    <MenuItem value={2}>Table 3</MenuItem>
                                </Select>
                        </FormControl>
                    </div>
                    <Box sx={{ width: '100%', display:"flex", justifyContent:"center"}}>
                        <Paper style={{width: '80%'}}>
                        <div style={{width: '100%'}}>
                        {/* for table preview */}
                        {HeaderArr !== undefined && BodyArr !== undefined? <>
                            <Paper elevation={0} sx={{ maxHeight:'500px', overflow: 'auto', border:"5px", borderRadius: 0}}>
                            {/* //code for the table */}
                            <ReactDataGrid
                                idProperty="id"
                                style={gridstyle}
                                columns={columns}
                                dataSource={dataSource}
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