/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Typography } from '@mui/material';

import Form from './Form';
import Header from '../../../components/Header';
import Switcher from '../Switcher';

import useStyles from './Register-styles';

export const Register = () => {
  const styles = useStyles();
  const isRegistered = useSelector((state) => state.auth.isRegistered);

  let view = (
    <>
      <Header />
      <div css={styles.root}>
        <Typography css={styles.text} color="primary">
          Register for a new account
        </Typography>
        <Form />
        <Switcher
          question="Already have an account"
          action="Login"
          path="/login"
          containerStyle={styles.switcherContainer}
        />
      </div>
    </>
  );

  if (isRegistered) {
    return <Navigate to={'/login'} />;
  }

  return view;
};

export default Register;
