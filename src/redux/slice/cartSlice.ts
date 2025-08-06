import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types/cart";

interface CartState {
  cartQuantity: number;
}

const initialState: CartState = {
  cartQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state) => {
      state.cartQuantity += 1;
    },
    setCart: (state, action: PayloadAction<number>) => {
      // Tính tổng số lượng từ danh sách cart trả về từ API
      state.cartQuantity = action.payload; 
    },
    decreaseCart: (state) => {
      if (state.cartQuantity > 0) {
        state.cartQuantity -= 1;
      }
    },
    clearCart: () => initialState,
  },
});

export const { addToCart, setCart, clearCart  , decreaseCart} = cartSlice.actions;
export default cartSlice.reducer;
