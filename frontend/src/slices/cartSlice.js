import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "Paypal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((it) => it._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const removeItemId = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) => item._id !== removeItemId
      );

      // update the state and the localstorage
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod : (state,action) =>{
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems : (state,action) =>{
      state.cartItems = [];
      return updateCart(state);
    },
    resetCart : (state,action)=> initialState
  },
});

export const { addToCart, removeFromCart,saveShippingAddress,savePaymentMethod,clearCartItems,resetCart } = cartSlice.actions;
export default cartSlice.reducer;
