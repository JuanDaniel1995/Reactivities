import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import { createStructuredSelector } from "reselect";
import { Container, Dimmer, Loader } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";

import PrivateRoute from "./pages/privateRoute/privateRoute";
import HomePage from "./pages/home/home";
import ProfilePage from "./pages/profiles/profile";
import NotFound from "./pages/errors/notFound";

import Header from "./components/header/header";
import Dashboard from "./components/dashboard/dashboard";
import ActivityForm from "./components/activityForm/activityForm";
import ActivityDetails from "./components/activityDetails/activityDetails";

import { fetchActivitiesStart } from "./redux/activity/activity.actions";
import { retrieveUser, logOut } from "./redux/user/user.actions";

import { selectIsActivityFetching } from "./redux/activity/activity.selectors";
import { selectToken } from "./redux/user/user.selectors";
import { selectIsAppLoaded } from "./redux/common/common.selectors";

const App = ({
  isAppLoaded,
  retrieveUser,
  fetchActivities,
  token,
  history: { push },
  logOut,
}) => {
  useEffect(() => {
    if (token) {
      localStorage.setItem("jwt", token);
    } else {
      localStorage.removeItem("jwt", token);
    }
  }, [token]);

  useEffect(() => {
    retrieveUser();
  }, [retrieveUser]);

  useEffect(() => {
    if (token)
      fetchActivities(() => {
        logOut();
        push("/");
      });
  }, [fetchActivities, token, logOut, push]);

  if (!isAppLoaded && token) {
    return (
      <Dimmer active inverted>
        <Loader content="Loading app..." />
      </Dimmer>
    );
  }

  return (
    <>
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <Header />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <PrivateRoute exact path="/activities" component={Dashboard} />
                <PrivateRoute
                  path="/activities/:id"
                  component={ActivityDetails}
                />
                <PrivateRoute
                  path={["/createActivity", "/manage/:id"]}
                  component={ActivityForm}
                />
                <PrivateRoute
                  path="/profile/:username"
                  component={ProfilePage}
                />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      ></Route>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsActivityFetching,
  token: selectToken,
  isAppLoaded: selectIsAppLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  retrieveUser: () => dispatch(retrieveUser()),
  fetchActivities: (onExpiredToken) => dispatch(fetchActivitiesStart(onExpiredToken)),
  logOut: () => dispatch(logOut()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
