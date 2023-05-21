import React from 'react';
import { Dialog, DialogContent, Button } from '@mui/material';
import { styled } from '@mui/system';


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

interface ImportProps {
  open: boolean;
  onClose: () => void;
}

const ImportFile: React.FC<ImportProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ style: styles.dialogPaper }}>
      <DialogContent>
        <div className="dropArea">
          <div className="dropAreaLine" />
          <div className="uploadTextContainer">
            <p style={{paddingLeft: '5rem'}} className="uploadText largeText">Drag your file here</p>
            <p style={{paddingLeft: '5rem'}} className="uploadText smallText">or</p>
          </div>
          <Button variant="contained" color="primary" component="label" style={styles.uploadButton}>
            Upload
            <input type="file" style={{ display: 'none' }} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default styled(ImportFile)({});

export {}; // Add this empty export statement
