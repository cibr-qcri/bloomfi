/* eslint-disable sort-imports */
/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Activate from './features/Auth/Activate';
import Home from './features/Home';
import LazyProgress from './components/LazyProgress';
import Login from './features/Auth/Login';
import Register from './features/Auth/Register';
import Toast from './components/Toast/Toast';
import { Main as MainDashboard } from './features/Dashboard/Main/Main';
import Account from './features/Dashboard/Account/Account';
import Portfolio from './features/Dashboard/Portfolio/Portfolio';

import { fetchUser, retrieveToken } from './store/auth';
import { retrieveThemeMode, setThemeMode } from './store/theme';

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.token !== null);
  const isAuthInit = useSelector((state) => state.auth.isInit);
  const user = useSelector((state) => state.auth.user);
  const palette = useSelector((state) => state.theme.palette);
  const theme = createTheme({ palette });

  const handleThemeModeChange = useCallback(
    (event) => {
      const theme = event.matches ? 'dark' : 'light';
      dispatch(setThemeMode(theme));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(retrieveToken());
    dispatch(retrieveThemeMode());
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', handleThemeModeChange);
    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handleThemeModeChange);
    };
  }, [dispatch, handleThemeModeChange]);

  useEffect(() => {
    if (isAuth && !user) {
      dispatch(fetchUser());
    }
  }, [dispatch, isAuth, user]);

  let routes = (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/activate/:token" element={<Activate />} />
      <Route path="/dashboard" element={<MainDashboard />} />
      <Route path="/account" element={<Account />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );

  if (isAuth) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/portofolio" element={<Portfolio />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  }

  let content = <LazyProgress />;
  if (isAuthInit) {
    content = <Suspense fallback={<LazyProgress />}>{routes}</Suspense>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {content}
      <Toast />
    </ThemeProvider>
  );
};

export default App;
