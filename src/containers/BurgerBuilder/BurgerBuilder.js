import React, { Component } from "react";

import Auxx from "../../hoc/Auxx";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 2,
      bacon: 2,
      cheese: 1,
      meat: 0,
    },
  };

  render() {
    return (
      <Auxx>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls />
      </Auxx>
    );
  }
}

export default BurgerBuilder;
