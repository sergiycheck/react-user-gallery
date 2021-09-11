import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { CommentsList } from "../comments/CommentsList.jsx";

import { TimeAgo } from "../helperComponents/TimeAgo";
// import { unwrapResult } from "@reduxjs/toolkit";

import { selectPostById } from "./postSlice";

import { fetchSingleUser, selectUserById } from "../profile/usersSlice";

// import { fetchPostComments } from "../comments/commentSlice";

import { showVisible } from "../../helpers/imgLazyLoading";

import { CardPlaceholder } from "../helperComponents/CardPlaceholder/CardPlaceholder.jsx";

import { ReadMoreText } from "../helperComponents/ReadMoreText.jsx";

import postS from "./Post.module.scss";
import classNames from "classnames";

import { AddNewCommentComp } from "../comments/AddNewCommentComp.jsx";

import {Link} from 'react-router-dom';

import {PostReactions} from './PostReactioins.jsx';


const Post = (props) => {
  const dispatch = useDispatch();
  const { postId } = props;

  const post = useSelector((state) => selectPostById(state, postId));
  const { userId, content } = post;

  const user = useSelector((state) => selectUserById(state, userId));

  useEffect(() => {
    if(!user){
      dispatch(fetchSingleUser(userId));
    }
    
  }, [userId, dispatch, user]);


  if (!user || !post) {
    return (
      <section className="col-sm-8 d-flex justify-content-center">
        <CardPlaceholder showAvatarContent={true}></CardPlaceholder>
      </section>
    );
  }
  
  if (user && post) {
    showVisible("POST");
  }

  return (
    <section className="col-sm-8">
      <div className="card mt-2">
        <div className="row">
          <div className={postS.avatarAndNick}>
            <div>
              <img
                className={classNames("img-fluid mx-auto", postS.postAvatarImg)}
                src="/assets/img/img-placeholder.gif"
                data-src={user.image}
                alt="user profile"
              />
            </div>

            <div className="mx-2">
              <b>{user.userName}</b>
            </div>
          </div>
        </div>

        <div className={postS["bd-placeholder-img"]}>
          <div className="d-inline-flex">
            <img
              className={classNames(postS["user-img"], "img-fluid rounded")}
              src="/assets/img/img-placeholder.gif"
              data-src={post.image}
              alt="user post"
            />
          </div>
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
                  <b>{user.userName}</b>
                </div>
              </div>

              <div className=" col-sm-10 col-md-10 ">
                <p className="card-text mb-1">
                  <ReadMoreText content={content}></ReadMoreText>
                </p>
              </div>
            </div>
          </div>

          <hr />

          <CommentsList
            postId={postId}
          ></CommentsList>

          <div className="row">
            <div className="row">
              <Link
                to={`/posts/${post.id}`}
              >
                view post
              </Link>
            </div>
            <div className="row">
              <div>
                <small className=" text-muted">
                  <TimeAgo timeStamp={post.date}></TimeAgo>
                </small>
              </div>
            </div>

            <div className="row">
              <AddNewCommentComp postId={postId}></AddNewCommentComp>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
// Post = React.memo(Post);

export default Post;
