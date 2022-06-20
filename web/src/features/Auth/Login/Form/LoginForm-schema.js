// Yup
import * as yup from 'yup';

export const signInFormSchema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup.string('Password is required').required(),
});
