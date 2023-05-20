import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import { styled } from '@mui/system';

const DropArea = styled('div')(({ theme }) => ({
  border: '2px dashed black',
  padding: 16,
  textAlign: 'center',
  position: 'relative',
  backgroundColor: theme.palette.tertiary.main,
}));

const DashLine = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  border: '2px dashed black',
  pointerEvents: 'none',
  top: 0,
  left: 0,
});

interface ImportProps {
  open: boolean;
  onClose: () => void;
}

const ImportFile: React.FC<ImportProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DropArea>
          <DashLine />
          <p>Drag your file here</p>
          <Button variant="contained" color="primary" component="label">
            Upload
            <input type="file" style={{ display: 'none' }} />
          </Button>
        </DropArea>
      </DialogContent>
    </Dialog>
  );
};

export default ImportFile;
