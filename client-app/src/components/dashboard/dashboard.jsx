import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Grid, Dimmer, Loader } from "semantic-ui-react";

import ActivityList from "../activityList/activityList";

import { selectIsActivityFetching } from "../../redux/activity/activity.selectors";

const Dashboard = ({ isFetching }) => {
  if (isFetching) {
    return (
      <Dimmer active inverted>
        <Loader content="Loading activities..." />
      </Dimmer>
    );
  }
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsActivityFetching,
});

export default connect(mapStateToProps)(Dashboard);
