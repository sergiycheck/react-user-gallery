import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectAllSearchedPostByIds,
  selectSearchedPostById,
  searchUsersPostsByUserName,
  selectSearchDataStatus,
  selectSearchDataAllEntitiesLength,
  changeSearchDataStatusToStartFetching,
  changePaginationPropsForSearchQuery,
  setSearchQuery,
  selectFromAndToForPagination,
} from "./searchDataSlice";

import { StatusData } from "../../../api/ApiRoutes";

import "../Explore.scss";

import { ExplorePostExcerpt } from "../ExplorePostExcerpt.jsx";

import { atTheBottom } from "../../../helpers/atTheBottom";

import {
  useLoadingStatusToRenderLoader,
  useStatusAndArrOfIdsToFetchData,
  scrollHandlerWithCallBack,
  useLoadingStatusToAddOrRemoveScrollListeners,
} from "../../loadMoreDataOnScrollLogic/loadMoreDataRenderAndHooks.js";

import { logm } from "../../../helpers/custom-logger";

export const SearchDataComponent = ({ match }) => {
  logm("match.params ", match.params);

  const { query } = match.params; // bug. Dispatching action for previous query

  const dispatch = useDispatch();

  const searchDataPostsIds = useSelector(selectAllSearchedPostByIds);

  const searchDataPostsStatus = useSelector(selectSearchDataStatus);

  const allFetchedSearchDataPostsLength = useSelector(selectSearchDataAllEntitiesLength);

  // const searchQuery = useSelector(selectSearchQuery);

  const fromAndTo = useSelector(selectFromAndToForPagination);

  useEffect(() => {
    dispatch(setSearchQuery({ query }));
  }, [dispatch, query]);

  //handleScroll must be without params // otherwise not working
  const handleScroll = scrollHandlerWithCallBack(atTheBottom, () => {
    dispatch(changeSearchDataStatusToStartFetching({ newStatus: StatusData.idle }));
  });

  useLoadingStatusToAddOrRemoveScrollListeners({
    itemIdsArr: searchDataPostsIds,
    allItemsLength: allFetchedSearchDataPostsLength,
    handler: handleScroll,
  });

  useStatusAndArrOfIdsToFetchData(
    {
      itemsStatus: searchDataPostsStatus,
      idsArr: searchDataPostsIds,
      allItemsLength: allFetchedSearchDataPostsLength,
      scrollHandler: handleScroll,
    },
    async function fetchPostAndSetPagination() {
      logm("fetching posts for query", query);

      await dispatch(searchUsersPostsByUserName({ ...fromAndTo }));

      await dispatch(changePaginationPropsForSearchQuery({ query: query }));
    }
  );

  const { statusPostLoadingData } = useLoadingStatusToRenderLoader(searchDataPostsStatus);

  const searchPostsContent = searchDataPostsIds.map((postId, index) => {
    return (
      <ExplorePostExcerpt key={postId} postId={postId} selectDataById={selectSearchedPostById}></ExplorePostExcerpt>
    );
  });

  return (
    <div className="site-wrap">
      <div className="main-content">
        <div className="container-fluid photos">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col my-4 ">
                <h2>Search results for {query ? query : "none"}</h2>
              </div>
            </div>
          </div>

          <div className="row align-items-stretch my-4 p-2">
            {searchPostsContent}

            {statusPostLoadingData}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDataComponent;
