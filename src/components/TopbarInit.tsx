import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import {Box, Toolbar, Button, Stack} from '@mui/material';
import Logo from '../images/datamate-logo.png';
import { NavLink, useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';

export default function TopbarInit() {
  const location = useLocation();
  const navItems: { text: string, link: string }[] = [
    { text: "About Us", link: "/about-us" },
    { text: "Contact Us", link: "/contact-us" },
    { text: "Register", link: "/registration" },
    { text: "Login", link: "/login" },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" sx={{ backgroundColor: '#ffffff', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
        <Toolbar>
          <Grid container direction={{ xs:'column', sm: 'row', md: 'row', lg: 'row' }} justifyContent="space-between" alignItems="center">
            <img src={Logo} alt={"datamate-logo"} style={{ width: '150px', height: 'auto', paddingTop: "4px" }} />
            <Stack direction="row" spacing={2}>
              {navItems.map((listItem, index) => (
                <NavLink
                  key={index}
                  to={listItem.link}
                >
                  <Button
                    color="inherit"
                    sx={{
                      color: location.pathname === listItem.link ? '#17A2A6' : '#374248',
                      whiteSpace: 'nowrap',
                      textTransform: 'none',
                      fontWeight: 'bold',
                    }}
                  >
                    {listItem.text}
                  </Button>
                </NavLink>
              ))}
            </Stack>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
