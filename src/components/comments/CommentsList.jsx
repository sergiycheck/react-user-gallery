import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { selectCommentById, selectCommentsByPostId } from "./commentSlice";

import { TimeAgo } from "../helperComponents/TimeAgo";

import { ReadMoreText } from "../helperComponents/ReadMoreText.jsx";
import { fetchPostComments } from "./commentSlice";

import { Link } from "react-router-dom";

import "./commentList.scss";
// import classNames from "classnames";

export const CommentsList = (props) => {
  const dispatch = useDispatch();

  const { postId } = props;

  // const commentsStatus = useSelector((state) => state.comments.status);

  const increment = 2;
  const [from, setPaginationFromProp] = useState(0);
  const [to, setPaginationToProp] = useState(increment);

  const comments = useSelector((state) =>
    selectCommentsByPostId(state, postId)
  );

  useEffect(() => {
    async function fetchComments() {
      const resultFetchedComments = await dispatch(
        fetchPostComments({ postId, from, to })
      );
      unwrapResult(resultFetchedComments);

      setPaginationProperties(from, to);
    }

    //create all comments length for single post
    if (comments.length === 0) {
      fetchComments();
    }
  }, [dispatch, postId, from, to, comments.length]);

  const setPaginationProperties = (from, to) => {
    setPaginationFromProp(from);
    setPaginationToProp(to);
  };

  const contentComments = comments.map((comment) => {
    return (
      <CommentExcerpt key={comment.id} commentId={comment.id}></CommentExcerpt>
    );
  });

  return (
    <div className="row comments-container align-items-center">
      {contentComments}
    </div>
  );
};

export const CommentExcerpt = (props) => {
  const { commentId } = props;
  //for rerendering only current comment
  const comment = useSelector((state) => selectCommentById(state, commentId));
  const { content } = comment;

  return (
    <React.Fragment>
      <div className="row">
        <div className="row">
          <div className="comment-content">
            <div className="comment-single">
              <span className="author">
                <Link to={`/profile/${comment.userId}`} style={{color:'black'}}>
                  <b>{comment.author} </b>
                </Link>
              </span>

              <span>
                <ReadMoreText
                  content={content}
                  maxCharCount={50}
                ></ReadMoreText>
              </span>
            </div>

            <div className="comment-post-time">
              <TimeAgo timeStamp={comment.date}></TimeAgo>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
