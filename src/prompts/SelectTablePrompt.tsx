import { useLocation, useNavigate } from "react-router-dom";
import modalStyle from "../styles/ModalStyles";
import * as XLSX from 'xlsx'
import { Box, Button, CircularProgress, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tabs, styled } from "@mui/material";
import { useEffect, useState } from "react";
import FileService from "../services/FileService";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import '@inovua/reactdatagrid-community/index.css';



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

type SelectProps = {
    toggleSelect: (status:boolean) => void,
    toggleEmptyDetect: (status:boolean) => void,
    toggleInconsistentDetect: (status:boolean) => void,
    toggleImportSuccess: (status:boolean) => void,
    tblCount: number,
    fileId: number,
    vsheets:string[],
    sheetdata: object,
    updateEmpty: (sheet:string) => void,
    updateInc: (sheet:string) => void,
    emptySheets: string[],
    incSheets: string[],
    reset: () => void,
    updateSData: (data:Object) => void,
    wb: XLSX.WorkBook | null | undefined;
  }

interface WorkbookData {
    [sheet: string]: Object[];
}

interface TableRow {
    [key: string]: string | number;
}

interface HeaderConfig {
    name: string;
    header: string;
    defaultVisible?: boolean,
    defaultFlex: number;
}

interface Table{
    name: string;
    values: TableRow[];
}

