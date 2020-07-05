import React from "react";

import { Tab } from "semantic-ui-react";

import ProfilePhotos from "./profilePhotos";
import ProfileDescription from "./profileDescription";
import ProfileFollowings from "./profileFollowings";

const panes = [
  { menuItem: "About", render: () => <ProfileDescription /> },
  { menuItem: "Photos", render: () => <ProfilePhotos /> },
  {
    menuItem: "Activities",
    render: () => <Tab.Pane>Activities content</Tab.Pane>,
  },
  {
    menuItem: "Followers",
    render: () => <ProfileFollowings entity="followers" />,
  },
  {
    menuItem: "Following",
    render: () => <ProfileFollowings entity="following" />,
  },
];

const ProfileContent = () => {
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
};

export default ProfileContent;
