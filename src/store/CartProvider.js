// it is related to useContext
import { useReducer } from "react";
//  az usereducer estefade mikonim chon state yekam pichide tarer va
// mikhaym bedunim age item toye cart bood update kone
// va age nabud add kone so ==>

import React from "react";
import CartContext from "./cart-context";
import MealItemForm from "../components/Meals/MealItem/MealItemForm";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

//state is the last snapshot of the state managed by reducer:
const cardReducer = (state, action) => {
  //now start the logic:

  /////////////////////////////////////
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    //check if we have or not:
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // updatedItem = { ...action.item };
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  ////////////////////////////////////////
  if (action.type === "REMOVE") {
    // we also want to update the amount too
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      // we want to remove from the array
      updatedItems = state.items.filter((item) => item.id !== action.id);
      //we wanna keep all items but remove th eitem with that id
      //which WE GET from the action.
    } else {
      //we want to decrese the amount
      //which is the copy of the existingItem===> ...existingItem
      //then update the amount
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
      //we overwite it
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  // to clear the cart after ordering:*******
  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

//////////////////////////////////////////////////////
function CartProvider(props) {
  //usereducer returns 2 element:
  //first: your state snapshot &
  //second: the func that allows to dispath an action to the reducer:

  const [cardState, dispatchCartAction] = useReducer(
    cardReducer,
    defaultCartState
  );

  //other components have to deal with it:
  //helpers:
  const addItemToCartHandler = (item) => {
    //this is object for identifying the action:
    //to add the item in the reducer function:
    // I also wanna forward the item as part of the action.
    dispatchCartAction({ type: "ADD", item });
  };

  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  //this will be dynamic soon:
  const cartContext = {
    items: cardState.items,
    totalAmount: cardState.totalAmount,
    // two func that allows us to update that context:
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;

//1- goal: manage the current context data & provide that context
// to all components that want access to it.

//2- we can now use this cart provider component
// to wrap all components that need access to the cart.And in our application,

//3- can actually add cart items now***
// برای این که به کارت اد کنیم ایتم هارو ::::

// 4- after using cardState we will start to dispatch:

//5- concat is giving a new array not editing the old array

//6- filter is a built-in method which returns a new array**** ke ye func pass mikone
