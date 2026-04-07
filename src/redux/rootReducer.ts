import userReducer from "./slice/userSlice";
import cartReducer from "./slice/cartSlice";
import dialogReducer from "./slice/dialogSlice";
import notificationReducer from "./slice/notificationSlice";
import { combineReducers } from "@reduxjs/toolkit";

const appReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  dialog: dialogReducer,
  notification: notificationReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "user/logout") {
    state = undefined; // ✅ Reset toàn bộ Redux store
  }
  return appReducer(state, action);
};

export default rootReducer;

