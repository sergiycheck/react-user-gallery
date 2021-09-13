import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectExplorePostIds,
  selectExplorePostById,
  fetchExplorePosts,
  selectExplorePostsStatus,
  selectFetchedAllExplorePostsLength,
  changeExplorePostStatusToStartFetching
} from "./exploreSlice.js";

import { fetchSingleUser, selectUserById } from "../profile/usersSlice";

import { StatusData } from "../../api/ApiRoutes";
import { showVisible } from "../../helpers/imgLazyLoading";
import { Loader } from "../helperComponents/Loader.jsx";

import "./Explore.scss";
import classNames from "classnames";

import {Link} from 'react-router-dom';

import {atTheBottom} from '../../helpers/atTheBottom';


export const Explore = () => {

  const dispatch = useDispatch();

  const orderedExplorePostIds = useSelector(selectExplorePostIds);
  const explorePostsStatus = useSelector(selectExplorePostsStatus);
  const allFetcheExploredPostsLength = useSelector(selectFetchedAllExplorePostsLength);

  const increment = 5;
  const [from, setFromPaginationProp] = useState(0);
  const [to, setToPaginationProp] = useState(increment);

  useEffect(() => {
  
    const requestProcessing = explorePostsStatus === StatusData.loading;
    if (requestProcessing) {

      return;
    }

    const allPostsFetched = orderedExplorePostIds.length >= allFetcheExploredPostsLength;
    const somePostsFetched = orderedExplorePostIds.length > 0;

    if (allPostsFetched && somePostsFetched) {

      window.removeEventListener("scroll", handleScroll);
      return;
    }

    const statusChangedToFetchMorePosts = explorePostsStatus === StatusData.idle;
    if (statusChangedToFetchMorePosts) {

      fetchPostAndSetPagination();
    }

    async function fetchPostAndSetPagination() {

      await dispatch(fetchExplorePosts({ from, to }));
      setPaginationProperties(from + increment, to + increment);
    }
  }, [dispatch, explorePostsStatus]);

  const setPaginationProperties = (from, to) => {
    
    setFromPaginationProp(from);
    setToPaginationProp(to);
  };

  const handleScroll = () => {
    
    if (atTheBottom()) {

      dispatch(changeExplorePostStatusToStartFetching({ newStatus: StatusData.idle }));
    }
  };

  useEffect(() => {

    const allExplorePostsNotFetched = orderedExplorePostIds.length !== allFetcheExploredPostsLength;
    const fetchedSomeExplorePosts = orderedExplorePostIds.length > 0;

    if ( allExplorePostsNotFetched && fetchedSomeExplorePosts) {

      window.addEventListener("scroll", handleScroll);
    }

    return function removeScrollListener() {

      window.removeEventListener("scroll", handleScroll);
    };
  });

  let statusPostLoadingData = "";
  if (explorePostsStatus === StatusData.loading) {
    statusPostLoadingData = <Loader></Loader>;
  } else if (explorePostsStatus === StatusData.succeeded) {
    statusPostLoadingData = "";
  }

  const explorePostsContent = orderedExplorePostIds.map((postId, index) => {

    const postExploreClassName = classNames(
      `col-sm-12 col-md-6 aos-init aos-animate p-1 col-lg-${4}`
    );
    return (
      <ExplorePostExcerpt
        key={postId}
        postExploreClassName={postExploreClassName}
        postId={postId}
      ></ExplorePostExcerpt>
    );
  });

  return (
    <div className="site-wrap">
      <ExploreAsideBar></ExploreAsideBar>
      <div className="main-content">
        <div className="container-fluid photos">
          <div className="row align-items-stretch my-4 p-2">

            {explorePostsContent}

            {statusPostLoadingData}

          </div>
        </div>
      </div>
    </div>
  );


};


export const ExplorePostExcerpt = (props) => {

  const dispatch = useDispatch();
  const { postId, postExploreClassName } = props;

  const post = useSelector((state) => selectExplorePostById(state, postId));
  const { userId } = post;

  const user = useSelector((state) => selectUserById(state, userId));

  useEffect(() => {
    if(!user){
      dispatch(fetchSingleUser(userId));
    }
    
  }, [userId, dispatch, user]);

  

  if (!user || !post) {
    return (
      <div className={postExploreClassName} data-aos="fade-up">
        <span className="d-block photo-item">
          <img
            src="/assets/img/img-placeholder.gif"
            alt="Post"
            className="img-fluid rounded"
          />
        </span>
      </div>
    );
  }

  if (user && post) {
    showVisible("ExplorePostExcerpt");
  }

  return (
    <div className={postExploreClassName} data-aos="fade-up">
      <Link to={`/posts/${post.id}`} className="d-block photo-item">
        <img
          src="/assets/img/img-placeholder.gif"
          data-src={post.image}
          alt="Post"
          className="img-fluid rounded"
        />

        <div className="photo-text-more">
          <div className="photo-text-more">
            <h3 className="heading">{user.userName}</h3>
            <span className="meta">{post.title}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};



export const ExploreAsideBar = (props) => {
  return (
    <header
      className="header-bar d-flex d-lg-block
			align-items-center
			aos-init aos-animate"
      data-aos="fade-left"
    >
      <div className="main-menu">
        <ul className="">
          <li className="active">
            <a href="/explore">all posts</a>
          </li>
          <li>
            <a href="/explore">photos</a>
          </li>
          <li>
            <a href="/explore">videos</a>
          </li>
          <li>
            <a href="/explore">people</a>
          </li>
          <li>
            <a href="/explore">groups</a>
          </li>
          <li>
            <a href="/explore">channels</a>
          </li>
          <li>
            <a href="/explore">live</a>
          </li>
        </ul>
      </div>
    </header>
  );
};


// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

export default Explore;
