import { useLocation, useNavigate } from "react-router-dom";
import modalStyle from "../styles/ModalStyles";
import * as XLSX from 'xlsx'
import { Box, Button, CircularProgress, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tabs, styled } from "@mui/material";
import { useEffect, useState } from "react";
import FileService from "../services/FileService";
import { table } from "console";
import { tab } from "@testing-library/user-event/dist/tab";



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
interface TableRow {
    [columnName: string]: string | number | boolean;
  }
  
  interface SheetData {
    [sheetName: string]: TableRow[];
  }
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
    updateWB: (workbook:XLSX.WorkBook) => void,
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


const NormalizePrompt = ({toggleNormalized, toggleEmptyDetect, fileId, toggleImportSuccess, 
  toggleInconsistentDetect, workbook, sheets, vsheets, normList, sheetdata, reset, inclist, 
  updateSData, updateWB}: NormalizeProps) => {  
  const [currentSheet, setCurrentSheet] = useState("");
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [HeaderArr, setHArr] = useState<[][] | undefined>(undefined)
  const [BodyArr, setBArr] = useState<[][] | undefined>(undefined)
  const [newTablesArr, setTablesArr] = useState<NewTable[]>([])
  const [doneNormalizing, setNormDone] = useState(false);
  const [toReread, setReread] = useState(false);
  const [PrimaryTableCtr, setPTabCtr] = useState(0);
  const [origWB, setOrigWB] = useState<XLSX.WorkBook>({...workbook!})
  const [startProcess, setStartProcess] = useState(false);
  const nav = useNavigate();

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
    let sheetdata:Object = {}
    wb.SheetNames.map((sheet, i) => 
    {
        const worksheet = wb.Sheets[sheet];
        const jsondata = XLSX.utils.sheet_to_json(worksheet,{
            header: 1,
            raw: true,
            defval: "",
        }) as unknown;
        const sd = sheetjs_cleanEmptyRows(jsondata as XLSX.SheetType)
        const js = sd as Object
        sheetdata = {...sheetdata, [sheet]: js}            
    })
    updateSData(sheetdata)
     //typing currentSheet as key of sheetData
     const currSheet = currentSheet as keyof typeof sheetdata
     //typing object value as unknown before converting to row
     const row =  sheetdata[currSheet] as unknown
     let rowArr = row as [][]
     setHArr(rowArr)
     console.log("Sheet Data: ",sheetdata);
}

function convertObjectToArray(obj: Record<string, string>[] | (number | string)[][]): (number | string)[][] {
  if (Array.isArray(obj[0])) {
    // If the first element is already an array, assume it's an array of arrays
    return obj as (number | string)[][];
  }

  const resultArray: (number | string)[][] = [];

  for (const item of obj) {
    if (typeof item === 'object') {
      const values = Object.values(item);
      resultArray.push(values);
    }
  }

  return resultArray;
}

  //add primary key function
  function addPrimaryKey(table: (number | string)[][], tableName:string): void {
    // Check if the table is empty
    if (table.length === 0 || table[0].length === 0) {
      console.log("Table is empty. No modifications needed.");
      return;
    }
  
    // Assuming the first row contains the column names
    const headerRow = table[0];
    console.log("Header Row is: ", headerRow);
  
    // Check if the table already has an auto-increment primary key
    const hasNumberIDColumn = headerRow.some((columnName, columnIndex) => {
      if (typeof table[1][columnIndex] === 'number') {
        console.log("checking", table[1][columnIndex])
        let uniqueVal: number[] = [];
        for(let i=1; i < table.length; i++){
          if(!uniqueVal.includes(table[i][columnIndex] as number)){
            uniqueVal.push(table[i][columnIndex] as number)
          }else{
            return false;
          }
        }
        return true;
      }
      return false;
    });
  
    if (hasNumberIDColumn) {
      console.log("Table already has a Number ID key. No modifications needed.");
      return;
    }
  
    // Find the first available index for the new 'id' column
    let idColumnIndex = 1;
    while (headerRow.includes(`${tableName}_id`)) {
      idColumnIndex++;
    }
  
    // Add the 'id' column to the header row at the beginning
    headerRow.unshift(`${tableName}_id`);
  
    // Add auto-incrementing values to each row
    for (let i = 1; i < table.length; i++) {
      table[i].unshift(i);
    }
  
    console.log("Added an auto-increment 'id' column to the table.");
  }

