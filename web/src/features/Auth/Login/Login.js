/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Typography } from '@mui/material';

import Form from './Form';

import Header from '../../../components/Header';
import Swticher from '../Switcher';

import useStyles from './Login-styles';

import { useEffect } from 'react';

import { showAlert } from '../../../store/toast';

export const SignIn = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const isActivated = useSelector((state) => state.auth.isActivated);
  const isRegistered = useSelector((state) => state.auth.isRegistered);
  const isAuth = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (isActivated) {
      dispatch(showAlert({ message: 'Account was successfully activated!', severity: 'success' }));
    }
  }, [dispatch, isActivated]);

  useEffect(() => {
    if (isRegistered) {
      dispatch(
        showAlert({
          message:
            'Account is successfully created! Please check your email to activate your account.',
          severity: 'success',
        })
      );
    }
  }, [dispatch, isRegistered]);

  let view = (
    <>
      <Header />
      <div css={styles.root}>
        <Typography css={styles.text} color="primary">
          Login with your account
        </Typography>
        <Form />
        <Swticher
          containerStyle={styles.switcherContainer}
          question="Don't have an account"
          action="Register"
          path="/register"
        />
      </div>
    </>
  );

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return view;
};

export default SignIn;
