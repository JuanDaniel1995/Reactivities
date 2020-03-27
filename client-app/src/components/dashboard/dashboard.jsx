import React from "react";
import { Grid, List } from "semantic-ui-react";
import ActivityList from "../activity-list/activity-list";
import ActivityDetails from "../activity-details/activity-details";
import ActivityForm from "../activity-form/activity-form";

const Dashboard = ({ activities, selectActivity, selectedActivity }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities} selectActivity={selectActivity} />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && <ActivityDetails activity={selectedActivity} />}
        <ActivityForm />
      </Grid.Column>
    </Grid>
  );
};

export default Dashboard;
