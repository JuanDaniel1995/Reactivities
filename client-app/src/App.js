import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { Container, Dimmer, Loader } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";

import Header from "./components/header/header";
import Dashboard from "./components/dashboard/dashboard";
import HomePage from "./pages/home/home";
import ActivityForm from "./components/activityForm/activityForm";
import ActivityDetails from "./components/activityDetails/activityDetails";
import NotFound from "./pages/errors/notFound";

import { fetchActivitiesStart } from "./redux/activity/activity.actions";
import { retrieveUser } from "./redux/user/user.actions";

import { selectIsActivityFetching } from "./redux/activity/activity.selectors";
import { selectToken } from "./redux/user/user.selectors";
import { selectIsAppLoaded } from "./redux/common/common.selectors";

const App = ({ isAppLoaded, retrieveUser, fetchActivities, token }) => {
  useEffect(() => {
    token
      ? localStorage.setItem("jwt", token)
      : localStorage.removeItem("jwt", token);
  }, [token]);

  useEffect(() => {
    retrieveUser();
  }, [retrieveUser]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

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
                <Route exact path="/activities" component={Dashboard} />
                <Route path="/activities/:id" component={ActivityDetails} />
                <Route
                  path={["/createActivity", "/manage/:id"]}
                  component={ActivityForm}
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
  fetchActivities: () => dispatch(fetchActivitiesStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
