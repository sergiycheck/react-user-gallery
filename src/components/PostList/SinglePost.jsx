import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { CommentsList } from "../comments/CommentsList.jsx";

import { TimeAgo } from "../helperComponents/TimeAgo";

import { selectPostById } from "./postSlice";
import { fetchSingleUser, selectUserById } from "../profile/usersSlice";

import { showVisible } from "../../helpers/imgLazyLoading";

import { CardPlaceholder } from "../helperComponents/CardPlaceholder/CardPlaceholder.jsx";

import { ReadMoreText } from "../helperComponents/ReadMoreText.jsx";

import postS from "./Post.module.scss";
import classNames from "classnames";

import { AddNewCommentComp } from "../comments/AddNewCommentComp.jsx";

import { PostReactions } from "./PostReactioins.jsx";
import {fetchSinglePost} from './postSlice';

export const SinglePost = ({ match }) => {
  // console.clear();
  const dispatch = useDispatch();

  console.log("match.params ", match.params);

  const { postId } = match.params;

  const post = useSelector((state) => selectPostById(state, postId));

  useEffect(()=>{
    if(!post){
      dispatch(fetchSinglePost({postId}))
    }
  })

  if (!post) {
    return <LoadingContentForPost></LoadingContentForPost>;
  }

  return <UserForPost post={post}></UserForPost>;
};

const LoadingContentForPost = () => {
  return (
    <section style={{ marginTop: "100px" }} className="container">
      <div className="row">
        
				<div className="col-md-10 col-sm-12">

          <CardPlaceholder showAvatarContent={true}></CardPlaceholder>
        </div>
      </div>
    </section>
  );
};

const UserForPost = ({ post }) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => selectUserById(state, post.userId));

  useEffect(() => {
    if (!user && post.userId) {
      dispatch(fetchSingleUser(post.userId));
    }
  }, [post.userId, dispatch, user]);

  if (!post || !user) {
    return <LoadingContentForPost></LoadingContentForPost>;
  }else{
		showVisible("UserForPost");
	}

  return (
    <section style={{ marginTop: "100px" }} className="container">
      <div className="row">

        <div className="col-md-10 col-sm-12">

          <div className="card mt-2">

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
                    postId={post.id}
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
                      <ReadMoreText content={post.content}></ReadMoreText>
                    </p>
                  </div>
                </div>
              </div>

              <hr />

              <CommentsList postId={post.id}></CommentsList>

              <div className="row">
                <div className="row">
                  <div>
                    <small className=" text-muted">
                      <TimeAgo timeStamp={post.date}></TimeAgo>
                    </small>
                  </div>
                </div>

                <div className="row">
                  <AddNewCommentComp postId={post.id}></AddNewCommentComp>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
