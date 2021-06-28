import React,{useEffect,useState} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import './Home.scss';
import activateHomeHandlers from './home-scripts.js';
import Post from './Post.jsx';
import HomeOverlay from './HomeOverlay.jsx'

import { 
	fetchPosts,
	selectAllPosts,
	selectPostById,
	selectPostIds 
} from '../redux_components/posts/postSlice';

import { 
	fetchVideos,
	selectAllVideos,
	selectVideoById,
	selectVideosIds 
} from '../redux_components/videos/videosSlice';


import {
	StatusData,
} from '../../api/ApiRoutes'


//todo: add unsplash api requests 
//https://unsplash.com/documentation



export const Home=()=>{

	const dispatch = useDispatch();

	const orderedPostIds = useSelector(state=>selectPostIds(state));
	const postsStatus = useSelector(state=>state.posts.status);
	// const videosArr = useSelector(state=>selectAllVideos(state));


	const videosStatus = useSelector(state=>state.videos.status);
	// const postsArr = useSelector(state=>selectAllPosts(state));
	const videosIds = useSelector(state=>selectVideosIds(state));
	
	
	useEffect(()=>{
		if(postsStatus == StatusData.idle){
			dispatch(fetchPosts());
		}
	},[postsStatus])

	useEffect(()=>{
		if(videosStatus == StatusData.idle){
			dispatch(fetchVideos());
		}
	},[postsStatus])

	useEffect(()=>{
		if(videosStatus == StatusData.succeeded &&
			postsStatus == StatusData.succeeded){
				activateHomeHandlers();
			}
	},[videosStatus,postsStatus]);



	let contentPosts;
	if(postsStatus===StatusData.loading){
		contentPosts = 'loading posts';
		console.log(' contentPosts ',contentPosts);
	}else if (postsStatus === StatusData.succeeded ){
		console.log(' StatusData.succeeded orderedPostIds',orderedPostIds);
		
	}

	let contentVideos;
	if(videosStatus===StatusData.loading ){
		contentVideos = 'loading videos';
		console.log('contentVideos ',contentVideos);
	}else if (videosStatus === StatusData.succeeded ){
		console.log(' StatusData.succeeded videosIds',videosIds);

		
	}

	if(videosStatus === StatusData.succeeded  && postsStatus === StatusData.succeeded){
		let postList = orderedPostIds.map(postId=>{
			return <Post key={postId} postId={postId} ></Post>
		})
		contentPosts = postList;
		
		let videoList = videosIds.map(videoId=>
			<VideoElement key={videoId} videoId={videoId}></VideoElement>
		)
		contentVideos = videoList;
	}

	
		
	return(

		<div className="home-content">


			<AsideBar></AsideBar>


			<div className="bd-container container-xxl">

				<div id="hm-heading" className="text-center p-3">

				<Carousel contentVideos={contentVideos} ></Carousel>


				</div>


				<div className="row" >

					{/* <HomeOverlay></HomeOverlay> */}

					{contentPosts}
					
				</div>

			</div>

		</div>

	);
}

	function VideoElement(props){

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


	function Carousel(props){

		return(
			<div id="carouselExampleDark"
				className="carousel carousel-dark slide d-flex flex-column justify-content-center"
				data-bs-interval="false">
		
			<div className="carousel-inner mb-3">

				{props.contentVideos}
				
			</div>
			
			<CarouselIndicators></CarouselIndicators>

			<button className="carsl-control-prev" type="button"
				aria-label="prev-btn" 
				data-bs-target="#carouselExampleDark"  data-bs-slide="prev">
				<span className="carousel-control-prev-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Previous</span>
			</button>
			<button 
				className="carsl-control-next"
				aria-label="next-btn"
				type="button" data-bs-target="#carouselExampleDark"  data-bs-slide="next">
				<span className="carousel-control-next-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Next</span>
			</button>


		</div>

		)


	}


	function CarouselIndicators(props){

		return(
			<div className="carousel-indicators">
			<button type="button"
					data-bs-target="#carouselExampleDark" data-bs-slide-to="0"
					className="active" aria-current="true" aria-label="Slide 1"></button>

			<button type="button" data-bs-target="#carouselExampleDark"
					data-bs-slide-to="1" aria-label="Slide 2"></button>

			<button type="button" data-bs-target="#carouselExampleDark"
					data-bs-slide-to="2" aria-label="Slide 3"></button>
		</div>


		)

	}




	function AsideBar(props){

		return (

			<aside className=" bd-aside sticky-xl-top text-muted align-self-start mb-3 mb-xl-5 px-2 bg-light">
				<h2 className="h6 pt-4 pb-3 mb-4 border-bottom">right aside bar</h2>
				<nav className="small" id="toc">
					<ul className="list-unstyled fs-4 fw-bold">

						<li className="my-2">
							<button className="btn d-inline-flex align-items-center collapsed fs-4"
							data-bs-toggle="collapse" aria-expanded="false"
							data-bs-target="#contents-collapse"
							aria-controls="contents-collapse">Explore</button>

							<ul className="list-unstyled ps-3 collapse" id="contents-collapse">
								<li><a className="d-inline-flex align-items-center rounded" href="/explore">explore</a></li>

							</ul>

						</li>

						<li className="my-2">
							<button className="btn d-inline-flex align-items-center collapsed fs-4"
								data-bs-toggle="collapse" aria-expanded="false"
								data-bs-target="#forms-collapse"
								aria-controls="forms-collapse">Contacts</button>

							<ul className="list-unstyled ps-3 collapse" id="forms-collapse">
								<li><a className="d-inline-flex align-items-center rounded" href="/messages">messages</a></li>
							</ul>
						</li>

						<li className="my-2">
							<ul className="list-unstyled ps-3" id="components-collapse">
								<li><a className="d-inline-flex align-items-center rounded" href="/profile">profile</a></li>
								<li><a className="d-inline-flex align-items-center rounded" href="/options">options</a></li>
							</ul>
						</li>

					</ul>

				</nav>
			</aside>



		)

	}



export default Home;