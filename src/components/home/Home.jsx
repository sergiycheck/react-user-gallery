import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import "./Home.scss";

import activateHomeHandlers from "./home-scripts.js";

import { fetchVideos, selectVideosIds } from "./VideoComponent/videosSlice";

import { StatusData } from "../../api/ApiRoutes";

import PostsList from "../PostList/PostList.jsx";

import Carousel from "./Carousel/Carousel.jsx";

import { VideoComponent } from "./VideoComponent/VideoComponent.jsx";

import { selectSingleUserForAppStatus } from "../profile/usersSlice";
import { Loader } from "../helperComponents/Loader";

export const Home = () => {
  const dispatch = useDispatch();
  const videosStatus = useSelector((state) => state.videos.status);
  const videosIds = useSelector((state) => selectVideosIds(state));
  const [areHomeHandlersSet, setHomeHandlers] = useState(false);
  const postsStatus = useSelector((state) => state.posts.status);

  const userForTheAppStatus = useSelector(selectSingleUserForAppStatus);

  useEffect(() => {
    if (videosStatus === StatusData.idle) {
      dispatch(fetchVideos());
    }
  }, [videosStatus, dispatch]);

  useEffect(() => {
    if (videosStatus === StatusData.succeeded && postsStatus === StatusData.succeeded) {
      if (!areHomeHandlersSet) {
        activateHomeHandlers();
        setHomeHandlers(true);
      }
    }
  }, [videosStatus, postsStatus, areHomeHandlersSet]);

  const contentVideos = videosIds.map((videoId) => <VideoComponent key={videoId} videoId={videoId}></VideoComponent>);

  let loadVideoData;

  if (videosStatus === StatusData.loading) {
    loadVideoData = (
      <img
        className="carousel-video-element rounded"
        src="/assets/img/img-placeholder.gif"
        alt="video placeholder"
      ></img>
    );
  } else if (videosStatus === StatusData.succeeded) {
    loadVideoData = "";
  }

  let postListRenderedContent;
  if (userForTheAppStatus === StatusData.idle || userForTheAppStatus === StatusData.loading) {
    postListRenderedContent = <Loader></Loader>;
  } else {
    postListRenderedContent = <PostsList></PostsList>;
  }

  return (
    <div className="home-content">
      {/* <AsideBar></AsideBar> */}

      <div className="bd-container container-xxl">
        <div id="hm-heading" className="text-center p-3">
          {videosStatus === StatusData.loading && loadVideoData}
          {videosStatus === StatusData.succeeded && <Carousel contentVideos={contentVideos}></Carousel>}
        </div>

        {postListRenderedContent}
      </div>
    </div>
  );
};

export default Home;
