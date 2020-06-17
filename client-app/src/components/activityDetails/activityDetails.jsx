import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Dimmer, Loader, Grid } from "semantic-ui-react";
import { toast } from "react-toastify";

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
  history: { push },
  fetchActivity,
  isFetching,
}) => {
  useEffect(() => {
    if (!activity || activity.id !== id)
      fetchActivity(id, (route = undefined, message = undefined) => {
        route ? push(route) : toast.error(message);
      });
  }, [fetchActivity, push, activity, id]);

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
        <ActivitySidebar attendees={activity.attendees} />
      </Grid.Column>
    </Grid>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  activity: selectActivity,
  isFetching: selectIsActivityFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchActivity: (id, callback) => dispatch(fetchActivityStart(id, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetails);
