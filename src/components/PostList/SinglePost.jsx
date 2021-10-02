import React, { useEffect } from "react";

import { CommentsList } from "../comments/CommentsList.jsx";

import { TimeAgo } from "../helperComponents/TimeAgo";

import { showVisible } from "../../helpers/imgLazyLoading";

import { CardPlaceholder } from "../helperComponents/CardPlaceholder/CardPlaceholder.jsx";

import { ReadMoreText } from "../helperComponents/ReadMoreText.jsx";

import postS from "./Post.module.scss";
import classNames from "classnames";

import { AddNewCommentComp } from "../comments/AddNewCommentComp.jsx";

import { PostReactions } from "./PostReactioins.jsx";

import {
  usePostIdToSelectOrFetchPost,
  useUserIdToSelectOrFetchUser,
  usePostIdToSelectOrFetchHashTags,
} from "./PostDataHelpers.js";

import { HashTags } from "../hashTags/HashTags.jsx";

import { fetchSinglePost, selectPostById } from "./postSlice";

import { ExploreSameHashTags } from "./ExploreSameHashTags.jsx";

import { Link } from "react-router-dom";


export const SinglePost = ({ match }) => {
  console.log("match.params ", match.params);

  const { postId } = match.params;

  const post = usePostIdToSelectOrFetchPost({
    postId,
    postSelector: selectPostById,
    postFetcher: fetchSinglePost,
  });

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


  const { postId, userId } = post;

  const user = useUserIdToSelectOrFetchUser({ userId });

  const hashTags = usePostIdToSelectOrFetchHashTags({ postId });

  useEffect(() => {
    showVisible("UserForPost");
  }, [user, post]);



  if (!post || !user) {
    return <LoadingContentForPost></LoadingContentForPost>;
  }

  return (
    <section style={{ marginTop: "100px" }} className="container-fluid">
      <div className="container">
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
                    <Link to={`/profile/${user.id}`}>
                      <b>{user.userName}</b>
                    </Link>
                  </div>
                </div>
              </div>{" "}
              {/* circle avatar and nick name  */}
              <div className={postS["bd-placeholder-img"]}>
                <div className="d-inline-flex">
                  <img
                    className={classNames(
                      postS["user-img"],
                      "img-fluid rounded"
                    )}
                    src="/assets/img/img-placeholder.gif"
                    data-src={post.image}
                    alt="user post"
                  />
                </div>
              </div>
              {/* post image  */}
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
      </div>

      <ExploreSameHashTags postId={post.id}></ExploreSameHashTags>

    </section>
  );
};
