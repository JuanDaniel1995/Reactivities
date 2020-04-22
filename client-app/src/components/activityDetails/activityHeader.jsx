import React from "react";
import {
  Responsive,
  Segment,
  Image,
  Item,
  Button,
  Header,
} from "semantic-ui-react";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

const ActivityHeader = ({ activity }) => {
  return (
    <Segment.Group>
      <Responsive
        as={Segment}
        basic
        attached="top"
        style={{ padding: "0" }}
        size="huge"
        {...Responsive.onlyMobile}
      >
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: "white" }}
                />
                <p>{activity.date}</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Responsive>
      <Responsive
        as={Segment}
        basic
        attached="top"
        style={{ padding: "0" }}
        {...Responsive.onlyComputer}
      >
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: "white" }}
                />
                <p>{activity.date}</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Responsive>
      <Responsive
        as={Segment}
        clearing
        attached="bottom"
        {...Responsive.onlyMobile}
      >
        <Button color="teal" size="huge">
          Join Activity
        </Button>
        <Button size="huge">Cancel attendance</Button>
        <Button color="orange" size="huge">
          Manage Event
        </Button>
      </Responsive>

      <Responsive
        as={Segment}
        clearing
        attached="bottom"
        {...Responsive.onlyComputer}
      >
        <Button color="teal">Join Activity</Button>
        <Button>Cancel attendance</Button>
        <Button color="orange" floated="right">
          Manage Event
        </Button>
      </Responsive>
    </Segment.Group>
  );
};

export default ActivityHeader;
