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
    tableValues: (string | number)[][],
}

const NormalizePrompt = ({toggleNormalized, toggleEmptyDetect, fileId, toggleImportSuccess, toggleInconsistentDetect, workbook, sheets, vsheets, normList, sheetdata, reset, inclist, updateSData}: NormalizeProps) => {  
  const [currentSheet, setCurrentSheet] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [HeaderArr, setHArr] = useState<[][] | undefined>(undefined)
  const [BodyArr, setBArr] = useState<[][] | undefined>(undefined)
  const [newTablesArr, setTablesArr] = useState<NewTable[]>([])
  const [doneNormalizing, setNormDone] = useState(false);
  const [PrimaryTableCtr, setPTabCtr] = useState(0);
  const nav = useNavigate();


  //add primary key function
  function addPrimaryKey(table: (string | number)[][]): (string | number)[][] {
    const headerRow = table[0];

    // Check if the table already has a primary key column
    const hasPrimaryKey = headerRow.some((columnName) => {
        const values = new Set(table.slice(1).map((row) => row[headerRow.indexOf(columnName)]));
        return values.size === table.length - 1;
    });

    if (hasPrimaryKey) {
        console.log("Table already has a primary key.");
        return table;
    }

    // Determine candidate primary key columns with unique values
    const uniqueColumns: string[] = [];
    
    for (let i = 0; i < headerRow.length; i++) {
        const columnName = headerRow[i];
        const values = new Set(table.slice(1).map((row) => row[i]));
        if (values.size === table.length - 1) {
            uniqueColumns.push(columnName.toString());
        }
    }
    
    // Check if any unique column has dependent columns
    const hasValidPrimaryKey = uniqueColumns.some((primaryKey) => {
        return !table.slice(1).some((row) => {
            return uniqueColumns.some((uniqueCol) => uniqueCol !== primaryKey && row[headerRow.indexOf(uniqueCol)] !== null);
        });
    });

    console.log("has valid primary key? ", hasValidPrimaryKey);
    if (hasValidPrimaryKey) {
        return table;
    }

    // If there are unique columns, consider the first one as the primary key
    if (uniqueColumns.length > 0) {
        const primaryKeyColumn = uniqueColumns[0];
        
        // Add the primary key column to the header row
        headerRow.unshift(primaryKeyColumn);
        
        // Add the primary key values to each data row
        let idCounter = 1;
        for (let i = 1; i < table.length; i++) {
            table[i].unshift(idCounter++);
        }
        
        return table;
    }
    
    // If no valid primary key is found, add an auto-incrementing 'id' column
    headerRow.unshift('id');
    let idCounter = 1;
    for (let i = 1; i < table.length; i++) {
        table[i].unshift(idCounter++);
    }
    
    return table;
}

function getUniquePrimaryTableName(): string{
  setPTabCtr(PrimaryTableCtr + 1);
  return `new_PrimaryTable_${PrimaryTableCtr + 1}`;;
}


//getting a string array of a column name and its dependencies
function getColumnDependencies(columnName: string, table: (string | number)[][], doneSearching: string[]): string[] {
  const columnIndex = table[0].indexOf(columnName);

  if (columnIndex === -1) {
    return [];
  }

  const numRows = table.length;
  const dependencies: string[] = [columnName];

  for (let col = 1; col < table[0].length; col++) {
    if (col !== columnIndex) {
      const otherColumn = table[0][col];
      let isDependency = true;

      for (let row = 1; row < numRows; row++) {
        const targetValue = table[row][columnIndex];
        const otherValue = table[row][col];

        console.log("tv: ", targetValue, "ov: ", otherValue)
        if (!hasCorrespondingValue(table, columnName, otherColumn as string, targetValue, otherValue)) {
          console.log("So it is not a dependency")
          isDependency = false;
          break;
        }
        console.log("So it is a dependency")
      }

      if (isDependency && !doneSearching.includes(otherColumn as string)) {
        dependencies.push(otherColumn as string);
      }
    }
  }

  return dependencies;
}

function hasCorrespondingValue(table: (string | number)[][], columnName1: string, columnName2: string, targetValue: any, currentValue: any): boolean {
  const columnIndex1 = table[0].indexOf(columnName1);
  const columnIndex2 = table[0].indexOf(columnName2);

  if (columnIndex1 === -1 || columnIndex2 === -1) {
    return false;
  }

  for (let row = 1; row < table.length; row++) {
    if (table[row][columnIndex1] === targetValue && table[row][columnIndex2] !== currentValue) {
      return false;
    }
  }

  return true;
}
//checking if a column hasrepeating values
function hasRepeatingValues(columnName: string, table: (string | number)[][]): boolean {
  const columnIndex = table[0].indexOf(columnName);

  if (columnIndex === -1) {
    return false; // Column not found
  }

  const valuesSet = new Set<string | number>();

  for (let row = 1; row < table.length; row++) {
    const cellValue = table[row][columnIndex];

    if (valuesSet.has(cellValue)) {
      return true; // Found a repeating value
    }

    valuesSet.add(cellValue);
  }

  return false; // No repeating values found
}

function concatenateColumns(columnNames: string[], table: (string | number)[][]): (string | number)[][] {
  const columnIndexList: number[] = [];
  const newTable: (string | number)[][] = [];

  // Find the indices of the specified columns
  for (const columnName of columnNames) {
    const columnIndex = table[0].indexOf(columnName);
    if (columnIndex !== -1) {
      columnIndexList.push(columnIndex);
    }
  }

  // Add the header row to the new table
  const headerRow: (string | number)[] = [];
  for (const columnIndex of columnIndexList) {
    headerRow.push(table[0][columnIndex]);
  }
  newTable.push(headerRow);

  // Add rows from the specified columns to the new table
  for (let row = 1; row < table.length; row++) {
    const newRow: (string | number)[] = [];
    for (const columnIndex of columnIndexList) {
      newRow.push(table[row][columnIndex]);
    }
    newTable.push(newRow);
  }

  return newTable;
}

//function to remove repeating rows in a table
function removeRepeatingRows(table: (string | number)[][]): (string | number)[][] {
  const seenRows: Set<string> = new Set();
  const uniqueTable: (string | number)[][] = [table[0]]; // Copy the header row

  for (let row = 1; row < table.length; row++) {
    const rowValues = table[row].toString();

    if (!seenRows.has(rowValues)) {
      seenRows.add(rowValues);
      uniqueTable.push(table[row]);
    }
  }

  return uniqueTable;
}

function normalizeTbl(inputTable: (string | number)[][]): void {
  let doNotSearch:string[] = [];
  const numCols = inputTable[0].length;

  for (let col = 0; col < numCols; col++) {
    const columnName = inputTable[0][col];
    console.log(`Column Name: ${columnName}`);
    if(!doNotSearch.includes(columnName as string)){
      console.log(columnName," not found in do not search");
      let depArr = getColumnDependencies(columnName as string, inputTable, doNotSearch);
      console.log("Dependency array: ", depArr);
      if(depArr.length > 1 && depArr.length !== numCols){
        //inserting the column and the dependencies into do not search
        for(const col in depArr){
          doNotSearch.push(depArr[col]); 
          //concat the columns in the depArr as table
          let newTblVal =  concatenateColumns(depArr, inputTable);
          //remove repeating values
          newTblVal = removeRepeatingRows(newTblVal)
          //add primary key if not existing
          newTblVal = addPrimaryKey(newTblVal);
          console.log("updated val w/ key: ", newTblVal);
          //push new table to the newTablesArr
          if(!newTablesArr.some(newtab => newtab.tableName === depArr[0])){
            newTablesArr.push(
              {tableName:depArr[0], tableValues: newTblVal}
            )
          }
        }      
      }else{
        doNotSearch.push(columnName as string);
      }
    }
    console.log("----"); // Separator between columns
  }



//   for each sheet (table) of workbook{
//     let pk = getPrimaryKey(sheet);
//     if(pk === null or undefined){
// 	createPrimaryKey(sheet)
// 	}
//     for each column of sheet{
// 	 let depVals:string[] = getDependecies(col);
// 	 if(isRepeating(column)){
//          //transfer column to a new table along with its dependencies with an auto-integer primary key
//          //alter original table to replace column with foreign key and remove dependencies
// 	 }
// 	}
// }
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

  useEffect(()=>{
    console.log("Array contains: ",newTablesArr);
  },[newTablesArr])

  // const originalTable: (string | number)[][] = [
  //   ["Book ID", "Title", "Author ID", "Author Name", "Genre ID", "Genre Name"],
  //   [1, "The Great Gatsby", 101, "F. Scott Fitzgerald", 201, "Fiction"],
  //   [2, "To Kill a Mockingbird", 102, "Harper Lee", 202, "Fiction"],
  //   [3, "1984", 103, "George Orwell", 201, "Fiction"],
  //   [4, "Pride and Prejudice", 104, "Jane Austen", 203, "Romance"],
  //   [5, "The Hobbit", 105, "J.R.R. Tolkien", 204, "Fantasy"],
  //   [6, "LOTR", 105, "J.R.R. Tolkien", 204, "Fantasy"],
  // ];

  //useEffect for normalizing table on load;
  useEffect(()=>{
    if(!doneNormalizing){
      let sd = sheetdata as WorkbookData;
      
      for(const sheet in normList){ 
        //adding primary keys to the sheets w/ no keys
        sd[normList[sheet]] = addPrimaryKey(sd[normList[sheet]] as [][]); 
        workbook!.Sheets[normList[sheet]] = XLSX.utils.aoa_to_sheet(sd[normList[sheet]] as [][]);
        normalizeTbl(sd[normList[sheet]] as [][]); 
        //normalizeTbl(originalTable);
        for(const newtable in newTablesArr){
          let ws = XLSX.utils.aoa_to_sheet(newTablesArr[newtable].tableValues);
          /* Add the worksheet to the workbook */
          if(!workbook?.SheetNames.includes(newTablesArr[newtable].tableName)){
            XLSX.utils.book_append_sheet(workbook!, ws, newTablesArr[newtable].tableName);
          }          
        }
      }
      
      updateSData(sd as Object);
      console.log("Current sd: ",sd);
      while(vsheets.length > 0){
        vsheets.pop();
      }
      workbook?.SheetNames.map((sheet, i)=>{
        vsheets.push(sheet);
      })
      console.log("VS:",vsheets);
      setCurrentSheet(vsheets[0])
      setNormDone(true);
    }
  },[])

  //set currentSheet and header array on load based from props
  useEffect(()=>{
    if(doneNormalizing){
      //typing currentSheet as key of sheetData
      const currSheet = currentSheet as keyof typeof sheetdata
      //typing object value as unknown before converting to row
      const row =  sheetdata[currSheet] as unknown
      let rowArr = row as [][]
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