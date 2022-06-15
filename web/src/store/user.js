import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    signedUp: false,
    activated: false,
    error: null,
  },
});

export default userSlice.reducer;
