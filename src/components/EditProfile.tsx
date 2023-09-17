import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Container, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

export default function EditProfile() {
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
        <Grid component="form">
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
                                    value="John"
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 }, marginRight: { md: 2 }, width: { xs: '100%', sm: '100%', md: 'auto' } }}
                                />
                                <TextField
                                    size="small"
                                    required 
                                    name="lastName"
                                    label="Last Name"
                                    variant="outlined"
                                    value="Doe"
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
                                    value="johndoe@gmail.com"
                                    fullWidth
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 } }}
                                />
                                <TextField
                                    size="small"
                                    required 
                                    name="address"
                                    label="Address"
                                    variant="outlined"
                                    value="Cebu City"
                                    fullWidth
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 } }}
                                />
                                <TextField
                                    size="small"
                                    required 
                                    name="username"
                                    label="Username"
                                    variant="outlined"
                                    value="john123"
                                    fullWidth
                                    sx={{ marginBottom: { xs: 2, sm: 2, md: 2 } }}
                                />
                                <TextField
                                    required
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value="asdf"
                                    label="Password"
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
                                <TextField
                                    size="small"
                                    required 
                                    name="businessname"
                                    label="Business Name"
                                    variant="outlined"
                                    value="Aparri Furnitures"
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
                            <Grid container direction="row" alignItems={{ xs: 'center', sm: 'flex-end', md: 'flex-end' }} justifyContent={{ xs: 'center', sm: 'flex-end', md: 'flex-end' }} marginBottom='6px'>
                                <Box className='cancelBtn' sx={{display: 'flex', justifyContent: 'center'}}>
                                    <Button variant="contained">
                                        Cancel
                                    </Button>
                                </Box>
                                <Box className='saveBtn' sx={{display: 'flex', justifyContent: 'center', marginLeft: { xs: 1, sm: 1, md: 2 }}}>
                                    <Button variant="contained">
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
