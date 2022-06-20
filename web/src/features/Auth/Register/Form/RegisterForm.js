/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import LoadingButton from '@mui/lab/LoadingButton';
import { Paper, TextField } from '@mui/material';

import { createUser } from '../../../../store/auth';

import { registerFormSchema } from './RegisterForm-schema';

import useStyles from './RegisterForm-styles';

const SignUpForm = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerFormSchema),
  });
  const isBusy = useSelector((state) => state.auth.isBusy);

  const handleRegister = (data) => {
    dispatch(createUser(data));
  };

  const view = (
    <div css={styles.root}>
      <Paper
        css={styles.paper}
        component="form"
        autoComplete="off"
        variant="outlined"
        onSubmit={handleSubmit(handleRegister)}
        noValidate>
        <TextField
          css={styles.text}
          {...register('firstName')}
          error={!!errors.firstName}
          helperText={errors.firstName && errors.firstName.message}
          label="First Name"
          name="firstName"
        />
        <TextField
          css={styles.text}
          {...register('lastName')}
          error={!!errors.lastName}
          helperText={errors.lastName && errors.lastName.message}
          label="Last Name"
          name="lastName"
        />
        <TextField
          css={styles.text}
          {...register('organization')}
          error={!!errors.organization}
          helperText={errors.organization && errors.organization.message}
          label="Organization"
          name="organization"
        />
        <TextField
          css={styles.text}
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email && errors.email.message}
          label="Email"
          name="email"
          type="email"
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
          Register
        </LoadingButton>
      </Paper>
    </div>
  );

  return view;
};

export default SignUpForm;
