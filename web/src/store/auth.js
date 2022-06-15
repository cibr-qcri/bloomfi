import axios from 'axios';

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    redirectTo: null,
    isInit: false,
  },
  reducers: {
    tokenRetrieved: (state, action) => {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        state.token = action.payload;
      }
      state.isInit = true;
    },
  },
});

export const retrieveToken = authSlice.actions.tokenRetrieved;

export default authSlice.reducer;
