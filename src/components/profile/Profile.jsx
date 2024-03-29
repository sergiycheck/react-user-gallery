import React, { useEffect, useMemo, useRef } from "react";

import Button from "@mui/material/Button";

import { showVisible } from "../../helpers/imgLazyLoading";

import { useUserIdToSelectOrFetchUser } from "../PostList/PostDataHelpers.js";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchUserProfilePosts, //{ from, to, userId }
  changeProfilePostsStatusToStartFetching,
  resetAllEntities,
  selectProfilePostById,
  selectProfilePostIds,
  selectFetchedAllProfilePostsLength,
  selectProfilePostsStatus,
  // selectProfilePostsCurrentUserId,
  setCurrentUser,
  fetchSubscribeRelationsForUser,
  followUserFetchPost,
  unFollowUserFetchPost,
  selectFollowingRelationsStatus,
  selectUserFollowersAndFollowingRelations,
} from "./profilePostsSlice.js";

import {
  deleteUnfollowedUserPostsFromSlice,
  fetchAllPostsLengthForUser,
  selectFetchedAllPostsLength,
  changePostStatusToStartFetching,
} from "../PostList/postSlice.js";

import { ExploreWrapped } from "../explore/ExploreWrapped.jsx";

import { StatusData } from "../../api/ApiRoutes";

import { selectSingleUserForApp, selectSingleUserForAppStatus } from "./usersSlice";

import { logm } from "../../helpers/custom-logger";

import { CardPlaceholder } from "./../helperComponents/CardPlaceholder/CardPlaceholder";

export const Profile = ({ match }) => {
  logm("match.params ", match.params);

  const { userId } = match.params;
  const dispatch = useDispatch();

  const userIdRef = useRef(userId);

  useEffect(() => {
    userIdRef.current = userId;
  }, [userId]);

  const currentUserApp = useSelector(selectSingleUserForApp);
  const currentUserAppStatus = useSelector(selectSingleUserForAppStatus);
  const followingRelationsStatus = useSelector(selectFollowingRelationsStatus);

  useEffect(() => {
    if (userId) {
      dispatch(fetchSubscribeRelationsForUser({ userId: userIdRef.current }));
    }
    return () => {
      dispatch(resetAllEntities());
    };
  }, [userId, dispatch]);

  if (
    currentUserAppStatus === StatusData.loading ||
    currentUserAppStatus === StatusData.idle ||
    followingRelationsStatus === StatusData.loading ||
    followingRelationsStatus === StatusData.idle
  ) {
    return <CardPlaceholder showAvatarContent={true}></CardPlaceholder>;
  }

  if (currentUserAppStatus === StatusData.succeeded && currentUserApp.id !== userIdRef.current) {
    // return other user profile
    return <OtherUserProfile userId={userIdRef.current} currentUserApp={currentUserApp}></OtherUserProfile>;
  }

  // return current user profile
  return <CurrentUserProfile user={currentUserApp}></CurrentUserProfile>;
};

