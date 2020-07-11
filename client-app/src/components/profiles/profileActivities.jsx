import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Tab, Grid, Header, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import { fetchUserActivities } from "../../redux/profiles/profiles.actions";

import {
  selectProfile,
  selectLoadingActivities,
  selectUserActivities,
} from "../../redux/profiles/profiles.selectors";

const panes = [
  { menuItem: "Future Events", pane: { key: "futureEvents" } },
  { menuItem: "Past Events", pane: { key: "pastEvents" } },
  { menuItem: "Hosting", pane: { key: "hosted" } },
];

const ProfileActivities = ({
  profile,
  userActivities,
  loadUserActivities,
  loadingActivities,
}) => {
  useEffect(() => {
    loadUserActivities(profile.username);
  }, [loadUserActivities, profile]);

  const handleTabChange = (e, data) => {
    let predicate;
    switch (data.activeIndex) {
      case 1:
        predicate = "past";
        break;
      case 2:
        predicate = "hosting";
        break;
      default:
        predicate = "future";
        break;
    }
    loadUserActivities(profile.username, predicate);
  };

  return (
    <Tab.Pane loading={loadingActivities}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content={"Activities"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userActivities.map((activity) => (
              <Card
                as={Link}
                to={`/activities/${activity.id}`}
                key={activity.id}
              >
                <Image
                  src={`/assets/categoryImages/${activity.category}.jpg`}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header textAlign="center">{activity.title}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{format(new Date(activity.date), "do LLL")}</div>
                    <div>{format(new Date(activity.date), "h:mm a")}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

const mapStateToProps = createStructuredSelector({
  profile: selectProfile,
  loadingActivities: selectLoadingActivities,
  userActivities: selectUserActivities,
});

const mapDispatchToProps = (dispatch) => ({
  loadUserActivities: (username, predicate) =>
    dispatch(fetchUserActivities(username, predicate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileActivities);
