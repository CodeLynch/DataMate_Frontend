import { Drawer, DrawerHeader } from '../styles/NavbarStyles';
import { ChevronLeft } from '@mui/icons-material';
import NavbarList from './NavbarList';
import { Box, Divider, IconButton } from '@mui/material';
import Logo from '../images/datamate-logo.png';
import { Menu} from "@mui/icons-material";

type NavbarProps = {
    open: boolean,
    handleDrawerClose: () => void,
  }
  
  const Navbar = ({ open, handleDrawerClose }: NavbarProps) => {
    return (
        <Drawer variant="permanent" open={open} sx={{ "& .MuiPaper-root": { backgroundColor: "tertiary.main" } }}>
        <DrawerHeader onClick={handleDrawerClose} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex'}}>
            <img src={Logo} alt="datamate logo" style={{ width: '120px', height: '50px', marginLeft: '50x' , marginRight: '40px'}} />
            <IconButton sx={{ color: "tertiary.contrastText" }}>
              <Menu />
            </IconButton>
          </Box>
        </DrawerHeader>
        <NavbarList open={open} />
      </Drawer>
      
    );
  }
  

export default Navbar;