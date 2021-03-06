import React from "react";
import PropTypes, { object } from "prop-types";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)} // props.ingredientAdded.bind(this, ctrl.type)
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
      ORDER NOW!
    </button>
  </div>
);

buildControls.propTypes = {
  price: PropTypes.number.isRequired,
  controls: PropTypes.arrayOf(object),
  ingredientAdded: PropTypes.func,
  ingredientRemoved: PropTypes.func,
  label: PropTypes.string,
};

export default buildControls;
