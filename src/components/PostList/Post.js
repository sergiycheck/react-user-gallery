import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { CommentsList } from "../home/CommentsList.jsx";

import { TimeAgo } from "../home/TimeAgo";
import { unwrapResult } from "@reduxjs/toolkit";

import {
  selectPostById,
  addLikeToPost,
} from "../redux_components/posts/postSlice";
import {
  fetchSingleUser,
  selectUserById,
} from "../redux_components/users/usersSlice";

import { fetchPostComments } from "../redux_components/comments/commentSlice";

import { showVisible } from "../../helpers/imgLazyLoading";


const Post = (props) => {
  const dispatch = useDispatch();
  const { postId } = props;

  const post = useSelector((state) => selectPostById(state, postId));
  const { userId } = post;

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, [userId, dispatch]);

  const increment = 5;
  const [from, setPaginationFromProp] = useState(0);
  const [to, setPaginationToProp] = useState(increment);

  useEffect( () => {

    async function fetchComments(){

      const resultFetchedComments = await dispatch(
        fetchPostComments({ postId, from, to })
      );
      unwrapResult(resultFetchedComments);

      setPaginationProperties(from, to);

    }
    fetchComments();

  }, [dispatch, postId]);

  const setPaginationProperties = (from, to) => {
    setPaginationFromProp(from);
    setPaginationToProp(to);
    // console.log("pagination properties set", " from ", from, " to ", to);
  };

  const user = useSelector((state) => selectUserById(state, userId));

  const addLikeToPostHandler = () => {
    dispatch(addLikeToPost({ postId }));
  };

  if (!user || !post) {
    return <div>loading ...</div>;
  }
  if (user && post) {
    showVisible("POST");
  }

  return (
    <section>
      <div className="card p-2 mt-2">
        <div className="bd-placeholder-img d-flex justify-content-center">
          <div className="d-inline-flex">
            <img
              className="click-big-post img-fluid  user-img"
              src="./assets/img/placeholder.svg"
              data-src={post.image}
              alt="user post"
            />
          </div>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-sm-1 mb-2">
              <img
                className="img-fluid mx-auto rounded"
                // style={{height: "30px"}}

                // src={user?.image}

                src="./assets/img/placeholder.svg"
                data-src={user.image}
                alt="user profile"
              />
            </div>

            <div className="col-sm-2">
              <h3>{user.userName}</h3>
            </div>

            <div className="col-sm-8">
              <p className="card-text mb-1">{post.content}</p>
            </div>
          </div>

          <hr />

          {/* loop for post comments */}

          {/* ref={this.commentElement} for adding comments ? */}
          <CommentsList
            postId={postId}
            commentIds={post.commentIds}
          ></CommentsList>

          <div className="row mb-3">

            {/* <div className="col-sm-8">
               <input
								
								onChange={this.handleNewCommentInputChange}
								value={this.state.newCommentData}
								type="text" className="inpt-comment form-control"
								placeholder={this.state.inputPlaceHolder} /> 
            </div> */}

            {/* <div className="col-sm-2 d-flex justify-content-start">
               <button 
								onClick={this.addComment}  
								className="btn btn-outline-secondary" >Post</button> 
            </div> */}

            <div className="col-sm-4 offset-sm-8">
              <div className="d-flex justify-content-end align-items-center">
                <div className="d-flex justify-content-end ">
                  
                  {/* <svg
                    className="bi bi-heart me-3 likeHeart"
                    onClick={addLikeToPostHandler}
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="red"
                    viewBox="0 0 16 16"
                  >
                  </svg> */}
                    {/* <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" /> */}

                  
                  <svg 
                    className="heart" 
                    viewBox="0 0 32 29.6"
                    onClick={addLikeToPostHandler}
                    >
                    <path
                      d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                    />
                  </svg>

                  <span className="mx-2">{post.likeCount}</span>
                </div>

                <div>
                  <small className=" text-muted">
                    <TimeAgo timeStamp={post.date}></TimeAgo>
                  </small>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
// Post = React.memo(Post);
export default Post;
