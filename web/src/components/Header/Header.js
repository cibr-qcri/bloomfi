/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { useSelector } from 'react-redux';
import React, { Fragment, useState } from 'react';

import { Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar } from '@mui/material';

import Menu from './Menu';

import useStyles from './Header-styles';

const Header = () => {
  const styles = useStyles();

  const [open, setOpen] = useState(false);
  const isAuth = useSelector((state) => state.auth.token !== null);

  const toggleMenuHandler = () => {
    setOpen(!open);
  };

  const view = (
    <Fragment>
      <Menu open={open} onClose={toggleMenuHandler} isAuth={isAuth} />
      <AppBar
        css={styles.container}
        position="relative"
        enableColorOnDark
        elevation={0}
        color="inherit">
        <Toolbar sx={styles.toolbar}>
          <IconButton onClick={toggleMenuHandler} edge="start" color="primary" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Fragment>
  );

  return view;
};

export default Header;
