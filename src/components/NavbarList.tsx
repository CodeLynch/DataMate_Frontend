import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Logout, Person, Dashboard, Payment, Commute, People, Mail, DriveEta } from '@mui/icons-material';
import { NavbarLink } from './NavbarLink';
import { useNavigate } from 'react-router-dom';

type NavbarListProps = {
  open: boolean,
};

const NavbarList = ({ open }: NavbarListProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/", { replace: true });
  }

  return (
    <>
      {/* Main List */}
      <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <NavbarLink to="/home" text="Home" open={open} end={true} />
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <NavbarLink to="/databases" text="Databases" open={open} end={false} />
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <NavbarLink to="/files" text="Files"  open={open} end={false} />
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <NavbarLink to="/about-us" text="About us"  open={open} end={false} />
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <NavbarLink to="/contact-us" text="Contact us"  open={open} end={false} />
        </ListItem>   
      </List>


      {/* Log out option */}
      <List>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '50vh' }}>
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
            <ListItem disablePadding>
                <ListItemButton
                onClick={handleLogout}
                sx={{
                    color: 'tertiary.contrastText',
                    minHeight: 48,
                    px: 2.5,
                    '&:hover': { backgroundColor: 'secondary.main' },
                    '&.Mui-selected': { backgroundColor: 'secondary.main' },
                    '& .MuiListItemText-root': {
                    color: 'inherit',
                    },
                }}>
                <ListItemText primary={<Typography variant="body1" sx={{ fontWeight: 'bold' }}>Log out</Typography>} />
                </ListItemButton>
            </ListItem>
            </div>
        </div>
    </List>

    </>
  );
}

export default NavbarList;
