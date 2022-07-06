/* eslint-disable sort-imports */
/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { Container } from '@mui/material';
import * as React from 'react';
import Header from '../Header/Header';
import Returns from '../Returns/Returns';
import Balance from '../Balance/Balance';
import Graph from '../Chart/Chart';

import useStyles from './Main-styles';

export const Main = () => {
  const styles = useStyles();
  return (
    <div>
      <Header></Header>
      <Container maxWidth="xl" css={styles.container}>
        <Balance></Balance>
        <Returns></Returns>
        <Graph></Graph>
      </Container>
    </div>
  );
};
