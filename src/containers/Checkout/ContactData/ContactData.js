import React, { Component } from "react";

import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import axiosInstance from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
      },

      // country: {
      //   elementType: "input",
      //   elementConfig: {
      //     type: 'text',
      //     placeholder: "Country"
      //   },
      //   value: ""
      // },
      // city: "Vinnytsya",
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
      },
      postcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Post code",
        },
        value: "",
      },

      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
      },
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: +this.props.price,
      customer: {
        name: "Pavel",
        address: {
          country: "Ukraine",
          city: "Vinnytsya",
          street: "Nezalezshnosti, 145",
          postcode: "23219",
        },
        email: "test@test.com",
      },
      deliveryMethod: "fast",
    };
    axiosInstance
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedElement = { ...updatedOrderForm[inputIdentifier] }; // deep copy
    updatedElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedElement;
    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    const elementsArray = [];

    for (const key in this.state.orderForm) {
      elementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form>
        {elementsArray.map((element) => (
          <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            changed={(event) => this.inputChangedHandler(event, element.id)}
          />
        ))}
        <Button btnType='Success' clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
