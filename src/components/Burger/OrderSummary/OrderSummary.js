import React from "react";

import Auxx from "../../../hoc/Auxx";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(
    (ingredientKey) => {
      return (
        <li key={ingredientKey + Math.floor(Math.random() * 10) + 1}>
          <span style={{ textTransform: "capitalize" }}>{ingredientKey}</span>:{" "}
          {props.ingredients[ingredientKey]}
        </li>
      );
    }
  );

  return (
    <Auxx>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType='Danger' clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType='Success' clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Auxx>
  );
};

export default orderSummary;
