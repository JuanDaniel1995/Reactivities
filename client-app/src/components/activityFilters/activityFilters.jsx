import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Menu, Header } from "semantic-ui-react";
import { Calendar } from "react-widgets";

import {
  setIsGoing,
  setIsHost,
  setStartDate,
  resetInitial,
} from "../../redux/activity/activity.actions";

import {
  selectIsGoing,
  selectIsHost,
  selectStartDate,
} from "../../redux/activity/activity.selectors";

const ActivityFilters = ({
  isGoing,
  isHost,
  startDate,
  setIsGoing,
  setIsHost,
  setStartDate,
  resetInitial,
}) => {
  return (
    <>
      <Menu vertical size={"large"} style={{ width: "100%", marginTop: 50 }}>
        <Header icon={"filter"} attached color={"teal"} content={"Filters"} />
        <Menu.Item
          active={!isGoing && !isHost}
          onClick={() => resetInitial()}
          color={"blue"}
          name={"all"}
          content={"All Activities"}
        />
        <Menu.Item
          active={isGoing}
          onClick={() => setIsGoing()}
          color={"blue"}
          name={"username"}
          content={"I'm Going"}
        />
        <Menu.Item
          active={isHost}
          onClick={() => setIsHost()}
          color={"blue"}
          name={"host"}
          content={"I'm hosting"}
        />
      </Menu>
      <Header
        icon={"calendar"}
        attached
        color={"teal"}
        content={"Select Date"}
      />
      <Calendar
        onChange={(date) => date && setStartDate(date)}
        value={startDate || new Date()}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  isGoing: selectIsGoing,
  isHost: selectIsHost,
  startDate: selectStartDate,
});

const mapDispatchToProps = (dispatch) => ({
  setIsGoing: () => dispatch(setIsGoing()),
  setIsHost: () => dispatch(setIsHost()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  resetInitial: () => dispatch(resetInitial()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityFilters);
