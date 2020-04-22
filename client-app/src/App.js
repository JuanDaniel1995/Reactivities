import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";

import { selectIsActivityFetching } from "./redux/activity/activity.selectors";

import Header from "./components/header/header";
import Dashboard from "./components/dashboard/dashboard";
import HomePage from "./pages/home/home";
import ActivityForm from "./components/activityForm/activityForm";
import ActivityDetails from "./components/activityDetails/activityDetails";
import NotFound from "./pages/errors/notFound";

const App = () => {
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
});

export default connect(mapStateToProps)(App);
