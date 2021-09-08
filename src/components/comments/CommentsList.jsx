import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCommentById, selectCommentsByPostId } from "./commentSlice";

import { TimeAgo } from "../helperComponents/TimeAgo";

import {ReadMoreText} from '../helperComponents/ReadMoreText.jsx';


export const CommentsList = (props) => {
  const { postId } = props;

  // const commentsStatus = useSelector((state) => state.comments.status);

  const comments = useSelector((state) =>
    selectCommentsByPostId(state, postId)
  );

  const contentComments = comments.map((comment) => {
    return (
      <CommentExcerpt
        key={comment.id}
        commentId={comment.id}
        className="row justify-content-between"
      ></CommentExcerpt>
    );
  });

  return <div className="row comments-container">{contentComments}</div>;
};

export const CommentExcerpt = (props) => {
  const { commentId } = props;
  //for rerendering only current comment
  const comment = useSelector((state) => selectCommentById(state, commentId));
  const { content } = comment;

  return (
    <React.Fragment>
      <div className="col-sm-3 mb-2">
        <img
          className="img-fluid mx-auto rounded"
          style={{ height: "30px" }}
          // src={comment.commentatorAvatar}

          src="./assets/img/img-placeholder.gif"
          data-src={comment.commentatorAvatar}
          alt="comment user profile"
        />
      </div>

      <div className="col-sm-6">
        <p className="comment-content">
          <ReadMoreText content={content}></ReadMoreText>
        </p>
      </div>
      <div className="col-sm-2">
        <TimeAgo timeStamp={comment.date}></TimeAgo>
      </div>
    </React.Fragment>
  );
};
