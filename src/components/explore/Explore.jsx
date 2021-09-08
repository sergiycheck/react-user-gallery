import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectPostIds,
  selectPostById,
  fetchPosts,
} from "../PostList/postSlice";

import { fetchSingleUser, selectUserById } from "../profile/usersSlice";

import classnames from "classnames";

import "./Explore.scss";

import { showVisible } from "../../helpers/imgLazyLoading";
import { CardPlaceholder } from "../helperComponents/CardPlaceholder/CardPlaceholder.jsx";

export const Explore = () => {
  const dispatch = useDispatch();
  const orderedPostIds = useSelector((state) => selectPostIds(state));

  const increment = 5;
  const [from, setFromPaginationProp] = useState(0);
  const [to, setToPaginationProp] = useState(increment);

  useEffect(() => {
    if (orderedPostIds.length === 0) {
      dispatch(fetchPosts({ from, to }));
      setPaginationProperties(from + increment, to + increment);
    }
  }, [orderedPostIds, dispatch]);

  const setPaginationProperties = (from, to) => {
    setFromPaginationProp(from);
    setToPaginationProp(to);
    // console.log("pagination properties set", " from ", from, " to ", to);
  };

  let previousNum;
  const postsContent = orderedPostIds.map((postId, index) => {
    let randomNum = getRandomInt(4, 7);
    // console.log(`randomNum ${randomNum} index ${index}`);

    if (index > 0 && index % 2 !== 0) {
      // console.log("index>0 && index%2!==0 ", index);
      randomNum = 12 - previousNum;
      // console.log("new randomNum ", randomNum);
    }
    previousNum = randomNum;

    const randomClassLg = `col-lg-${randomNum}`;
    const postExploreClassName = classnames(
      `col-6 col-md-6 aos-init aos-animate p-1 ${randomClassLg}`
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
          <div className="row align-items-stretch my-4 p-2">{postsContent}</div>
        </div>
      </div>
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

export const ExplorePostExcerpt = (props) => {
  const dispatch = useDispatch();
  const { postId, postExploreClassName } = props;
  const post = useSelector((state) => selectPostById(state, postId));
  const { userId } = post;
  // console.log('userId from post', userId);

  useEffect(() => {
    // console.log('userId in useEffect  ', userId);
    dispatch(fetchSingleUser(userId));
  }, [userId, dispatch]);

  const user = useSelector((state) => selectUserById(state, userId));

  if (!user || !post) {
    return (
      <div className={postExploreClassName} data-aos="fade-up">
        <a href="/explore" className="d-block photo-item">
          <img
            src="./assets/img/img-placeholder.gif"
            alt="Post"
            className="img-fluid rounded"
          />
        </a>
      </div>
    );
  }

  if (user && post) {
    showVisible("ExplorePostExcerpt");
  }

  return (
    <div className={postExploreClassName} data-aos="fade-up">
      <a href="/explore" target="_blank" className="d-block photo-item">
        <img
          src="./assets/img/img-placeholder.gif"
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
      </a>
    </div>
  );
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default Explore;
