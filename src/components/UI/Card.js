import React from "react";
import classes from "./Card.module.css";

function Card(props) {
  return <div className={classes.card}>{props.children}</div>;
}

export default Card;
//it provides some html and css
//because we use it in diffrent places we need 'props'. we accses so props children.
//to accsess to the wrapped conent
