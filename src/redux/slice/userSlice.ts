// src/redux/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  _id: string | null;
  name: string | null;
  email: string | null;
  avatar: string | null;
  role: string;
}

const initialState: UserState = {
  _id: null,
  name: null,
  email: null,
  avatar: null,
  role: 'user',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.avatar = action.payload.avatar;
    },
    logout: () => initialState,
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
