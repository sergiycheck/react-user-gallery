
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { showVisible } from "../../helpers/imgLazyLoading";

import { fetchSingleUser, selectUserById } from "../profile/usersSlice";

import {
  fetchHashTags,
  selectHashTagsByPostId,
} from "../hashTags/hashTagSlice";


// unneeded fetches from explorePostExcerpt and Post components
// used only for singlePost

export const usePostIdToSelectOrFetchPost = ({ postId, postSelector, postFetcher }) => {

  const dispatch = useDispatch();

  const post = useSelector((state) => postSelector(state, postId));

  useEffect(() => {
    if (!post) {
      dispatch(postFetcher({ postId }));
    }
  },[postId, dispatch, post, postFetcher]);

  return post;
};

export const useUserIdToSelectOrFetchUser = ({ userId }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => selectUserById(state, userId));

  useEffect(() => {
    if (!user) {
      dispatch(fetchSingleUser(userId));
    }
  }, [userId, dispatch, user]);

  return user;
};

export const usePostIdToSelectOrFetchHashTags = ({ postId }) => {

  const dispatch = useDispatch();

  const hashTags = useSelector((state) =>
    selectHashTagsByPostId(state, postId)
  );

  useEffect(() => {
    dispatch(fetchHashTags({ postId }));
  }, [postId, dispatch]);

  return hashTags;
};


export const usePostIdToGetItsContent = ({
  postId,
  postSelector,
  postFetcher,
}) => {

  const post = usePostIdToSelectOrFetchPost({postId, postSelector, postFetcher,});

  const user = useUserIdToSelectOrFetchUser({ userId: post.userId });

  const hashTags = usePostIdToSelectOrFetchHashTags({ postId });

  useEffect(() => {
    showVisible("POST");
  }, [user, post]);

  return {
    post,
    user,
    hashTags,
  };
};