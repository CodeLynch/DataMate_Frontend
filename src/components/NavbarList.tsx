import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { NavbarLink } from './NavbarLink';
import { useNavigate } from 'react-router-dom';
import { logout } from '../helpers/AuthAction';
import { useDispatch } from 'react-redux';

type NavbarListProps = {
  open: boolean;
};

const NavbarList = ({ open }: NavbarListProps) => {
  const navlist: { text: string; link: string; end: boolean }[] = [
    { text: "Home", link: "/", end: true },
    { text: "Templates", link: "/templates", end: true },
    { text: "Files", link: "/files", end: true },
    { text: "Databases", link: "/databases", end: true },
    { text: "About Us", link: "/about-us", end: true },
    { text: "Contact Us", link: "/contact-us", end: true },
  ];
 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <div style={{ height: "100vh" }}>
      {/* Main List */}

      <List>
        {navlist.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <NavbarLink
              to={item.link}
              text={item.text}
              open={open} // Assuming open is defined elsewhere
              end={item.end}
            />
          </ListItem>
        ))}
      </List>

      {/* Log out option */}
      <List>
        <div
          style={{ display: "flex", flexDirection: "column", height: "40vh" }}
        >
          <div style={{ marginTop: "auto" }}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  color: "tertiary.contrastText",
                  minHeight: 30,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "&.Mui-selected": { backgroundColor: "secondary.main" },
                  "&.Mui-selected:hover": { backgroundColor: "secondary.main" },
                }}
              >
                <div style={{ display: "flex", justifyContent: "left" }}>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{ padding: 0, fontWeight: "bold" }}
                      >
                        Log out
                      </Typography>
                    }
                  />
                </div>
              </ListItemButton>
            </ListItem>
          </div>
        </div>
      </List>
    </div>
  );
};

export default NavbarList;
