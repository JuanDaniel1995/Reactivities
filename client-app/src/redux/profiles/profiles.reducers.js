import ProfilesTypes from "./profiles.types";

const INITIAL_STATE = {
  profile: null,
  isFetching: false,
  uploading: false,
  loading: false,
};

const profilesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProfilesTypes.RETRIEVE_PROFILE_START:
      return {
        ...state,
        isFetching: true,
      };
    case ProfilesTypes.RETRIEVE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        isFetching: false,
      };
    case ProfilesTypes.RETRIEVE_PROFILE_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case ProfilesTypes.UPLOAD_PHOTO_START:
      return {
        ...state,
        uploading: true,
      };
    case ProfilesTypes.UPLOAD_PHOTO_SUCCESS: {
      const photos = [...state.profile.photos, action.payload];
      return {
        ...state,
        profile: { ...state.profile, photos },
        uploading: false,
      };
    }
    case ProfilesTypes.SET_MAIN_PHOTO_START:
      return {
        ...state,
        loading: true,
      };
    case ProfilesTypes.SET_MAIN_PHOTO_SUCCESS: {
      const id = action.payload;
      let photos = state.profile.photos;
      photos.find((a) => a.isMain).isMain = false;
      photos.find((a) => a.id === id).isMain = true;
      return {
        ...state,
        profile: {
          ...state.profile,
          image: photos.find((a) => a.isMain).url,
          photos,
        },
        loading: false,
      };
    }
    case ProfilesTypes.DELETE_PHOTO_START:
      return {
        ...state,
        loading: true,
      };
    case ProfilesTypes.DELETE_PHOTO_SUCCESS: {
      const id = action.payload;
      let photos = state.profile.photos.filter((p) => p.id !== id);
      return {
        ...state,
        profile: {
          ...state.profile,
          photos,
        },
        loading: false,
      };
    }
    case ProfilesTypes.UPDATE_PROFILE_START:
      return {
        ...state,
        loading: true,
      };
    case ProfilesTypes.UPDATE_PROFILE_SUCCESS: {
      const profile = action.payload;
      return {
        ...state,
        profile: {
          ...state.profile,
          ...profile,
        },
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default profilesReducer;
