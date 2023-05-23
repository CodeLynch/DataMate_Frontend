import { useEffect, useState } from "react";
import FileService from "../services/FileService"
import { useLocation } from "react-router-dom";
import * as XLSX from 'xlsx'
import { Box, Button, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tabs } from "@mui/material";
import { start } from "repl";

// type FileResponseType = {
//     fileId: number,
//     fileSize: number,
//     fileName: string,
//     uploadDate: string,
//     latestDateModified: string,
//     isdeleted: boolean,
//     data: Blob
// }

export default function Filepage() {
    const loc = useLocation();
    const fileId = loc.state.fileid;
    const [tblCtr, setTblCtr] = useState<number>(0)
    const [workbook, setWB] = useState<XLSX.WorkBook | null>()
    const [sheetNames, setSheetNames] = useState<string[]>([]);
    const [sheetData, setSData] = useState<Object>({});
    const [currentSheet, setCurrentSheet] = useState("");
    const [startCount, setStart] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [HeaderArr, setHArr] = useState<[][] | undefined>(undefined)
    const [BodyArr, setBArr] = useState<[][] | undefined>(undefined)
    



    const readData = (wb: XLSX.WorkBook) => {
        setSheetNames(wb.SheetNames);
        let sheetdata:Object = {}
        sheetNames.map((sheet, i) => {
            const worksheet = wb.Sheets[sheet];
            const jsondata = XLSX.utils.sheet_to_json(worksheet,{
                header: 1
            });
            const js = jsondata as Object
            sheetdata = {...sheetdata, [sheet]: js}            
        })
        setSData(sheetdata)
        setCurrentSheet(sheetNames[0]);
         //typing currentSheet as key of sheetData
         const currSheet = currentSheet as keyof typeof sheetData
         //typing object value as unknown before converting to row
         const row =  sheetData[currSheet] as unknown
         let rowArr = row as [][]
         setHArr(rowArr)
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
                ctr++;
            })
            setTblCtr(ctr)
        }
    }, [startCount])

    //alert once table counter is changed and start count is true
    useEffect(()=>{
        if(startCount){
            if(tblCtr > 1){
            alert("DataMate has detected " + tblCtr + " tables");
            }else{
            alert("DataMate has detected " + tblCtr + " table");
            }
        console.log("Table Counter",tblCtr)
        }
    },[tblCtr])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    };

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
    

    return(
        <>
        {HeaderArr !== undefined && BodyArr !== undefined? <>
            <div style={{marginTop:'100px', marginRight:'50px', marginLeft:'50px'}}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <tr>
                        {
                        HeaderArr[0].map((col,i) => <TableCell
                        key={i}
                        align='left'
                        style={{ minWidth: 170 }}><b>{col}</b></TableCell>)
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
                                <TableCell key={j} align='left'>
                                {cell}
                                </TableCell>
                            );
                            })}
                        </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={BodyArr.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
                </Paper>
                <Box sx={{ width: '100%' }}>
                <Tabs
                value = {currentSheet}
                onChange={changeSheet}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                >
                {sheetNames.length > 0? sheetNames.map((sheet,i) =>{
                    return(
                        <Tab value={sheet} label={sheet} />
                    )
                }):<></>}
            </Tabs>
            </Box>            
            </div>

        </>:<>
        <h1>Sheet Data Error</h1></>}
        </> 
    )
}
