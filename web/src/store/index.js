import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
import themeReducer from './theme';
import toastReducer from './toast';
import userReducer from './user';

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  toast: toastReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
