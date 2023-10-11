import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import SnackbarContextProvider from "./helpers/SnackbarContext";
import Topbar from "./components/Topbar";
import { ThemeProvider } from "@mui/material/styles";
import { PaletteColorOptions, createTheme } from "@mui/material/styles";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import "./App.css";
import Home from "./components/Home";
import ImportFile from "./prompts/ImportFile";
import "./styles/SupportStyles.css";
import Filepage from "./pages/Filepage";
import SpecificTemplatePage from "./pages/SpecificTemplatePage";
import Navbar from "./components/Navbar";
import TemplatesPage from "./pages/TemplatesPage";
import FileScreenPage from "./pages/FileScreenPage";
import * as XLSX from "xlsx";
import DatabaseScreenPage from "./pages/DatabaseScreenPage";
import TableDetectPrompt from "./prompts/TableDetectPrompt";
import SelectTablePrompt from "./prompts/SelectTablePrompt";
import NoTablesDetectPrompt from "./prompts/NoTablesDetectPrompt";
import EmptyDetectPrompt from "./prompts/EmptyDetectPrompt";
import InconsistentDetectPrompt from "./prompts/InconsistentDetectPrompt";
import SuccessPrompt from "./prompts/SuccessPrompt";
import ProcessingPage from "./pages/ProcessingPage";
import DeleteProfile from "./components/DeleteProfile";
import NormalizePrompt from "./prompts/NormalizePrompt";
import DeletedFiles from "./components/DeletedFiles";
import Login from "./components/Login";
import FileScreen from "./components/FileScreen";
import FilePage from "./pages/FileScreenPage";
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
  //boolean state for normalized prompt
  const [NormalizeTable, setNormTable] = useState(false);
  //boolean state for import success prompt
  const [ImportSuccess, setSuccess] = useState(false);
  //number state for the numbers of table found in an uploaded file
  const [tableCount, setTableCount] = useState(0);
  //number state for the id of the current file uploaded
  const [uploadedFileId, setUploadedFileId] = useState(0);
  //workbook state for the current uploaded file
  const [workbook, setWB] = useState<XLSX.WorkBook | null>();
  //string array state for the sheetnames of the current uploaded file
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  //string array for the sheetnames of the sheets that are valid tables of the uploaded file
  const [visibleSheetNames, setVSheets] = useState<string[]>([]);
  //string array for the sheetnames of the sheets that have empty values
  const [SheetsWithEmpty, setSWE] = useState<string[]>([]);
  //string array for the sheetnames of the sheets that have inconsistent values
  const [IncSheets, setIS] = useState<string[]>([]);
  //string array for the sheetnames of the sheets to be normalized
  const [normSheets, setNS] = useState<string[]>([]);
  //object state for the sheet data of the uploaded file
  const [sheetData, setSData] = useState<Object>({});
  //number state for the index of the sheet to be displayed in select table
  const [sheetIndex, setSIndex] = useState(0);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  const toggleDrawerOpen = () => {
    setOpen(!open);
  };

  const toggleUpload = () => {
    setShowUpload(!showUpload);
  };

  const toggleTableDetect = (status: boolean) => {
    setTableDetect(status);
  };

  const toggleNoTableDetect = (status: boolean) => {
    setNoTableDetect(status);
  };

  const toggleEmptyDetect = (status: boolean) => {
    setEmptyDetect(status);
  };

  const toggleInconsistent = (status: boolean) => {
    setIncDetect(status);
  };

  const toggleImportSuccess = (status: boolean) => {
    setSuccess(status);
  };

  const toggleSelect = (status: boolean, sheetIndex: number) => {
    setSIndex(sheetIndex);
    setSelect(status);
  };

  const toggleNormalized = (status: boolean) => {
    setNormTable(status);
  };

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
  };

  const StopProcessing = () => {
    setProcessing(false);
  };

  const setTblCount = (count: number) => {
    setTableCount(count);
  };

  const setFileId = (id: number) => {
    setUploadedFileId(id);
  };

  const setFileData = (
    wb: XLSX.WorkBook | null,
    sheets: string[],
    vsheets: string[],
    sheetdata: object
  ) => {
    setWB(wb);
    setSheetNames(sheets);
    setVSheets(vsheets);
    setSData(sheetdata);
  };

  const updateEmptyList = (sheet: string) => {
    SheetsWithEmpty.push(sheet);
  };

  const updateIncList = (sheet: string) => {
    IncSheets.push(sheet);
  };

  const updateNormList = (sheet: string) => {
    normSheets.push(sheet);
  };

  const updateSheetData = (sheet: Object) => {
    setSData(sheet);
  };

  const updateWorkbook = (workbook: XLSX.WorkBook) => {
    setWB(workbook);
  };

  const resetVariables = () => {
    setSWE([]);
    setIS([]);
    setNS([]);
    setTableDetect(false);
    setIncDetect(false);
    setNoTableDetect(false);
  };

  useEffect(() => {
    resetVariables();
  }, []);

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
                            <ImportFile
                              toggleImport={toggleUpload}
                              startLoading={StartLoading}
                              setFileId={setFileId}
                            />
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
                <Route
                  path="/processing"
                  element={
                    <>
                      <Backdrop
                        sx={{
                          color: "#FFFFFF",
                          zIndex: (theme) => theme.zIndex.modal - 1,
                          marginTop: "4rem",
                          position: "fixed",
                          width: "100%",
                          height: "100%",
                        }}
                        open={isProcessing}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <CircularProgress size="10rem" color="success" />
                          <h1>Processing data...</h1>
                        </div>
                      </Backdrop>

                      {
                        //modal for detect tables here
                      }
                      <Modal
                        open={TableDetect}
                        onClose={() => {
                          toggleTableDetect(false);
                        }}
                      >
                        <div>
                          <TableDetectPrompt
                            toggleNormalized={toggleNormalized}
                            toggleTableDetect={toggleTableDetect}
                            toggleSelect={toggleSelect}
                            toggleEmptyDetect={toggleEmptyDetect}
                            toggleInconsistentDetect={toggleInconsistent}
                            toggleImportSuccess={toggleImportSuccess}
                            tblCount={tableCount}
                            fileId={uploadedFileId}
                            vsheets={visibleSheetNames}
                            sheetdata={sheetData}
                            updateEmpty={updateEmptyList}
                            updateInc={updateIncList}
                            updateSData={updateSheetData}
                            updateNorm={updateNormList}
                            emptySheets={SheetsWithEmpty}
                            incSheets={IncSheets}
                            normSheets={normSheets}
                            reset={resetVariables}
                            wb={workbook}
                          />
                        </div>
                      </Modal>

                      {
                        //modal for select tables here
                      }
                      <Modal
                        open={SelectTable}
                        onClose={() => {
                          toggleSelect(false, 0);
                        }}
                      >
                        <div>
                          <SelectTablePrompt
                            toggleNormalized={toggleNormalized}
                            toggleSelect={toggleSelect}
                            toggleTableDetect={toggleTableDetect}
                            toggleEmptyDetect={toggleEmptyDetect}
                            toggleInconsistentDetect={toggleInconsistent}
                            toggleImportSuccess={toggleImportSuccess}
                            tblCount={tableCount}
                            fileId={uploadedFileId}
                            vsheets={visibleSheetNames}
                            sheetdata={sheetData}
                            updateEmpty={updateEmptyList}
                            updateInc={updateIncList}
                            updateSData={updateSheetData}
                            emptySheets={SheetsWithEmpty}
                            incSheets={IncSheets}
                            reset={resetVariables}
                            wb={workbook}
                            sheetIndex={sheetIndex}
                            normSheets={normSheets}
                            updateNorm={updateNormList}
                          />
                        </div>
                      </Modal>

                      {/* modal for no tables detected here  */}
                      <Modal open={NoTableDetect} onClose={toggleNoTableDetect}>
                        <div>
                          <NoTablesDetectPrompt
                            toggleNoTable={toggleUpload}
                            fileId={uploadedFileId}
                            reset={resetVariables}
                          />
                        </div>
                      </Modal>

                      {/* modal for normalize tables here  */}
                      <Modal open={NormalizeTable} onClose={toggleUpload}>
                        <div>
                          <NormalizePrompt
                            toggleNormalized={toggleNormalized}
                            toggleEmptyDetect={toggleEmptyDetect}
                            toggleInconsistentDetect={toggleInconsistent}
                            toggleImportSuccess={toggleImportSuccess}
                            fileId={uploadedFileId}
                            vsheets={visibleSheetNames}
                            sheetdata={sheetData}
                            updateSData={updateSheetData}
                            updateWB={updateWorkbook}
                            reset={resetVariables}
                            workbook={workbook}
                            normList={normSheets}
                            inclist={IncSheets}
                            sheets={sheetNames}
                          />
                        </div>
                      </Modal>

                      <Modal
                        open={EmptyDetect}
                        onClose={() => {
                          toggleEmptyDetect(false);
                        }}
                      >
                        <div>
                          <EmptyDetectPrompt
                            toggleNormalized={toggleNormalized}
                            toggleEmptyDetect={toggleEmptyDetect}
                            toggleInconsistentDetect={toggleInconsistent}
                            toggleImportSuccess={toggleImportSuccess}
                            fileId={uploadedFileId}
                            workbook={workbook}
                            sheets={sheetNames}
                            vsheets={visibleSheetNames}
                            sheetdata={sheetData}
                            emptylist={SheetsWithEmpty}
                            reset={resetVariables}
                            inclist={IncSheets}
                            updateSData={updateSheetData}
                            normSheets={normSheets}
                          />
                        </div>
                      </Modal>

                      <Modal
                        open={InconsistentDetect}
                        onClose={() => {
                          toggleInconsistent(false);
                        }}
                      >
                        <div>
                          <InconsistentDetectPrompt
                            toggleNormalized={toggleNormalized}
                            toggleInconsistentDetect={toggleInconsistent}
                            toggleImportSuccess={toggleImportSuccess}
                            fileId={uploadedFileId}
                            workbook={workbook}
                            sheets={sheetNames}
                            vsheets={visibleSheetNames}
                            sheetdata={sheetData}
                            reset={resetVariables}
                            inclist={IncSheets}
                            updateSData={updateSheetData}
                            normSheets={normSheets}
                          />
                        </div>
                      </Modal>

                      <Modal
                        open={ImportSuccess}
                        onClose={() => {
                          toggleImportSuccess(false);
                        }}
                      >
                        <div>
                          <SuccessPrompt
                            toggleImportSuccess={toggleImportSuccess}
                            fileId={uploadedFileId}
                            reset={resetVariables}
                            workbook={workbook}
                            sdata={sheetData}
                          />
                        </div>
                      </Modal>

                      <ProcessingPage
                        stopLoading={StopLoading}
                        startProcessing={StartProcessing}
                        toggleTable={toggleTableDetect}
                        toggleNoTable={toggleNoTableDetect}
                        setTblCount={setTblCount}
                        setFileData={setFileData}
                        reset={resetVariables}
                      />
                    </>
                  }
                />
                <Route path="/template/1">
                  <Route
                    index
                    element={
                      <Box sx={{ padding: "1px" }}>
                        <SpecificTemplatePage />
                      </Box>
                    }
                  />
                </Route>
                <Route
                  path="/file"
                  element={
                    <>
                      <Filepage stopLoading={StopLoading} />
                    </>
                  }
                />
                <Route path="/template/" element={<SpecificTemplatePage />} />
                <Route
                  path="/file/"
                  element={<Filepage stopLoading={StopLoading} />}
                />
                <Route path="/templates" element={<TemplatesPage />} />
                <Route
                  path="/files"
                  element={<FileScreenPage setFileId={setFileId} />}
                />

                <Route path="/databases" element={<DatabaseScreenPage />} />
                <Route path="/delete-profile/:id" element={<DeleteProfile />} />
                <Route path="/deleted-files" element={<DeletedFiles />} />
                <Route path="/log-in" element={<Login />} />

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
