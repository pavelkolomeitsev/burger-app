import React from "react";

import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    // return an object (keys - names of ingredients, values - amount of ingredients)
    // into an array of nested arrays with <BurgerIngredient> components
    .map((ingredKeyName) => {
      return [...Array(props.ingredients[ingredKeyName])].map((_, index) => {
        return (
          <BurgerIngredient key={ingredKeyName + index} type={ingredKeyName} />
        );
      });
    })
    // transform array of nested arrays into one array (empty or array of BurgerIngredients)
    .reduce((arr, element) => {
      return arr.concat(element);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please, add some ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {/* list of Burger Ingredients */}
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default burger;
