import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "./Modal.module.css";
import Auxx from "../../../hoc/Auxx/Auxx";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  componentDidUpdate() {
    console.log("Modal will update!");
  }

  render() {
    return (
      <Auxx>
        <Backdrop show={this.props.show} clicked={this.props.hideModal} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Auxx>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  hideModal: PropTypes.func,
};

export default Modal;
