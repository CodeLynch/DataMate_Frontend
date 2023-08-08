import { useLocation, useNavigate } from "react-router-dom";
import modalStyle from "../styles/ModalStyles";
import * as XLSX from 'xlsx'
import { Box, Button, CircularProgress, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tabs, styled } from "@mui/material";
import { useEffect, useState } from "react";
import FileService from "../services/FileService";



const styles = {
    dialogPaper: {
      backgroundColor: '#DCF1EC',
      padding: "25px",
    },
    uploadButton: {
        marginTop: '5px',
        borderRadius: '50px',
        width: '250px',
        background: '#71C887',
      },
};

type EmptyProps = {
    toggleEmptyDetect: (status:boolean) => void,
    toggleInconsistentDetect: (status:boolean) => void,
    toggleImportSuccess: (status:boolean) => void,
    fileId: number,
    workbook: XLSX.WorkBook | null | undefined, 
    sheets:string[], 
    vsheets:string[],
    emptylist:string[],
    inclist:string[],
    sheetdata: object,
    reset: () => void,
  }

interface WorkbookData {
    [sheet: string]: Object[];
}

interface TableRow {
    [key: string]: string | number;
}

const EmptyDetectPrompt = ({toggleEmptyDetect, fileId, workbook, sheets, vsheets, emptylist, sheetdata, reset, inclist}: EmptyProps) => {  
  const [currentSheet, setCurrentSheet] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [HeaderArr, setHArr] = useState<[][] | undefined>(undefined)
  const [BodyArr, setBArr] = useState<[][] | undefined>(undefined)
  const [IncSheets, setIS] = useState<string[]>([])
  const [isInconsistent, SetInconsistent] = useState(false);
  const [filteredData, setFData] = useState<Object>({});

  const nav = useNavigate();
  useEffect(()=>{
    //create copy of sheetdata
    const fdata = JSON.parse(JSON.stringify(sheetdata))
    for(const s in emptylist){
      fdata[emptylist[s]] = filterRowsWithNullValues(fdata[emptylist[s]] as TableRow[]); 
    }
    setFData(fdata);
  },[])

  //set currentSheet and header array on load based from props
  useEffect(()=>{ 
    setCurrentSheet(emptylist[0]);
    //typing currentSheet as key of sheetData
    const currSheet = currentSheet as keyof typeof sheetdata
    //typing object value as unknown before converting to row
    const row =  sheetdata[currSheet] as unknown
    let rowArr = row as [][]
    setHArr(rowArr)

    
  },[filteredData])

  //useEffect for re-assigning the header array for the table when currentSheet state has changed
  useEffect(()=>{
    //typing currentSheet as key of sheetData
    const currSheet = currentSheet as keyof typeof sheetdata
    //typing object value as unknown before converting to row
    const row =  sheetdata[currSheet] as unknown
    let rowArr = row as [][]
    setHArr(rowArr)
},[currentSheet])

//useEffect for re-assigning the body array for the table when Header array state has changed
useEffect(()=>{
    if(filteredData !== undefined){
        //typing currentSheet as key of sheetData
        const currSheet = currentSheet as keyof typeof filteredData
        //typing object value as unknown before converting to row
        const row =  filteredData[currSheet] as unknown
        let rowArr = row as [][]
        setBArr(rowArr)
    }
  },[HeaderArr])

  //pagination functions ------------------------------------------
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
  };
  //---------------------------------------------------------------

  function filterRowsWithNullValues(table: TableRow[]): TableRow[] {
    return table.filter((row) => {
      for (const key in row) {
        if (row.hasOwnProperty(key) && row[key] === null || row[key] === "" || row[key] === undefined ) {
          return true; // Include rows with at least one null value
        }
      }
      return false; // Exclude rows with all non-null values
    });
  }
  

  const changeSheet = (stringevent: React.SyntheticEvent, newValue: string) =>{
      setCurrentSheet(newValue);
  }

  function replaceEmptyWithNull(table: TableRow[]): TableRow[] {
    for (const row of table) {
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          const value = row[key];
          if (value === null || value === undefined || value === "") {
            // Empty value found in the row, replace with "NULL"
            row[key] = "NULL";
          }
        }
      }
    }
    return table;
  }
  
  const cancelProcess = () => {
      FileService.deleteFile(fileId).then((res)=>{
        toggleEmptyDetect(false);
        reset();
        nav("/");
      }).catch((err)=>{
        console.log(err);
      })
      
  }
  function nextFunc(){
    const sd = sheetdata as WorkbookData;
    //use algorithm for replacing empty values with NULL
    for (const sheet in emptylist){
        sd[emptylist[sheet]] = replaceEmptyWithNull(sd[emptylist[sheet]] as TableRow[]); 
    }
    console.log("updated",sd);
    //clean empty list
    //while(emptylist.length > 0){
    //  emptylist.pop();
    //}
    
    //check if inconsistency list has values
    //open inconsistency prompt

    //else open success prompt
  }
  


  return (
    <Box sx={{
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 798,
        maxHeight: 594,
        bgcolor: '#71C887',
        boxShadow: 24,
        p: 2,
    }}>
        <div style={{marginTop:"3%", padding:"2em", backgroundColor:"#DCF1EC"}}>
          <p style={{fontSize:"32px", padding:0, margin:0}}>DataMate has detected empty cells, do you wish to continue?</p>
          <p style={{fontSize:"16px", paddingTop:'1em', paddingLeft:0, paddingBottom:'1em', margin:0}}>Empty cells will be assigned to NULL.</p>
          <div style={{display:'flex', flexDirection:'row'}}>
            <div style={{width: '85%'}}>
              {/* for table preview */}
              {HeaderArr !== undefined && BodyArr !== undefined? <>
                          <Paper elevation={0} sx={{ maxHeight:'270px', overflow: 'auto', border:"5px solid #71C887", borderRadius: 0}}>
                          <TableContainer>
                              <Table stickyHeader aria-label="sticky table">
                              <TableHead >
                                  <tr>
                                      {
                                      HeaderArr[0].map((col,i) => <TableCell
                                      style={{padding:5, width: '1px', whiteSpace: 'nowrap', fontSize:'10px'}}
                                      key={i}
                                      align='left'
                                      ><b>{col}</b></TableCell>)
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
                                              <TableCell style={{padding:5, width: '1px', whiteSpace: 'nowrap', fontSize:'10px'}}
                                              key={j} align='left' width="100px">
                                              {cell === true? "TRUE": cell === false? "FALSE":cell}
                                              </TableCell>:
                                              <TableCell style={{backgroundColor:"orange" ,padding:5, width: '1px', whiteSpace: 'nowrap', fontSize:'10px'}}
                                              key={j} align='left' width="100px"></TableCell>
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
              </>:
              <><CircularProgress size="10rem" 
              color="success" /></>}
            </div>
            <div style={{width: '15%'}}>
              {/* for table tabs */}
              <Tabs
                orientation="vertical"
                value= {currentSheet}
                onChange={changeSheet}
                TabIndicatorProps={{sx:{backgroundColor:'rgba(0,0,0,0)'}}}
                sx={{
                "& button":{borderRadius: 0, color: 'black', backgroundColor: '#DCF1EC'},
                "& button.Mui-selected":{backgroundColor: '#71C887', color: 'white'},
                }}
                aria-label="secondary tabs example"
                >
                {emptylist.length > 0? emptylist.map((sheet,i) =>{
                    return(                                
                        <Tab sx={{backgroundColor:"#D9D9D9"}}value={sheet} label={sheet} />
                    )
                }):<></>}
              </Tabs>
            </div>
          </div> 
          <div style={{display:"flex", justifyContent:"space-between"}}>
          <Button disableElevation onClick={cancelProcess} variant="contained" sx={{fontSize:'18px', textTransform:'none', backgroundColor: 'white', color:'black', borderRadius:50 , paddingInline: 4, margin:'5px'}}>Cancel</Button>
          <Button disableElevation onClick={nextFunc} variant="contained" sx={{fontSize:'18px', textTransform:'none', backgroundColor: '#71C887', color:'white', borderRadius:50 , paddingInline: 4, margin:'5px'}}>Next</Button>

          </div>
        </div>
    </Box>
  );
};

export default styled(EmptyDetectPrompt)({});

export {}; // Add this empty export statement