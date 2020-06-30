import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Tab, Grid, Header, Button } from "semantic-ui-react";

import ProfileEditForm from "./profileEditForm";

import { selectProfile } from "../../redux/profiles/profiles.selectors";
import { selectUser } from "../../redux/user/user.selectors";

const ProfileDescription = ({ profile, user }) => {
  const { username: currentUser } = user || {};
  const { username: currentProfile } = profile || {};
  const [editMode, setEditMode] = useState(false);
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={`About ${profile && profile.displayName}`}
          />
          {currentUser === currentProfile && (
            <Button
              floated="right"
              basic
              content={editMode ? "Cancel" : "Edit Profile"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <ProfileEditForm profile={profile} />
          ) : (
            <span>{profile && profile.bio}</span>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

const mapStateToProps = createStructuredSelector({
  profile: selectProfile,
  user: selectUser,
});

export default connect(mapStateToProps)(ProfileDescription);
