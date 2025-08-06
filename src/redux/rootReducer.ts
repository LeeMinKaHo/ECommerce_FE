import userReducer from "./slice/userSlice"; // Import reducer từ file userSlice
import cartReducer from "./slice/cartSlice"; // Import reducer từ file cartSlice
import dialogReducer from "./slice/dialogSlice"; // Import reducer từ file dialogSlice
import { combineReducers } from "@reduxjs/toolkit";

const appReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  dialog: dialogReducer,
});

const rootReducer = (state : any, action : any) => {
  if (action.type === "user/logout") {
    state = undefined; // ✅ Reset toàn bộ Redux store
  }
  return appReducer(state, action);
};

export default rootReducer;
