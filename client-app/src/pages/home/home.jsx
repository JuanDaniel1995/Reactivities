import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Container, Segment, Header, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import LoginForm from "../../components/loginForm/loginForm";
import RegisterForm from "../../components/registerForm/registerForm";
import ModalContainer from "../../components/modals/modalContainer";

import { selectUser, isLoggedIn } from "../../redux/user/user.selectors";

const HomePage = ({ isLoggedIn, user }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(null);
  const openModal = (content) => {
    setOpen(true);
    setContent(content);
  };
  return (
    <>
      <ModalContainer open={open} content={content} />
      <Segment inverted textAlign="center" vertical className="masthead">
        <Container text>
          <Header as="h1" inverted>
            <Image
              size="massive"
              src="/assets/logo.png"
              alt="logo"
              style={{ marginBottom: 12 }}
            />
            Reactivities
          </Header>
          {isLoggedIn && user ? (
            <>
              <Header
                as="h2"
                inverted
                content={`Welcome back ${user.displayName}`}
              />
              <Button as={Link} to="/activities" size="huge" inverted>
                Go to activities!
              </Button>
            </>
          ) : (
            <>
              <Header as="h2" inverted content="Welcome to Reactivities" />
              <Button
                onClick={() => openModal(<LoginForm />)}
                size="huge"
                inverted
              >
                Login
              </Button>
              <Button
                onClick={() => openModal(<RegisterForm />)}
                size="huge"
                inverted
              >
                Register
              </Button>
            </>
          )}
        </Container>
      </Segment>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  isLoggedIn: isLoggedIn,
});

export default connect(mapStateToProps)(HomePage);
