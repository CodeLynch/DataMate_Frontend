import { Box, Button } from "@mui/material";
import modalStyle from "../styles/ModalStyles";
import { DragEventHandler, useEffect, useRef, useState } from "react";
import '../App.css';


const UploadPrompt = () => {
    const drop = useRef<HTMLDivElement>(null);
    const [hover, setHover] = useState(false);

    const onUpload = (file: FileList) => {
        console.log(file);
    };

    useEffect(()=>{
        drop.current?.addEventListener('dragover', handleDragOver, false);
        drop.current?.addEventListener('drop', handleDrop, false);

        return () => {
            drop.current?.removeEventListener('dragover', handleDragOver, false);
            drop.current?.removeEventListener('drop', handleDrop, false);
        };

    },[])

    const handleDragOver = (e:DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setHover(true);
      };
      
      const handleDrop = (e:DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setHover(false);
        const {files} = e.dataTransfer!;

        if (files && files.length) {
            onUpload(files);
        }
      };

     

    return(
        <>
        <Box sx={modalStyle}>
                  <div 
                  ref = {drop}
                  className={hover? "Upload-box-hover": "Upload-box"}>
                    <div style={{
                      display:'flex',
                      flexDirection:'column',
                      justifyContent:'center'
                    }}>
                    <h3 style={{
                      margin:5
                    }}>Drag your file here</h3>
                    <h3 style={{
                      textAlign:'center',
                      margin:5}}>or</h3>
                    <Button 
                    variant="contained" 
                    sx={{backgroundColor:"#71C887"}}
                    >Upload</Button>
                    </div>
                  </div>
        </Box>
        </>
    )
}

export default UploadPrompt;