import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import Post from "./Post.jsx";

import {
  fetchPosts,
  selectPostIds,
  changePostStatusToStartFetching,
  selectFetchedAllPostsLength,
} from "./postSlice";

import { StatusData } from "../../api/ApiRoutes";

import { Loader } from "../helperComponents/Loader.jsx";

const PostsList = () => {
  const dispatch = useDispatch();
  const increment = 5;

  const orderedPostIds = useSelector((state) => selectPostIds(state));

  const postsStatus = useSelector((state) => state.posts.status);

  const allFetchedPostsLength = useSelector(selectFetchedAllPostsLength);

  const [from, setFromPaginationProp] = useState(0);
  const [to, setToPaginationProp] = useState(increment);

  useEffect(() => {
    if (postsStatus === StatusData.loading) {
      // console.log("processing current request");
      return;
    }

    if (
      orderedPostIds.length >= allFetchedPostsLength &&
      orderedPostIds.length > 0
    ) {
      // console.log(
      //   "all posts have been fetched. Length: ",
      //   orderedPostIds.length
      // );

      window.removeEventListener("scroll", handleScroll);
      return;
    }

    if (postsStatus === StatusData.idle) {
      fetchPostAndSetPagination();
    }

    async function fetchPostAndSetPagination() {
      // console.log("fetching posts");

      await dispatch(fetchPosts({ from, to }));
      setPaginationProperties(from + increment, to + increment);
    }
  }, [dispatch, postsStatus]);

  const setPaginationProperties = (from, to) => {
    setFromPaginationProp(from);
    setToPaginationProp(to);
    // console.log("pagination properties set", " from ", from, " to ", to);
  };

  const handleScroll = () => {
    const heightAndOffset = Math.ceil(window.innerHeight + window.pageYOffset);

    const bodyOffsetHeight = Math.floor(document.body.offsetHeight);

    if (heightAndOffset >= bodyOffsetHeight - 5) {
      // console.log("At the bottom!");

      dispatch(changePostStatusToStartFetching({ newStatus: StatusData.idle }));
    }
  };

  useEffect(() => {
    if (
      orderedPostIds.length !== allFetchedPostsLength &&
      orderedPostIds.length > 0
    ) {
      // console.log("setting load more scroll event listener");

      window.addEventListener("scroll", handleScroll);

    }

    return function removeScrollListener() {
      // console.log("removing scroll down listener from post list");

      window.removeEventListener("scroll", handleScroll);
    };
  });

  const contentPosts = orderedPostIds.map((postId) => {
    return <Post key={postId} postId={postId}></Post>;
  });

  let statusPostLoadingData = "";
  if (postsStatus === StatusData.loading) {
    statusPostLoadingData = <Loader></Loader>;
  } else if (postsStatus === StatusData.succeeded) {
    statusPostLoadingData = "";
  }

  return (
    <div className="row display-container justify-content-center">
      {/* <HomeOverlay></HomeOverlay> */}

      {contentPosts}

      {statusPostLoadingData}
    </div>
  );
};

export default PostsList;
