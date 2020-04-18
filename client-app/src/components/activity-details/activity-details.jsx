import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { Card, Image, Button, Dimmer, Loader } from "semantic-ui-react";

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
            basic
            color="blue"
            content="Edit"
            as={Link}
            to={`/manage/${activity.id}`}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={() => push("/activities")}
          />
        </Button.Group>
      </Card.Content>
    </Card>
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
