import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import "./Home.scss";

import activateHomeHandlers from "./home-scripts.js";

import {
  fetchVideos,
  selectVideosIds,
} from "./VideoComponent/videosSlice";

import { StatusData } from "../../api/ApiRoutes";

import PostsList from "../PostList/PostList.jsx";

import AsideBar from "../aside/AsideBar.jsx";
import Carousel from "./Carousel/Carousel.jsx";

import {VideoComponent} from './VideoComponent/VideoComponent.jsx';


export const Home = () => {
  const dispatch = useDispatch();
  const videosStatus = useSelector((state) => state.videos.status);
  const videosIds = useSelector((state) => selectVideosIds(state));
  const [areHomeHandlersSet, setHomeHandlers] = useState(false);
  const postsStatus = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (videosStatus === StatusData.idle) {
      dispatch(fetchVideos());
    }
  }, [videosStatus, dispatch]);

  useEffect(() => {
    if (
      videosStatus === StatusData.succeeded &&
      postsStatus === StatusData.succeeded
    ) {
      if (!areHomeHandlersSet) {
        // console.log('activating home handlers');

        activateHomeHandlers();
        setHomeHandlers(true);
      }
    }
  }, [videosStatus, postsStatus, areHomeHandlersSet]);

  const contentVideos = videosIds.map((videoId) => (
    <VideoComponent key={videoId} videoId={videoId}></VideoComponent>
  ));

  let loadVideoData;

  if (videosStatus === StatusData.loading) {
    loadVideoData = (
      <img
        className="carousel-video-element rounded"
        src="./assets/img/img-placeholder.gif"
        alt="video placeholder"
      ></img>
    );
  } else if (videosStatus === StatusData.succeeded) {
    loadVideoData = "";
  }

  return (
    <div className="home-content">
      <AsideBar></AsideBar>

      <div className="bd-container container-xxl">
        <div id="hm-heading" className="text-center p-3">
          {videosStatus === StatusData.loading && loadVideoData}
          {videosStatus === StatusData.succeeded && (
            <Carousel contentVideos={contentVideos}></Carousel>
          )}
        </div>

        <PostsList></PostsList>
      </div>
    </div>
  );
};



export default Home;
