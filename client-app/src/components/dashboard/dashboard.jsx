import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Grid, Loader } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";

import ActivityList from "../activityList/activityList";
import ActivityPlaceholder from "../activityPlaceholder/activityPlaceholder";

import ActivityFilters from "../activityFilters/activityFilters";

import { fetchNext } from "../../redux/activity/activity.actions";

import { logOut } from "../../redux/user/user.actions";

import {
  selectIsActivityFetching,
  selectIsFetchingNext,
  selectPage,
  selectLimit,
  selectIsGoing,
  selectIsHost,
  selectStartDate,
  selectActivityCount,
  selectTotalPages,
  selectFilterChanged,
} from "../../redux/activity/activity.selectors";

const Dashboard = ({
  fetchNext,
  isFetching,
  isNextFetching,
  page,
  limit,
  isGoing,
  isHost,
  startDate,
  totalPages,
  filterChanged,
  logOut,
  history: { push },
}) => {
  const handleGetNext = () => {
    if (page + 1 < totalPages)
      fetchNext(limit, page + 1, isGoing, isHost, startDate, () => {
        logOut();
        push("/");
      });
  };

  useEffect(() => {
    if (filterChanged)
      fetchNext(5, 0, isGoing, isHost, startDate, () => {
        logOut();
        push("/");
      });
  }, [fetchNext, isGoing, isHost, startDate, filterChanged, logOut, push]);

  return (
    <>
      <Grid>
        <Grid.Column width={10}>
          {isFetching || filterChanged ? (
            <>
              <ActivityPlaceholder />
            </>
          ) : (
            <InfiniteScroll
              loadMore={handleGetNext}
              hasMore={!isNextFetching && page + 1 < totalPages}
              initialLoad={false}
            >
              <ActivityList />
            </InfiniteScroll>
          )}
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityFilters />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={isNextFetching} />
        </Grid.Column>
      </Grid>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsActivityFetching,
  isNextFetching: selectIsFetchingNext,
  page: selectPage,
  limit: selectLimit,
  isGoing: selectIsGoing,
  isHost: selectIsHost,
  startDate: selectStartDate,
  totalPages: selectTotalPages,
  activityCount: selectActivityCount,
  filterChanged: selectFilterChanged,
});

const mapDispatchToProps = (dispatch) => ({
  fetchNext: (limit, page, isGoing, isHost, startDate, onExpiredToken) =>
    dispatch(
      fetchNext(limit, page, isGoing, isHost, startDate, onExpiredToken)
    ),
  logOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
