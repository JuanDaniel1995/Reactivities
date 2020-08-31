import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Route, Redirect } from "react-router-dom";

import { isLoggedIn } from "../../redux/user/user.selectors";

const PrivateRoute = ({ isLoggedIn, component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? React.createElement(component, props) : <Redirect to={"/"} />
      }
    />
  );
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: isLoggedIn,
});

export default connect(mapStateToProps)(PrivateRoute);
