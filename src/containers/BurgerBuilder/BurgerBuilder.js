import React, { Component } from "react";
import PropTypes from "prop-types";

import Auxx from "../../hoc/Auxx/Auxx";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axiosInstance from "../../axios-orders";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    axiosInstance
      .get("https://burger-app-cb27b.firebaseio.com/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {});
  }

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
    const queryParam = [];

    for (const key in this.state.ingredients) {
      queryParam.push(
        encodeURIComponent(key) +
          "=" +
          encodeURIComponent(this.state.ingredients[key])
      );
    }

    queryParam.push("price=" + this.state.totalPrice);

    const queryString = queryParam.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };

    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = <Spinner page={this.state.ingredients} />;

    if (this.state.ingredients) {
      burger = (
        <Auxx>
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
      orderSummary = (
        <OrderSummary
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner page={this.state.ingredients} />;
    }

    return (
      <Auxx>
        <Modal
          show={this.state.purchasing}
          hideModal={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
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

export default withErrorHandler(BurgerBuilder, axiosInstance);
