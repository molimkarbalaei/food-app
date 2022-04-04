import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* forward that ref  */}
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;

// using  React.forwardRef to use ref.

// ye chizi ro be ye chize dg rabt ide