export const OtherUserProfile = ({ userId, currentUserApp }) => {
  const dispatch = useDispatch();
  const user = useUserIdToSelectOrFetchUser({ userId });

  const { userFollowersRelations } = useSelector(selectUserFollowersAndFollowingRelations);
  const allFetchedPostsLength = useSelector(selectFetchedAllPostsLength);

  // const followAndUnFollowRequestsStatus = useSelector(selectFollowAndUnFollowRequestsStatus);

  const isUserIsFollowedByCurrentUser = () => {
    //TODO: dispatch request to know whether currentUserForTheApp follows currentUser
    let isFollowed = userFollowersRelations.map((relation) => relation.followerId).includes(currentUserApp.id);
    return isFollowed;
  };

  if (!user) {
    return (
      <div className="mt-5 fs-1">
        <b>user with {userId} not found</b>
      </div>
    );
  }
  const followUserHandler = () => {
    logm(`user with id ${userId} is following`);
    dispatch(followUserFetchPost({ userIdToFollow: userId }));
    dispatch(changePostStatusToStartFetching({ newStatus: StatusData.idle }));
  };

  const unFollowUserHandler = () => {
    logm(`unfollow from user with id ${userId}`);
    dispatch(unFollowUserFetchPost({ userIdToUnFollow: userId }));

    dispatch(deleteUnfollowedUserPostsFromSlice({ unFollowedUserId: userId }));
    const hasUserFetchedSomePosts = allFetchedPostsLength !== 0;
    if (hasUserFetchedSomePosts) {
      dispatch(fetchAllPostsLengthForUser());
    }
  };

  let renderedActionSubscriptionButton;
  if (!isUserIsFollowedByCurrentUser()) {
    renderedActionSubscriptionButton = (
      <Button onClick={followUserHandler} variant="contained" color="secondary">
        subscribe
      </Button>
    );
  } else {
    renderedActionSubscriptionButton = (
      <Button onClick={unFollowUserHandler} variant="outlined">
        unsubscribe
      </Button>
    );
  }

  return (
    <ProfileWrapped
      user={user}
      render={() => {
        return renderedActionSubscriptionButton;
      }}
    ></ProfileWrapped>
  );
};

export const CurrentUserProfile = ({ user }) => {
  return <ProfileWrapped user={user} render={() => null}></ProfileWrapped>;
};

export const ProfileWrapped = ({ user, render }) => {
  useEffect(() => {
    showVisible("Profile");
  }, [user]);

  let renderedFollowButtonContent;
  let renderedFollowButtonResult = render();
  if (renderedFollowButtonResult !== null) {
    renderedFollowButtonContent = <div className="col-12 col-sm-3">{renderedFollowButtonResult}</div>;
  }

  const { userFollowersRelations, userFollowingRelations } = useSelector(selectUserFollowersAndFollowingRelations);

  const followersLength = useMemo(() => {
    return userFollowersRelations.length;
  }, [userFollowersRelations]);

  const followingLength = useMemo(() => {
    return userFollowingRelations.length;
  }, [userFollowingRelations]);

  return (
    <div className="w-100">
      <main>
        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-3 col-md-2">
              <img
                className="img-fluid rounded"
                src="/assets/img/img-placeholder.gif"
                data-src={user.image}
                height="300"
                alt="user profile"
              />
            </div>

            <div className="col-lg-6 col-md-8 mx-auto">
              <div className="row">
                <div className="col">
                  <h1 className="fw-light">
                    {user.firstName} {user.lastName}
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <p className="lead text-muted">{user.bio}</p>
                </div>
              </div>

              <div className="row justify-content-between">
                <div className="col-12 col-sm-3">
                  <p className="fs-5">{user.userName}</p>
                </div>
                <div className="col-12 col-sm-3">
                  <p className="fs-5">followers {followersLength}</p>
                </div>
                <div className="col-12 col-sm-3">
                  <p className="fs-5">following {followingLength}</p>
                </div>

                {renderedFollowButtonContent}
              </div>
            </div>
          </div>
        </section>

        <ExploreUserProfilePosts userId={user.id}></ExploreUserProfilePosts>
      </main>
    </div>
  );
};

export const ExploreUserProfilePosts = ({ userId }) => {
  const dispatch = useDispatch();

  // const currentUserId = useSelector(selectProfilePostsCurrentUserId);

  //TODO: setCurrentUser refactor with useState
  useEffect(() => {
    dispatch(setCurrentUser({ userId }));
  }, [userId, dispatch]);

  const exploreUserProfilePostsDataMethods = {
    selectItemsIds: selectProfilePostIds,

    selectItemById: selectProfilePostById,

    selectItemsStatus: selectProfilePostsStatus,

    selectFetchedAllItemsLength: selectFetchedAllProfilePostsLength,

    changeItemsStatusToStartFetching: changeProfilePostsStatusToStartFetching,

    fetchItems: fetchUserProfilePosts,

    userId,
  };

  return (
    <div className="main-content">
      <ExploreWrapped explorePageDataMethods={exploreUserProfilePostsDataMethods}></ExploreWrapped>
    </div>
  );
};
