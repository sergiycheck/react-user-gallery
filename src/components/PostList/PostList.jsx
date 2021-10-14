import {
  // useEffect,
  useState,
} from "react";

import { useSelector, useDispatch } from "react-redux";

import Post from "./Post.jsx";

import {
  fetchPosts,
  selectPostIds,
  changePostStatusToStartFetching,
  selectFetchedAllPostsLength,
} from "./postSlice";

import { StatusData } from "../../api/ApiRoutes";

import { atTheBottom } from "../../helpers/atTheBottom";

import {
  useLoadingStatusToRenderLoader,
  useStatusAndArrOfIdsToFetchData,
  // scrollHandlerWithCallBack,
  useLoadingStatusToAddOrRemoveScrollListeners,

} from '../loadMoreDataOnScrollLogic/loadMoreDataRenderAndHooks.js';


const PostsList = () => {
  const dispatch = useDispatch();

  const orderedPostIds = useSelector((state) => selectPostIds(state));
  const postsStatus = useSelector((state) => state.posts.status);
  const allFetchedPostsLength = useSelector(selectFetchedAllPostsLength);

  const increment = 5;
  const [from, setFromPaginationProp] = useState(0);
  const [to, setToPaginationProp] = useState(increment);

  const handleScroll = () => {
    if (atTheBottom()) {
      dispatch(changePostStatusToStartFetching({ newStatus: StatusData.idle }));
    }
  };

  useLoadingStatusToAddOrRemoveScrollListeners({
    itemIdsArr:orderedPostIds,
    allItemsLength: allFetchedPostsLength,
    handler:handleScroll
  });

  
  useStatusAndArrOfIdsToFetchData(
    {
      itemsStatus: postsStatus,
      idsArr: orderedPostIds,
      allItemsLength: allFetchedPostsLength,
      scrollHandler: handleScroll,
    },
    async function fetchPostAndSetPagination() {

      await dispatch(fetchPosts({ from, to }));
      setPaginationProperties(from + increment, to + increment);
    }
  );

  const setPaginationProperties = (from, to) => {
    setFromPaginationProp(from);
    setToPaginationProp(to);
    // console.log("pagination properties set", " from ", from, " to ", to);
  };


  const { statusPostLoadingData } = useLoadingStatusToRenderLoader(
    postsStatus
  );

  const contentPosts = orderedPostIds.map((postId) => {
    return <Post key={postId} postId={postId}></Post>;
  });

  return (
    <div className="row display-container justify-content-center">
      {/* <HomeOverlay></HomeOverlay> */}

      {contentPosts}

      {statusPostLoadingData}
    </div>
  );
};

export default PostsList;
