import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Responsive, Grid, Dimmer, Loader } from "semantic-ui-react";

import ActivityList from "../activityList/activityList";

import { fetchActivitiesStart } from "../../redux/activity/activity.actions";

import { selectIsActivityFetching } from "../../redux/activity/activity.selectors";

const Dashboard = ({ fetchActivities, isFetching }) => {
  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);
  if (isFetching) {
    return (
      <Dimmer active inverted>
        <Loader content="Loading activities..." />
      </Dimmer>
    );
  }
  return (
    <Grid>
      <Responsive as={Grid.Column} width={16} {...Responsive.onlyMobile}>
        <ActivityList />
      </Responsive>
      <Responsive as={Grid.Column} width={10} {...Responsive.onlyComputer}>
        <ActivityList />
      </Responsive>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsActivityFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchActivities: () => dispatch(fetchActivitiesStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
