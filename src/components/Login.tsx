import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DMLogoWhite from '../images/logowhite.png';
import TopbarInit from './TopbarInit';


export default function Login(){

    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordShow = () => {
        setShowPassword(!showPassword);
    }
    

    return(
        <Grid className='gradientbg' sx={{ width: '100%', height: '100%' }}>
            {/* <TopbarInit/> */}
            <Grid container justifyContent="center" alignItems="center">
                {/* <Link to='/'>
                    <img src={DMLogoWhite} alt='datamate-logo' style={{ maxWidth: "100%", maxHeight:"100%" }}/>         
                </Link> */}
                <img src={DMLogoWhite} alt='datamate-logo' style={{ maxWidth: "50%", maxHeight:"50%" }}/>
            </Grid>
            <Grid component='form' container justifyContent="center" alignItems="center">
                <Box sx={{ backgroundColor: 'white', margin: {xs: '30px'}, p: {xs: '50px 50px 50px 50px', md: '55px 60px 55px 60px'}, borderRadius: '20px', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)', opacity: 0.85 }}>
                    <Grid direction='column' container>
                        <Typography variant='h4' fontWeight="bold" color='#374248'>
                            Log-in
                        </Typography>
                        <Grid container sx={{pt: {xs: '15px', md: '15px'}}}>
                            <TextField
                                size="small"
                                required 
                                name="username"
                                label="Username"
                                variant="outlined"
                                fullWidth
                                sx={{ marginBottom: { xs: 2, sm: 2, md: 2 }, marginTop: { xs: 2, sm: 2, md: 3 } }}
                            />
                            <TextField
                                required
                                name="password"
                                type={showPassword ? "text" : "password"}
                                // value="asdf"
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
                        </Grid>
                        <Grid container justifyContent="flex-end" alignItems="flex-end">
                            <Link to='/forgot-password'>Forgot Password?</Link>
                        </Grid>
                        <Grid container direction="row" alignItems='center' justifyContent='center' marginBottom='6px'>
                            <Box className='loginBtn'>
                                <Button variant="contained">
                                    Login
                                </Button>
                            </Box>
                        </Grid>
                        <Grid container justifyContent="center" alignItems="center">
                            <Typography variant='body2'>
                                Not registered yet? <Link to='/registration'>Create an account</Link>
                            </Typography>
                        </Grid>
                    </Grid>      
                </Box>
            </Grid>
        </Grid>
    )
}