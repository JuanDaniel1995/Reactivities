import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { Container } from "semantic-ui-react";

import { selectIsActivityFetching } from "./redux/activity/activity.selectors";

import Header from "./components/header/header";
import Dashboard from "./components/dashboard/dashboard";
import HomePage from "./pages/home/home";
import ActivityForm from "./components/activityForm/activityForm";
import ActivityDetails from "./components/activityDetails/activityDetails";

const App = () => {
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <Header />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/activities" component={Dashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              />
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
