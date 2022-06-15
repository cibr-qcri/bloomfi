/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { NavLink } from 'react-router-dom';
import React from 'react';

import { Box, Link, Typography } from '@mui/material';

import useStyles from './Logo-styles';

const Logo = () => {
  const styles = useStyles();

  const view = (
    <Box css={styles.container}>
      <Link css={styles.link} component={NavLink} to="/" underline="none">
        <Typography css={styles.logo}>Kansa</Typography>
      </Link>
    </Box>
  );

  return view;
};

export default Logo;
