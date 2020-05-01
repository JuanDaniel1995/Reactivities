import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Form, Button, Segment, Dimmer, Loader, Grid } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { Form as FinalForm, Field } from "react-final-form";
import { format } from "date-fns";

import TextInput from "../textInput/textInput";
import TextAreaInput from "../textAreaInput/textAreaInput";
import DateInput from "../dateInput/dateInput";
import SelectInput from "../selectInput/selectInput";
import { category } from "../selectInput/categoryOptions";

import { combineDateAndTime } from "../../util/util";

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
          id: undefined,
          title: "",
          category: "",
          description: "",
          date: undefined,
          time: undefined,
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
    return () => {
      if (id)
        setActivity({
          id: undefined,
          title: "",
          category: "",
          description: "",
          date: undefined,
          time: undefined,
          city: "",
          venue: "",
        });
    };
  }, [fetchActivity, initialFormState, push, id]);

  const handleFinalFormSubmit = (values) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = format(dateAndTime, "YYYY-MM-dd'T'HH:mm:ss.SSS");
    if (!activity.id) {
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
          <FinalForm
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={activity.title}
                  component={TextInput}
                />
                <Field
                  name="description"
                  placeholder="Description"
                  rows={3}
                  value={activity.description}
                  component={TextAreaInput}
                />
                <Field
                  component={SelectInput}
                  options={category}
                  name="category"
                  placeholder="Category"
                  value={activity.category}
                />
                <Form.Group widths="equal">
                  <Field
                    component={DateInput}
                    name="date"
                    date={true}
                    placeholder="Date"
                    value={activity.date}
                  />
                  <Field
                    component={DateInput}
                    name="time"
                    time={true}
                    placeholder="Time"
                    value={activity.time}
                  />
                </Form.Group>

                <Field
                  component={TextInput}
                  name="city"
                  placeholder="City"
                  value={activity.city}
                />
                <Field
                  component={TextInput}
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
                  floated="right"
                  type="button"
                  content="Cancel"
                  onClick={() =>
                    id ? redirectToActivity(id) : push("/activities")
                  }
                />
              </Form>
            )}
          />
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
