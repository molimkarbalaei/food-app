import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  // two func that allows us to update that context:
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;

//1- marahele context ke generally sakhte shod

//2- manage the context: with:
// USESTATE or usereducer
