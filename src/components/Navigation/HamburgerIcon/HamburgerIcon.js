import React from "react";
import PropTypes from "prop-types";

import classes from "./HamburgerIcon.module.css";

const hamburgerIcon = (props) => (
  <button className={classes.HamburgerIcon} onClick={props.open}>
    <span className={classes.HamburgerIcon__bar}></span>
    <span className={classes.HamburgerIcon__bar}></span>
    <span className={classes.HamburgerIcon__bar}></span>
  </button>
);

hamburgerIcon.propTypes = {
  open: PropTypes.func,
};

export default hamburgerIcon;
