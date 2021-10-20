import React, { useEffect } from "react";

import { showVisible } from "../../helpers/imgLazyLoading";

import { CardPlaceholder } from "../helperComponents/CardPlaceholder/CardPlaceholder.jsx";

import {
  usePostIdToSelectOrFetchPost,
  useUserIdToSelectOrFetchUser,
  usePostIdToSelectOrFetchHashTags,
} from "./PostDataHelpers.js";


import { fetchSinglePost, selectPostById } from "./postSlice";

import { ExploreSameHashTags } from "./ExploreSameHashTags.jsx";

import { PostView } from "./Post.jsx";

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
          <CardPlaceholder
            showAvatarContent={true}
            showCardImage={true}
          ></CardPlaceholder>
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
        <PostView
          post={post}
          hashTags={hashTags}
          user={user}
          render={() => {
            return null;
          }}
        ></PostView>
      </div>

      <ExploreSameHashTags postId={post.id}></ExploreSameHashTags>
    </section>
  );
};
