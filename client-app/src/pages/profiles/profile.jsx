import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Grid, Dimmer, Loader } from "semantic-ui-react";

import ProfileHeader from "../../components/profiles/profileHeader";
import ProfileContent from "../../components/profiles/profileContent";

import { fetchProfile } from "../../redux/profiles/profiles.actions";

import {
  selectProfile,
  selectIsProfileFetching,
} from "../../redux/profiles/profiles.selectors";

const ProfilePage = ({
  match: {
    params: { username },
  },
  profile,
  fetchProfile,
  isFetching,
}) => {
  useEffect(() => {
    fetchProfile(username);
  }, [fetchProfile, username]);
  if (isFetching) {
    return (
      <Dimmer active inverted>
        <Loader content="Loading profile..." />
      </Dimmer>
    );
  }
  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader profile={profile} />
        <ProfileContent />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  profile: selectProfile,
  isFetching: selectIsProfileFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProfile: (user) => dispatch(fetchProfile(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
