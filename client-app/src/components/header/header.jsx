import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Menu, Container, Button } from "semantic-ui-react";

import { openCreateForm } from "../../redux/activity/activity.actions";

const Header = ({ openCreateForm }) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to="/activities" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createActivity"
            positive
            content="Create activity"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

const mapDispatchToProps = (dispatch) => ({
  openCreateForm: () => dispatch(openCreateForm()),
});

export default connect(null, mapDispatchToProps)(Header);
