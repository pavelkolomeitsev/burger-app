import React, { Component } from "react";

import Order from "./Order";
import axiosInstance from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axiosInstance
      .get("/orders.json")
      .then((response) => {
        const fetchedOrders = [];
        for (const key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key,
          });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default withErrorHandler(Orders, axiosInstance);
