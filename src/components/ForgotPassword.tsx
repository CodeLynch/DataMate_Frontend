import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import * as React from 'react';

export default function ForgotPassword(){

    return(
        <Grid className='gradientbg' sx={{ width: '100%', height: '100%', padding: {xs: '8rem 0rem 7.8rem 0rem', sm: '8rem 0rem 9rem 0rem' , md: '8rem 0rem 7.8rem 0rem '} }}>
            <Grid component='form' container justifyContent="center" alignItems="center">
            <Box sx={{ backgroundColor: 'white', margin: {xs: '30px'}, padding: {xs: '35px 30px 35px 30px', md: '35px 55px 35px 50px'}, borderRadius: '20px', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)' }}>
                <Grid direction='column' container justifyContent="flex-start" alignItems="flex-start">
                    <Typography variant='h4' fontWeight="bold" sx={{ color: '#374248' }}>
                        Forgot Password?
                    </Typography>
                    <Typography variant='body1' sx={{ marginTop: { xs: 3, sm: 4, md: 6 } }}>
                        In order to reset your password, please input your email to confirm your request.
                    </Typography>
                    <TextField
                        size="small"
                        required 
                        name="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: { xs: 2, sm: 2, md: 2 }, marginTop: { xs: 2, sm: 2, md: 3 } }}
                    />
                     <Grid container direction="row" alignItems='center' justifyContent='center' marginBottom='6px'>
                        <Box className='cancelResetBtn' sx={{display: 'flex', justifyContent: 'center'}}>
                            <Button variant="contained">
                                Cancel
                            </Button>
                        </Box>
                        <Box className='resetBtn' sx={{display: 'flex', justifyContent: 'center', marginLeft: { xs: 2, sm: 8, md: 10 }}}>
                            <Button variant="contained">
                                Reset Password
                            </Button>
                        </Box>
                    </Grid>
                </Grid>      
            </Box>

            </Grid>
        </Grid>
    )
}