function getUniquePrimaryTableName(): string{
  setPTabCtr(PrimaryTableCtr + 1);
  return `PrimaryTable_${PrimaryTableCtr + 1}`;;
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

        if (!hasCorrespondingValue(table, columnName, otherColumn as string, targetValue, otherValue)) {
          isDependency = false;
          break;
        }
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

function findPrimaryKey(table: (string | number)[][], columnName: string, searchValue: string | number): string | number {
  console.log("searching for ", searchValue, " at " , columnName)
  
  // Find the index of the specified column
  const columnIndex = table[0].indexOf(columnName);
  console.log("index of column is ", columnIndex);

  // If the column doesn't exist in the table, return null
  if (columnIndex === -1) {
    return -1;
  }

  // Iterate through the table's rows to find the primary key for the given value
  for (let i = 1; i < table.length; i++) {
    console.log(table[i][columnIndex], " === ", searchValue)
    if (table[i][columnIndex] === searchValue) {
      // Return the primary key value (assuming it's in the first column)
      return table[i][0];
    }
  }

  // If no match is found
  return -1;
}

//replacing values in primary tables with foreign keys
function replaceWithFK(tableA: (string | number)[][], tableB: (string | number)[][]) {
  // Deep copy of tableA
  const mergedTable: (string | number)[][] = JSON.parse(JSON.stringify(tableA));

  // Identify common columns between Table A and Table B
  console.log("A: ",tableA, " and ", "B:", tableB)
  const commonColumns = tableA[0].filter((col) => tableB[0].includes(col));
  console.log("common cols:", commonColumns);
  if (commonColumns.length === 0) {
    // If no common columns, return the original Table A as is
    return mergedTable;
  }

  // Remove common columns (except for the primary key) from mergedTable
  const primaryKeyIndex = mergedTable[0].indexOf(commonColumns[0]);
  const removedCol: string[] = [];
  mergedTable[0] = mergedTable[0].filter((col, index) => {
    //if column is not found in tbl B return true
    if (!commonColumns.includes(col)) {   
      console.log("COLUMN:",col," returns true");
      return true;
    }
    //if column is found in tbl B return false and push index to removed Indexes
    console.log("COLUMN:",col," returns false", "with index ", tableB[0].indexOf(col));
    removedCol.push(col as string);
    return false;
  });

  // Create a mapping of primary key values in Table B to their corresponding rows
  const primaryKeyMap: { [key: string]: (string | number)[] } = {};
  for (let i = 1; i < tableB.length; i++) {
    const primaryKeyValue = tableB[i][primaryKeyIndex]?.toString();
    if (primaryKeyValue !== undefined) {
      primaryKeyMap[primaryKeyValue] = tableB[i];
    }
  }

  console.log("col to remove: ", removedCol)
  // get table A column names
  const headerRow = tableA[0];
  console.log("hr", headerRow);

  // Replace the first column in removedCol with the first column in tableB (primary key of tableB)
  let fColumnIndex = headerRow.findIndex((name) => name === removedCol[0]);
  headerRow[fColumnIndex] = tableB[0][0];
  console.log("new name: ",mergedTable[0][fColumnIndex]);
  
  for(let i = 1; i < mergedTable.length; i++){
    console.log("val", mergedTable[i][fColumnIndex])
    console.log("replacing with ",findPrimaryKey(tableB, removedCol[0], mergedTable[i][fColumnIndex]));
    mergedTable[i][fColumnIndex] = findPrimaryKey(tableB, removedCol[0], mergedTable[i][fColumnIndex]);
  }
  //remove first column
  removedCol.splice(0,1)

  console.log("after replacing col with fk col to remove: ", removedCol)

  // Remove values from mergedTable for common columns (except for the primary key)
  for(const col in removedCol){
    const columnIndex = headerRow.findIndex((name) => name === removedCol[col]);
    console.log("column index of ",removedCol[col], " is ", columnIndex);
    for (let i = 1; i < mergedTable.length; i++) {
    const foreignKeyValue = mergedTable[i][primaryKeyIndex]?.toString();
    console.log("Merged table after: ",mergedTable)
    if (primaryKeyMap[foreignKeyValue]) {
        console.log("Removing: ", mergedTable[i][columnIndex])
        mergedTable[i].splice(columnIndex, 1); // Splice removes the value at the specified index
    } else {
        console.log("Removing: ", mergedTable[i][columnIndex])
        mergedTable[i].splice(columnIndex, 1); // Splice removes the value at the specified index
    }
    }
    headerRow.splice(columnIndex, 1);
  }
  mergedTable[0] = headerRow;

  return mergedTable;
}


function normalizeTbl(inputTable: (string | number)[][]): void {
    let doNotSearch:string[] = [];
    const numCols = inputTable[0].length;
    let newPrimaryTable: (string | number)[][] = [...inputTable];
    let primaryTableName = getUniquePrimaryTableName();
    
    
    for (let col = 0; col < numCols; col++) {
      const columnName = inputTable[0][col];
      console.log(`Column Name: ${columnName}`);
      if(!doNotSearch.includes(columnName as string)){
        console.log(columnName," not found in do not search");
        let depArr = getColumnDependencies(columnName as string, newPrimaryTable, doNotSearch);
        console.log("Dependency array: ", depArr);
        if(depArr.length > 1 && depArr.length < numCols - col){
          for(const col in depArr){
            //inserting the column and the dependencies into do not search
            doNotSearch.push(depArr[col]); 
          } 
          //concat the columns in the depArr as table
          console.log("depArr", depArr)
          let newTblVal =  concatenateColumns(depArr, newPrimaryTable);
          //remove repeating values
          newTblVal = removeRepeatingRows(newTblVal)
          //add primary key if not existing
          addPrimaryKey(newTblVal as [][], depArr[0]);
          console.log("updated val w/ key: ", newTblVal);
          //push new table to the newTablesArr
          if(!newTablesArr.some(newtab => newtab.tableName === depArr[0])){
            newTablesArr.push(
              {tableName:depArr[0], tableValues: newTblVal}
            )
          }        
          newPrimaryTable = replaceWithFK(newPrimaryTable, newTblVal)           
          console.log("npt:", newPrimaryTable) 
        
        }else{
          doNotSearch.push(columnName as string);
      }
    }
    console.log("----"); // Separator between columns
    if(!newTablesArr.some(newtab => newtab.tableName === primaryTableName)){
      newTablesArr.push(
        {tableName:primaryTableName, tableValues: newPrimaryTable}
      )
    }else{
      let pIndex = newTablesArr.findIndex(obj => { return obj.tableName === primaryTableName;})
      newTablesArr[pIndex].tableValues = newPrimaryTable;
    }  
    console.log("newtab Array: ", newTablesArr);
    setNormDone(true);
  }
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

  //useEffect for normalizing table on load;
  useEffect(()=>{
    if(startProcess && JSON.stringify(sheetdata) !== '{}'){
      let sd = sheetdata as WorkbookData; 
      let newWB:XLSX.WorkBook = {...workbook!}
      
      //clear sheets found in norm list in new work book copy
      for(const sheet in newWB.SheetNames){
         
         if(normList.includes(newWB.SheetNames[sheet])){
            console.log("Deleting ", newWB.SheetNames[sheet], "...")
           delete_ws(newWB, newWB.SheetNames[sheet as unknown as number])
         }
      }

      for(const sheet in normList){ 
        //adding primary keys to the sheets w/ no keys
        addPrimaryKey(convertObjectToArray(sd[normList[sheet]] as [][]), normList[sheet]); 
        //appending the updated sheet to workbook
        workbook!.Sheets[normList[sheet]] = XLSX.utils.aoa_to_sheet(convertObjectToArray(sd[normList[sheet]] as [][]));
        //adding possible tables to newtablesArr
        normalizeTbl(convertObjectToArray(sd[normList[sheet]] as [][]));
        //appending each new possible table in array to workbook 
        for(const newtable in newTablesArr){
          let ws = XLSX.utils.aoa_to_sheet(newTablesArr[newtable].tableValues);
          
          /* Add the worksheet to the workbook */
          if(!workbook?.SheetNames.includes(newTablesArr[newtable].tableName)){
            XLSX.utils.book_append_sheet(newWB!, ws, newTablesArr[newtable].tableName);
          }          
        }
      }
      updateSData(sd as Object);
      updateWB(newWB);          
      console.log("setting normalization to done...")
      setNormDone(true);
    }
  },[startProcess])

  useEffect(()=>{
      if(JSON.stringify(sheetdata) !== '{}' && sheetdata !== undefined){
        setStartProcess(true);
      }
  },[workbook, sheetNames])

  //useEffect once normalization process is done
  useEffect(()=>{
    if(doneNormalizing){
      while(vsheets.length > 0){
        vsheets.pop();
      }
      workbook?.SheetNames.map((sheet, i)=>{
        vsheets.push(sheet);
      })
      console.log("VS:",vsheets);
      setCurrentSheet(vsheets[0])
      console.log("sd:",sheetdata);
      console.log("setting read for re-read to true...")
      setReread(true);
      console.log("original workbook:", origWB);
    }
    
  },[doneNormalizing])

  useEffect(()=>{
    if(toReread){
      console.log("read this data:", workbook)
      readData(workbook!)
    }
    },[toReread])

  //useEffect once done re-reading data
  //set currentSheet and header array based from props
  useEffect(()=>{
    if(JSON.stringify(sheetdata) !== '{}')  {
      //typing currentSheet as key of sheetData
      const currSheet = currentSheet as keyof typeof sheetdata
      //typing object value as unknown before converting to row
      const row =  sheetdata[currSheet] as unknown
      let rowArr = row as [][]
      setHArr(rowArr)
    }
  },[sheetdata])

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
                          <Paper elevation={0} sx={{ minHeight:"150px", maxHeight:'270px', overflow: 'auto', border:"5px solid #71C887", borderRadius: 0}}>
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
            <div style={{width: '20%'}}>
              {/* for table tabs */}
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    scrollButtons={vsheets.length < 4? false: "auto"}
                    value= {currentSheet}
                    onChange={changeSheet}
                    TabIndicatorProps={{sx:{backgroundColor:'rgba(0,0,0,0)'}}}
                    sx={{
                    width:"100%",
                    "& button":{borderRadius: 0, color: 'black', backgroundColor: '#DCF1EC'},
                    "& button.Mui-selected":{backgroundColor: '#71C887', color: 'white'},
                    }}
                    aria-label="secondary tabs example"
                    >
                    {vsheets.length > 0? vsheets.map((sheet,i) =>{
                        return(                                
                          <Tab disableRipple sx={{backgroundColor:"#D9D9D9", marginLeft:0, paddingLeft:0, textAlign:"left"}}  value={sheet} label={sheet} />
                        )
                    }):<p></p>}
                  </Tabs>
              </div>
            </div> 
          </div> 
          <div style={{display:"flex", justifyContent:"space-between"}}>
          <Button disableElevation onClick={cancelProcess} variant="contained" sx={{fontSize:'18px', textTransform:'none', backgroundColor: 'white', color:'black', borderRadius:50 , paddingInline: 4, margin:'5px'}}>Cancel</Button>
          <div>
            <Button disableElevation onClick={nextFunc} variant="contained" sx={{fontSize:'18px', textTransform:'none', backgroundColor: '#71C887', color:'white', borderRadius:50 , paddingInline: 4, margin:'5px'}}>Decline</Button>
            <Button disableElevation onClick={nextFunc} variant="contained" sx={{fontSize:'18px', textTransform:'none', backgroundColor: '#71C887', color:'white', borderRadius:50 , paddingInline: 4, margin:'5px'}}>Accept</Button>
          </div>
          </div>
        </div>
    </Box>
  );
};

export default styled(NormalizePrompt)({});

export {}; // Add this empty export statement