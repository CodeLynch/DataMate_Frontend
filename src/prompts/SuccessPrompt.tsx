import { useNavigate } from "react-router-dom";
import FileService from "../services/FileService";
import { Box, Button, styled } from "@mui/material";

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

type SuccessProps = {
    toggleImportSuccess: (status:boolean) => void,
    fileId: number,
    reset: () => void,
  }

interface WorkbookData {
    [sheet: string]: Object[];
}

interface TableRow {
    [key: string]: string | number;
}

const SuccessPrompt = ({fileId, toggleImportSuccess, reset}: SuccessProps) => {  
  const nav = useNavigate();

  function okFunction(){
    reset();
    toggleImportSuccess(false);
    nav('/file',{
              state:{
                fileid: fileId
              }
            });
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
          <div style={{display:"flex", justifyContent:"Center", flexDirection:"column", margin:"2em"}}>
              <p style={{fontSize:"24px", padding:0, margin:0, textAlign:"center"}}>No detected Inconsistencies,</p>
              <p style={{fontSize:"24px", padding:0, margin:0, textAlign:"center"}}>Data is imported successfully!</p>
          </div>
          <div style={{display:"flex", justifyContent:"end"}}>
          <Button disableElevation onClick={okFunction} variant="contained" sx={{fontSize:'24px', backgroundColor: '#71C887', color:'white', borderRadius:50 , paddingInline: 7, margin:'5px'}}>OK</Button>          
          </div>
        </div>
    </Box>
  );
};

export default styled(SuccessPrompt)({});

export {}; // Add this empty export statement