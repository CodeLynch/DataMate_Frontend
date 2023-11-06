import { Box, CircularProgress, InputAdornment, Paper, Tab, Tabs, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TableService from "../services/TableService";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ReactDataGrid from "@inovua/reactdatagrid-community";
import { EditIcon, TblIcon } from "../components/icons";

type DatabasePageProps = {
    stopLoading: () => void,
  }

type DatabaseType = {
  databaseId: number,
  databaseName: string,
  user:Object
}

type TableType ={
  tableId: number,
  tableName: string,
  database: DatabaseType,
  columns:string[],
}

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

export default function DatabasePage({stopLoading}:DatabasePageProps) {
    const loc = useLocation();
    const nav = useNavigate();
    const dbId = loc.state.dbid;
    const [Tables, setTables] = useState<string[]>([]);
    const [tblData, setTblData] = useState<Object[]>([]);
    const [currentTbl, setCurrentTbl] = useState("");
    const [currentTblID, setCurrentTblID] = useState(0);
    const [colsData, setColsData] = useState<HeaderConfig[]>([]);
    const [Database, setDBName] = useState('');


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

  function createObjects(keys: string[], arrayOfArrays: any[][]): Object[] {
    if (keys.length === 0 || arrayOfArrays.length === 0) {
      return [];
    }
  
    if (keys.length !== arrayOfArrays[0].length) {
      throw new Error("Number of keys does not match the number of values in the arrays.");
    }
  
    return arrayOfArrays.map((arr) => {
      const obj: { [key: string]: any } = {};
      keys.forEach((key, index) => {
        obj[key] = arr[index];
      });
      return obj;
    });
  }

    useEffect(()=>{
      //if(dbId !== undefined){
        TableService.getTblByDB(dbId).then(
            (res)=>{
                console.log("get res:", res);
                let tblResponse = res as TableType[];
                let tableArr = [...Tables];
                setDBName(tblResponse[0].database.databaseName);
                tblResponse.map((tbl, i)=>{
                  if(!tableArr.includes(tbl.tableName)){
                    tableArr.push(tbl.tableName);
                  }
                });
                setTables(tableArr);
                setCurrentTbl(Tables[0]);
                setCurrentTblID(0);
                setColsData(createColumns(tblResponse[0].columns))
                if(Tables[0] !== undefined){
                  TableService.getTblData(Tables[0])
                .then((res)=>{
                  console.log("get tbl data res:",res);
                  setTblData(createObjects(tblResponse[0].columns, res as [][]));
                }).catch((err)=>{
                  console.log(err);
                })
                }
                
              }
        ).catch((err)=>{
          console.log(err);
        })
      //}
        
    },[])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTblID(newValue);
        setCurrentTbl(Tables[newValue]);
    };

    useEffect(()=>{
      if(Tables[currentTblID] !== undefined || Tables[currentTblID] !== null){
        TableService.getTblByName(Tables[currentTblID])
        .then((res)=>{
          let tblRes:TableType = res as TableType;
          setColsData(createColumns(tblRes.columns));
          
            TableService.getTblData(Tables[currentTblID])
            .then((res)=>{
              setTblData(createObjects(tblRes.columns, res as [][]));
            })
          
        }).catch((err)=>{
          console.log(err);
        })
    }
    }, [currentTbl])

    function getTabProps(index: number) {
        return {
          id: `vertical-tab-${index}`,
          'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    useEffect(()=>{
      console.log("current table is ", currentTbl);
    }, [currentTbl])

    return(
        <>
        {tblData !== undefined? <>
            <Box sx={{height:"85vh", margin:'1em', marginTop:'5em'}}>
                <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <div style={{display:"flex", flexDirection:"row", padding:"5px"}}>
                        <h1 style={{margin:5}}>{Database}</h1>
                        <div className="iconTab" style={{height:"25px", width:"25px", 
                        backgroundColor:'#71C887', padding:"10px", borderRadius:10}}>
                            <EditIcon/>
                        </div>
                    </div>
                    <div className="iconTab" style={{display:"flex", alignSelf:"flex-end"}}>
                        EXPORT AS SQL
                    </div>
                    
                </Box>
                <Box style={{display:"flex", flexDirection:"row", backgroundColor:"#BAD1BE", height:"100%"}}>
                    <Box sx={{width:"20%", display:"flex", flexDirection:"column", margin:".5em"}}>
                        <TextField
                        hiddenLabel
                        placeholder="Search Tables"
                        sx={{border: 'none', "& fieldset": { border: 'none' }, backgroundColor:"white", borderRadius:5
                        , marginBottom:".3em"}}
                        InputProps={{ startAdornment: (<InputAdornment position="start"> <SearchOutlinedIcon /> </InputAdornment>),
                        disableUnderline: true, }} 
                        />
                        <Box sx={{backgroundColor:"#347845", padding:".5em", color:"white"}}>Tables</Box>
                        <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={currentTblID}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider', backgroundColor:"white",
                        "& button.Mui-selected":{backgroundColor: '#91E09F'},
                        display:'flex', justifyContent:"left", height:'100%',
                        }}
                        
                        >
                          {Tables.map((tbl, i)=>{
                            return  <Tab
                            sx={{alignItems:"flex-start"}} 
                            label={
                            <span style={{display:"flex", flexDirection:"row", maxHeight:"20px"}}>
                              <div style={{width:"20px", height:"20px", margin:"2px"}}>
                                <TblIcon/>
                              </div>
                              <div style={{margin:"4px",  maxWidth:200}}>
                              {tbl}
                              </div>
                            </span> 
                            }{...getTabProps(i)} />
                          })}
                        </Tabs>
                    </Box>
                    <Box sx={{width:"80%", display:"flex", flexDirection:"column", margin:".5em"}}>
                        <Box sx={{backgroundColor:"#347845",maxWidth: '40%', padding:".3em", display:"flex", justifyContent:"center", color:"white"}}>
                            {currentTbl === "" || currentTbl == undefined? "Table" : currentTbl}
                        </Box>
                        <Box sx={{ width: '100%', display:"flex", justifyContent:"center", marginTop:0}}>
                            <Box style={{backgroundColor:"#347845",width: '100%', height:"100%", display:"flex" }}>
                                <div style={{width: '100%', display:"flex", justifyContent:"center"}}>
                                {/* for table preview */}
                                {colsData.length > 0 && tblData.length > 0? <>
                                    <Paper elevation={0} sx={{ maxHeight:'500px', width:"100%", margin:'.3em', borderColor:"#347845"}}>
                                    {/* //code for the table */}
                                    <ReactDataGrid
                                        idProperty="id"
                                        style={{width:"100%", }}
                                        columns={colsData}
                                        dataSource={tblData}
                                        theme="green-light"
                                    />
                                    </Paper>     
                                    </>:
                                    <><CircularProgress size="10rem"/>
                                    </>}
                                </div>
                            </Box>
                        </Box>
                    </Box>
                    </Box>
            </Box>
        </>:<></>}
        </> 
    )
}