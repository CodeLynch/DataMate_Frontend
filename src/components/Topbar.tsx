import { Badge, Box, IconButton, Toolbar } from "@mui/material";
import { AppBar } from "../styles/TopbarStyles";
import Logo from '../images/datamate-logo.png';
import { Menu} from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";


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
    <AppBar position="fixed" open={open} sx={{ backgroundColor: "primary.contrastText", alignItem: "center" }}>
      <Toolbar>
        <IconButton  aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ color: '#000000' , marginRight: 5, ...(open && { display: 'none' }), }}>
          <Menu />
        </IconButton>
        <Box sx={{ width: "100%" }}>
            <img src={Logo} alt={"datamate logo"} style={{ maxWidth: '10%', maxHeight: '10%' }} />
        </Box>
        <IconButton sx={{ color: '#000000' }} onClick={handleProfileClick}>
            <AccountCircleIcon />
        </IconButton>
    </Toolbar>
    </AppBar>
  );
}

export default Topbar;