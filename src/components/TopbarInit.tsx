import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Logo from '../images/datamate-logo.png';
import { NavLink } from 'react-router-dom';
import { Grid } from '@mui/material';

export default function TopbarInit() {

  const navItems: { text: string, link: string }[] = [
    { text: "About Us", link: "/about-us" },
    { text: "Contact Us", link: "/contact-us" },
    { text: "Login", link: "/login" },
    { text: "Register", link: "/registration" },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" sx={{ backgroundColor: '#ffffff', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
        <Toolbar>
          <Grid container direction={{ xs:'column', sm: 'row', md: 'row', lg: 'row' }} justifyContent="space-between" alignItems="center">
            <img src={Logo} alt={"datamate-logo"} style={{ width: '150px', height: 'auto', paddingTop: "4px" }} />
            <Stack direction="row" spacing={2}>
              {navItems.map((listItem, index) => (
                <Button
                  key={index}
                  color="inherit"
                  component={NavLink}
                  to={listItem.link}
                  sx={{ color: '#374248', whiteSpace: 'nowrap' }}
                >
                  {listItem.text}
                </Button>
              ))}
            </Stack>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
