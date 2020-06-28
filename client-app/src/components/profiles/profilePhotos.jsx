import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Tab, Header, Card, Image, Button, Grid } from "semantic-ui-react";

import PhotoUpload from "../photoUpload/photoUpload";

import agent from "../../api/agent";

import {
  uploadPhoto,
  uploadPhotoSuccess,
  setMainPhoto,
  deletePhoto,
} from "../../redux/profiles/profiles.actions";

import { setImage } from "../../redux/user/user.actions";

import {
  selectProfile,
  selectIsPhotoUploading,
  selectIsProfileLoading,
} from "../../redux/profiles/profiles.selectors";

import { selectUser } from "../../redux/user/user.selectors";

const ProfilePhotos = ({
  profile,
  user,
  uploading,
  uploadPhoto,
  uploadPhotoSuccess,
  setImage,
  setMainPhoto,
  loading,
  deletePhoto,
}) => {
  const { username: currentUser } = user || {};
  const { username: currentProfile } = profile || {};
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState(undefined);
  const [deleteTarget, setDeleteTarget] = useState(undefined);

  const handleUploadImage = async (file) => {
    try {
      uploadPhoto();
      const result = await agent.Profiles.uploadPhoto(file);
      uploadPhotoSuccess({ url: result.url, id: result.id });
      setAddPhotoMode(false);
      result.isMain && setImage(result.url);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header floated="left" icon="image" content="Photos" />
          {currentUser === currentProfile && (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? "Cancel" : "Add photo"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUpload uploadPhoto={handleUploadImage} loading={uploading} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile &&
                profile.photos.map((photo) => (
                  <Card key={photo.id}>
                    <Image src={photo.url} />
                    {currentUser === currentProfile && (
                      <Button.Group fluid widths={2}>
                        <Button
                          name={photo.id}
                          onClick={(e) => {
                            setTarget(e.currentTarget.name);
                            setMainPhoto(photo);
                          }}
                          disabled={photo.isMain}
                          loading={loading && target === photo.id}
                          basic
                          positive
                          content="Main"
                        />
                        <Button
                          name={photo.id}
                          onClick={(e) => {
                            setDeleteTarget(e.currentTarget.name);
                            deletePhoto(photo.id);
                          }}
                          disabled={photo.isMain}
                          loading={loading && deleteTarget === photo.id}
                          basic
                          negative
                          icon="trash"
                        />
                      </Button.Group>
                    )}
                  </Card>
                ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

const mapStateToProps = createStructuredSelector({
  profile: selectProfile,
  user: selectUser,
  uploading: selectIsPhotoUploading,
  loading: selectIsProfileLoading,
});

const mapDispatchToProps = (dispatch) => ({
  uploadPhoto: () => dispatch(uploadPhoto()),
  uploadPhotoSuccess: (image) => dispatch(uploadPhotoSuccess(image)),
  setImage: (image) => dispatch(setImage(image)),
  setMainPhoto: (photo) => dispatch(setMainPhoto(photo)),
  deletePhoto: (id) => dispatch(deletePhoto(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePhotos);
