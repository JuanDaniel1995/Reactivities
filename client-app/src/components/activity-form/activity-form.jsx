import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Form, Button, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";

import { setEditMode } from "../../redux/activity/activity.actions";
import { createActivityStart } from "../../redux/activity/activity.actions";
import { editActivityStart } from "../../redux/activity/activity.actions";

import { selectedActivity } from "../../redux/activity/activity.selectors";
import { selectedActivityId } from "../../redux/activity/activity.selectors";
import { selectEditMode } from "../../redux/activity/activity.selectors";
import { selectSubmitting } from "../../redux/activity/activity.selectors";

const ActivityForm = ({
  editMode,
  setEditMode,
  activity: initialFormState,
  createActivity,
  editActivity,
  submitting,
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };

  const [activity, setActivity] = useState(initializeForm);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  return editMode ? (
    <Segment clearing>
      <h1>{activity.title}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="Title"
          value={activity.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          row={2}
          placeholder="Description"
          value={activity.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name="category"
          placeholder="Category"
          value={activity.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name="date"
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
        />
        <Form.Input
          onChange={handleInputChange}
          name="city"
          placeholder="City"
          value={activity.city}
        />
        <Form.Input
          onChange={handleInputChange}
          name="venue"
          placeholder="Venue"
          value={activity.venue}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  activity: selectedActivity,
  editMode: selectEditMode,
  key: selectedActivityId,
  submitting: selectSubmitting,
});

const mapDispatchToProps = (dispatch) => ({
  setEditMode: (mode) => dispatch(setEditMode(mode)),
  createActivity: (activity) => dispatch(createActivityStart(activity)),
  editActivity: (activity) => dispatch(editActivityStart(activity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityForm);
