import React from "react";

import Auxx from "../../hoc/Auxx";
import classes from "./Layout.module.css";

const layout = (props) => (
  <Auxx>
    <div>Toolbar, Sidedrawer, Backdrop</div>
    <main className={classes.Content}>{props.children}</main>
  </Auxx>
);

export default layout;
