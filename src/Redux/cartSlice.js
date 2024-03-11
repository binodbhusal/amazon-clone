import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  basket: [],
  productNumber: 0,
  user: null,
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action) => {
      const productExists = state.basket.find((product) => product.id === action.payload.id);
      if (productExists) {
        productExists.quantity += action.payload.quantity;
      } else {
        state.basket.push({ ...action.payload, quantity: parseInt(action.payload.quantity, 10) });
      }
      state.productNumber += parseInt(action.payload.quantity, 10);
    },
    removeFromCart: (state, action) => {
      const productToRemove = state.basket.find((product) => product.id === action.payload);
      state.productNumber -= productToRemove.quantity;
      const index = state.basket.findIndex((product) => product.id === action.payload);
      state.basket.splice(index, 1);
    },
    incrementQuantity: (state, action) => {
      const productToIncrement = state.basket.find((product) => product.id === action.payload);
      if (productToIncrement) {
        productToIncrement.quantity += 1;
        state.productNumber += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const productToDecrement = state.basket.find((product) => product.id === action.payload);
      if (productToDecrement && productToDecrement.quantity > 1) {
        productToDecrement.quantity -= 1;
        state.productNumber -= 1;
        console.log('state productnumber:', state.productNumber);
      }
    },
    setUser: (state, action) => ({
      ...state,
      user: action.payload.user,
    }),
    emptyBasket: (state, action) => ({
      ...state,
      basket: action.payload,
    }),
  },
});
export const {
  addCart, removeFromCart,
  incrementQuantity, decrementQuantity, setUser, emptyBasket,
} = cartSlice.actions;
export default cartSlice.reducer;
