import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Form, Button, Segment, Dimmer, Loader, Grid } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";

import {
  fetchActivityStart,
  createActivityStart,
  editActivityStart,
} from "../../redux/activity/activity.actions";

import {
  selectActivity,
  selectActivityId,
  selectEditMode,
  selectSubmitting,
  selectIsActivityFetching,
} from "../../redux/activity/activity.selectors";

const ActivityForm = ({
  activity: initialFormState,
  fetchActivity,
  createActivity,
  editActivity,
  submitting,
  match: {
    params: { id },
  },
  history: { push },
  isFetching,
}) => {
  const [activity, setActivity] = useState(
    initialFormState && id
      ? initialFormState
      : {
          id: "",
          title: "",
          category: "",
          description: "",
          date: "",
          city: "",
          venue: "",
        }
  );

  useEffect(() => {
    if (id && (!initialFormState || initialFormState.id !== id)) {
      fetchActivity(id, (route = undefined, message = undefined) => {
        route ? push(route) : toast.error(message);
      });
    }
  }, [fetchActivity, push, initialFormState, id]);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity, redirectToActivity, showError);
    } else {
      editActivity(activity, redirectToActivity, showError);
    }
  };

  const showError = (route = undefined, message = undefined) => {
    route ? push(route) : toast.error(message);
  };

  const redirectToActivity = (id) => {
    push(`/activities/${id}`);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  if (isFetching) {
    return (
      <Dimmer active inverted>
        <Loader content="Loading activity..." />
      </Dimmer>
    );
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title"
              value={activity && activity.title}
            />
            <Form.TextArea
              onChange={handleInputChange}
              name="description"
              row={2}
              placeholder="Description"
              value={activity && activity.description}
            />
            <Form.Input
              onChange={handleInputChange}
              name="category"
              placeholder="Category"
              value={activity && activity.category}
            />
            <Form.Input
              onChange={handleInputChange}
              name="date"
              type="datetime-local"
              placeholder="Date"
              value={activity && activity.date}
            />
            <Form.Input
              onChange={handleInputChange}
              name="city"
              placeholder="City"
              value={activity && activity.city}
            />
            <Form.Input
              onChange={handleInputChange}
              name="venue"
              placeholder="Venue"
              value={activity && activity.venue}
            />
            <Button
              loading={submitting}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              floated="right"
              type="button"
              content="Cancel"
              onClick={() =>
                id ? redirectToActivity(id) : push("/activities")
              }
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  activity: selectActivity,
  editMode: selectEditMode,
  key: selectActivityId,
  submitting: selectSubmitting,
  isFetching: selectIsActivityFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchActivity: (id) => dispatch(fetchActivityStart(id)),
  createActivity: (activity, onSuccess, onError) =>
    dispatch(createActivityStart(activity, onSuccess, onError)),
  editActivity: (activity, onSuccess, onError) =>
    dispatch(editActivityStart(activity, onSuccess, onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityForm);