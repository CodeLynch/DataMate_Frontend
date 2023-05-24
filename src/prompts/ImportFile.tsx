import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import modalStyle from '../styles/ModalStyles';
import FileService from '../services/FileService';
import { useNavigate } from 'react-router-dom';

type ImportProps = {
  toggleImport: () => void,
  startLoading: () => void,
}


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


const ImportFile = ({toggleImport, startLoading}: ImportProps) => {
    const drop = useRef<HTMLDivElement>(null);
    const [hover, setHover] = useState(false);
    const nav = useNavigate();
    const count = 1;
    const formats = ['xlsx', 'csv']
    
    const onUpload = (file: FileList) => {
      
      if (file && file.length) {

        if (count < file.length) {
          alert(`Only ${count} file can be uploaded at a time`);
          return;
        }       
        if (!formats.some((format) => file[0].name.toLowerCase().endsWith(format.toLowerCase()))) {
          alert(`Only following file formats are acceptable: ${formats.join(', ')}`);
          return;
        }
        else{
          startLoading()
          FileService.uploadFile(file[0]).then((res)=>{
            toggleImport()
            nav('/file',{
              state:{
                fileid: res.fileId
              }
            });
          }).catch((err)=>{
            alert("Upload Error");
            toggleImport()
            console.log(err);
          })
        }
      }
    };

    useEffect(()=>{
        drop.current?.addEventListener('dragover', handleDragOver, false);
        drop.current?.addEventListener('drop', handleLeave, false);
        drop.current?.addEventListener('drop', handleDrop, false);
        
        return () => {
            drop.current?.removeEventListener('dragover', handleDragOver, false);
            drop.current?.removeEventListener('drop', handleLeave, false);
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
        const {files} = e.dataTransfer!;

        
        if (files && files.length) {
          if (count < files.length) {
            alert(`Only ${count} file can be uploaded at a time`);
            return;
          }       
          if (!formats.some((format) => files[0].name.toLowerCase().endsWith(format.toLowerCase()))) {
            alert(`Only following file formats are acceptable: ${formats.join(', ')}`);
            return;
          }
          else{
            onUpload(files);
          }
        }


    };

    const handleLeave = (e:DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setHover(false);
  };

    
  return (
    <Box sx={modalStyle}>
        <div ref={drop} className={hover? "dropAreaHover" : "dropArea"}>
          <div  className="dropAreaLine" />
          <div className="uploadTextContainer">
            <p style={{paddingLeft: '5rem'}} className="uploadText largeText">Drag your file here</p>
            <p style={{paddingLeft: '5rem'}} className="uploadText smallText">or</p>
          </div>
          <Button variant="contained" color="primary" component="label" style={styles.uploadButton}>
            Upload
            <input type="file" style={{ display: 'none' }} onChange={(e:React.FormEvent<HTMLInputElement>) => onUpload(e.currentTarget.files!)} />
          </Button>
        </div>
    </Box>
  );
};

export default styled(ImportFile)({});

export {}; // Add this empty export statement