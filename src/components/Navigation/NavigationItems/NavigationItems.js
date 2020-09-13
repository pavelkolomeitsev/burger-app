import React from "react";
import PropTypes from "prop-types";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/' active={true}>
      Burger Builder
    </NavigationItem>
    <NavigationItem link='/'>Checkout</NavigationItem>
  </ul>
);

navigationItems.propTypes = {
  active: PropTypes.bool,
  link: PropTypes.string,
};

export default navigationItems;
