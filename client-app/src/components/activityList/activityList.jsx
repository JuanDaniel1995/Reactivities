import React, { Fragment } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { format } from "date-fns";

import { Item, Label } from "semantic-ui-react";

import Activity from "../activity/activity";

import { selectActivitiesGroupedByDate } from "../../redux/activity/activity.selectors";

const ActivityList = ({ activities }) => {
  if (!activities) return <h1>No activities found</h1>;
  return (
    <>
      {activities.map(([group, activityGroup]) => (
        <Fragment key={group}>
          <Label size="large" color="blue">
            {format(group, "eeee do MMMM")}
          </Label>
          <Item.Group divided>
            {activityGroup.map((activity) => (
              <Activity key={activity.id} activity={activity} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  activities: selectActivitiesGroupedByDate,
});

export default connect(mapStateToProps)(ActivityList);
