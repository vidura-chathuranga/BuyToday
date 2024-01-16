import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

// helper function to add decimals
const addDecimals = (number) => {
  return (Math.round(number * 100) / 100).toFixed(2);
};
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

      // calculate the items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      // calculate the shipping price (if order over $100 free else will be $10 shipping)
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      // calculate the tax price ( 15% tax)
      state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2));

      // calculate the total price
      state.totalPrice = Number(
        state.itemsPrice + Number(state.shippingPrice) + Number(state.taxPrice)
      ).toFixed(2);

    //   save in the localstorage
    localStorage.setItem('cart',JSON.stringify(state));
    },
  },
});

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;
