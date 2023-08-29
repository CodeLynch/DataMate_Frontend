import React, { useEffect, useState } from 'react';
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
import FileScreenPage from './pages/FileScreenPage';
import * as XLSX from 'xlsx';
import DatabaseScreenPage from './pages/DatabaseScreenPage';

/* Customize default MUI theme */
declare module "@mui/material/styles" {
  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#0E9EA7",
      contrastText: "#fff",
    },
    secondary: {
      main: "#71C887",
      contrastText: "#fff",
    },
    tertiary: {
      main: "#DCF1EC",
      contrastText: "#374248",
    },
  },

  typography: {
    fontFamily: ["inter", "sans-serif"].join(","),
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
  //boolean state for select tables prompt
  const [SelectTable, setSelect] = useState(false);
  //boolean state for no tables detected prompt
  const [NoTableDetect, setNoTableDetect] = useState(false);
  //boolean state for empty values in tables prompt
  const [EmptyDetect, setEmptyDetect] = useState(false);
  //boolean state for empty values in tables prompt
  const [InconsistentDetect, setIncDetect] = useState(false);
  //boolean state for import success prompt
  const [ImportSuccess, setSuccess] = useState(false);
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
  //string array for the sheetnames of the sheets that have empty values
  const [SheetsWithEmpty, setSWE] = useState<string[]>([])
  //string array for the sheetnames of the sheets that have inconsistent values
  const [IncSheets, setIS] = useState<string[]>([])
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

  const toggleTableDetect = (status:boolean) =>{
    setTableDetect(status);
  }

  const toggleNoTableDetect = (status:boolean) =>{
    setNoTableDetect(status);
  }

  const toggleEmptyDetect = (status:boolean) =>{
    setEmptyDetect(status);
  }

  const toggleInconsistent = (status:boolean) =>{
    setIncDetect(status);
  }

  const toggleImportSuccess = (status:boolean) =>{
    setSuccess(status);
  }

  const toggleSelect = (status:boolean) =>{
    setSelect(status);
  }

  const StartLoading = () => {
    setLoading(true);
  };

  const StopLoading = () => {
    setLoading(false);
  };

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

  const updateEmptyList = (sheet:string) => {
    SheetsWithEmpty.push(sheet)
  }

  const updateIncList = (sheet:string) => {
    IncSheets.push(sheet)
  }

  const updateSheetData = (sheet:Object) => {
    setSData(sheet)
  }

  const resetVariables = () => {
    setSWE([]);
    setIS([]);
    setTableDetect(false);
    setIncDetect(false);
    setNoTableDetect(false);
  }

  useEffect(()=>{
    resetVariables();
  },[])

  return (
    <ThemeProvider theme={theme}>
      <SnackbarContextProvider>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
          open={isLoading}
        >
          <CircularProgress color="success" />
        </Backdrop>
        <Router>
          <Modal open={open} onClose={toggleDrawerOpen}>
            <Navbar open={open} handleDrawerClose={toggleDrawerOpen} />
          </Modal>
          <Topbar open={open} handleDrawerOpen={toggleDrawerOpen} />
          <Box sx={{ display: "flex", marginTop: "50px" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Routes>
                {/* Add your routes here */}
                <Route path="/">
                  <Route
                    index
                    element={
                      <>
                        <Modal open={showUpload} onClose={toggleUpload}>
                        <div>
                          <ImportFile toggleImport={toggleUpload} startLoading={StartLoading} setFileId={setFileId} />
                        </div>  
                        </Modal>
                        <Box>
                          <div>
                            <div>
                              <Home toggleImport={toggleUpload} />
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
                  <Route path="/file" element={
                    <>
                      <Filepage stopLoading={StopLoading} />
                    </>
                  }
                />
                <Route path="/templates">
                  <Route
                    index
                    element={
                      <Box sx={{ padding: "1px" }}>
                        <TemplatesPage />
                      </Box>
                    }
                  />
                </Route>
                <Route path="/files">
                  <Route
                    index
                    element={
                      <Box sx={{ padding: "1px" }}>
                        <FileScreenPage />
                      </Box>
                    }
                  />
                </Route>
                <Route path="/databases">
                  <Route
                    index
                    element={
                      <Box sx={{ padding: "1px" }}>
                        <DatabaseScreenPage />
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
