import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import InputAdornment from "@mui/material/InputAdornment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid, GridColDef, enUS } from "@mui/x-data-grid";
import RestoreIcon from "@mui/icons-material/Restore";
import { FileEntity } from "../api/dataTypes";
import FileService from "../api/FileService";
import { useNavigate } from "react-router-dom";


export default function DeletedFiles() {
  const [isLabelShrunk, setIsLabelShrunk] = useState(false);
  const [sort, setSort] = React.useState("");
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [restoreError, setRestoreError] = useState<string>("");
  const [deleteError, setDeleteError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [deletedFiles, setDeletedFiles] = useState<FileEntity[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<FileEntity[]>([]);
  const nav = useNavigate();

  const customLocaleText = {
    ...enUS,
    noRowsLabel: "No files",
  };


  const theme = useTheme();
  const isNotXsScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  const handleTextFieldFocus = () => {
    setIsLabelShrunk(true);
  };

  const handleTextFieldBlur = (event: any) => {
    if (!event.target.value) {
      setIsLabelShrunk(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchDeletedFiles = async () => {
      const userId = 1; // to be changed
      try {
        const files = await FileService.getDeletedFilesById(userId);
        setDeletedFiles(files);
      } catch (error) {
        console.error("Error fetching deleted files:", error);
      }
    };

    fetchDeletedFiles();
  }, []);

 // hook for search function
  useEffect(() => {
    const filteredFiles = deletedFiles.filter((file) =>
      file.fileName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFiles(filteredFiles);
  }, [searchQuery, filteredFiles]);
  

  const handleCheckboxDeleteChange = (event: any) => {
    const value = event.target.value;

    if (selectedOption === value) {
      setSelectedOption("");
    } else {
      setSelectedOption(value);

      // open dialog when Delete Forever is selected
      if (value === "delete") {
        if (selectedRows.length > 0) {
          setDeleteError("");
          handleDeleteDialogOpen();
        } else {
          setDeleteError("Please select a file first.");
          setSelectedOption("");
        }
      } else {
        setDeleteError("");
      }
    }
  };

  const handleCheckboxRestoreChange = (event: any) => {
    const value = event.target.value;

    if (selectedOption === value) {
      setSelectedOption("");
    } else {
      setSelectedOption(value);

      // open dialog when Restore is selected
      if (value === "restore") {
        if (selectedRows.length > 0) {
          setRestoreError("");
          setIsRestoreDialogOpen(true);
        } else {
          setRestoreError("Please select a file first.");
          setSelectedOption("");
        }
      } else {
        setRestoreError("");
      }
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  // for grid
  const columns: GridColDef[] = [
    {
      field: "fileName",
      headerName: "File Name",
      width: 1250,
      renderCell: (params) => <div>{params.row.fileName}</div>,
    },
    {
      field: "restore",
      headerName: "",
      width: 50,
      sortable: false,
      renderCell: (params) => (
        <div>
          <RestoreIcon
          sx={{ color: "#14847C", cursor: "pointer" }}
          onClick={() => handleRestore(params.row.fileId)}
        />
        </div>
      ),
      disableColumnMenu: true,
    },
    {
      field: "latestDateModified",
      headerName: "Latest Date Modified",
      width: 150,
      type: "date",
      valueGetter: (params) => {
        const dateString = params.row.latestDateModified;
        if (dateString) {
          const dateParts = dateString.split("-");
          if (dateParts.length === 3) {
            const year = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1;
            const day = parseInt(dateParts[2], 10);
            return new Date(year, month, day);
          }
        }
        return null;
      },
    },
  ];

  // for grid responsiveness
  const themeInstance = useTheme();
  //   const matchesXS = useMediaQuery(themeInstance.breakpoints.down('xs'));
  const matchesSM = useMediaQuery(themeInstance.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(themeInstance.breakpoints.down("md"));
  const matchesLG = useMediaQuery(themeInstance.breakpoints.down("lg"));
  const matchesXL = useMediaQuery(themeInstance.breakpoints.down("xl"));

  if (matchesXL) {
    columns[0].width = 1250; // width for xl screens
    columns[2].width = 150;
  }

  if (matchesLG) {
    columns[0].width = 850; // width for lg screens
    columns[2].width = 150;
  }

  if (matchesMD) {
    columns[0].width = 600; // width for md screens
    columns[2].width = 100;
  }

  if (matchesSM) {
    columns[0].width = 280; // width for sm screens
    columns[2].width = 100;
  }

  // const [deletedFiles, setDeletedFiles] = useState<FileEntity[]>([]);
  const getRowId = (row: any) => row.fileId;

  const rowHeight = 50;
  const additionalHeight = 40;

  const calculateDataGridHeight = () => {
    const headerHeight = 56;
    const paginationHeight = 40;
    const numberOfRows = deletedFiles.length;

    return (
      headerHeight +
      numberOfRows * rowHeight +
      paginationHeight +
      additionalHeight
    );
  };

  const handleRestoreDialogClose = () => {
    setIsRestoreDialogOpen(false);
  };

  const handleDeleteDialogOpen = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      const deleteResults = await Promise.all(
        selectedRows.map(async (id) => {
          const result = await FileService.permanentDeleteFile(parseInt(id));
          return { id, result };
        })
      );

      setDeletedFiles((prevDeletedFiles) =>
        prevDeletedFiles.filter(
          (file) => !selectedRows.includes(file.fileId.toString())
        )
      );

      setSelectedRows([]);
      setSelectedOption("");

      setIsDeleteDialogOpen(false);
    }
  };

  const handleRestore = async (fileId:any) => {
    const userId = 1; // to be changed
    if (selectedRows.length > 0) {
      const restoreResults = await Promise.all(
        selectedRows.map(async (id) => {
          const result = await FileService.restoreFile(parseInt(id));
          return { id, result };
        })
      );

      const successfulRestorations = restoreResults.filter(
        (r) => r.result === "File restored successfully"
      );
      const failedRestorations = restoreResults.filter(
        (r) => r.result !== "File restored successfully"
      );

      if (successfulRestorations.length > 0) {
        const files = await FileService.getDeletedFilesById(userId);
        setDeletedFiles(files);

        setSelectedRows([]);
        setSelectedOption("");

        console.log("Files restored successfully:", successfulRestorations);
      }

      if (failedRestorations.length > 0) {
        console.error("Failed to restore files:", failedRestorations);
      }

      handleRestoreDialogClose();
      
    }
  };
  

  return (
    <div>
      <Box m={4}>
        <Stack direction="row">
          <ArrowBackIosNewIcon sx={{ fontSize: '30px', color: '#374248', cursor: 'pointer', mr: 2, mt: .8 }} onClick={() => { nav('/files'); }}/>
          <Typography variant="h4" fontWeight="bold" color="#374248">
            {/* {" "} */}
            Deleted Files
          </Typography>
        </Stack>
      </Box>
      <Stack direction="row" mx={4}>
        <Grid container>
          <Grid item xs={15} sm={11} md={11}>
            <TextField
              id="outlined-search"
              label="Search"
              type="search"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: isLabelShrunk,
                sx: { ml: isLabelShrunk ? 0 : 4 },
              }}
              onFocus={handleTextFieldFocus}
              onBlur={handleTextFieldBlur}
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
                borderRadius: "20px",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                width: "100%",
              }}
            />
          </Grid>
        </Grid>
        {isNotXsScreen ? (
          <>
            <Grid container mr={1}>
              <Grid item md={12}>
                <Stack direction="row" spacing={2}>
                  <FormControlLabel
                    value="delete"
                    control={<Checkbox />}
                    label="Delete Forever"
                    labelPlacement="end"
                    checked={selectedOption === "delete"}
                    onChange={handleCheckboxDeleteChange}
                  />
                  <FormControlLabel
                    value="restore"
                    control={<Checkbox />}
                    label="Restore Files"
                    labelPlacement="end"
                    checked={selectedOption === "restore"}
                    onChange={handleCheckboxRestoreChange}
                  />
                </Stack>
                <Typography variant="body2" color="error">
                  {deleteError || restoreError}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
            </Grid>
          </>
        ) : (
          <Box mt={1}>
            {" "}
            {/* with menu icon for xs screens */}
            <Grid container>
              <IconButton onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
              >
                <MenuItem>
                  <FormControlLabel
                    value="delete"
                    control={<Checkbox />}
                    label="Delete Forever"
                    labelPlacement="end"
                    checked={selectedOption === "delete"}
                    onChange={handleCheckboxDeleteChange}
                  />
                </MenuItem>
                <MenuItem>
                  <FormControlLabel
                    value="restore"
                    control={<Checkbox />}
                    label="Restore Files"
                    labelPlacement="end"
                    checked={selectedOption === "restore"}
                    onChange={handleCheckboxRestoreChange}
                  />
                </MenuItem>
                <Typography variant="body2" color="error" ml={2}>
                  {deleteError || restoreError}
                </Typography>
              </Menu>
            </Grid>
          </Box>
        )}
      </Stack>

      <br />
      <br />
      <Box
        sx={{
          height: calculateDataGridHeight(),
          width: "100%",
        }}
      >
        <DataGrid
          rows={filteredFiles}
          columns={columns}
          getRowId={(row) => row.fileId}
          isRowSelectable={(params) => true}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20, 30, 50]}
          checkboxSelection
          // rowSelectionModel={selectedRows}
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection.map((id) => id.toString()));
          }}
          disableRowSelectionOnClick
          localeText={customLocaleText}
        />
      </Box>
      
      {/* for restore and delete prompt */}
      <Dialog
      open={isRestoreDialogOpen}
      onClose={handleRestoreDialogClose}
      aria-labelledby="restore-dialog-title"
      aria-describedby="restore-dialog-description"
    >
      <DialogTitle id="restore-dialog-title">Restore Files</DialogTitle>
      <DialogContent>
        <DialogContentText id="restore-dialog-description">
          Are you sure you want to restore these files?
        </DialogContentText>

        {/* display selected files for restore */}
        {selectedRows.length > 0 && (
          <div>
            <Typography fontSize='13px' mt={2}>Selected Files:</Typography>
            <ul style={{ fontSize: '15px' }}>
              {selectedRows.map((fileId) => {
                const selectedFile = deletedFiles.find(
                  (file) => file.fileId.toString() === fileId
                );
                if (selectedFile) {
                  return (
                    <li key={selectedFile.fileId}>{selectedFile.fileName}</li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        )}
       
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRestoreDialogClose} color="primary">
          Back
        </Button>
        <Button onClick={handleRestore} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>


    <Dialog
      open={isDeleteDialogOpen}
      onClose={handleDeleteDialogClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">Delete Forever</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Are you sure you want to delete these files?
        </DialogContentText>

        {/* display selected files for delete */}
        {selectedRows.length > 0 && (
          <div>
            <Typography fontSize='13px' mt={2}>Selected Files:</Typography>
            <ul style={{ fontSize: '15px' }}>
              {selectedRows.map((fileId) => {
                const selectedFile = deletedFiles.find(
                  (file) => file.fileId.toString() === fileId
                );
                if (selectedFile) {
                  return (
                    <li key={selectedFile.fileId}>{selectedFile.fileName}</li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        )}

      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteDialogClose} color="primary">
          Back
        </Button>
        <Button onClick={handleDelete} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>

    </div>
  );
}
