/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from 'react';

import { Container, Typography } from '@mui/material';

import useStyles from './Footer-styles';

const Footer = () => {
  const styles = useStyles();

  const view = (
    <Container css={styles.container}>
      <Typography variant="caption">&copy; 2022 CIBR &mdash; An initiative by QCRI</Typography>
    </Container>
  );

  return view;
};

export default Footer;
