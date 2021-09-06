import React,{useEffect,useState} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import './Home.scss';

import activateHomeHandlers from './home-scripts.js';

import { 
	fetchVideos,
	selectVideoById,
	selectVideosIds 
} from '../redux_components/videos/videosSlice';

import {
	StatusData,
} from '../../api/ApiRoutes';


import PostsList from '../PostList/PostList.jsx';
import {Loader} from '../helperComponents/Loader.jsx';
import AsideBar from '../aside/AsideBar.jsx';
import Carousel from './Carousel/Carousel.jsx'


export const Home=()=>{

	const dispatch = useDispatch();
	const videosStatus = useSelector(state=>state.videos.status);
	const videosIds = useSelector(state=>selectVideosIds(state));
	const [areHomeHandlersActivated,setHomeHandlers] = useState(false);
	const postsStatus = useSelector(state=>state.posts.status);

	useEffect(()=>{
		if(videosStatus === StatusData.idle){
			dispatch(fetchVideos());
		}
	},[videosStatus,dispatch])

	useEffect(()=>{
		if(videosStatus === StatusData.succeeded 
			&& postsStatus === StatusData.succeeded
			){

			if(!areHomeHandlersActivated){
				// console.log('activating home handlers');

				activateHomeHandlers();
				setHomeHandlers(true);
			}
					
		}
			
	},[videosStatus, postsStatus, areHomeHandlersActivated]);




	const contentVideos = videosIds.map(videoId=>
		<VideoElement key={videoId} videoId={videoId}></VideoElement>
	)
	
	let loadVideoData;

	if(videosStatus===StatusData.loading ){
		// console.log('contentVideos ',contentVideos);
		loadVideoData = <Loader></Loader>;
	}else if (videosStatus === StatusData.succeeded ){
		// console.log(' StatusData.succeeded videosIds');
		loadVideoData = '';
	}

	
	return(

		<div className="home-content">

			<AsideBar></AsideBar>

			<div className="bd-container container-xxl">

				<div id="hm-heading" className="text-center p-3">

				{videosStatus===StatusData.loading &&
					loadVideoData
				}
				{videosStatus===StatusData.succeeded &&
					<Carousel contentVideos={contentVideos} ></Carousel>
				}
				
				</div>

				<PostsList></PostsList>

			</div>

		</div>

	);
}


const VideoElement = (props) => {

	const {videoId} = props;
	const video = useSelector(state=>selectVideoById(state,videoId));

	return(
		
		<div className="carousel-item">
			<div className="d-flex justify-content-center">
				<div className="video-container"> 
					<video className="carousel-video-element" muted controls>
						<source data-testid="video-source-element" src={video.link} type="video/mp4"/>
							Your browser does not support HTML5 video.
					</video>
				</div>
			</div>
		</div>
	)
}


export default Home;