import React from 'react';
import './Home.scss';
import activateHomeHandlers from './home-scripts.js';
import Post from './Post.jsx';
import HomeOverlay from './HomeOverlay.jsx'


//todo: add unsplash api requests 
//https://unsplash.com/documentation



class Home extends React.Component{
	constructor(props){
    super(props);

		this.videoJsonPath = './assets/data/videos.json';
		this.postsJsonPath = './assets/data/post.json';

		this.state={
			videosArr:[],
			postsArr:[]
		}
		this.setVideosArrState = this.setVideosArrState.bind(this);
		this.setPostsArrState = this.setPostsArrState.bind(this);

		this.postElement = React.createRef();

  }

	setVideosArrState(values){
		this.setState(()=>({
			videosArr:values
		}));
	}

	setPostsArrState(values){
		this.setState(()=>({
			postsArr:values
		}));
	}



	 async componentDidMount() {
		
		let videoFetched = await this.fetchData(this.videoJsonPath);
		let postsFetched = await this.fetchData(this.postsJsonPath);

		if(videoFetched && postsFetched){

			this.setVideosArrState(videoFetched);
			this.setPostsArrState(postsFetched);

			activateHomeHandlers();
		}
		
	}

	async fetchData(url){
		return await fetch(url,{
			headers : { 
				'Content-Type': 'application/json',
				'Accept': 'application/json'
				}
		}).then((response)=>{
				if(response.ok){
					return response.json();
				}else{
					return null;
				}
			}).then((myJson)=> {
				if(myJson){
					return myJson.data;
				}
			});
	}

  componentWillUnmount() {

	}


	render(){
		const {videosArr} = this.state;
		const {postsArr} = this.state;
		
		return(

			
<div className="home-content">

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



	<div className="bd-container container-xxl">

		<div id="hm-heading" className="text-center p-3">

			<div id="carouselExampleDark"
				className="carousel carousel-dark slide d-flex flex-column justify-content-center"
				data-bs-interval="false">
			
				<div className="carousel-inner mb-3">

					{videosArr.map(video=>
							<VideoElement key={video.name} link={video.link}></VideoElement>
						)}
				</div>
				
				<div className="carousel-indicators">
					<button type="button"
							data-bs-target="#carouselExampleDark" data-bs-slide-to="0"
							className="active" aria-current="true" aria-label="Slide 1"></button>

					<button type="button" data-bs-target="#carouselExampleDark"
							data-bs-slide-to="1" aria-label="Slide 2"></button>

					<button type="button" data-bs-target="#carouselExampleDark"
							data-bs-slide-to="2" aria-label="Slide 3"></button>
				</div>

				<button className="carsl-control-prev" type="button" data-bs-target="#carouselExampleDark"  data-bs-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button className="carsl-control-next" type="button" data-bs-target="#carouselExampleDark"  data-bs-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Next</span>
				</button>


			</div>


		</div>


		<div className="row" >

			<HomeOverlay></HomeOverlay>

			{postsArr.map(post=>(
				<Post key={post.postId} postItem={post} ref={this.postElement} ></Post>
			))}
			
		</div>

	</div>

</div>

		);
	}
}


function VideoElement(props){

	return(
		
		<div className="carousel-item">
			<div className="d-flex justify-content-center">
				<div className="video-container"> 
					<video className="carousel-video-element" muted controls>
						<source src={props.link} type="video/mp4"/>
							Your browser does not support HTML5 video.
					</video>
				</div>
			</div>
		</div>
	)
}



export default Home;