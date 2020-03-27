import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

const Header = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button positive content="Create activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Header;
