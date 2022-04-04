import { Fragment } from "react";

import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

function Header(props) {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1> Uber Eat 🍕</h1>
        <HeaderCartButton onClick={props.onShowCart} />
        {/* we forward that pointer to this func*/}
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Un tavolo con del cibo delizioso" />
      </div>
    </Fragment>
  );
}

export default Header;
