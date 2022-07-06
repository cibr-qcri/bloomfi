/* eslint-disable sort-imports */
/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import useStyles from './Balance-styles';
import DrawerHeader from '../../../components/DrawerHeader/DrawerHeader';
export const Balance = () => {
  const styles = useStyles();

  return (
    <div>
      <DrawerHeader />
      <Grid container css={styles.GridContainer}>
        <Grid item css={styles.GridItem}>
          <Typography gutterBottom variant="overline">
            Available Balance
          </Typography>
          <Typography variant="h4">$23,334.123</Typography>
        </Grid>
        <Grid item>
          <Button css={styles.DepositButton}>Deposit</Button>
          <Button css={styles.WithdrawButton}>Withdraw</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Balance;
