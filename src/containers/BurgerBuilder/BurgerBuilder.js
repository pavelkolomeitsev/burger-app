import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Auxx from "../../hoc/Auxx/Auxx";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axiosInstance from "../../axios-orders";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    // axiosInstance
    //   .get("https://burger-app-cb27b.firebaseio.com/ingredients.json")
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {});
  }

  updatePurchaseState(updatedTotalPrice) {
    return updatedTotalPrice > 4;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false,
    });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = { ...this.props.ingreds };

    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = <Spinner page={this.props.ingreds} />;

    if (this.props.ingreds) {
      burger = (
        <Auxx>
          <Burger ingredients={this.props.ingreds} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdd}
            ingredientRemoved={this.props.onIngredientRemove}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.totPrice)}
            ordered={this.purchaseHandler}
            price={this.props.totPrice}
          />
        </Auxx>
      );
      orderSummary = (
        <OrderSummary
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.props.ingreds}
          price={this.props.totPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner page={this.props.ingreds} />;
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

const mapStateToProps = (state) => {
  return {
    ingreds: state.ingredients,
    totPrice: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdd: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemove: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

BurgerBuilder.propTypes = {
  ingredients: PropTypes.object,
  totalPrice: PropTypes.number,
  purchasable: PropTypes.bool,
  purchasing: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axiosInstance));
