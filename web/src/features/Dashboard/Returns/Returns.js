/* eslint-disable sort-imports */
/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Card, Grid } from '@mui/material';
import useStyles from './Returns-styles';

export const Returns = () => {
  const styles = useStyles();
  return (
    <Card css={styles.Card}>
      <Grid container css={styles.GridContainer}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5">Your Returns</Typography>
          <Typography gutterBottom variant="subtitle2" color={'text.disabled'} noWrap={true}>
            Track your returns in real-time
          </Typography>
        </Grid>
        <Grid item css={styles.GridItem}>
          <Typography>Change 24h</Typography>
          <Typography gutterBottom variant="h6" color={'red'}>
            -12%
          </Typography>
        </Grid>
        <Grid item css={styles.GridItem}>
          <Typography>Today&apos;s Returns</Typography>
          <Typography gutterBottom variant="h6" css={styles.Typography}>
            109$
          </Typography>
        </Grid>
        <Grid item css={styles.GridItem}>
          <Typography>Lifetime Returns</Typography>
          <Typography gutterBottom variant="h6" css={styles.Typography}>
            55,602.2$
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Returns;
