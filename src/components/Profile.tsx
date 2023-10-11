import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Container, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../api/UserService';
import axios from 'axios';

export default function EditProfile() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const para = useParams() as { id: string };
    //const {user} = useContext(UserContext) as UserContextType;


    const [data, setData]= useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        username: "",
        password: "",
        businessName: "",
        businessType: "",
    })

    const { firstName, lastName, email, address, username, password, businessName, businessType } = data;



    useEffect(() => {
        if (para.id) {
            UserService.getUserById(para.id)
                .then(response => {
                    setData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [para]);

    /*const handleUserEditClick = () => {
        navigate("/operator/operator-profile/edit-operator-prof/" + user?.accountId);
       
    }*/

    /*const putUser = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        await axios.put(`http://localhost:8080/user/putUser?userId=${para.id}`,{
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            address: data.address,
            username: data.username,
            password: data.password,
            businessName: data.businessName,
            businessType: data.businessType,
        })
        .then((res)=> {
            console.log('Success! Editing Data'); 
            console.log(res); 
            navigate("/profile");
        })
        .catch((err:string) => console.log(err))
    }*/


    return (
        <div className='gradientbg edit-spacing' style={{ width: '100%', height: '100%'}}>
        <Grid component="form" >
            <Grid container justifyContent="center" alignItems="center">
                <Box sx={{ backgroundColor: 'white', margin: {xs: '30px'}, padding: {xs: '25px 30px 25px 30px', md: '25px 35px 25px 35px'}, borderRadius: '20px', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)' }}>
                    <Stack direction='column' divider={<Divider orientation="horizontal" flexItem sx={{ borderBottomWidth: '2px', borderColor: '#374248' }} />} spacing={2}>
                        <Typography variant="h6" fontWeight="bold">
                            User Profile
                        </Typography>
                        <Container>
                            <Grid container direction={{ xs: 'column', sm: 'row', md: 'row' }} justifyContent="center" alignItems="center" sx={{ marginTop: '10px'}}>
                                <TextField
                                    size="small"
                                    required 
                                    name="firstName"
                                    label="First Name"
                                    variant="outlined"
                                    value={firstName}
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 }, marginRight: { md: 2 }, width: { xs: '100%', sm: '100%', md: 'auto' } }}
                                />
                                <TextField
                                    size="small"
                                    required 
                                    name="lastName"
                                    label="Last Name"
                                    variant="outlined"
                                    value={lastName}
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 }, width: { xs: '100%', sm: '100%', md: 'auto' } }}
                                />
                            </Grid>
                            <Grid container direction="column" justifyContent="center" alignItems="center">
                                <TextField
                                    size="small"
                                    required 
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    value={email}
                                    fullWidth
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 } }}
                                />
                                <TextField
                                    size="small"
                                    required 
                                    name="address"
                                    label="Address"
                                    variant="outlined"
                                    value={address}
                                    fullWidth
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 } }}
                                />
                                <TextField
                                    size="small"
                                    required 
                                    name="username"
                                    label="Username"
                                    variant="outlined"
                                    value={username}
                                    fullWidth
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 } }}
                                />
                                <TextField
                                    required
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    label="Password"
                                    size="small"
                                    fullWidth
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 } }}
                                    
                                />
                                <TextField
                                    size="small"
                                    required 
                                    name="businessName"
                                    label="Business Name"
                                    variant="outlined"
                                    value={businessName}
                                    fullWidth
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 } }}
                                />
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label" size='small'>Business Type</InputLabel>
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
        </div>
    );
}
