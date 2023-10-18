import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../api/UserService";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../helpers/AuthAction";
import { Link } from "react-router-dom";

export default function EditProfile() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const para = useParams() as { id: string };
  //const {user} = useContext(UserContext) as UserContextType;
  const dispatch = useDispatch();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    username: "",
    password: "",
    businessName: "",
    businessType: "",
  });

  const handleEditClick = () => {
    navigate("/edit-profile");
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const {
    firstName,
    lastName,
    email,
    address,
    username,
    password,
    businessName,
    businessType,
  } = data;

  useEffect(() => {
    if (para.id) {
      UserService.getUserById(para.id)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [para]);

  return (
    <div
      className="gradientbg edit-spacing"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Stack direction="row" spacing="-55rem">
        <Grid
          container
          direction="row"
          alignItems={{
            xs: "center",
            sm: "flex",
            md: "flex",
          }}
          justifyContent={{
            xs: "left",
            sm: "flex",
            md: "flex",
          }}
          marginBottom="6px"
        >
          <Box
            sx={{
              backgroundColor: "white",
              margin: { xs: "115px" },
              padding: {
                md: "145px 105px 80px 55px",
              },
              borderRadius: "45px",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Grid
              container
              direction="column"
              alignItems={{
                xs: "center",
                sm: "flex-end",
                md: "flex-end",
              }}
            >
              <Avatar
                alt="Placeholder Image"
                src="https://via.placeholder.com/150" //sample url
                sx={{
                  width: 170,
                  height: 170,
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  position: "absolute",
                  top: 45,
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  justify: "center",
                  fontWeight: "bold",
                }}
              >
                John Doe
              </Typography>
              <Box
                className="editBtn"
                sx={{ display: "flex", justifyContent: "center" }}
                onClick={handleEditClick}
              >
                <Button variant="contained" type="submit">
                  Edit Profile
                </Button>
              </Box>
              <Box
                className="deleteBtn"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "-20px",
                }}
              >
                <Link to="/delete-profile/" style={{ textDecoration: "none" }}>
                  <Button variant="contained" type="submit">
                    Delete Account
                  </Button>
                </Link>
              </Box>
              <Box
                className="logoutBtn"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "60px",
                }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleLogoutClick}
                >
                  Logout
                </Button>
              </Box>
            </Grid>
          </Box>
        </Grid>

        <Grid>
          <Grid container justifyContent="center" alignItems="center">
            <Box
              sx={{
                backgroundColor: "white",
                margin: { xs: "60px" },
                padding: {
                  xs: "50px 30px 25px 30px",
                  md: "55px 35px 85px 35px",
                },
                borderRadius: "20px",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Stack direction='column' 
                        divider={<Divider orientation="horizontal" 
                        flexItem sx={{ 
                            borderBottomWidth: '2px', 
                            borderColor: '#374248' }} />} 
                            spacing={2}>
                        <Typography variant="h4" fontWeight="bold">
                            User Profile
                        </Typography>
                        <Container>
                            <Grid 
                            container direction={{ 
                                xs: 'column', 
                                sm: 'row', 
                                md: 'row' }} 
                                justifyContent="center" 
                                alignItems="center" 
                                sx={{ marginTop: '10px'}}>
                                <TextField
                                    id="outlined-read-only-input"
                                    size="small"
                                    name="firstName"
                                    label="First Name"
                                    variant="outlined"
                                    value={firstName}
                                    InputProps={{readOnly: true,}}
                                    sx={{ 
                                        marginBottom: { xs: 2, sm: 2, md: 2 }, 
                                        marginRight: { md: 2 }, 
                                        width: { xs: '100%', sm: '100%', md: 'auto' } }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    size="small"
                                    name="lastName"
                                    label="Last Name"
                                    variant="outlined"
                                    value={lastName}
                                    InputProps={{readOnly: true,}}
                                    sx={{ 
                                        marginBottom: { xs: 2, sm: 2, md: 2 }, 
                                        width: { xs: '100%', sm: '100%', 
                                        md: 'auto' } }}
                                />
                            </Grid>
                            <Grid container direction="column" justifyContent="center" alignItems="center">
                                <TextField
                                    id="outlined-read-only-input"
                                    size="small"
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    value={email}
                                    InputProps={{readOnly: true,}}
                                    fullWidth
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 } }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    size="small"
                                    name="address"
                                    label="Address"
                                    variant="outlined"
                                    value={address}
                                    InputProps={{readOnly: true,}}
                                    fullWidth
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 } }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    size="small"
                                    name="username"
                                    label="Username"
                                    variant="outlined"
                                    value={username}
                                    InputProps={{readOnly: true,}}
                                    fullWidth
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 } }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    name="password"
                                    type="password"
                                    value={password}
                                    InputProps={{readOnly: true,}}
                                    label="Password"
                                    size="small"
                                    fullWidth
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 } }}

                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    size="small"
                                    name="businessName"
                                    label="Business Name"
                                    variant="outlined"
                                    value={businessName}
                                    InputProps={{readOnly: true,}}
                                    fullWidth
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 } }}
                                />
                                <FormControl fullWidth>
                                        <InputLabel id="outlined-read-only-input" size='small'>Business Type</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='businessType'
                                        value={businessType}
                                        label="Business Type"
                                        size='small'
                                        >
                                        <MenuItem value={'Food & Beverages'}>Food & Beverages</MenuItem>
                                        <MenuItem value={'Retail'}>Retail</MenuItem>
                                        <MenuItem value={'Manufacturing'}>Manufacturing</MenuItem>
                                        <MenuItem value={'Service-based'}>Service-based</MenuItem>
                                        <MenuItem value={'Others'}>Others</MenuItem>
                                        </Select>
                                    </FormControl>
                            </Grid>

                        </Container>
                    </Stack>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </div>
  );
}
