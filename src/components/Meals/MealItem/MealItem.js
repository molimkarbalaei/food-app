import React from "react";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
//5
function MealItem(props) {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;
  //for rendering to 2 decimal

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      {/* rendering simple form to enter amount they want  */}
      <div>
        {/* we add a pointer: */}
        <MealItemForm onAddToCart={addToCartHandler} />
        {/* in baraye ine ke add va button ezaf beshe */}
      </div>
    </li>
  );
}

export default MealItem;

//we are rendering these meal items for all the meals in the DUMMY_MEALS array.
// So, therefore here in the MealItem component
// I will now access props.name.
