import React from "react";

import classes from "./Spinner.module.css";

const spinner = (props) => {
  let attachedClasses = [classes.Spinner, classes.Page].join(" ");

  if (props.page) {
    attachedClasses = [classes.Spinner];
  }
  return <div className={attachedClasses}>Loading...</div>;
};

export default spinner;
