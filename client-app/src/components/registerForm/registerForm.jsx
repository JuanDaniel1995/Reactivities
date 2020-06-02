import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Form as FinalForm, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { Form, Button, Header } from "semantic-ui-react";
import { combineValidators, isRequired } from "revalidate";

import ErrorMessage from "../errorMessage/errorMessage";
import TextInput from "../textInput/textInput";

import agent from "../../api/agent";

import { registerSuccess } from "../../redux/user/user.actions";

const validate = combineValidators({
  username: isRequired("username"),
  displayName: isRequired("displayName"),
  email: isRequired("email"),
  password: isRequired("password"),
});

const RegisterForm = ({ history: { push }, registerSuccess }) => {
  const onSubmit = async (values) => {
    try {
      const user = await agent.User.register(values);
      registerSuccess(user);
      push("/activities");
    } catch (error) {
      return {
        [FORM_ERROR]: error,
      };
    }
  };
  return (
    <FinalForm
      onSubmit={onSubmit}
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as="h2"
            content="Sign up to Reactivities"
            color="teal"
            textAlign="center"
          />
          <Field name="username" component={TextInput} placeholder="Username" />
          <Field
            name="displayName"
            component={TextInput}
            placeholder="Display Name"
          />
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            component={TextInput}
            placeholder="Password"
            type="password"
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color="teal"
            content="Register"
            fluid
          />
        </Form>
      )}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  registerSuccess: (user) => dispatch(registerSuccess(user)),
});

export default withRouter(connect(null, mapDispatchToProps)(RegisterForm));
