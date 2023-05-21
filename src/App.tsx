import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SnackbarContextProvider from './helpers/SnackbarContext';
import Topbar from './components/Topbar';
import { ThemeProvider } from '@mui/material/styles';
import { PaletteColorOptions, createTheme } from '@mui/material/styles';
import { Box, Button, Modal, Typography } from '@mui/material';
import './App.css';
import Home from './components/Home';
import ImportFile from './prompts/ImportFile';
import './styles/SupportStyles.css'
import Filepage from './pages/Filepage';


/* Customize default MUI theme */
declare module '@mui/material/styles' {
  interface PaletteOptions {
    tertiary?: PaletteColorOptions;

  }
}
const theme = createTheme({
  palette: {
    primary: {
      main: '#0E9EA7',
      contrastText: '#fff',
    },
    secondary: {
      main: "#71C887",
      contrastText: '#fff',
    },
    tertiary: {
      main: '#DCF1EC',
      contrastText: '#374248',
    },
  },
  
  typography: {
    fontFamily: [
      'inter',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  const [open, setOpen] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  const toggleDrawerOpen = () => {
    setOpen(!open);
  };

  const toggleUpload = () => {
    setShowUpload(!showUpload);
  };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };
  return (

    <ThemeProvider theme={theme}>
      <SnackbarContextProvider>
        <Router>
          {/* <Modal open={open} onClose={handleDrawerClose}>
            <Navbar open={open} handleDrawerClose={handleDrawerClose} />
          </Modal> */}
          <Topbar open={open} handleDrawerOpen={toggleDrawerOpen} />
          <Routes>
            {/* Add your routes here */}
            <Route index path="/" element={
            <div style={{marginTop:"50px"}}>
            <Modal open={showUpload} onClose={toggleUpload}>
              <div>
                <ImportFile toggleImport={toggleUpload}/>
              </div>  
            </Modal>
            <Box>
                <div>
                  <div>
                      <Home toggleImport={toggleUpload}/>
                  </div>
                </div>
            </Box>          
            </div>}/>
            <Route path="/file" element={
              <>
              <Filepage/>
              </>
            }/>
          </Routes>
        </Router>
      </SnackbarContextProvider>
    </ThemeProvider>
  );
}

export default App;