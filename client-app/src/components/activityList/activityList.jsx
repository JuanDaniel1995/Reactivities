import React, { Fragment } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { Responsive, Item, Label } from "semantic-ui-react";

import Activity from "../activity/activity";

import { selectActivitiesGroupedByDate } from "../../redux/activity/activity.selectors";

const ActivityList = ({ activities }) => {
  return (
    <>
      {activities.map(([group, activityGroup]) => (
        <Fragment key={group}>
          <Responsive
            as={Label}
            size="huge"
            color="blue"
            {...Responsive.onlyMobile}
          >
            {group}
          </Responsive>
          <Responsive
            as={Label}
            size="large"
            color="blue"
            {...Responsive.onlyComputer}
          >
            {group}
          </Responsive>
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
