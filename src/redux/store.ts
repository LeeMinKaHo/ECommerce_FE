import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // 👈 import reducer tổng đã thêm logic reset

export const store = configureStore({
  reducer: rootReducer, // 👈 thay vì object các slice riêng lẻ
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
