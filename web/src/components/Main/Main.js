/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from 'react';

import { Container } from '@mui/material';

import styles from './Main-styles';

export const Main = () => {
  const view = <Container css={styles.container}>Hello World!</Container>;

  return view;
};

export default Main;
