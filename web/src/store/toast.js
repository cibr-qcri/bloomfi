import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    duration: 5000,
    severity: null,
    message: null,
    open: false,
  },
  reducers: {
    alertShown: (state, action) => {
      state.message = action.payload?.message;
      state.severity = action.payload?.severity;
      state.open = true;
    },
    alertHidden: (state) => {
      state.open = false;
    },
  },
});

export const showAlert = toastSlice.actions.alertShown;
export const hideAlert = toastSlice.actions.alertHidden;

export default toastSlice.reducer;
