/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { useDispatch, useSelector } from 'react-redux';

import { AppBar, IconButton } from '@mui/material';
import {
  DarkModeOutlined as DarkModeIcon,
  LightModeOutlined as LightModeIcon,
} from '@mui/icons-material';

import Logo from '../Logo';

import useStyles from './Header-styles';

import { setThemeMode } from '../../store/theme';

const Header = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.palette.mode === 'dark');

  const handleThemeModeChange = () => {
    dispatch(setThemeMode(darkMode ? 'light' : 'dark'));
  };

  const view = (
    <AppBar
      css={styles.container}
      position="relative"
      enableColorOnDark
      elevation={0}
      color="inherit">
      <Logo />
      <IconButton disableRipple onClick={handleThemeModeChange}>
        {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </AppBar>
  );

  return view;
};

export default Header;
