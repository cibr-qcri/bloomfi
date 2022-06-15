/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from 'react';

import { CircularProgress, Typography } from '@mui/material';

import useStyles from './LazyProgress-styles';

export const LazyProgress = (props) => {
  const styles = useStyles();

  const { containerStyle = styles.root } = props;

  const view = (
    <div css={containerStyle}>
      <CircularProgress />
      <Typography css={styles.loadingLabel} variant="body2" color="textSecondary">
        Loading
      </Typography>
    </div>
  );
  return view;
};

export default LazyProgress;
