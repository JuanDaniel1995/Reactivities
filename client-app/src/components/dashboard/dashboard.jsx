import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Grid, Dimmer, Loader } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";

import ActivityList from "../activityList/activityList";
import ActivityFilters from "../activityFilters/activityFilters";

import { fetchNext } from "../../redux/activity/activity.actions";

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
import { useEffect } from "react";

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
}) => {
  const handleGetNext = () => {
    if (page + 1 < totalPages)
      fetchNext(limit, page + 1, isGoing, isHost, startDate);
  };

  useEffect(() => {
    if (filterChanged) fetchNext(5, 0, isGoing, isHost, startDate);
  }, [fetchNext, isGoing, isHost, startDate, filterChanged]);

  if (isFetching || filterChanged) {
    return (
      <Dimmer active inverted>
        <Loader content="Loading activities..." />
      </Dimmer>
    );
  }

  return (
    <>
      <Grid>
        <Grid.Column width={10}>
          <InfiniteScroll
            loadMore={handleGetNext}
            hasMore={!isNextFetching && page + 1 < totalPages}
            initialLoad={false}
          >
            <ActivityList />
          </InfiniteScroll>
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
  fetchNext: (limit, page, isGoing, isHost, startDate) =>
    dispatch(fetchNext(limit, page, isGoing, isHost, startDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
