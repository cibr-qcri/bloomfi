import * as yup from 'yup';

export const registerFormSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  organization: yup.string().required('Organization is required'),
  email: yup.string().required('Email is required').email(),
  password: yup.string().required('Password is required').min(6),
});
