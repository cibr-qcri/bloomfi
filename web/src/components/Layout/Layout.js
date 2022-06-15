/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from 'react';

import { Container } from '@mui/material';

import Footer from '../Footer';
import Header from '../Header';
import Toast from '../Toast';

import useStyles from './Layout-styles';

export const Layout = (props) => {
  const styles = useStyles();

  const view = (
    <Container maxWidth="md" disableGutters css={styles.container}>
      <Header />
      <div css={styles.subContainer}>{props.children}</div>
      <Footer />
      <Toast />
    </Container>
  );
  return view;
};

export default Layout;
