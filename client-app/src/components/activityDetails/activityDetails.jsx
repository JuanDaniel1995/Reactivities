import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Dimmer, Loader, Grid } from "semantic-ui-react";

import ActivityHeader from "./activityHeader";
import ActivityInfo from "./activityInfo";
import ActivityChat from "./activityChat";
import ActivitySidebar from "./activitySidebar";

import { fetchActivityStart } from "../../redux/activity/activity.actions";

import {
  selectActivity,
  selectIsActivityFetching,
} from "../../redux/activity/activity.selectors";

const ActivityDetails = ({
  activity,
  match: {
    params: { id },
  },
  fetchActivity,
  isFetching,
}) => {
  useEffect(() => {
    if (!activity || activity.id !== id) fetchActivity(id);
  }, [fetchActivity, activity, id]);

  if (isFetching) {
    return (
      <Dimmer active inverted>
        <Loader content="Loading activity..." />
      </Dimmer>
    );
  }

  return activity ? (
    <Grid>
      <Grid.Column width={10}>
        <ActivityHeader activity={activity} />
        <ActivityInfo activity={activity} />
        <ActivityChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivitySidebar />
      </Grid.Column>
    </Grid>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  activity: selectActivity,
  isFetching: selectIsActivityFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchActivity: (id) => dispatch(fetchActivityStart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetails);
