import React from "react";
import { Grid } from "semantic-ui-react";

import ActivityList from "../activity-list/activity-list";
import ActivityDetails from "../activity-details/activity-details";
import ActivityForm from "../activity-form/activity-form";

const Dashboard = ({ deleteActivity, target }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetails />
        <ActivityForm />
      </Grid.Column>
    </Grid>
  );
};

export default Dashboard;
