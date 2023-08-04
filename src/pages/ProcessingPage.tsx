import { Box, Button, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as XLSX from 'xlsx'
import FileService from "../services/FileService";

type ProcessingPageProps = {
    stopLoading: () => void,
    startProcessing: () => void,
    toggleTable: (status:boolean) => void,
    toggleNoTable: () => void,
    setTblCount: (num:number) => void;
    setFileData: (wb: XLSX.WorkBook | null, sheets:string[], vsheets:string[] ,sheetdata: object ) => void,
  }


export default function ProcessingPage ({stopLoading, startProcessing, toggleTable, toggleNoTable, setTblCount, setFileData}:ProcessingPageProps) {
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
    const [fileName, setFileName] = useState('')
    const [isProcessing, setProcessing] = useState(true);

    //function to remove empty rows in Sheet Object Data
    function sheetjs_cleanEmptyRows(sd:XLSX.SheetType) {
        const data = []
            for (var row = 0; row < sd.length; row++) {
                  var i = sd[row].length;
                  var j = 0;
                for ( var cell = 0; cell < sd[row].length; cell++){
                    if (sd[row][cell].length == 0 ) { 
                        j++
                    }
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
            setFileName(res.fileName);
            setWB(wb);
        }).catch((err)=>{
            console.log(err);
        }) 
    }

    //useEffect to fetch data on load
    useEffect(()=>{
        setVSheets([]);
        fetchData();
    },[])

    
    //useEffect triggers when workbook or sheetNames state is changed
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
                if(rowArr[0].length > 2){
                   ctr++; 
                }
            })
            setTblCtr(ctr)
            sheetNames.map((name) => {
                const sheetAttr = name as keyof typeof sheetData
                    const sheetrow =  sheetData[sheetAttr] as unknown
                    let sheetrowArr = sheetrow as [][]
                    if(sheetrowArr[0].length > 2){
                       visibleSheetNames.push(name);
                    }
            })
            setCurrentSheet(visibleSheetNames[0]);
        }
    }, [startCount])

    //alert once table counter is changed and start count is true
    useEffect(()=>{
        if(startCount){
            if(tblCtr > 0){
                //open table prompt here
                setTblCount(tblCtr);
                toggleTable(true);
            }else{
                //open no table prompt here
            }
            stopLoading();
            startProcessing();
        }
    },[tblCtr])


    //assign variables in the App scope once all values have been defined
    useEffect(()=>{
        if( workbook !== undefined &&
            sheetNames !== null &&
            visibleSheetNames !== null &&
            sheetData !== undefined){
                setFileData(workbook, sheetNames, visibleSheetNames, sheetData);
            }
    },[sheetData, visibleSheetNames])


    //pagination functions ------------------------------------------
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    };
    //---------------------------------------------------------------

    const changeSheet = (stringevent: React.SyntheticEvent, newValue: string) =>{
        setCurrentSheet(newValue);
    }
    
    
    //useEffect for re-assigning the header array for the table when currentSheet state has changed
    useEffect(()=>{
        //typing currentSheet as key of sheetData
        const currSheet = currentSheet as keyof typeof sheetData
        //typing object value as unknown before converting to row
        const row =  sheetData[currSheet] as unknown
        let rowArr = row as [][]
        setHArr(rowArr)
    },[currentSheet])

    //useEffect for re-assigning the body array for the table when Header array state has changed
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
    

    return(
        <>
            <div className="gradientbg" style={{paddingTop:"50px", paddingRight:"50px", width:'95vw',height:'100vh'}}>
                {HeaderArr !== undefined && BodyArr !== undefined && !isProcessing ? <>
                <div style={{marginRight:'70px', marginLeft:'50px', padding:'15px', height:'80vh', opacity:.8}}>
                    <div style={{marginTop:"1em"}}>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 470, width: '90vw'}}>
                            <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <tr>
                                    {
                                    HeaderArr[0].map((col,i) => <TableCell
                                    key={i}
                                    align='left'
                                    style={{ minWidth: 100 }}><b>{col}</b></TableCell>)
                                    }
                                </tr>
                            </TableHead>
                            <TableBody>
                                {BodyArr
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, i) => {
                                    return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                        {row.map((cell, j) => {
                                        return (
                                            <>
                                            {cell !== ""?
                                            <TableCell key={j} align='left'>
                                            {cell === true? "TRUE": cell === false? "FALSE":cell}
                                            </TableCell>:
                                            <></>
                                            }
                                            </>
                                        );
                                        })}
                                    </TableRow>
                                    );
                                })}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        {/* <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={BodyArr.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        /> */}
                            </Paper>
                            {/* <Box sx={{ width: '100%', marginBottom:'1em', marginTop:'1px' }}>
                            <Tabs
                            value = {currentSheet}
                            onChange={changeSheet}
                            TabIndicatorProps={{sx:{backgroundColor:'rgba(0,0,0,0)'}}}
                            sx={{
                            "& button":{borderRadius: 2, color: 'black', backgroundColor: 'white'},
                            "& button.Mui-selected":{backgroundColor: '#D9D9D9', color: 'black'},
                            }}
                            aria-label="secondary tabs example"
                            >
                            {visibleSheetNames.length > 0? visibleSheetNames.map((sheet,i) =>{
                                return(                                
                                    <Tab sx={{backgroundColor:"#D9D9D9"}}value={sheet} label={sheet} />
                                )
                            }):<></>}
                        </Tabs>
                        </Box>         */}
                    </div>
                </div>
                </>:<></>}
            </div>
        
        </> 
    )
}