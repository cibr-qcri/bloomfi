import axios from 'axios';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
import themeReducer from './theme';
import toastReducer from './toast';

axios.defaults.baseURL = 'https://toshi.cibr.qcri.org/api/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:8281/api/v1';
}

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  toast: toastReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
