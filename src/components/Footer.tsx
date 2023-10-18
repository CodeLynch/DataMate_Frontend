import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from "react-router-dom";


export default function Footer(){
    
    const isXsScreen = useMediaQuery('(max-width:1000px)');

    return(
        <div className='footer gradientbg'>
            <Stack direction="row" justifyContent="center" alignItems="center" sx={{ p: {xs: 2, sm: 3, md: 4} }} className="wrapper">
                {!isXsScreen && (
                    <Grid container justifyContent= 'center' alignItems= 'center'>
                        <Stack direction="column" >
                            <Typography fontWeight='bold' fontFamily="Helvetica" color="white" sx={{ fontSize: '25px'}}>
                                About Us
                            </Typography>
                            <Stack direction="row" mt={1}>
                                <Grid container direction="column" width="150px">
                                    <Link to="/about-us" style={{ textDecoration: 'none' }}>
                                        <Typography sx={{ color: "white "}}>Our Team</Typography>
                                    </Link>
                                    <Typography sx={{ color: "white "}}>Our Story</Typography>     
                                    <Typography sx={{ color: "white "}}>Partners</Typography>
                                </Grid>
                                <Grid container direction="column" width="150px">
                                    <Typography sx={{ color: "white "}}>Blog</Typography>
                                    <Typography sx={{ color: "white "}}>Press</Typography>
                                    <Typography sx={{ color: "white "}}>Services</Typography>
                                </Grid>
                            </Stack>
                        </Stack>
                    </Grid>
                )}
                <Grid container justifyContent= 'center' alignItems= 'center'>
                    <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <p style={{ fontSize: 15, color: 'white', paddingTop: '1rem'}}>© 2023  All Rights Reserved, DataMate</p>
                        <p style={{ fontSize: 15, color: 'white', marginTop: '-0.5rem', paddingBottom: '1rem'}}>Privacy Policy  |   Terms</p>
                    </Stack>
                </Grid>
                {!isXsScreen && (
                    <Grid container justifyContent= 'center' alignItems= 'center'>
                    <Stack direction="column" justifyContent="center" alignItems="flex-end">
                        <Typography fontWeight='bold' fontFamily="Helvetica" color="white" sx={{ fontSize: '25px'}}>
                            Connect with us
                        </Typography>
                        <Stack direction="row" mt={1}>
                            <FacebookIcon sx={{ color: "white", width: 25, height: 25, mr: 2 }}/>
                            <EmailIcon sx={{ color: "white", width: 25, height: 25, mr: 2 }}/>
                            <LinkedInIcon sx={{ color: "white", width: 25, height: 25 }}/>
                            <Typography variant="body2">

                            </Typography>
                        </Stack>
                    </Stack>
                </Grid>
                )}
            </Stack>
        </div>
    )

}