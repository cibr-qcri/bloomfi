import React from 'react';
/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import { Paper, TextField, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import useStyles from './Account-styles';
import Header from '../Header/Header';

const Account = () => {
  const styles = useStyles();

  return (
    <>
      <Header></Header>
      <div css={styles.root}>
        <Typography variant="h4" css={styles.typography}>
          Update Information
        </Typography>
        <Paper css={styles.paper} component="form" autoComplete="off" variant="outlined" noValidate>
          <TextField css={styles.text} label="First Name" name="First Name" type="text" />
          <TextField css={styles.text} label="Last Name" name="Last Name" type="text" />
          <TextField css={styles.text} label="Organization" name="Organization" type="text" />
          <LoadingButton
            color="primary"
            disableElevation
            disableRipple
            variant="contained"
            css={styles.Update}
            type="submit">
            Update
          </LoadingButton>
          <div css={styles.div}>
            <LoadingButton
              LinkComponent={NavLink}
              to="/"
              color="primary"
              disableElevation
              disableRipple
              variant="contained"
              css={styles.button}
              type="submit">
              Sign Out
            </LoadingButton>
            <LoadingButton
              LinkComponent={NavLink}
              to="/"
              color="primary"
              disableElevation
              disableRipple
              variant="contained"
              css={styles.button}
              type="submit">
              Delete Account
            </LoadingButton>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default Account;
