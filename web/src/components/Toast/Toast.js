/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Alert, Snackbar } from '@mui/material';

import { hideAlert } from '../../store/toast';

const Toast = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.toast.open);
  const duration = useSelector((state) => state.toast.duration);
  const severity = useSelector((state) => state.toast.severity);
  const message = useSelector((state) => state.toast.message);

  const hideAlertHandler = () => {
    dispatch(hideAlert());
  };

  const view = (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={hideAlertHandler}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert onClose={hideAlertHandler} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );

  return view;
};

export default Toast;
