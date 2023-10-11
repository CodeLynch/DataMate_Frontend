import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TopbarInit from './TopbarInit';
import UserService from '../api/UserService';
import { SnackbarContext, SnackbarContextType } from '../helpers/SnackbarContext';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginSuccess } from '../helpers/AuthAction';
import { RootState } from '../helpers/Store';



export default function Login(){

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const { handleSetMessage } = useContext(SnackbarContext) as SnackbarContextType;
    const dispatch = useDispatch();
    // const { user, handleSetUser } = useContext(UserContext) as UserContextType;

    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });

    const handlePasswordShow = () => {
        setShowPassword(!showPassword);
    }

    const onInputChange = (e: any) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
        console.log(e.target.name)
    }
    

    // const validateDetails = async (event: { preventDefault: () => void; }) => {
    //     event.preventDefault();
    //     setUsernameError(null);
    //     setPasswordError(null);

    //     UserService.getUserByUsernameDetails(loginData.username).then((res) => {
    //         console.log(res.data)
    //         if(res.data !== "") {
    //             console.log(res.data)
    //             if(res.data.password === loginData.password){
    //                 UserService.getUserById(res.data.userId).then((user) => {
    //                     if(user.data.length !== 0){
    //                         console.log('success')
    //                         navigate('/', { replace: true })
    //                     }else{ 
    //                         setUsernameError("User does not exist.") 
    //                     }
    //                 }).catch((error) => handleSetMessage(error.message + ". Failed to login."))
    //             }else{ 
    //                 setPasswordError("Password is incorrect.") 
    //             }
                
    //         }else { 
    //             setUsernameError("Username does not exists.") 
    //         }
    //     })
    // }

    const validateDetails = async (event:any) => {
        event.preventDefault();
        setUsernameError(null);
        setPasswordError(null);
      
        UserService.getUserByUsernameDetails(loginData.username)
          .then((res) => {
            if (res.data !== "") {
              if (res.data.password === loginData.password) {
                UserService.getUserById(res.data.userId)
                  .then((user) => {
                    if (user.data.length !== 0) {
                      dispatch(loginSuccess(res.data.userId));
                      console.log('success')
                      console.log(loginSuccess)
                      navigate('/home', { replace: true });
                    } else {
                      setUsernameError("User does not exist.");
                    }
                  })
                  .catch((error) => {
                    dispatch(loginFailure(error.message + ". Failed to login."));
                  });
              } else {
                setPasswordError("Password is incorrect.");
              }
            } else {
              setUsernameError("Username does not exist.");
            }
          });
      };

    
    //   useEffect(() => {
    //     if (userData) {
    //       console.log('User Data:', userData);
    //     }
    //   }, [userData]);

    

    return(
        <Grid className='gradientbg' sx={{ width: '100%', height: '100%' }}>
            <TopbarInit/>
            <Grid component='form' onSubmit={validateDetails} container justifyContent="center" alignItems="center" sx={{ width: '100%', height: '100vh' }}>
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
                                value={loginData.username}
                                error={usernameError !== null}
                                helperText={usernameError}
                                onChange={(e) => onInputChange(e)}
                                variant="outlined"
                                fullWidth
                                sx={{ marginBottom: { xs: 2, sm: 2, md: 2 }, marginTop: { xs: 2, sm: 2, md: 3 } }}
                            />
                            <TextField
                                required
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={loginData.password}
                                label="Password"
                                error={passwordError !== null}
                                helperText={passwordError}
                                onChange={(e) => onInputChange(e)}
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
                                <Button variant="contained" type='submit'>
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