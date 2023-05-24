import { AppBar, Badge, Box, Drawer, IconButton, Toolbar } from "@mui/material";
import Logo from '../images/datamate-logo.png';
import WLogo from '../images/DMLogoWhiteNoBG.png';
import { Menu} from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from "react-router-dom";
import { DrawerHeader } from "../styles/NavbarStyles";
import NavbarList from "./NavbarList";
import { useEffect } from "react";


type TopbarProps = {
  open: boolean,
  handleDrawerOpen: () => void,
}

const Topbar = ({ open, handleDrawerOpen }: TopbarProps) => {
    const navigate = useNavigate();
    const location = useLocation();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <AppBar position="fixed" /*open={open}*/ sx={{ backgroundColor: "primary.contrastText", alignItem: "center" }}>
      
      <Toolbar sx={{backgroundColor: location.pathname === '/file'? '#71C887':'#FFFFFF'}}>
        <IconButton  aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ width:"4.5%" ,color: location.pathname === '/file'? '#FFFFFF':'#000000' , marginRight: 1/*, ...(open && { display: 'none' }),*/ }}>
          <Menu />
        </IconButton>
        <Box sx={{ width: "100%" }}>
            <img src={location.pathname === '/file'? WLogo : Logo} alt={"datamate logo"} style={{ maxWidth: '10%', maxHeight: '10%', paddingTop:"4px"}} />
        </Box>
        <IconButton sx={{ color: location.pathname === '/file'? '#FFFFFF':'#000000' }} onClick={handleProfileClick}>
            <AccountCircleIcon />
        </IconButton>
      </Toolbar>


      {/* <Drawer open={open} sx={{ "& .MuiPaper-root": { backgroundColor: "tertiary.main" } }} onClose={handleDrawerOpen}>
        <DrawerHeader onClick={handleDrawerOpen} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex'}}>
            <img src={Logo} alt="datamate logo" style={{ width: '120px', height: '35px', marginRight: '58px'}} />
            <IconButton sx={{ color: "tertiary.contrastText" }}>
              <Menu />
            </IconButton>
          </Box>
        </DrawerHeader>
        <NavbarList open={open} />
      </Drawer> */}
    </AppBar>
  );
}

export default Topbar;