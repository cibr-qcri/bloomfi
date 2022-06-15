import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    duration: 0,
    severity: null,
    message: null,
    open: false,
  },
  reducers: {
    alertShown: (state, action) => {
      state.duration = action.payload.duration;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
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
