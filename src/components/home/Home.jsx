import React,{useEffect,useState} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import './Home.scss';
import activateHomeHandlers from './home-scripts.js';
import Post from './Post.jsx';
import HomeOverlay from './HomeOverlay.jsx'

// import '../../assets/img/loader.gif'

import { 
	fetchPosts,
	selectAllPosts,
	selectPostById,
	selectPostIds,
	changePostStatusToStartFetching
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
	const videosStatus = useSelector(state=>state.videos.status);
	const videosIds = useSelector(state=>selectVideosIds(state));
	const [areHomeHandlersActivated,setHomeHandlers] = useState(false);
	const postsStatus = useSelector(state=>state.posts.status);

	useEffect(()=>{
		if(videosStatus == StatusData.idle){
			dispatch(fetchVideos());
		}
	},[videosStatus,dispatch])

	useEffect(()=>{
		if(videosStatus == StatusData.succeeded 
			&& postsStatus == StatusData.succeeded
			){

			if(!areHomeHandlersActivated){
				console.log('activating home handlers');

				activateHomeHandlers();
				setHomeHandlers(true);
			}
					
		}
			
	},[
		videosStatus,
		postsStatus
	]);



	let contentVideos = [];
	
	if(videosStatus===StatusData.loading ){
		
		console.log('contentVideos ',contentVideos);
	}else if (videosStatus === StatusData.succeeded ){
		console.log(' StatusData.succeeded videosIds');

		let videoList = videosIds.map(videoId=>
			<VideoElement key={videoId} videoId={videoId}></VideoElement>
		)
		
		contentVideos = [...contentVideos, ...videoList];
	}

			
	return(

		<div className="home-content">


			<AsideBar></AsideBar>


			<div className="bd-container container-xxl">

				<div id="hm-heading" className="text-center p-3">

				<Carousel contentVideos={contentVideos} ></Carousel>


				</div>


				<PostsList></PostsList>



			</div>

		</div>

	);
}


const PostsList = () => {

	const dispatch = useDispatch();
	const increment = 5;

	const orderedPostIds = useSelector(state=>selectPostIds(state));
	const postsStatus = useSelector(state=>state.posts.status);
	// const postsArr = useSelector(state=>selectAllPosts(state));

	const [from,setFromPaginationProp] = useState(0);
	const [to,setToPaginationProp] = useState(increment);

	

	useEffect(()=>{

		if(postsStatus === StatusData.idle){
			console.log('fetching posts');
			dispatch(fetchPosts({from,to}));
			
			setPaginationProperties(from+increment,to+increment);

			// return () =>{
			// 	setPaginationProperties(0,increment);
			// }
		}

	},[postsStatus,dispatch])


	const setPaginationProperties = (from,to)=>{
		setFromPaginationProp(from);
		setToPaginationProp(to);
		console.log('pagination properties set', ' from ',from, ' to ', to);
	}

	

	useEffect(  ()=>{

		window.addEventListener("scroll", scrollListener, false);

		return ()=>{
			window.removeEventListener('scroll',scrollListener, false);
			console.log('scroll event listener was removed')
		}

	},[]);


	const scrollListener = function() {

		const heightAndOffset = Math.ceil(window.innerHeight + window.pageYOffset);
		const bodyOffsetHeight = Math.floor(document.body.offsetHeight);

		logToElementAboutPosition(heightAndOffset,bodyOffsetHeight);

		if (heightAndOffset >= bodyOffsetHeight-5) {
			console.log("At the bottom!");
			console.log('postsStatus ', postsStatus);

			//not tracking postsStatus when its actually loading in postsSlice
			if (postsStatus === StatusData.loading) {
				console.log("processing current request");
				return;
			}
			
			dispatch(changePostStatusToStartFetching({newStatus:StatusData.idle}))
		}

	}
	const logToElementAboutPosition = (heightAndOffset,bodyOffsetHeight) =>{
		const positionAlertMessage = `setting event listener <br> heightAndOffset ${heightAndOffset} bodyOffsetHeight ${bodyOffsetHeight}`;
		const positionElement = document.querySelector('#PositionAlertMessage');
		if(positionElement){
			positionElement.innerHTML = positionAlertMessage;
		}
		// console.log('setting event listener');
		// console.log(` heightAndOffset ${heightAndOffset} bodyOffsetHeight ${bodyOffsetHeight}`);

	}



	const [prevOrderedPostIdsLength, setPostsIdLength] = useState(0);
	useEffect(()=>{
		setPostsIdLength(orderedPostIds.length);
		console.log('prevOrderedPostIdsLength ', prevOrderedPostIdsLength);
	},[postsStatus])

	const contentPosts = orderedPostIds.map(postId=>{
			
		return <Post key={postId} postId={postId} ></Post>
	})

	let statusPostLoadingData = '';
	if(postsStatus===StatusData.loading){
		console.log('postsStatus===StatusData.loading ');
		statusPostLoadingData = <Loader></Loader>

	}else if (postsStatus === StatusData.succeeded ){
		console.log(' postsStatus === StatusData.succeeded ', orderedPostIds);
		statusPostLoadingData = '';
	}




	return (

		<div className="row display-container" >

			{/* <HomeOverlay></HomeOverlay> */}

			{contentPosts}

			{statusPostLoadingData}
		
		</div>


	)

}

export const  Loader =  (props)=> {
	return(
		<div className="loader">
			<div className="d-flex align-items-center">
				<img  className="img img-fluid" 
					src="./assets/img/loader.gif" alt="loader image" />
			</div>
		</div>
	)
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