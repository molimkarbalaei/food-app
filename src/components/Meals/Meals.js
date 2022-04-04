import React from "react";
import { Fragment } from "react/cjs/react.production.min";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

function Meals() {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  );
}

export default Meals;

// when you want to return 2 element u have to have one root element:
//so fragment is sutaible.
