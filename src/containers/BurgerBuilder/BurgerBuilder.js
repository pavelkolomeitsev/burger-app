import React, { Component } from "react";
import PropTypes from "prop-types";

import Auxx from "../../hoc/Auxx/Auxx";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

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
    purchasable: false,
    purchasing: false,
  };

  updatePurchaseState(updatedTotalPrice) {
    this.setState({ purchasable: updatedTotalPrice > 4 });
  }

  addIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[type] + 1; // increase an amount of exact ingredient
    const updatedIngredients = { ...this.state.ingredients }; // copy the previous ingredients
    updatedIngredients[type] = updatedCount; // change the amount of exact ingredient
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({
      totalPrice: updatedPrice,
      ingredients: updatedIngredients,
    });

    this.updatePurchaseState(updatedPrice);
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

    this.updatePurchaseState(updatedPrice);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false,
    });
  };

  purchaseContinueHandler = () => {
    alert("You continue!");
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };

    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Auxx>
        <Modal
          show={this.state.purchasing}
          hideModal={this.purchaseCancelHandler}
        >
          <OrderSummary
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}
        />
      </Auxx>
    );
  }
}

BurgerBuilder.propTypes = {
  ingredients: PropTypes.object,
  totalPrice: PropTypes.number,
  purchasable: PropTypes.bool,
  purchasing: PropTypes.bool,
};

export default BurgerBuilder;
