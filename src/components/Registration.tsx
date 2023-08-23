import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Container, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import TopbarInit from './TopbarInit';

export default function Registration() {
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordShow = () => {
        setShowPassword(!showPassword);
    }

    const [businessType, setBusinessType] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setBusinessType(event.target.value);
    };


    return (
        <div className='gradientbg edit-spacing' style={{ width: '100%', height: '100%'}}>
            {/* <TopbarInit/> */}
            <Grid component="form">
                <Grid container justifyContent="center" alignItems="center">
                    <Box sx={{ backgroundColor: 'white', margin: {xs: '30px'}, p: {xs: '35px', sm: '40px', md: '40px'}, borderRadius: '20px', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)', opacity: 0.85 }}> 
                        <Container> 
                            <Typography variant="h4" fontWeight="bold" color='#374248'>
                                Register
                            </Typography>            
                            <Stack direction={{ xs: 'column', sm: 'row', md: 'row' }} justifyContent="center" alignItems="center" mt={3}>
                                <TextField
                                    size="small"
                                    required 
                                    name="firstName"
                                    label="First Name"
                                    variant="outlined"
                                    // value="John"
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 }, marginRight: { sm: 2, md: 2 }, width: '100%' }}
                                />
                                <TextField
                                    size="small"
                                    required 
                                    name="lastName"
                                    label="Last Name"
                                    variant="outlined"
                                    // value="Doe"
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 }, width: '100%' }}
                                />
                            </Stack>
                            <Grid container direction="column" justifyContent="center" alignItems="center">
                                <TextField
                                    size="small"
                                    required 
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    // value="johndoe@gmail.com"
                                    fullWidth
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 } }}
                                />
                                <TextField
                                    size="small"
                                    required 
                                    name="address"
                                    label="Address"
                                    variant="outlined"
                                    // value="Cebu City"
                                    fullWidth
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 } }}
                                />
                                <TextField
                                    size="small"
                                    required 
                                    name="username"
                                    label="Username"
                                    variant="outlined"
                                    // value="john123"
                                    fullWidth
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 } }}
                                />
                                <Stack direction={{ xs: 'column', sm: 'row', md: 'row' }} justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
                                    <TextField
                                        required
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        // value="asdf"
                                        label="Password"
                                        size="small"
                                        fullWidth
                                        sx={{ marginBottom: { xs: 2, sm: 2, md: 2 }, marginRight: { sm: 2, md: 2 } }}
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
                                        required
                                        name="confirmpassword"
                                        type={showPassword ? "text" : "password"}
                                        // value="asdf"
                                        label="Confirm Password"
                                        size="small"
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
                                </Stack>
                                <TextField
                                    size="small"
                                    required 
                                    name="businessname"
                                    label="Business Name"
                                    variant="outlined"
                                    // value="Aparri Furnitures"
                                    fullWidth
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 } }}
                                />
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label" size='small'>Business Type</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={businessType}
                                    label="Business Type"
                                    onChange={handleChange}
                                    size='small'
                                    >
                                    <MenuItem value='Food & Beverage'>Food & Beverages</MenuItem>
                                    <MenuItem value='Retail'>Retail</MenuItem>
                                    <MenuItem value='Manufacturing'>Manufacturing</MenuItem>
                                    <MenuItem value='Service-based'>Service-based</MenuItem>
                                    <MenuItem value='Others'>Others</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            
                            <Grid container>
                                <Typography variant="caption" mt={2}>
                                    Upload profile picture
                                </Typography>
                                <TextField
                                    type="file"
                                    variant="outlined"
                                    size='small'
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ backgroundColor: 'transparent' }}
                                />
                            </Grid>
                        
                            <Grid container direction="row" alignItems='center' justifyContent='center'>
                                <Box className='saveBtn'>
                                    <Button variant="contained">
                                        Register
                                    </Button>
                                </Box>
                            </Grid>

                            <Grid container justifyContent="center" sx={{margin: '20px 0px 10px 0px'}}>
                                <Typography variant='body2'>
                                    Already have an account? <Link to='/login'>Login</Link>
                                </Typography>
                            </Grid>
                        </Container>
                    </Box>
                
                </Grid>
            </Grid>
        </div>
    );
}