const SelectTablePrompt = ({toggleSelect, tblCount, fileId, vsheets, sheetdata, emptySheets, incSheets,
    toggleEmptyDetect, toggleInconsistentDetect, toggleImportSuccess, updateEmpty, updateInc, reset, updateSData, wb}: SelectProps) => {  
    const [currentSheet, setCurrentSheet] = useState("");
    const [currentTab, setCurrentTab] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [HeaderArr, setHArr] = useState<[][] | undefined>(undefined);
    const [BodyArr, setBArr] = useState<[][] | undefined>(undefined);
    const [hasEmpty, SetEmpty] = useState(false);
    const [isInconsistent, SetInconsistent] = useState(false);
    const [isCheckDone, setCheckDone] = useState(false);
    const [createdSheets, setCSheets] = useState<Table[]>([]);
    const [createdTableCtr, setCCtr] = useState(0);
    const [cellSelection, setCellSelection] = useState({});
    const [columns, setColumns] = useState<HeaderConfig[]>([]);
    const [dataSource, setDataSrc] = useState<Object[]>([]);
  const nav = useNavigate();
  const gridstyle = {
    fontSize:"10px"
  }

  //set currentSheet and header array on load based from props
  useEffect(()=>{
    setCurrentSheet(vsheets[0]);
    //typing currentSheet as key of sheetData
    const currSheet = currentSheet as keyof typeof sheetdata
    //typing object value as unknown before converting to row
    const row =  sheetdata[currSheet] as unknown
    let rowArr = row as [][]
    setHArr(rowArr)
  },[])

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
        let colArr = [...columns];
        colArr = createColumns(HeaderArr[0]);
        setColumns(colArr);
        let rowsArr = [];
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

useEffect(()=>{
  if(sheetdata[currentSheet as keyof typeof sheetdata] !== undefined){
    let datasrc = [...dataSource];
    datasrc = createDataSrc(columns, sheetdata[currentSheet as keyof typeof sheetdata]);
    console.log("data source:", datasrc);
    setDataSrc(datasrc);
  }
}, [columns])

useEffect(()=>{
    if(createdTableCtr > 0){
        let name = "Table " + createdTableCtr;
        createdSheets.push({name: name, values:[]});
        setCurrentTab(name);
        console.log("current sd: ", sheetdata);
        console.log("current sheet: ", sheetdata[currentSheet as keyof typeof sheetdata]);
    }
},[createdTableCtr])

function createColumns(strings: string[]): HeaderConfig[] {
  let colctr = 0;  
  //for each string in strings parameter, create an object with the name "COLUMN" + colctr and increment
  //colctr after each iteration
  let strArr:HeaderConfig[] = strings.map(str => ({
      name: str,
      header: str,
      defaultFlex: 1,
    }));
    strArr.push({
      name: "id",
      header: "ID",
      defaultVisible: false,
      defaultFlex: 1,
    })

    return strArr;
  }

  function createDataSrc(headerConfigs: HeaderConfig[], values:[][]): TableRow[]{
    const table:TableRow[] = [];
    const headers: string[] = headerConfigs.map(config => config.name);

  let idVal = 0;
  values.forEach(rowValues => {
      if (rowValues.length !== headers.length - 1) {
        throw new Error('Number of values does not match number of headers.');
      }

      const row: TableRow = {};
      
      headers.forEach((header, index) => {
        console.log("header value is ", header);
        if(header === 'id'){
          row[header] = idVal;
          idVal++;
        }else{
          row[header] = rowValues[index];
        }
      });

      table.push(row);
    });
    let key = `0,${headers[0]}`;
    setCellSelection({...cellSelection, [key]:true });
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

  function newTable():void {
    let newval = createdTableCtr + 1;
    console.log("selected cells", cellSelection)
    setCCtr(newval);
  }

  const changeTab = (stringevent: React.SyntheticEvent, newValue: string) =>{
      setCurrentTab(newValue);
  }


  
  const cancelProcess = () => {
      FileService.deleteFile(fileId).then((res)=>{
        toggleSelect(false);
        setCSheets([]);
        reset();
        nav("/");
      }).catch((err)=>{
        console.log(err);
      })
      
  }
  //function for detecting empty values
  function hasEmptyValues(table: TableRow[]): boolean {
    for (const row of table) {
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          const value = row[key];
          if (value === null || value === undefined || value === "") {
            // Empty value found in the row
            return true;
          }
        }
      }
    }
    return false;
  }

  //function for detecting inconsistencies
  function hasInconsistentValues(table: TableRow[]): boolean {
    const columnDataTypes: { [key: string]: Set<string> } = {};

    let isFirst = true;
    for (const row of table) {
      if(isFirst){
        isFirst = false;
      }
      else{
          for (const column in row) {
            if (row.hasOwnProperty(column)) {
              const valueType = typeof row[column];
              console.log("type of ", column, " = ", valueType);
              if (!columnDataTypes[column]) {
                columnDataTypes[column] = new Set();
              }
              columnDataTypes[column].add(valueType);
      
              if (columnDataTypes[column].size > 1) {
                return true; // Inconsistent values found in this column
              }
            }
          }
      }
    }
  
    return false; // No inconsistent values found in any column
  }

  function togglePrompts(){
    const sd = sheetdata as WorkbookData;
    for(const s in vsheets){
      console.log("remaining sheets", vsheets[s]);
      //check for empty values in tables
      if(hasEmptyValues(sd[vsheets[s]] as TableRow[])){
        //insert table names to SheetsWithEmpty Array 
        if(!emptySheets.includes(vsheets[s])){
          updateEmpty(vsheets[s]);
          SetEmpty(true);
        }          
      }
      //if block for inconsistent values
      if(hasInconsistentValues(sd[vsheets[s]] as TableRow[])){
        if(!incSheets.includes(vsheets[s])){
          updateInc(vsheets[s]);
          SetInconsistent(true);
        }
      }
    }
     setCheckDone(true);    
  }

  function nextFunction(){
    togglePrompts();
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
          <p style={{fontSize:"32px", padding:0, margin:0}}>Please highlight the tables in your file.</p>
          <div style={{display:'flex', flexDirection:'row'}}>
            <div style={{width: '85%'}}>
              {/* for table preview */}
              {HeaderArr !== undefined && BodyArr !== undefined? <>
                          <Paper elevation={0} sx={{ maxHeight:'270px', overflow: 'auto', border:"5px solid #71C887", borderRadius: 0}}>
                          {/* //code for the table */}
                        <ReactDataGrid
                            idProperty="id"
                            style={gridstyle}
                            cellSelection={cellSelection}
                            onCellSelectionChange={setCellSelection}
                            columns={columns}
                            dataSource={dataSource}
                        />
                        </Paper>     
              </>:
              <><CircularProgress size="10rem" 
              color="success" />
              <h1>There's nothing man</h1></>}
            </div>
            <div style={{width: '15%'}}>
              <Button variant="text" onClick={newTable}>+ New Table</Button>
              {/* for table tabs */}
              <Tabs
                orientation="vertical"
                value= {currentTab}
                onChange={changeTab}
                TabIndicatorProps={{sx:{backgroundColor:'rgba(0,0,0,0)'}}}
                sx={{
                "& button":{borderRadius: 0, color: 'black', backgroundColor: '#DCF1EC'},
                "& button.Mui-selected":{backgroundColor: '#71C887', color: 'white'},
                }}
                aria-label="secondary tabs example"
                >
                {createdSheets.length > 0? createdSheets.map((sheet,i) =>{
                    return(                                
                        <Tab sx={{backgroundColor:"#D9D9D9"}}value={sheet.name} label={sheet.name} />
                    )
                }):<></>}
              </Tabs>
            </div>
          </div> 
          <div style={{display:"flex", justifyContent:"space-between"}}>
          <Button disableElevation onClick={cancelProcess} variant="contained" sx={{fontSize:'18px', textTransform:'none', backgroundColor: 'white', color:'black', borderRadius:50 , paddingInline: 4, margin:'5px'}}>Cancel</Button>
          <Button disableElevation onClick={nextFunction} variant="contained" sx={{fontSize:'18px', textTransform:'none', backgroundColor: '#71C887', color:'white', borderRadius:50 , paddingInline: 4, margin:'5px'}}>Next</Button>
          </div>
        </div>
    </Box>
  );
};

export default styled(SelectTablePrompt)({});

export {}; // Add this empty export statement