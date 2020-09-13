import React from "react";
import PropTypes from "prop-types";

import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../../Navigation/NavigationItems/NavigationItems";
import HamburgerIcon from "../HamburgerIcon/HamburgerIcon";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <HamburgerIcon open={props.openSideDrawer} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

toolbar.propTypes = {
  openSideDrawer: PropTypes.func,
};

export default toolbar;
