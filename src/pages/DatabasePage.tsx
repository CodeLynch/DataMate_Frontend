import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
    const [colsData, setColsData] = useState<HeaderConfig[]>([]);
    const [fileName, setFileName] = useState('');

    return(
        <>
        {tblData !== undefined? <>
            <div style={{display:"flex", flexDirection:"row"}}>
            <Box sx={{width:"20%",backgroundColor:"green"}}></Box>
            <Box sx={{width:"80%", backgroundColor:"green"}}></Box>
            </div>
        </>:<></>}
        </> 
    )
}