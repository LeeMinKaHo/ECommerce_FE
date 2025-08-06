// src/redux/slices/dialogSlice.js
import { createSlice } from '@reduxjs/toolkit';

export type DialogType =
  | "signIn"
  | "signUp"
  | "verify"
  | "resetPassword"
  | "cart"
  |"review"
  | null;

const initialState = {
  activeDialog: null as DialogType,
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setDialog: (state, action) => {
      state.activeDialog = action.payload;
    },
    closeDialog: (state) => {
      state.activeDialog = null;
    },
  },
});

export const { setDialog, closeDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
