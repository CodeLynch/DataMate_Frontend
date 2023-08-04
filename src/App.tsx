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
import ProcessingPage from './pages/ProcessingPage';
import TableDetectPrompt from './prompts/TableDetectPrompt';
import * as XLSX from 'xlsx'


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
  //boolean state for sidebar
  const [open, setOpen] = useState(false);
  //boolean state for upload prompt
  const [showUpload, setShowUpload] = useState(false);
  //boolean state for page loading
  const [isLoading, setLoading] = useState(false);
  //boolean state for processing files
  const [isProcessing, setProcessing] = useState(false);
  //boolean state for tables detected prompt
  const [TableDetect, setTableDetect] = useState(false);
  //boolean state for no tables detected prompt
  const [NoTableDetect, setNoTableDetect] = useState(false);
  //number state for the numbers of table found in an uploaded file
  const [tableCount, setTableCount] = useState(0);
  //number state for the id of the current file uploaded
  const [uploadedFileId, setUploadedFileId] = useState(0);
  //workbook state for the current uploaded file
  const [workbook, setWB] = useState<XLSX.WorkBook | null>()
  //string array state for the sheetnames of the current uploaded file
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  //string array for the sheetnames of the sheets that are valid tables of the uploaded file
  const [visibleSheetNames, setVSheets] = useState<string[]>([]);
  //object state for the sheet data of the uploaded file
  const [sheetData, setSData] = useState<Object>({});


  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  const toggleDrawerOpen = () => {
    setOpen(!open);
  };

  const toggleUpload = () => {
    setShowUpload(!showUpload);
  };

  const toggleTableDetect = () =>{
    setTableDetect(!TableDetect);
  }

  const toggleNoTableDetect = () =>{
    setNoTableDetect(!NoTableDetect);
  }


  const StartLoading = () => {
    setLoading(true)
  }

  const StopLoading = () => {
    setLoading(false)
  }

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  const StartProcessing = () => {
    setProcessing(true);
  }

  const StopProcessing = () => {
    setProcessing(false);
  }

  const setTblCount = (count:number) =>{
    setTableCount(count);
  }

  const setFileId = (id:number) => {
    setUploadedFileId(id);
  }

  const setFileData = (wb: XLSX.WorkBook | null, sheets:string[], vsheets:string[] ,sheetdata: object ) =>{
    setWB(wb);
    setSheetNames(sheets);
    setVSheets(vsheets);
    setSData(sheetdata);
  }

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
                          <ImportFile toggleImport={toggleUpload} startLoading={StartLoading} setFileId={setFileId} />
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
                  <Route path="/template/1">
                    <Route
                      index
                      element={
                        <Box sx={{ padding: '1px' }}>
                          <SpecificTemplatePage/>
                        </Box>
                      }
                    />
                  </Route>
                  <Route path="/processing" element={
                    <>
                    <Backdrop
                    sx={{ color: '#FFFFFF', zIndex: (theme) => theme.zIndex.modal - 1,
                    marginTop:"4rem",
                    position: 'fixed',
                    width: '100%',
                    height:'100%',}}
                    open={isProcessing}
                    >
                      <div style={{display: 'flex', flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                        <CircularProgress size="10rem" 
                          color="success" />
                        <h1>Processing data...</h1>
                      </div>
                    </Backdrop>

                    {//modal for detect tables here
                    //pls re-add onClose={toggleTableDetect} if table prompts should be closed when clicking outside
                    } 
                    <Modal open={TableDetect} >
                    <div>
                      <TableDetectPrompt 
                      toggleTableDetect={toggleTableDetect} 
                      tblCount={tableCount} 
                      fileId={uploadedFileId}
                      workbook={workbook}
                      sheets={sheetNames}
                      vsheets={visibleSheetNames}
                      sheetdata={sheetData}
                      />
                    </div>  
                    </Modal>

                    {/* modal for no tables detected here 
                    <Modal open={showUpload} onClose={toggleUpload}>
                    <div>
                      <ImportFile toggleImport={toggleUpload} startLoading={StartLoading} />
                    </div>  
                    </Modal> */}

                    {/* modal for split tables detected here 
                    <Modal open={showUpload} onClose={toggleUpload}>
                    <div>
                      <ImportFile toggleImport={toggleUpload} startLoading={StartLoading} />
                    </div>  
                    </Modal> */}
                    <ProcessingPage stopLoading={StopLoading} startProcessing={StartProcessing}
                    toggleTable={toggleTableDetect}
                    toggleNoTable={toggleNoTableDetect}
                    setTblCount={setTblCount}
                    setFileData={setFileData}/>
                    </>
                  }
                  />
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