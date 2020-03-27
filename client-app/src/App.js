import React, { useState, useEffect } from "react";
import { List, Container } from "semantic-ui-react";
import axios from "axios";

import Header from "./components/header/header";
import Dashboard from "./components/dashboard/dashboard";

const App = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setselectedActivity] = useState(null);

  const handleSelectActivity = id => {
    setselectedActivity(activities.filter(a => a.id === id)[0]);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then(response => {
      setActivities(response.data);
    });
  }, []);

  return (
    <>
      <Header />
      <Container style={{ marginTop: "7em" }}>
        <Dashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
        />
      </Container>
    </>
  );
};

export default App;
