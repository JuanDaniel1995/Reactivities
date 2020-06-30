import React from "react";
import { connect } from "react-redux";
import { Form as FinalForm, Field } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import { Form, Button } from "semantic-ui-react";

import TextInput from "../textInput/textInput";
import TextAreaInput from "../textAreaInput/textAreaInput";

import agent from "../../api/agent";

import { updateProfileSuccess } from "../../redux/profiles/profiles.actions";
import { updateUser } from "../../redux/user/user.actions";

const validate = combineValidators({
  displayName: isRequired("displayName"),
});

const ProfileEditForm = ({ updateProfileSuccess, updateUser, profile }) => {
  const onSubmit = async (values) => {
    try {
      const { displayName, bio } = values;
      const user = { displayName, bio: bio || "" };
      await agent.Profiles.updateProfile(user);
      updateProfileSuccess(user);
      updateUser(displayName);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FinalForm
      onSubmit={onSubmit}
      validate={validate}
      initialValues={profile}
      render={({ handleSubmit, invalid, pristine, submitting }) => (
        <Form onSubmit={handleSubmit} error>
          <Field
            name="displayName"
            component={TextInput}
            placeholder="Display Name"
            value={profile.displayName}
          />
          <Field
            name="bio"
            component={TextAreaInput}
            rows={3}
            placeholder="Bio"
            value={profile.bio}
          />
          <Button
            loading={submitting}
            floated="right"
            disabled={invalid || pristine}
            positive
            content="Update profile"
          />
        </Form>
      )}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateProfileSuccess: (profile) => dispatch(updateProfileSuccess(profile)),
  updateUser: (user) => dispatch(updateUser(user)),
});

export default connect(null, mapDispatchToProps)(ProfileEditForm);
