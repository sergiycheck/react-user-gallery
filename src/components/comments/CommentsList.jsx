import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { selectCommentById, selectCommentsByPostId } from "./commentSlice";

import { TimeAgo } from "../helperComponents/TimeAgo";

import { ReadMoreText } from "../helperComponents/ReadMoreText.jsx";
import { fetchPostComments } from "./commentSlice";

import './commentList.scss';
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
    if(comments.length === 0){
  
      fetchComments();
    }
      

  }, [dispatch, postId, from, to, comments.length]);

  const setPaginationProperties = (from, to) => {
    setPaginationFromProp(from);
    setPaginationToProp(to);
    // console.log("pagination properties set", " from ", from, " to ", to);
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

        {/*           <img
            className="img-fluid mx-auto rounded"
            style={{ height: "30px" }}
            // src={comment.commentatorAvatar}

            src="/assets/img/img-placeholder.gif"
            data-src={comment.commentatorAvatar}
            alt="comment user profile"
          /> */}
        <div className="row comment-content">

            {/* modules not working with scss inner classses  */}
          <div className='col-sm-12'>

            <span className='author'>
              <b>{comment.author} </b>
            </span>
              
            <span>
              <ReadMoreText content={content}></ReadMoreText>
            </span>
          </div>

          <div className="comment-post-time">
            <TimeAgo timeStamp={comment.date}></TimeAgo>
          </div>

        </div>
        
      </div>
    </React.Fragment>
  );
};
