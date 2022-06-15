import { createSlice } from '@reduxjs/toolkit';

import THEME from '../constants/theme';

const themeState = createSlice({
  name: 'theme',
  initialState: {
    palette: THEME.palettes.light,
  },
  reducers: {
    themeModeSet: (state, action) => {
      state.palette = THEME.palettes[action.payload];
      localStorage.setItem('themeMode', action.payload);
    },
    themeModeRetrieved: (state) => {
      const mode = localStorage.getItem('themeMode');
      if (mode) state.palette = THEME.palettes[mode];
    },
  },
});

export const retrieveThemeMode = themeState.actions.themeModeRetrieved;
export const setThemeMode = themeState.actions.themeModeSet;

export const getPaletteType = (state) => state.theme.palette;

export default themeState.reducer;
