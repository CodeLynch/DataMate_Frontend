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
    // const { id } = useParams();

    const handlePasswordShow = () => {
        setShowPassword(!showPassword);
    }

    // const [businessType, setBusinessType] = React.useState('');

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

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const handleCancelClick = () => {
        navigate("/profile");
    }

    // useEffect(() => {
    //     // if(user != null){
    //     UserService.getUserById(user.userId).then((response) => {
    //         setData(response.data.account);
    //         console.log(response.data.account)
    //     }).catch((error) => {
    //       console.log(error);
    //     })
    //     // }
    //   }, []);

    useEffect(() => {
        if (para.id) {
            // Fetch user data based on the id parameter from the URL
            UserService.getUserById(para.id)
                .then(response => {
                    // Update the data state with the fetched user data
                    setData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [para]);

    const putUser = async (e: { preventDefault: () => void; }) => {
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
    }


    return (
        <div className='gradientbg edit-spacing' style={{ width: '100%', height: '100%'}}>
        <Grid component="form" onSubmit={putUser}>
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
                                    onChange={handleChange}
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 }, marginRight: { md: 2 }, width: { xs: '100%', sm: '100%', md: 'auto' } }}
                                />
                                <TextField
                                    size="small"
                                    required 
                                    name="lastName"
                                    label="Last Name"
                                    variant="outlined"
                                    value={lastName}
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
                                    fullWidth
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 } }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handlePasswordShow}>
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <TextField
                                    size="small"
                                    required 
                                    name="businessName"
                                    label="Business Name"
                                    variant="outlined"
                                    value={businessName}
                                    onChange={handleChange}
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
                                    onChange={handleSelectChange}
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
                            <Grid container direction="row" alignItems={{ xs: 'center', sm: 'flex-end', md: 'flex-end' }} justifyContent={{ xs: 'center', sm: 'flex-end', md: 'flex-end' }} marginBottom='6px'>
                                <Box className='cancelBtn' sx={{display: 'flex', justifyContent: 'center'}}>
                                    <Button variant="contained" onClick={handleCancelClick}>
                                        Cancel
                                    </Button>
                                </Box>
                                <Box className='saveBtn' sx={{display: 'flex', justifyContent: 'center', marginLeft: { xs: 1, sm: 1, md: 2 }}}>
                                    <Button variant="contained" type="submit">
                                        Save
                                    </Button>
                                </Box>
                            </Grid>
                        </Container>
                    </Stack>
                </Box>
            
            </Grid>
        </Grid>
        </div>
    );
}
