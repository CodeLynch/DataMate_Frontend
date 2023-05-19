import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink as NavLinkBase, NavLinkProps as NavLinkBaseProps } from 'react-router-dom';

type NavbarLinkProps = React.PropsWithChildren<{
  open: boolean,
  end: boolean,
  to: string,
  text: string,
}>

export const NavbarLink = (props: NavbarLinkProps) => {
  type NavLinkProps = Omit<NavLinkBaseProps, 'to'>;

  const NavLink = React.useMemo(() => React.forwardRef<HTMLAnchorElement, NavLinkProps>((navLinkProps, ref) => {
    const { className: previousClasses, ...rest } = navLinkProps;
    const elementClasses = previousClasses?.toString() ?? "";
    return (
      <NavLinkBase
        {...rest}
        ref={ref}
        to={props.to}
        end={props.end}
        className={({ isActive }) => (isActive ? elementClasses + " Mui-selected" : elementClasses)}
      />
    )
  }), [props.to]);

  return (
    <ListItemButton component={NavLink}
      sx={{
        color: "tertiary.contrastText",
        minHeight: 48,
        justifyContent: props.open ? 'initial' : 'center', px: 2.5,
        "&.Mui-selected": { backgroundColor: "secondary.main" },
        "&.Mui-selected:hover": { backgroundColor: "secondary.main" },
      }}>
      <ListItemText sx={{ opacity: props.open ? 1 : 0 }} primary={props.text} />
    </ListItemButton>
  )
}