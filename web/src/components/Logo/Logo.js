/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { NavLink } from 'react-router-dom';

import { Box, Link, Typography } from '@mui/material';

import logo from '../../assets/images/bloomfi-logo-transparent.png';

import useStyles from './Logo-styles';

const Logo = () => {
  const styles = useStyles();

  const view = (
    <Link css={styles.link} component={NavLink} to="/" underline="none">
      <Box css={styles.container}>
        <img src={logo} alt="BloomFi" css={styles.image} />
        <Typography css={styles.text}>BloomFi</Typography>
      </Box>
    </Link>
  );

  return view;
};

export default Logo;
