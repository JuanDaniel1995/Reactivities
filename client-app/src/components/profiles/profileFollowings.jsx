import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Tab, Grid, Header, Card } from "semantic-ui-react";
import ProfileCard from "./profileCard";

import { fetchFollowings } from "../../redux/profiles/profiles.actions";

import {
  selectProfile,
  selectFollowings,
  selectIsProfileLoading,
} from "../../redux/profiles/profiles.selectors";

const ProfileFollowings = ({
  entity,
  loading,
  fetchFollowings,
  profile,
  followings,
}) => {
  useEffect(() => {
    profile && fetchFollowings(profile.username, entity);
  }, [fetchFollowings, profile, entity]);

  if (!profile) return null;
  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={
              true
                ? `People following ${profile.displayName}`
                : `People ${profile.displayName} is following`
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5}>
            {followings.map((profile) => (
              <ProfileCard key={profile.username} profile={profile} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

const mapStateToProps = createStructuredSelector({
  profile: selectProfile,
  followings: selectFollowings,
  loading: selectIsProfileLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFollowings: (username, predicate) =>
    dispatch(fetchFollowings(username, predicate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFollowings);
