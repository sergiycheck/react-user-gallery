import { useEffect } from "react";

import { HashTags } from "../hashTags/HashTags.jsx";

import classNames from "classnames";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { showVisible } from "../../helpers/imgLazyLoading";

import { useUserIdToSelectOrFetchUser, usePostIdToSelectOrFetchHashTags } from "../PostList/PostDataHelpers.js";

export const ExplorePostExcerpt = ({ postId, selectDataById }) => {
  const post = useSelector((state) => selectDataById(state, postId));
  const user = useUserIdToSelectOrFetchUser({ userId: post.userId });
  const hashTags = usePostIdToSelectOrFetchHashTags({ postId });

  useEffect(() => {
    showVisible("ExplorePostExcerpt");
  }, [user, post]);

  const postExploreClassName = classNames(`col-sm-12 col-md-6 aos-init aos-animate p-1 col-lg-${4}`);

  if (!user || !post) {
    return (
      <div className={postExploreClassName} data-aos="fade-up">
        <span className="d-block photo-item">
          <img src="/assets/img/img-placeholder.gif" alt="Post" className="img-fluid rounded" />
        </span>
      </div>
    );
  }

  return (
    <div className={postExploreClassName} data-aos="fade-up">
      <Link to={`/posts/${post.id}`} className="d-block photo-item">
        <img src="/assets/img/img-placeholder.gif" data-src={post.image} alt="Post" className="img-fluid rounded" />

        <div className="photo-text-more">
          <div className="photo-text-more">
            <h3 className="heading">{user.userName}</h3>
            <span className="meta">{post.title}</span>
          </div>
        </div>
      </Link>
      <HashTags hashTags={hashTags}></HashTags>
    </div>
  );
};
