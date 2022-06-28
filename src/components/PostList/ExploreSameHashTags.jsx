import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  fetchPostsWithSameHashTags,

  // fetchSingleSameHashTagsPost,
  changePostsSameHashTagsStatusToStartFetching,
  selectSameTagsPostById,
  selectSameTagsPostIds,
  selectFetchedAllSameTagsPostsLength,
  selectSameTagsPostsStatus,
  resetState,
  selectSameTagsPostsCurrentPostId,
  setCurrentPostId,
} from "./postsWithSameHashTagsSlice.js";

import { ExploreWrapped } from "../explore/ExploreWrapped";

export const ExploreSameHashTags = ({ postId }) => {
  const dispatch = useDispatch();

  const currentPostId = useSelector(selectSameTagsPostsCurrentPostId);

  useEffect(() => {
    dispatch(setCurrentPostId({ postId }));
  }, [postId, dispatch]);

  useEffect(() => {
    if (currentPostId !== null && postId !== currentPostId) {
      dispatch(resetState());
    }
  }, [postId, currentPostId, dispatch]);

  const explorePostsWithSameTagsMethods = {
    selectItemsIds: selectSameTagsPostIds,

    selectItemById: selectSameTagsPostById,

    selectItemsStatus: selectSameTagsPostsStatus,

    selectFetchedAllItemsLength: selectFetchedAllSameTagsPostsLength,

    changeItemsStatusToStartFetching: changePostsSameHashTagsStatusToStartFetching,
    fetchItems: fetchPostsWithSameHashTags,

    postId,
  };

  return (
    <div className="main-content">
      <ExploreWrapped explorePageDataMethods={explorePostsWithSameTagsMethods}></ExploreWrapped>
    </div>
  );
};
