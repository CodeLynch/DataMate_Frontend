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

type NormalizeProps = {
    toggleNormalized: (status:boolean) => void,
    toggleEmptyDetect: (status:boolean) => void,
    toggleInconsistentDetect: (status:boolean) => void,
    toggleImportSuccess: (status:boolean) => void,
    fileId: number,
    workbook: XLSX.WorkBook | null | undefined, 
    sheets:string[], 
    vsheets:string[],
    normList:string[],
    inclist:string[],
    sheetdata: object,
    reset: () => void,
    updateSData: (data:Object) => void,
  }

interface WorkbookData {
    [sheet: string]: Object[];
}

interface TableRow {
    [key: string]: string | number;
}

interface NewTable {
    tableName: string,
    tableValues: TableRow[],
}

const NormalizePrompt = ({toggleNormalized, toggleEmptyDetect, fileId, toggleImportSuccess, toggleInconsistentDetect, workbook, sheets, vsheets, normList, sheetdata, reset, inclist, updateSData}: NormalizeProps) => {  
  const [currentSheet, setCurrentSheet] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [HeaderArr, setHArr] = useState<[][] | undefined>(undefined)
  const [BodyArr, setBArr] = useState<[][] | undefined>(undefined)
  const [newTablesArr, setTablesArr] = useState<NewTable[]>([])
  const [doneNormalizing, setNormDone] = useState(false);
  const nav = useNavigate();


  //add primary key function
  function addPrimaryKey(table: (string | number)[][]): (string | number)[][] {
    // Determine candidate primary key columns with unique values
    const headerRow = table[0];
    const uniqueColumns: string[] = [];
    const nonUniqueColumns: string[] = [];
    
    for (let i = 0; i < headerRow.length; i++) {
        const columnName = headerRow[i];
        const values = new Set(table.slice(1).map((row) => row[i]));
        if (values.size === table.length - 1) {
            uniqueColumns.push(columnName.toString());
        } else {
            nonUniqueColumns.push(columnName.toString());
        }
    }
    
    // If there are unique columns, consider the first one as the primary key
    if (uniqueColumns.length > 0) {
        const primaryKeyColumn = uniqueColumns[0];
        
        // Add the primary key column to the header row
        headerRow.unshift('id');
        
        // Add the primary key values to each data row
        let idCounter = 1;
        for (let i = 1; i < table.length; i++) {
            table[i].unshift(idCounter++);
        }
        
        return table;
    }
    
    // If no unique column is found, add an auto-incrementing 'id' column
    headerRow.unshift('id');
    let idCounter = 1;
    for (let i = 1; i < table.length; i++) {
        table[i].unshift(idCounter++);
    }
    
    return table;
}

  //pagination functions ------------------------------------------
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
  };
  //---------------------------------------------------------------

  function delete_ws(wb:XLSX.WorkBook, wsname:string) {
    const sidx = wb.SheetNames.indexOf(wsname);
    if(sidx == -1) throw `cannot find ${wsname} in workbook`;
    
    // remove from workbook
    wb.SheetNames.splice(sidx,1);
    delete wb.Sheets[wsname];
    // // update other structures
    // if(wb.Workbook) {
    //   if(wb.Workbook.Views) wb.Workbook.Views.splice(sidx, 1);
    //   if(wb.Workbook.Names) {
    //     let names = wb.Workbook.Names;
    //     for(let j = names.length - 1; j >= 0; --j) {
    //       if(names[j]?.Sheet == sidx) names = names.splice(j,1);
    //       else if(names[j]?.Sheet > sidx) --names[j]?.Sheet;
    //     }
    //   }
    // }
  }

  //useEffect for normalizing table on load;
  useEffect(()=>{
    console.log("Norm Sheets: ", normList);
    let sd = sheetdata as WorkbookData;
    for(const sheet in normList){
        console.log("Before: ", sd[normList[sheet]]);
        sd[normList[sheet]] = addPrimaryKey(sd[normList[sheet]] as [][]); 
        console.log("After: ", sd[normList[sheet]]);
        workbook!.Sheets[normList[sheet]] = XLSX.utils.aoa_to_sheet(sd[normList[sheet]] as [][]);
    }
    updateSData(sd as Object);
    console.log("Current Workbook: ",workbook);
    setCurrentSheet(vsheets[0])
    setNormDone(true);
  },[])

  //set currentSheet and header array on load based from props
  useEffect(()=>{
    if(doneNormalizing){
      //typing currentSheet as key of sheetData
      const currSheet = currentSheet as keyof typeof sheetdata
      //typing object value as unknown before converting to row
      const row =  sheetdata[currSheet] as unknown
      console.log("urow: ", row);
      let rowArr = row as [][]
      console.log("RowArr: ", rowArr);
      setHArr(rowArr)
    }
    
  },[doneNormalizing])

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
    if(HeaderArr !== undefined){
        let rowsArr = []
        //copy rowArr
        rowsArr = HeaderArr.slice(0); 
        //remove header values
        rowsArr.splice(1 - 1, 1);
        setBArr(rowsArr)
    }
  },[HeaderArr])

  const changeSheet = (stringevent: React.SyntheticEvent, newValue: string) =>{
      setCurrentSheet(newValue);
  }
  
  const cancelProcess = () => {
      FileService.deleteFile(fileId).then((res)=>{
        toggleNormalized(false);
        reset();
        nav("/");
      }).catch((err)=>{
        console.log(err);
      })      
  }

  function nextFunc(){
    const sd = sheetdata as WorkbookData;
    console.log("Normalized Data here:");
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
          <p style={{fontSize:"32px", padding:0, margin:0}}>DataMate has detected that your table can be normalized for easier transition to database.</p>
          <p style={{fontSize:"16px", paddingTop:'1em', paddingLeft:0, paddingBottom:'1em', margin:0}}>Will you accept this suggestions?</p>
          <div style={{display:'flex', flexDirection:'row'}}>
            <div style={{width: '85%'}}>
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
                                              <TableCell style={{padding:5, width: '1px', whiteSpace: 'nowrap', fontSize:'10px'}}
                                              key={j} align='left' width="100px">
                                              {cell === true? "TRUE": cell === false? "FALSE":cell}
                                              </TableCell>
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
            <div style={{width: '15%', display:"flex", flexDirection:"row"}} >
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
                {vsheets.length > 0? vsheets.map((sheet,i) =>{
                    return(
                          <Tab disableRipple sx={{backgroundColor:"#D9D9D9", marginLeft:0, paddingLeft:0, textAlign:"left"}}  value={sheet} label={sheet} />                     
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

export default styled(NormalizePrompt)({});

export {}; // Add this empty export statement