import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Card, Image, Button } from "semantic-ui-react";

import { selectActivity } from "../../redux/activity/activity.actions";
import { setEditMode } from "../../redux/activity/activity.actions";

import { selectedActivity } from "../../redux/activity/activity.selectors";
import { selectEditMode } from "../../redux/activity/activity.selectors";

const ActivityDetails = ({
  activity,
  setEditMode,
  editMode,
  selectActivity,
}) => {
  return activity && !editMode ? (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => setEditMode(true)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={() => selectActivity(null)}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  activity: selectedActivity,
  editMode: selectEditMode,
});

const mapDispatchToProps = (dispatch) => ({
  setEditMode: (mode) => dispatch(setEditMode(mode)),
  selectActivity: (activity) => dispatch(selectActivity(activity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetails);
