// src/redux/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
interface UserState {
   _id: string | null;
   name: string | null;
   avatar : string | null;
   role : string
   // thêm role, email, avatar... nếu có
}

const initialState: UserState = {
   _id: null,
   name: null,
   avatar : null,
   role : "user" // Mặc định là user, có thể thay đổi tùy theo logic ứng dụng
};
// Tạo slice để quản lý state global (ví dụ: user)
const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      setUser: (state, action: PayloadAction<UserState>) => {
         state._id = action.payload._id;
         state.name = action.payload.name;
         state.role = action.payload.role;
      },
      logout: () => initialState,
   },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
