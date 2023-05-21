import { AppBar, Badge, Box, Drawer, IconButton, Toolbar } from "@mui/material";
import Logo from '../images/datamate-logo.png';
import { Menu} from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { DrawerHeader } from "../styles/NavbarStyles";
import NavbarList from "./NavbarList";


type TopbarProps = {
  open: boolean,
  handleDrawerOpen: () => void,
}

const Topbar = ({ open, handleDrawerOpen }: TopbarProps) => {
    const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };
  return (
    <AppBar position="fixed" /*open={open}*/ sx={{ backgroundColor: "primary.contrastText", alignItem: "center" }}>
      
      <Toolbar>
        <IconButton  aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ color: '#000000' , marginRight: 1/*, ...(open && { display: 'none' }),*/ }}>
          <Menu />
        </IconButton>
        <Box sx={{ width: "100%" }}>
            <img src={Logo} alt={"datamate logo"} style={{ maxWidth: '10%', maxHeight: '10%', paddingTop:"4px" }} />
        </Box>
        <IconButton sx={{ color: '#000000' }} onClick={handleProfileClick}>
            <AccountCircleIcon />
        </IconButton>
      </Toolbar>


      <Drawer open={open} sx={{ "& .MuiPaper-root": { backgroundColor: "tertiary.main" } }} onClose={handleDrawerOpen}>
        <DrawerHeader onClick={handleDrawerOpen} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex'}}>
            <img src={Logo} alt="datamate logo" style={{ width: '120px', height: '35px', marginRight: '58px'}} />
            <IconButton sx={{ color: "tertiary.contrastText" }}>
              <Menu />
            </IconButton>
          </Box>
        </DrawerHeader>
        <NavbarList open={open} />
      </Drawer>
    </AppBar>
  );
}

export default Topbar;