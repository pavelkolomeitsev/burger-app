import React, { Component } from "react";
import PropTypes from "prop-types";

import Auxx from "../Auxx/Auxx";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.module.css";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerOpenHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Auxx>
        <Toolbar openSideDrawer={this.sideDrawerOpenHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxx>
    );
  }
}

Layout.propTypes = {
  showSideDrawer: PropTypes.bool,
  sideDrawerOpenHandler: PropTypes.func,
  sideDrawerClosedHandler: PropTypes.func,
};

export default Layout;
