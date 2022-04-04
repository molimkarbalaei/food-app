import { useContext } from "react";
import React from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

function HeaderCartButton(props) {
  //bring usecontext
  const cartCtx = useContext(CartContext);

  //3-4
  //reduce takes 2 arguments:
  //func, first value
  //func===> 2 arguments itself:
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span> Your Basket </span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderCartButton;

//1- inja onClick={props.onClick} be onvane handler prop
// estefade shode va props dovomi toye headere.
// props onclick =====>

//1-1 So that the function I receive on onClick in the HeaderCartButton,
// is forwarded to the enclave prop on the button.
// alan ba cklic rosh miare safhe ro

// 2- now using the Context:

//3- the hearder cart button comp will be reevaluated when ever the
//context change.==> when we do update it in the cart provider comp.
//so we stablishe the connection:

//4- we use reduce method to have the number of items not lenght:
// allows to transform an array of data to single value.***
// مثلا سه تا سوشی انتخاب کردی ولی یه ایتمز توی کارت اری اضاف بشه.
//ولی مقدار سه تا ایتم باشه.
// مقدار سه تا ولی یه سوشی رو نشون بده:*****

//5- item.amount because my cart items objects will have an amount field
// which stores the number of items per item type.
