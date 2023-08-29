import React, { useState, useEffect } from "react";
import trashBinImage from "../images/Trashbin.png";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Drawer,
  Grid,
  Box,
  Stack,
  IconButton,
  SelectChangeEvent,
  Link,
} from "@mui/material";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const FileList: React.FC<{}> = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const files = [
    {
      id: "1",
      name: "file1.xlsx",
      thumbnailUrl:
        "https://www.cleverducks.com/wp-content/uploads/2018/01/Excel-Icon-1024x1024.png",
      lastModified: "07-24-2023",
    },
    {
      id: "2",
      name: "file2.xlsx",
      thumbnailUrl:
        "https://www.cleverducks.com/wp-content/uploads/2018/01/Excel-Icon-1024x1024.png",
      lastModified: "07-24-2023",
    },
    {
      id: "17eKuW",
      name: "3minVideo- Mariel Genodiala.mp4",
      thumbnailUrl:
        "https://lh3.google.com/u/0/d/17eKuWffSREjjJWVIgoSrvB0icBBIcByh=w494-h370-p-k-nu-iv3",
      lastModified: "07-24-2023",
    },
    {
      id: "4",
      name: "file4.xlsx",
      thumbnailUrl:
        "https://www.cleverducks.com/wp-content/uploads/2018/01/Excel-Icon-1024x1024.png",
      lastModified: "07-24-2023",
    },
    {
      id: "vB0icBBIcByh",
      name: "3minVideo- Mariel Genodiala.mp4",
      thumbnailUrl:
        "https://lh3.google.com/u/0/d/17eKuWffSREjjJWVIgoSrvB0icBBIcByh=w494-h370-p-k-nu-iv3",
    },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All");
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedMenuOption, setSelectedMenuOption] = useState("");

  //Sort by
  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  //file menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleIconButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleOptionSelectPop = (option: string) => {
    setSelectedMenuOption(option);
    handlePopoverClose();
  };

  const isPopoverOpen = Boolean(anchorEl);

  //smallscreen menu
  const [anchorE2, setAnchorE2] = useState<null | HTMLElement>(null);
  const [selectedOptionPopMenu, setSelectedOptionPopMenu] = useState("All");
  const open = Boolean(anchorE2);

  const handleOptionSelectPopMenu = (option: string) => {
    setSelectedOptionPopMenu(option);
    setAnchorE2(null);
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorE2(event.currentTarget);
  };

  const handlePopoverCloseE2 = () => {
    setAnchorE2(null);
  };

  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const toggleAdditionalButtons = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setShowAdditionalButtons(!showAdditionalButtons);
  };

  return (
    <Grid
      paddingLeft={{ lg: 2, xl: 2 }}
      style={{
        paddingTop: "5rem",
        width: "100%",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <section>
        <Grid
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Grid
            padding={{ xs: "5px", sm: "5px", lg: "20px", xl: "20px" }}
            style={{
              display: "flex",
              alignItems: "center",
              flex: 1, // Set flex to 0.5 for half width
              borderRadius: "40px",
              height: "30px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "40px",
                background: "#fff",
              }}
            >
              <SearchIcon style={{ fontSize: "24px", color: "gray" }} />
            </div>
            <input
              style={{
                fontSize: "20px",
                border: "none",
                outline: "none",
                boxShadow: "none",
                paddingBottom: "5px",
              }}
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
          </Grid>
          {isLargeScreen && (
            <Link underline="none" href="/home" color={"black"}>
              <IconButton
                style={{
                  marginLeft: "24px",
                  fontSize: "20px",
                }}
              >
                <AddCircleIcon
                  style={{ height: "30", width: "30", color: "green" }}
                />
                <span style={{ color: "black", marginLeft: "12px" }}>New</span>
              </IconButton>
            </Link>
          )}
          {isLargeScreen && (
            <IconButton
              style={{
                marginLeft: "24px",
                fontSize: "20px",
              }}
            >
              <img
                src={trashBinImage}
                alt="Bin"
                style={{ width: "28px", height: "28px", marginRight: "12px" }}
              />
              <span style={{ color: "black" }}>Bin</span>
            </IconButton>
          )}
          {isLargeScreen && (
            <Link underline="none" href="/" color={"black"}>
              <IconButton
                style={{
                  marginLeft: "24px",
                  fontSize: "20px",
                }}
              >
                <span style={{ color: "black" }}>Activity Log</span>
              </IconButton>
            </Link>
          )}
          {isLargeScreen && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  color: "#000",
                  marginRight: "12px",
                  marginLeft: "15px",
                  fontSize: "20px",
                }}
              >
                Sort by:
              </span>
              <FormControl>
                <div
                  onClick={handleDropdownToggle}
                  style={{
                    background: "#71C887",
                    borderRadius: "4px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    padding: "8px 16px",
                    width: "fit-content", // Add this line to adjust the width
                  }}
                >
                  <span
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      marginRight: "8px",
                    }}
                  >
                    {selectedOption}
                  </span>
                  <KeyboardArrowDownIcon
                    style={{ fontSize: "20px", color: "#fff" }}
                  />
                </div>
                {isDropdownOpen && (
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: "4px",
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      marginTop: "8px",
                      padding: "8px",
                      fontSize: "20px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Add a shadow for better visibility
                    }}
                  >
                    <MenuItem
                      onClick={() => handleOptionSelect("All")}
                      style={{ cursor: "pointer", color: "#000" }}
                    >
                      All
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleOptionSelect("Date")}
                      style={{ cursor: "pointer", color: "#000" }}
                    >
                      Date
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleOptionSelect("Size")}
                      style={{ cursor: "pointer", color: "#000" }}
                    >
                      Size
                    </MenuItem>
                  </div>
                )}
              </FormControl>
              <Button
                style={{
                  marginLeft: "24px",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  color: "red",
                  fontSize: "10px",
                }}
              >
                Clear Filter
              </Button>
            </div>
          )}
          {/* <div style={{ textAlign: "left" }}>
            {window.innerWidth <= 768 && (
              <button
                style={{
                  paddingLeft: "16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={toggleAdditionalButtons}
              >
                <MoreVertIcon
                  style={{ fill: "green", width: "1em", height: "1em" }}
                />
              </button>
            )}
            <Drawer
              anchor="bottom"
              open={showAdditionalButtons}
              onClose={toggleAdditionalButtons}
            >
              <Stack
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <IconButton
                  style={{
                    marginLeft: "24px",
                    marginTop: "20px",
                    fontSize: "20px",
                  }}
                >
                  <AddCircleIcon
                    style={{ height: "30", width: "30", color: "green" }}
                  />
                  <span style={{ color: "black", marginLeft: "12px" }}>
                    New
                  </span>
                </IconButton>
                <IconButton
                  style={{
                    marginLeft: "24px",
                    fontSize: "20px",
                  }}
                >
                  <img
                    src={trashBinImage}
                    alt="Bin"
                    style={{
                      width: "28px",
                      height: "28px",
                      marginRight: "12px",
                    }}
                  />
                  <span style={{ color: "black" }}>Bin</span>
                </IconButton>
                <IconButton
                  style={{
                    marginLeft: "24px",
                    fontSize: "20px",
                  }}
                >
                  <span style={{ color: "black" }}>Activity Log</span>
                </IconButton>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      color: "#000",
                      marginRight: "12px",
                      marginLeft: "28px",
                      fontSize: "20px",
                    }}
                  >
                    Sort by:
                  </span>
                  <FormControl>
                    <div
                      onClick={handleDropdownToggle}
                      style={{
                        background: "#71C887",
                        borderRadius: "4px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        padding: "8px 16px",
                        width: "fit-content", // Add this line to adjust the width
                      }}
                    >
                      <span
                        style={{
                          color: "#fff",
                          fontWeight: "bold",
                          marginRight: "8px",
                        }}
                      >
                        {selectedOption}
                      </span>
                      <KeyboardArrowDownIcon
                        style={{ fontSize: "20px", color: "#fff" }}
                      />
                    </div>
                    {isDropdownOpen && (
                      <div
                        style={{
                          background: "#fff",
                          borderRadius: "4px",
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          marginTop: "8px",
                          padding: "8px",
                          fontSize: "20px",
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Add a shadow for better visibility
                        }}
                      >
                        <MenuItem
                          onClick={() => handleOptionSelect("All")}
                          style={{ cursor: "pointer", color: "#000" }}
                        >
                          All
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleOptionSelect("Date")}
                          style={{ cursor: "pointer", color: "#000" }}
                        >
                          Date
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleOptionSelect("Size")}
                          style={{ cursor: "pointer", color: "#000" }}
                        >
                          Size
                        </MenuItem>
                      </div>
                    )}
                  </FormControl>
                </div>
                <Button
                  style={{
                    marginLeft: "24px",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    color: "red",
                    fontSize: "10px",
                  }}
                >
                  Clear Filter
                </Button>
              </Stack>
            </Drawer>
          </div> */}
          <div style={{ textAlign: "left" }}>
            {window.innerWidth <= 768 && (
              <IconButton
                style={{
                  paddingLeft: "16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={handlePopoverOpen}
              >
                <MoreVertIcon
                  style={{ fill: "green", width: "1em", height: "1em" }}
                />
              </IconButton>
            )}
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverCloseE2}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Stack
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Link underline="none" href="/home" color={"black"}>
                  <IconButton
                    style={{
                      marginTop: "20px",
                      fontSize: "20px",
                    }}
                  >
                    <AddCircleIcon
                      style={{ height: "30", width: "30", color: "green" }}
                    />
                    <span style={{ color: "black", marginLeft: "12px" }}>
                      New
                    </span>
                  </IconButton>
                </Link>
                <IconButton
                  style={{
                    fontSize: "20px",
                  }}
                >
                  <img
                    src={trashBinImage}
                    alt="Bin"
                    style={{
                      width: "28px",
                      height: "28px",
                      marginRight: "12px",
                    }}
                  />
                  <span style={{ color: "black" }}>Bin</span>
                </IconButton>
                <Link underline="none" href="/" color={"black"}>
                  <IconButton
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    <span style={{ color: "black" }}>Activity Log</span>
                  </IconButton>
                </Link>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      color: "#000",
                      marginRight: "12px",
                      marginLeft: "5px",
                      fontSize: "20px",
                    }}
                  >
                    Sort by:
                  </span>
                  <FormControl>
                    <div
                      onClick={handleDropdownToggle}
                      style={{
                        background: "#71C887",
                        borderRadius: "4px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        padding: "8px 16px",
                        width: "fit-content", // Add this line to adjust the width
                      }}
                    >
                      <span
                        style={{
                          color: "#fff",
                          fontWeight: "bold",
                          marginRight: "8px",
                        }}
                      >
                        {selectedOption}
                      </span>
                      <KeyboardArrowDownIcon
                        style={{ fontSize: "20px", color: "#fff" }}
                      />
                    </div>
                    {isDropdownOpen && (
                      <div
                        style={{
                          background: "#fff",
                          borderRadius: "4px",
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          marginTop: "8px",
                          padding: "8px",
                          fontSize: "20px",
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Add a shadow for better visibility
                        }}
                      >
                        <MenuItem
                          onClick={() => handleOptionSelect("All")}
                          style={{ cursor: "pointer", color: "#000" }}
                        >
                          All
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleOptionSelect("Date")}
                          style={{ cursor: "pointer", color: "#000" }}
                        >
                          Date
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleOptionSelect("Size")}
                          style={{ cursor: "pointer", color: "#000" }}
                        >
                          z
                        </MenuItem>
                      </div>
                    )}
                  </FormControl>
                </div>
                <Button
                  style={{
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    color: "red",
                    fontSize: "10px",
                  }}
                >
                  Clear Filter
                </Button>
              </Stack>
            </Popover>
          </div>
        </Grid>
      </section>

      <section style={{ display: "flex", justifyContent: "center" }}>
        <Grid
          container
          spacing={{ md: 3, lg: 0, xl: 1 }}
          style={{ margin: "auto" }} // Use auto margins
          paddingY={{ xs: 5, sm: 5, md: 5, lg: 5, xl: 5 }}
          paddingLeft={{ lg: 10, xl: 12 }}
          paddingRight={{ xs: 2, sm: 2 }}
        >
          {files.map((file) => (
            <Grid
              key={file.id}
              item
              paddingLeft={2}
              //12 is the w-full
              xs={12}
              sm={6}
              md={4}
              lg={4}
              xl={4}
              paddingBottom={2}
            >
              <Grid
                maxWidth={{ xs: "100%", sm: "100%", xl: "80%", lg: "60%" }}
                paddingX={"20px"}
                paddingY={{ lg: "10px" }}
                style={{
                  backgroundColor: "#71C887",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center", // Align items vertically in the center
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <div style={{ flex: "1" }}>
                    <Link underline="none" href="/FilePage" color={"black"}>
                      {file.name}
                    </Link>
                  </div>
                  <IconButton
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={handleIconButtonClick}
                  >
                    <MoreHorizIcon
                      style={{ fill: "black", width: "1em", height: "1em" }}
                    />
                  </IconButton>

                  <Popover
                    open={isPopoverOpen}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <List>
                      <ListItem
                        button
                        onClick={() => handleOptionSelectPop("details")}
                      >
                        <ListItemText primary="Details" />
                      </ListItem>
                      <ListItem
                        button
                        onClick={() => handleOptionSelectPop("delete")}
                      >
                        <ListItemText primary="Delete" />
                      </ListItem>
                      <ListItem
                        button
                        onClick={() => handleOptionSelectPop("open")}
                      >
                        <ListItemText primary="Open" />
                      </ListItem>
                    </List>
                  </Popover>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Link href="/FilePage">
                    <Box
                      component="img"
                      src={file.thumbnailUrl}
                      alt="Thumbnail preview of a Drive item"
                      style={{
                        width: "100%",
                        height: "200px",
                        paddingTop: "3px",
                        paddingBottom: "10px",
                        borderRadius: "8px",
                        display: "block",
                        margin: "0 auto", // Center the image horizontally
                      }}
                    />
                  </Link>
                </div>
              </Grid>
              <Grid
                style={{
                  textAlign: "center",
                  marginTop: "0.5rem",
                  fontSize: "14px",
                  color: "#888",
                  fontStyle: "italic",
                }}
                paddingRight={{ lg: 15 }}
              >
                Last Modified: {file.lastModified}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </section>
    </Grid>
  );
};

export default FileList;