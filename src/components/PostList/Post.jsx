import { useEffect } from "react";

import { CommentsList } from "../comments/CommentsList.jsx";

import { TimeAgo } from "../helperComponents/TimeAgo";

import { selectPostById } from "./postSlice";

import { showVisible } from "../../helpers/imgLazyLoading";

import { CardPlaceholder } from "../helperComponents/CardPlaceholder/CardPlaceholder.jsx";

import { ReadMoreText } from "../helperComponents/ReadMoreText.jsx";

import postS from "./Post.module.scss";
import classNames from "classnames";

import { AddNewCommentComp } from "../comments/AddNewCommentComp.jsx";

import { Link } from "react-router-dom";

import { PostReactions } from "./PostReactioins.jsx";

import { HashTags } from "../hashTags/HashTags.jsx";

import {
  useUserIdToSelectOrFetchUser,
  usePostIdToSelectOrFetchHashTags,
} from "./PostDataHelpers.js";

import { useSelector } from "react-redux";

const Post = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));
  const user = useUserIdToSelectOrFetchUser({ userId: post.userId });
  const hashTags = usePostIdToSelectOrFetchHashTags({ postId });

  useEffect(() => {
    showVisible("POST");
  }, [user, post]);

  if (!user || !post) {
    return (
      <section className="col-sm-8 d-flex justify-content-center">
        <CardPlaceholder showAvatarContent={true}></CardPlaceholder>
      </section>
    );
  }

  return (
    <article className={classNames('row justify-content-center mt-2 p-0')}> {/*postS['post-section'] */}
      <section className={postS['post-section']}>

        <div className={postS['post-card']}>
          <div className="row">
            <div className={postS.avatarAndNick}>
              <div>
                <img
                  className={classNames(
                    "img-fluid mx-auto",
                    postS.postAvatarImg
                  )}
                  src="/assets/img/img-placeholder.gif"
                  data-src={user.image}
                  alt="user profile"
                />
              </div>

              <div className="mx-2">
                <Link to={`/profile/${user.id}`}>
                  <b>{user.userName}</b>
                </Link>
              </div>
            </div>
          </div>

          <div className={classNames(postS["bd-placeholder-img"])}>
            {/* <div className="d-inline-flex"> */}
              <img
                className={classNames(postS["user-img"], "img-fluid rounded")}
                src="/assets/img/img-placeholder.gif"
                data-src={post.image}
                alt="user post"
              />
            {/* </div> */}
          </div>

          <div className="card-body">
            <div className="row">
              <div className="row mb-1">
                <PostReactions
                  postId={postId}
                  isLiked={post.postLiked}
                  likeCount={post.likeCount}
                ></PostReactions>
              </div>

              <div className="row align-items-start">
                <div className="col">
                  <div>
                    <Link to={`/profile/${user.id}`}>
                      <b>{user.userName}</b>
                    </Link>
                  </div>
                </div>

                <div className=" col-sm-10 col-md-10 ">
                  <p className="card-text mb-1">
                    <ReadMoreText content={post.content} maxCharCount={120}></ReadMoreText>
                  </p>
                </div>
              </div>
            </div>

            <HashTags hashTags={hashTags}></HashTags>
            <hr />

            <CommentsList postId={postId}></CommentsList>

            <div className="row">
              <div className="row">
                <Link to={`/posts/${post.id}`}>view post</Link>
              </div>
              <div className="row">
                <div>
                  <small className=" text-muted">
                    <TimeAgo timeStamp={post.date}></TimeAgo>
                  </small>
                </div>
              </div>

              <div className="row justify-content-between">
                <AddNewCommentComp postId={postId}></AddNewCommentComp>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};
// Post = React.memo(Post);

export default Post;
