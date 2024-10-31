import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItemsCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItemsCount: (state, action) => {
      state.cartItemsCount = action.payload;
    },
  },
});

export const { setCartItemsCount } = cartSlice.actions;
export default cartSlice.reducer;