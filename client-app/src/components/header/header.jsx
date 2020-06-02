import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { NavLink, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { Menu, Container, Button, Image, Dropdown } from "semantic-ui-react";

import { logOut } from "../../redux/user/user.actions";

import { selectUser, isLoggedIn } from "../../redux/user/user.selectors";

const Header = ({ user, logOut, history: { push }, setToken }) => {
  const signOut = () => {
    logOut();
    push("/");
  };

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
        {user && (
          <Menu.Item position="right">
            <Image
              avatar
              spaced="right"
              src={user.image || "/assets/user.png"}
            />
            <Dropdown pointing="top left" text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/username`}
                  text="My profile"
                  icon="user"
                />
                <Dropdown.Item
                  onClick={() => signOut()}
                  text="Logout"
                  icon="power"
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  isLoggedIn: isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOut()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
