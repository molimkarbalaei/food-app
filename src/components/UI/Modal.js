// creating modal for having cart
import React from "react";
import { Fragment } from "react";
import ReactDom from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

function Modal(props) {
  return (
    <Fragment>
      {/* <Backdrop />
      <ModalOverlay /> */}
      {/* we will use th e portal: */}

      {ReactDom.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
}

export default Modal;
//1- use react portal for both backdrop(things behide modal overlay)
// which blocks interaction with the rest of page
// and render the modal overlay itself.

// 2- we create modalOverlay and Backdrop

//3- props.children ====> the actual content passed between
// the modal opening and closing tag by its a component where the modal is getting used/.
// chon darasl mire un chizai ke zadi ro be esme chil miare.(actual content passed)

//4- using reactDom library

//5- what the portal and where! (x,y)

//6- back to cart component and add modal

//7- to see the action we have to use the card component in app.js

// 8- we want to show the porta when we click on Cart button
//and removed when we clicked on the backdrop or close button

//9- we have to manage some state: one when the cart is visible one when is not visible
