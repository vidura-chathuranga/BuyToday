// helper function to add decimals
export const addDecimals = (number) => {
  return (Math.round(number * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // calculate the items price
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
 
  state.itemsPrice = addDecimals(itemsPrice);

  // calculate the shipping price (if order over $100 free else will be $10 shipping)
  const shippingPrice = state.itemsPrice > 100 ? 0 : 10;
  state.shippingPrice = addDecimals(shippingPrice);

  // calculate the tax price ( 15% tax)
  const taxPrice = 0.15 * itemsPrice;
  state.taxPrice = addDecimals(taxPrice);

  // // calculate the total price
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  state.totalPrice = addDecimals(totalPrice);

  //   save in the localstorage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
