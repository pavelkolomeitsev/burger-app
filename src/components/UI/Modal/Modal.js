import React from "react";

import classes from "./Modal.module.css";
import Auxx from "../../../hoc/Auxx";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => (
  <Auxx>
    <Backdrop show={props.show} hideModal={props.hideModal} />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
    >
      {props.children}
    </div>
  </Auxx>
);

export default modal;