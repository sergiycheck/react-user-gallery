import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { StatusData } from "../../api/ApiRoutes";
import { addNewComment, selectCommentsStatus } from "./commentSlice";

import { Loader } from "../helperComponents/Loader";

export function AddNewCommentComp({ postId }) {
  const dispatch = useDispatch();

  const status = useSelector(selectCommentsStatus);

  const [text, setText] = useState("");
  const handleInputChange = (e) => setText(e.target.value);

  const postComment = async (text, postId) => {
    await dispatch(addNewComment({ postId, text }));
    setText("");
  };

  const handleKeyDown = async (e) => {
    const trimmedText = text.trim();
    if (e.key === "Enter" && trimmedText) {
      await postComment(trimmedText, postId);
    }
  };

  const handleClickAddComment = async (e) => {
    const trimmedText = text.trim();
    await postComment(trimmedText, postId);
  };

  let isLoading = status === StatusData.loading;
  let loader = isLoading ? (
    <div className="col-md-2 col-2">
      <Loader dim="30"></Loader>
    </div>
  ) : null;

  return (
    <React.Fragment>
      <div className="col-md-8 col-8">
        <input
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={text}
          className="inpt-comment form-control"
          placeholder="Add a comment"
        />
      </div>
      {loader}
      <div className="col-sm-2 col-2 d-flex justify-content-start">
        <button
          onClick={handleClickAddComment}
          className="btn btn-outline-secondary"
          disabled={!text || status === StatusData.loading}
        >
          Post
        </button>
      </div>
    </React.Fragment>
  );
}
