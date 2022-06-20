/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { useEffect } from 'react';

import { Navigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { activateUser } from '../../../store/auth';

export const Activate = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const isActivated = useSelector((state) => state.auth.isActivated);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    dispatch(activateUser(token));
  }, [dispatch, token]);

  if (isActivated) {
    return <Navigate to="/login" />;
  }

  if (error) {
    return <Navigate to="/" />;
  }
};

export default Activate;
