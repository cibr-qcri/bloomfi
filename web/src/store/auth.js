import axios from 'axios';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchToken = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/login', credentials);
      const authToken = response.data.token;
      localStorage.setItem('token', authToken);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;
      return authToken;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const createUser = createAsyncThunk('auth/createUser', async (data, { rejectWithValue }) => {
  try {
    return await axios.post('/auth/register', data);
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async ({ rejectWithValue }) => {
  try {
    const response = await axios.get('/me');
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
});

export const activateUser = createAsyncThunk(
  'auth/activateUser',
  async (token, { rejectWithValue }) => {
    try {
      return await axios.get(`/auth/activate/${token}`);
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    redirectTo: null,
    isInit: false,
    isRegistered: false,
    isActivated: false,
    isBusy: false,
    error: null,
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
    tokenDeleted: (state) => {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      state.token = null;
      state.isInit = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.token = action.payload;
      state.isInit = true;
    });
    builder.addCase(fetchToken.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(createUser.pending, (state) => {
      state.isBusy = true;
    });
    builder.addCase(createUser.fulfilled, (state) => {
      state.isRegistered = true;
      state.isBusy = false;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isBusy = false;
      state.error = action.payload;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isBusy = false;
    });
    builder.addCase(activateUser.fulfilled, (state) => {
      state.isActivated = true;
      state.isBusy = false;
    });
    builder.addCase(activateUser.rejected, (state, action) => {
      state.error = action.payload;
      state.isBusy = false;
    });
  },
});

export const retrieveToken = authSlice.actions.tokenRetrieved;
export const deleteToken = authSlice.actions.tokenDeleted;

export default authSlice.reducer;
