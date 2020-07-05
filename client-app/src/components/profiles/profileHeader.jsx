import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  Segment,
  Item,
  Header,
  Button,
  Grid,
  Statistic,
  Divider,
  Reveal,
} from "semantic-ui-react";

import {
  followProfile,
  unfollowProfile,
} from "../../redux/profiles/profiles.actions";

import { selectIsProfileLoading } from "../../redux/profiles/profiles.selectors";
import { selectUser } from "../../redux/user/user.selectors";

const ProfileHeader = ({
  user,
  profile,
  loading,
  followProfile,
  unfollowProfile,
}) => {
  const { username: currentUser } = user || {};
  const { username: currentProfile } = profile || {};
  if (!profile) return null;
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="small"
                src={profile.image || "/assets/user.png"}
              />
              <Item.Content verticalAlign="middle">
                <Header as="h1">{profile.displayName}</Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group widths={2}>
            <Statistic label="Followers" value={profile.followersCount} />
            <Statistic label="Following" value={profile.followingCount} />
          </Statistic.Group>
          <Divider />
          {currentUser !== currentProfile && (
            <Reveal animated="move">
              <Reveal.Content visible style={{ width: "100%" }}>
                <Button
                  fluid
                  color="teal"
                  content={profile.following ? "Following" : "Not following"}
                />
              </Reveal.Content>
              <Reveal.Content hidden>
                <Button
                  loading={loading}
                  fluid
                  basic
                  color={profile.following ? "red" : "green"}
                  content={profile.following ? "Unfollow" : "Follow"}
                  onClick={
                    profile.following
                      ? () => unfollowProfile(profile.username)
                      : () => followProfile(profile.username)
                  }
                />
              </Reveal.Content>
            </Reveal>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectIsProfileLoading,
  user: selectUser,
});

const mapDispatchToProps = (dispatch) => ({
  followProfile: (username) => dispatch(followProfile(username)),
  unfollowProfile: (username) => dispatch(unfollowProfile(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);
