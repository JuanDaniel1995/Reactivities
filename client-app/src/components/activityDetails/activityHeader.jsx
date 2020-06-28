import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Segment, Image, Item, Button, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import {
  attendActivityStart,
  unattendActivityStart,
} from "../../redux/activity/activity.actions";

import { selectUser } from "../../redux/user/user.selectors";

import { selectSubmitting } from "../../redux/activity/activity.selectors";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

const ActivityHeader = ({
  activity,
  user,
  submitting,
  attendActivity,
  unattendActivity,
}) => {
  const host = activity.attendees.find((a) => a.isHost);
  const attendee = activity.attendees.some(
    (a) => !a.isHost && a.username === user.username
  );
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: "white" }}
                />
                <p>{format(activity.date, "eeee do MMMM")}</p>
                <p>
                  Hosted by{" "}
                  <Link to={`/profile/${host.username}`}>
                    {" "}
                    <strong>{host.displayName}</strong>
                  </Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {host.username !== user.username && !attendee && (
          <Button
            color="teal"
            loading={submitting}
            onClick={() => {
              const { token, ...attendee } = user;
              attendActivity(activity.id, { ...attendee, isHost: false });
            }}
          >
            Join Activity
          </Button>
        )}
        {attendee && (
          <Button
            loading={submitting}
            onClick={() => {
              const { token, ...attendee } = user;
              unattendActivity(activity.id, { ...attendee, isHost: false });
            }}
          >
            Cancel attendance
          </Button>
        )}
        {host.username === user.username && (
          <Button
            as={Link}
            to={`/manage/${activity.id}`}
            color="orange"
            floated="right"
          >
            Manage Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  submitting: selectSubmitting,
});

const mapDispatchToProps = (dispatch) => ({
  attendActivity: (id, user) => dispatch(attendActivityStart(id, user)),
  unattendActivity: (id, user) => dispatch(unattendActivityStart(id, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityHeader);
