import React, { useEffect } from "react";

import Button from "@material-ui/core/Button";

import { showVisible } from "../../helpers/imgLazyLoading";

// import { logPositionScroll } from "../../helpers/atTheBottom"; //testing

import { useUserIdToSelectOrFetchUser } from "../PostList/PostDataHelpers.js";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchUserProfilePosts, //{ from, to, userId }
  // fetchSingleUserProfilePost, //{userId, postId}
  changeProfilePostsStatusToStartFetching,
  resetAllEntities,
  // selectAllProfilePosts,
  selectProfilePostById,
  selectProfilePostIds,
  selectFetchedAllProfilePostsLength,
  selectProfilePostsStatus,

  selectProfilePostsCurrentUserId,
  setCurrentUser
} from "./profilePostsSlice.js";

import { ExploreWrapped } from "../explore/ExploreWrapped.jsx";



export const Profile = ({ match }) => {
  console.log("match.params ", match.params);

  const { userId } = match.params;

  const user = useUserIdToSelectOrFetchUser({ userId });

  useEffect(() => {
    showVisible("Profile");
    
  }, [userId]);

  if (!user) {
    return (
      <div className="mt-5 fs-1">
        <b>user with {userId} not found</b>
      </div>
    );
  }

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
              <h1 className="fw-light">
                {user.firstName} {user.lastName}
              </h1>
              <p className="lead text-muted">{user.bio}</p>

              <div className="d-flex justify-content-between">
                <p className="small">{user.userName}</p>
                <Button
                  onClick={() =>
                    console.log(`user with id ${userId} is following`)
                  }
                  variant="contained"
                  color="secondary"
                >
                  follow
                </Button>
              </div>
            </div>
          </div>
        </section>

        <ExploreUserProfilePosts userId={userId}></ExploreUserProfilePosts>
      </main>
    </div>
  );
};

export const ExploreUserProfilePosts = ({ userId }) => {
  const dispatch = useDispatch();

  const currentUserId = useSelector(selectProfilePostsCurrentUserId);

  useEffect(()=>{
    dispatch(setCurrentUser({userId}))
  },[userId, dispatch]);

  useEffect(() => {

    if(currentUserId !== null && userId!==currentUserId){
      dispatch(resetAllEntities());
    }
    
  }, [userId,currentUserId, dispatch]);


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
    // <div className="container">

      <div className="main-content">
        <ExploreWrapped
          explorePageDataMethods={exploreUserProfilePostsDataMethods}
        ></ExploreWrapped>
      </div>

    // </div>
  );
};
