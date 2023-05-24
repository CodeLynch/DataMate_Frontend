import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SnackbarContextProvider from './helpers/SnackbarContext';
import Topbar from './components/Topbar';
import { ThemeProvider } from '@mui/material/styles';
import { PaletteColorOptions, createTheme } from '@mui/material/styles';
import { Backdrop, Box, Button, CircularProgress, Modal, Typography } from '@mui/material';
import './App.css';
import Home from './components/Home';
import ImportFile from './prompts/ImportFile';
import './styles/SupportStyles.css'
import Filepage from './pages/Filepage';
import SpecificTemplatePage from './pages/SpecificTemplatePage';
import Navbar from './components/Navbar';
import TemplatesPage from './pages/TemplatesPage';


/* Customize default MUI theme */
declare module '@mui/material/styles'{
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
  const [isLoading, setLoading] = useState(false);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  const toggleDrawerOpen = () => {
    setOpen(!open);
  };

  const toggleUpload = () => {
    setShowUpload(!showUpload);
  };

  const StartLoading = () => {
    setLoading(true)
  }

  const StopLoading = () => {
    setLoading(false)
  }
  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };
  return (

    <ThemeProvider theme={theme}>
      <SnackbarContextProvider>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
        open={isLoading}
        >
          <CircularProgress color="success" />
        </Backdrop>
        <Router>
          <Modal open={open} onClose={toggleDrawerOpen}>
           <Navbar open={open} handleDrawerClose={toggleDrawerOpen} />
          </Modal>
          <Topbar open={open} handleDrawerOpen={toggleDrawerOpen} />
            <Box sx={{ display: 'flex', marginTop: '50px' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Routes>
                  {/* Add your routes here */}
                  <Route path="/">
                    <Route
                      index
                      element={<>
                        <Modal open={showUpload} onClose={toggleUpload}>
                        <div>
                          <ImportFile toggleImport={toggleUpload} startLoading={StartLoading} />
                        </div>  
                        </Modal>
                        <Box>
                          <div>
                            <div>
                                <Home toggleImport={toggleUpload}/>
                            </div>
                          </div>
                      </Box>
                      </>
                      }
                    />
                  </Route>
                  <Route path="/template-one">
                    <Route
                      index
                      element={
                        <Box sx={{ padding: '1px' }}>
                          <SpecificTemplatePage/>
                        </Box>
                      }
                    />
                  </Route>
                  <Route path="/file" element={
                    <>
                    <Filepage stopLoading={StopLoading}/>
                    </>
                  }/>
                  <Route path="/templates">
                    <Route
                      index
                      element={
                        <Box sx={{ padding: '1px' }}>
                          <TemplatesPage/>
                        </Box>
                      }
                    />
                  </Route>
                  {/* Add your other routes here */}
                </Routes>
              </Box>
            </Box>
        </Router>
      </SnackbarContextProvider>
    </ThemeProvider>
  );
}

export default App;