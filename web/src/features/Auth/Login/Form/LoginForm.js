/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import { Paper, TextField } from '@mui/material';

import { fetchToken } from '../../../../store/auth';

import { signInFormSchema } from './LoginForm-schema';

import useStyles from './LoginForm-styles';
import { yupResolver } from '@hookform/resolvers/yup';

const Form = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const isBusy = useSelector((state) => state.auth.isBusy);

  const handleLogin = (credentials) => {
    dispatch(fetchToken(credentials));
  };

  const view = (
    <div css={styles.root}>
      <Paper
        css={styles.paper}
        component="form"
        autoComplete="off"
        variant="outlined"
        onSubmit={handleSubmit(handleLogin)}
        noValidate>
        <TextField
          css={styles.text}
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email && errors.email.message}
          label="Email"
          name="email"
          type="text"
        />
        <TextField
          css={styles.text}
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password && errors.password.message}
          label="Password"
          name="password"
          type="password"
        />
        <LoadingButton
          loading={isBusy}
          color="primary"
          variant="contained"
          css={styles.button}
          type="submit">
          Login
        </LoadingButton>
      </Paper>
    </div>
  );

  return view;
};

export default Form;
