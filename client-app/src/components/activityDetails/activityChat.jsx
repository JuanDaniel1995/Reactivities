import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Form as FinalForm, Field } from "react-final-form";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { Segment, Header, Comment, Form, Button } from "semantic-ui-react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { formatDistance } from "date-fns";

import TextAreaInput from "../textAreaInput/textAreaInput";

import { addCommentSuccess } from "../../redux/activity/activity.actions";

import { selectToken } from "../../redux/user/user.selectors";

const ActivityChat = ({ activity, token, addCommentSuccess }) => {
  const [hubConnection, setHubConnection] = useState(undefined);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/chat", {
        accessTokenFactory: () => token,
      })
      .build();
    connection.start().then(() => {
      connection.invoke("AddToGroup", activity.id);
    });
    connection.on("ReceiveComment", (comment) => {
      addCommentSuccess(activity.id, comment);
    });
    setHubConnection(connection);
    return () => {
      if (connection.state !== "Connecting") {
        connection.invoke("RemoveFromGroup", activity.id).then(() => {
          connection.stop().then(() => {
            console.log("Connection stopped");
            console.log(connection.state);
          });
        });
      }
    };
  }, [activity.id, addCommentSuccess, token]);

  const addComment = async (comment) => {
    comment.activityId = activity.id;
    try {
      await hubConnection.invoke("SendComment", comment);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          {activity &&
            activity.comments &&
            activity.comments.map((comment) => (
              <Comment key={comment.id}>
                <Comment.Avatar src={comment.image || "/assets/user.png"} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profile/${comment.username}`}>
                    {comment.displayName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{formatDistance(comment.createdAt, new Date())}</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.body}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}
          <FinalForm
            onSubmit={addComment}
            render={({ handleSubmit, submitting, form }) => (
              <Form onSubmit={() => handleSubmit().then(() => form.reset())}>
                <Field
                  name="body"
                  component={TextAreaInput}
                  rows={2}
                  placeholder="Add your comment"
                />
                <Button
                  content="Add Reply"
                  labelPosition="left"
                  icon="edit"
                  primary
                  loading={submitting}
                />
              </Form>
            )}
          />
        </Comment.Group>
      </Segment>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

const mapDispatchToProps = (dispatch) => ({
  addCommentSuccess: (id, comment) => dispatch(addCommentSuccess(id, comment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityChat);
