import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SnackbarContextProvider from './helpers/SnackbarContext';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import { PaletteColorOptions, createTheme } from '@mui/material/styles';
import { Modal } from '@mui/material';
import './styles/SupportStyles.css';
import Homepage from './pages/Homepage';
import { Box} from "@mui/material"


/* Customize default MUI theme */
declare module '@mui/material/styles' {
  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
  }
}
const theme = createTheme({
  palette: {
    primary: {
      main: '#0E9EA7',
      contrastText: '#fff',
    },
    secondary: {
      main: "#71C887",
      contrastText: '#fff',
    },
    tertiary: {
      main: '#DCF1EC',
      contrastText: '#374248',
    },
  },
  
  typography: {
    fontFamily: [
      'inter',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (

    <ThemeProvider theme={theme}>
      <SnackbarContextProvider>
        <Router>
          <Modal open={open} onClose={handleDrawerClose}>
           <Navbar open={open} handleDrawerClose={handleDrawerClose} />
          </Modal>
          <Topbar open={open} handleDrawerOpen={handleDrawerOpen} />
            <Box sx={{ display: 'flex', marginTop: '50px' }}>
                <Navbar open={open} handleDrawerClose={handleDrawerClose} />
              <Box sx={{ flexGrow: 1 }}>
                <Routes>
                  {/* Add your routes here */}
                  <Route path="/home">
                    <Route
                      index
                      element={
                        <Box sx={{ padding: '1px' }}>
                          <Homepage />
                        </Box>
                      }
                    />
                  </Route>
                  {/* Add your other routes here */}
                </Routes>
              </Box>
            </Box>
        </Router>
      </SnackbarContextProvider>
    </ThemeProvider>
  );
}

export default App;