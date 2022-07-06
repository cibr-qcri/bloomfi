/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
/* eslint-disable sort-imports */

import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HelpIcon from '@mui/icons-material/Help';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Grid } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import DrawerHeader from '../../../components/DrawerHeader/DrawerHeader';
import Drawer from '../../../components/Drawer/Drawer';

import useStyles from './Header-styles';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Header = () => {
  const styles = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar open={open}>
        <Toolbar>
          <IconButton
            onClick={handleDrawerOpen}
            edge="start"
            css={styles.IconButton}
            sx={{ mr: 2, ...(open && { display: 'none' }) }}>
            <MenuIcon />
          </IconButton>
          <Grid container css={styles.Grid}>
            <Typography variant="h5" noWrap component="div">
              Dashboard
            </Typography>
            <Link to="/account" css={styles.AvatarLink}>
              <Avatar css={styles.Avatar}>NK</Avatar>
            </Link>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <List>
          {['Home', 'Create Portfolio'].map((text, index) => (
            <ListItem key={text} disablePadding css={styles.ListItem}>
              <ListItemButton css={styles.ListItemButton} LinkComponent={NavLink} to="/dashboard">
                <ListItemIcon css={styles.ListItemIcon}>
                  {index == 0 ? <HomeIcon /> : <AddIcon />}
                </ListItemIcon>
                <ListItemText primary={text} css={styles.ListItemText} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Account', 'Help'].map((text, index) => (
            <ListItem key={text} disablePadding css={styles.ListItem}>
              <ListItemButton css={styles.ListItemButton} LinkComponent={NavLink} to="/account">
                <ListItemIcon css={styles.ListItemIcon}>
                  {index == 0 ? <AccountCircleIcon /> : <HelpIcon />}
                </ListItemIcon>
                <ListItemText primary={text} css={styles.ListItemText} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Header;
