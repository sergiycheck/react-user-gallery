import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import Post from "./Post.js";

import {
  fetchPosts,
  selectPostIds,
  changePostStatusToStartFetching,
  selectFetchedAllPostsLength,
  selectLoadMorePostsScrollListener,
  loadMorePostsScrollListenerEnum,
  setLoadMorePostsScrollListener,
} from "../redux_components/posts/postSlice";

import { StatusData } from "../../api/ApiRoutes";

import { Loader } from "../helperComponents/Loader.jsx";

const getScrollListener = ({
  trackingStatus,
  loadingStatus,
  dispatchCallBack,
}) => {
  const scrollListener = function () {
    const heightAndOffset = Math.ceil(window.innerHeight + window.pageYOffset);
    const bodyOffsetHeight = Math.floor(document.body.offsetHeight);

    if (heightAndOffset >= bodyOffsetHeight - 5) {
      // console.log("At the bottom!");
      // console.log("postsStatus ", postsStatus);

      //not tracking postsStatus when its actually loading in postsSlice
      if (trackingStatus === loadingStatus) {
        // console.log("processing current request");
        return;
      }
      dispatchCallBack();
    }
  };

  return scrollListener;
};

const PostsList = () => {
  const dispatch = useDispatch();
  const increment = 5;

  const orderedPostIds = useSelector((state) => selectPostIds(state));
  const postsStatus = useSelector((state) => state.posts.status);
  const allFetchedPostsLength = useSelector(selectFetchedAllPostsLength);

  const scrollMoreStatus = useSelector(selectLoadMorePostsScrollListener);

  const [from, setFromPaginationProp] = useState(0);
  const [to, setToPaginationProp] = useState(increment);

  const postConfigLoadMoreObj = {
    trackingStatus: postsStatus,
    loadingStatus: StatusData.loading,
    dispatchCallBack: () => {
      //using initial non changable data for listener
      dispatch(changePostStatusToStartFetching({ newStatus: StatusData.idle }));
    },
  };

  const [prevOrderedPostIdsLength, setPostsIdLength] = useState(0);

  useEffect(() => {
    setPostsIdLength(orderedPostIds.length);
    // console.log("prevOrderedPostIdsLength ", prevOrderedPostIdsLength);

    if (
      prevOrderedPostIdsLength >= allFetchedPostsLength &&
      scrollMoreStatus === loadMorePostsScrollListenerEnum.set &&
      allFetchedPostsLength > 0
    ) {
      console.log("all posts have been fetched");

      window.removeEventListener(
        "scroll",
        getScrollListener(postConfigLoadMoreObj)
      );

      dispatch(
        setLoadMorePostsScrollListener({
          scrollMoreStatus: loadMorePostsScrollListenerEnum.removed,
        })
      );
    }
  }, [
    orderedPostIds.length,
    postsStatus,
    prevOrderedPostIdsLength,
    allFetchedPostsLength,
  ]);

  useEffect(() => {
    async function fetchPostAndSetPagination() {
      if (
        postsStatus === StatusData.idle &&
        (scrollMoreStatus === loadMorePostsScrollListenerEnum.set ||
          scrollMoreStatus === loadMorePostsScrollListenerEnum.initial)
      ) {
        // console.log("fetching posts");
        await dispatch(fetchPosts({ from, to }));
        setPaginationProperties(from + increment, to + increment);
      }
    }

    fetchPostAndSetPagination();
  }, [dispatch, postsStatus]);

  const setPaginationProperties = (from, to) => {
    setFromPaginationProp(from);
    setToPaginationProp(to);
    // console.log("pagination properties set", " from ", from, " to ", to);
  };

  useEffect(() => {
    console.log("scrollMoreStatus ", scrollMoreStatus);

    if (scrollMoreStatus === loadMorePostsScrollListenerEnum.initial) {
      console.log("setting load more scroll event listener");

      window.addEventListener(
        "scroll",
        getScrollListener(postConfigLoadMoreObj)
      );
      dispatch(
        setLoadMorePostsScrollListener({
          scrollMoreStatus: loadMorePostsScrollListenerEnum.set,
        })
      );
    }

    return () => {
      window.removeEventListener(
        "scroll",
        getScrollListener(postConfigLoadMoreObj)
      );
    };
  });

  // const logToElementAboutPosition = (heightAndOffset,bodyOffsetHeight) =>{
  // 	const positionAlertMessage = `setting event listener <br> heightAndOffset ${heightAndOffset} bodyOffsetHeight ${bodyOffsetHeight}`;
  // 	const positionElement = document.querySelector('#PositionAlertMessage');
  // 	if(positionElement){
  // 		positionElement.innerHTML = positionAlertMessage;
  // 	}
  // 	console.log('setting event listener');
  // 	console.log(` heightAndOffset ${heightAndOffset} bodyOffsetHeight ${bodyOffsetHeight}`);

  // }

  const contentPosts = orderedPostIds.map((postId) => {
    return <Post key={postId} postId={postId}></Post>;
  });

  let statusPostLoadingData = "";
  if (postsStatus === StatusData.loading) {
    // console.log("postsStatus===StatusData.loading ");
    statusPostLoadingData = <Loader></Loader>;
  } else if (postsStatus === StatusData.succeeded) {
    // console.log(" postsStatus === StatusData.succeeded ", orderedPostIds);
    statusPostLoadingData = "";
  }

  return (
    <div className="row display-container">
      {/* <HomeOverlay></HomeOverlay> */}

      {contentPosts}

      {statusPostLoadingData}
    </div>
  );
};

export default PostsList;
