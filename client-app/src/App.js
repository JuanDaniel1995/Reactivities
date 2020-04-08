import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Container, Dimmer, Loader } from "semantic-ui-react";

import { fetchActivitiesStart } from "./redux/activity/activity.actions";
import { selectIsActivityFetching } from "./redux/activity/activity.selectors";

import Header from "./components/header/header";
import Dashboard from "./components/dashboard/dashboard";

const App = ({ fetchActivities, isFetching }) => {
  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  if (isFetching) {
    return (
      <Dimmer active inverted>
        <Loader content="Loading components" />
      </Dimmer>
    );
  }

  return (
    <>
      <Header />
      <Container style={{ marginTop: "7em" }}>
        <Dashboard />
      </Container>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsActivityFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchActivities: () => dispatch(fetchActivitiesStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
