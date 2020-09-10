import React, { Component } from "react";

import Auxx from "../../hoc/Auxx";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
  };

  addIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[type] + 1; // increase an amount of exact ingredient
    const updatedIngredients = { ...this.state.ingredients }; // copy the previous ingredients
    updatedIngredients[type] = updatedCount; // change the amount of exact ingredient
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({
      totalPrice: updatedPrice,
      ingredients: updatedIngredients,
    });
  };

  removeIngredientHandler = (type) => {
    let updatedCount = this.state.ingredients[type] - 1; // increase an amount of exact ingredient
    const updatedIngredients = { ...this.state.ingredients }; // copy the previous ingredients
    if (updatedCount < 0) {
      updatedCount = 0;
    }
    updatedIngredients[type] = updatedCount; // change the amount of exact ingredient
    let updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    if (updatedPrice < 4) {
      updatedPrice = 4;
    }

    this.setState({
      totalPrice: updatedPrice,
      ingredients: updatedIngredients,
    });
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };

    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Auxx>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
        />
      </Auxx>
    );
  }
}

export default BurgerBuilder;
