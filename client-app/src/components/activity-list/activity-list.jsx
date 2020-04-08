import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { Item, Button, Label, Segment } from "semantic-ui-react";

import { selectActivity } from "../../redux/activity/activity.actions";
import { deleteActivityStart } from "../../redux/activity/activity.actions";

import { selectActivitiesByDate } from "../../redux/activity/activity.selectors";
import { selectSubmitting } from "../../redux/activity/activity.selectors";
import { selectTarget } from "../../redux/activity/activity.selectors";

const ActivityList = ({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
  target,
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectActivity(activity)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name={activity.id}
                  loading={target === activity.id && submitting}
                  onClick={({ currentTarget: { name } }) =>
                    deleteActivity(name, activity.id)
                  }
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

const mapStateToProps = createStructuredSelector({
  activities: selectActivitiesByDate,
  submitting: selectSubmitting,
  target: selectTarget,
});

const mapDispatchToProps = (dispatch) => ({
  selectActivity: (activity) => dispatch(selectActivity(activity)),
  deleteActivity: (target, id) => dispatch(deleteActivityStart(target, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);
