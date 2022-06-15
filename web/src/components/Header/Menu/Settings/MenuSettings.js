/** @jsxImportSource @emotion/react */

import { NavLink } from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  AccountCircle as AccountIcon,
  Notifications as AlertIcon,
  Brightness4 as DarkModeIcon,
} from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
} from '@mui/material';

import { setThemeMode } from '../../../../store/theme';

import useStyles from './MenuSettings-styles';

const MenuSettings = (props) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const isDark = useSelector((state) => state.theme.palette.mode === 'dark');
  const { onClose, isAuth } = props;

  const toggleDarkModeHandler = (event) => {
    if (event.target.checked) {
      dispatch(setThemeMode('dark'));
    } else {
      dispatch(setThemeMode('light'));
    }
  };

  let account = null;
  if (isAuth) {
    account = (
      <ListItem button component={NavLink} to="/account" onClick={onClose}>
        <ListItemIcon>
          <AccountIcon />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItem>
    );
  }

  let alerts = null;
  if (isAuth) {
    alerts = (
      <ListItem button component={NavLink} to="/alerts" onClick={onClose}>
        <ListItemIcon>
          <AlertIcon />
        </ListItemIcon>
        <ListItemText primary="Alerts" />
      </ListItem>
    );
  }

  const darkMode = (
    <ListItem>
      <ListItemIcon>
        <DarkModeIcon />
      </ListItemIcon>
      <ListItemText primary="Dark Mode" />
      <ListItemSecondaryAction>
        <Switch color="primary" edge="end" onChange={toggleDarkModeHandler} checked={isDark} />
      </ListItemSecondaryAction>
    </ListItem>
  );

  const view = (
    <div>
      <List css={styles.list}>
        {account}
        {alerts}
        {darkMode}
      </List>
    </div>
  );

  return view;
};

export default MenuSettings;
