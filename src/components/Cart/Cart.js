// cart component=> render all cart items & display total amount
import { useContext, useState } from "react";
import React from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
  // to show the checkout form conditionally we need to use useState hook:
  const [isCheckout, setisCheckout] = useState(false);
  // manageing the submition of the form:
  const [isSubmitting, setIsSubmitting] = useState(false);
  // for showing the success message:
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  // total amount:
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  // 2 decimal
  //we want this order button shows if only we have items in the cart:

  const hasItems = cartCtx.items.length > 0;

  // we wanna map all cartitems to cartitem JSX element
  // avalesh ye dummy gozashtim vali badesh ba reactcontext mizarim:

  //func for add or remove the item:
  const cartItemRemovedHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setisCheckout(true);
  };
  //******* sending to backend and submiting the cart data:
  const submitOrderHandler = async (userData) => {
    //4- put it true ASAP we submit the order:
    setIsSubmitting(true);
    //5- then we wait for this fetch to finish:(add await and aysnc)***
    // 1- in here we want to send the request to the backend:
    // 2- both the user data and the cart data:
    //3-  use fetch func and send a request to our firebase
    await fetch(
      "https://react-http-e5163-default-rtdb.firebaseio.com/orders.json",
      {
        // we want to send the data as a json object: as a second argument:
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    //6- after the fetch(request) is done we want to clear the cart:
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart(true);
  };

  const cartItems = (
    <ul className={classes["cart-item"]}>
      {cartCtx.items.map((item) => (
        // to transform these items to the cart
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemovedHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
          // bind is a func for future execution
        />
      ))}
    </ul>
  );

  // for more cleaning:

  const modalActions = (
    // {/* div with the action for the cart => */}
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModalContent = (
    <React.Fragment>
      {/* cartItem */}
      {cartItems}
      {/* div with total maount  => */}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {/* if ischeckout is trully and use syntax */}
      {isCheckout && (
        //onConfirm is the prop name for the checkout:
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {/* hide the buttom of order and close when we click on the order button
      first: */}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmitingModalContent = <p> Sending order data...</p>;
  const didSubmitModalContent = <p>Successfully sent the order!</p>;

  return (
    //jagozarie div ba Modali ke sakhtim  =>
    <Modal onClose={props.onClose}>
      {/* so we want to show the cart modalcontent only if we are no submiting & did not submited yet*/}
      {!isSubmitting && !didSubmit && cartModalContent}
      {/* if isSubmitting is true we want to show the isSubmitingModalContent */}
      {isSubmitting && isSubmitingModalContent}
      {/* if didSubmit is true we want to show the didSubmitModalContent */}
      {/* maybe if we are not currently submiting */}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
}

export default Cart;
// 1- react portal because it will open in new page
// div => modal component

//2-  the Cart should not be inside of that div though, but inside of a modal.
// So, therefore, let's add such a modal wrapper
// which renders this Cart as an overlay.

//3- onClick={props.onClose} is a props for closing

//4- <Modal onClose={props.onClose}> we add in modal to do it specificaly for this modal

//5- add cart items

//6-  refine the cart overal
// add item to cart by usecontex

//7- manage the overall cart data through ***context****
// because we will need it in different places.

//8- creating a floder store for wide state managment.
