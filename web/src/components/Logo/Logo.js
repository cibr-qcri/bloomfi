/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { NavLink } from 'react-router-dom';
import React from 'react';

import { Box, Link, Typography } from '@mui/material';

import logo from '../../assets/images/bloomfi-logo-transparent.png';

import useStyles from './Logo-styles';

const Logo = () => {
  const styles = useStyles();

  const view = (
    <Box css={styles.container}>
      <Link css={styles.link} component={NavLink} to="/" underline="none">
        <img src={logo} alt="BloomFi" css={styles.image} />
      </Link>
      <Typography css={styles.text}>BloomFi</Typography>
    </Box>
  );

  return view;
};

export default Logo;
