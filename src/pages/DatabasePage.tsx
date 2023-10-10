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

    useEffect(()=>{
        
        TableService.getTblByDB(dbId).then(
            (res)=>{
                console.log("get res:", res);
            }
        )
    },[])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTblID(newValue);
    };

    function getTabProps(index: number) {
        return {
          id: `vertical-tab-${index}`,
          'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    //Sample Data Source-------------------------------------------------------------

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

    //-------------------------------------------------------------------------------
    return(
        <>
        {tblData !== undefined? <>
            <Box sx={{height:"85vh", margin:'1em', marginTop:'2em'}}>
                <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <div style={{display:"flex", flexDirection:"row", padding:"5px"}}>
                        <h1 style={{margin:5}}>Database Name</h1>
                        <div className="iconTab" style={{height:"25px", width:"25px", 
                        backgroundColor:'#71C887', padding:"10px", borderRadius:10}}>
                            <EditIcon/>
                        </div>
                    </div>
                    <div className="iconTab" style={{display:"flex", alignSelf:"flex-end"}}>
                        EXPORT AS SQL
                    </div>
                    
                </Box>
                <Box style={{display:"flex", flexDirection:"row", backgroundColor:"#BAD1BE"}}>
                    <Box sx={{width:"20%", display:"flex", flexDirection:"column", margin:".5em"}}>
                        <TextField
                        hiddenLabel
                        placeholder="Search"
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
                        display:'flex', justifyContent:"left",
                        }}
                        
                        >
                            <Tab
                            sx={{alignItems:"flex-start"}} 
                            label={
                            <span style={{display:"flex", flexDirection:"row", maxHeight:"20px"}}>
                              <div style={{width:"20px", height:"20px", margin:"2px"}}>
                                <TblIcon/>
                              </div>
                              <div style={{margin:"4px"}}>
                              Item One
                              </div>
                            </span> 
                            }{...getTabProps(0)} />
                            <Tab 
                            sx={{alignItems:"flex-start"}} 
                            label={
                            <span style={{display:"flex", flexDirection:"row", maxHeight:"20px"}}>
                              <div style={{width:"20px", height:"20px", margin:"2px"}}>
                                <TblIcon/>
                              </div>
                              <div style={{margin:"4px"}}>
                              Item Two
                              </div>
                            </span> 
                            } {...getTabProps(1)} />
                            <Tab 
                            sx={{alignItems:"flex-start"}} 
                            label={
                            <span style={{display:"flex", flexDirection:"row", maxHeight:"20px"}}>
                              <div style={{width:"20px", height:"20px", margin:"2px"}}>
                                <TblIcon/>
                              </div>
                              <div style={{margin:"4px"}}>
                              Item Three
                              </div>
                            </span> 
                            } {...getTabProps(2)} />
                            <Tab 
                            sx={{alignItems:"flex-start"}} 
                            label={
                            <span style={{display:"flex", flexDirection:"row", maxHeight:"20px"}}>
                              <div style={{width:"20px", height:"20px", margin:"2px"}}>
                                <TblIcon/>
                              </div>
                              <div style={{margin:"4px"}}>
                              Item Four
                              </div>
                            </span> 
                            } {...getTabProps(3)} />
                        </Tabs>
                    </Box>
                    <Box sx={{width:"80%", display:"flex", flexDirection:"column", margin:".5em"}}>
                        <Box sx={{backgroundColor:"#347845",width: '15%', padding:".3em", display:"flex", justifyContent:"center", color:"white"}}>
                            Current Table
                        </Box>
                        <Box sx={{ width: '100%', display:"flex", justifyContent:"center", marginTop:0}}>
                            <Box style={{backgroundColor:"#347845",width: '100%', height:"100%", display:"flex" }}>
                                <div style={{width: '100%', display:"flex", justifyContent:"center"}}>
                                {/* for table preview */}
                                {colsData.length <= 0 && tblData.length <= 0? <>
                                    <Paper elevation={0} sx={{ maxHeight:'500px', width:"100%", margin:'.3em', borderColor:"#347845"}}>
                                    {/* //code for the table */}
                                    <ReactDataGrid
                                        idProperty="id"
                                        style={{width:"100%", }}
                                        columns={columns}
                                        dataSource={dataSource}
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