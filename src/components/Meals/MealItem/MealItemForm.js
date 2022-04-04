import React from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
import { useRef, useState } from "react";

function MealItemForm(props) {
  const [amountIsValid, setAmountIsValid] = useState(true);

  //using ref =>>>
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    // browser default of reloading:
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    // becuse it is string we convert it:
    const enteredAmountNumber = +enteredAmount;

    // validation:
    if (
      enteredAmount.trim().lenght === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    //execute:
    props.onAddToCart(enteredAmountNumber);
  };

  //*******/ extract the entered amount: WE use ref******
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      {/* seprate component */}
      <button>+ Add</button>
      {!amountIsValid && <p> please order only 1-5 food</p>}
      {/* this button is adding to the cart */}
    </form>
  );
}

export default MealItemForm;

// mikhaym item hala add she be cart:

// input is a custom component so we learnt how to ref works in this:
//===========>

//go to the Component where we wanna receive refs. In this case, that's the Input Component in the UI folder,
// and then make sure you import React in there from react
// and wrap your Component function with React.forwardRef.
// So that Component function is now our argument to forwardRef.
