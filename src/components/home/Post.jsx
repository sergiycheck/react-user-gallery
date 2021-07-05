import React,{useEffect,useState} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import './Home.scss';
import { CommentsList } from './CommentsList.jsx'

import {TimeAgo} from './TimeAgo';


import { 
	fetchPosts,
	selectAllPosts,
	selectPostById,
	selectPostIds ,
	addLikeToPost
} from '../redux_components/posts/postSlice';
import { 
	fetchSingleUser, 
	selectUserById
} from '../redux_components/users/usersSlice'

import {
	fetchPostComments
} from '../redux_components/comments/commentSlice'


 export  let  Post = (props) =>{

	const dispatch = useDispatch();
	const {postId} = props;

	const post = useSelector(state=>selectPostById(state,postId));
	const {userId} = post;

	useEffect(()=>{
		
		dispatch(fetchSingleUser(userId))

	},[userId,dispatch])

	const increment = 5;
	const [from,setPaginationFromProp] = useState(0)
	const [to,setPaginationToProp] = useState(increment)

	useEffect(()=>{
		dispatch(fetchPostComments({postId, from, to}));
		setPaginationProperties(from,to);
	},[postId,dispatch])

	const setPaginationProperties = (from,to)=>{
		setPaginationFromProp(from);
		setPaginationToProp(to);
		console.log('pagination properties set', ' from ',from, ' to ', to);
	}

	const user = useSelector(state => selectUserById(state,userId));
	
	const addLikeToPostHandler = () =>{
		dispatch(addLikeToPost({postId}))
	}

		return(
			<div>
				
				<div className="card p-2 mt-2">
					<div className="bd-placeholder-img d-flex justify-content-center">
						<div  className="d-inline-flex">


							<img className="click-big-post img-fluid  user-img"
								src={post.image} alt="user post"/>
							
						</div>
					</div>

					<div className="card-body">

						<div className="row">

								<div className="col-sm-1 mb-2">

									<img className="img-fluid mx-auto rounded"
									// style={{height: "30px"}}
									src={user?.image}
									alt="user profile"/>

								</div>

								<div className="col-sm-2">
									<h3>{user?.userName}</h3>
								</div>

								<div className="col-sm-8">
									<p className="card-text mb-1">
										{post.content}
									</p>
								</div>

							</div>

						<hr/>

						{/* loop for post comments */}
							
						{/* ref={this.commentElement} for adding comments ? */}
						<CommentsList 
							postId={postId} 
							commentIds={post.commentIds}
							></CommentsList>

						<div className="row mb-3">

							<div className="col-sm-8">

								{/* <input
									
									onChange={this.handleNewCommentInputChange}
									value={this.state.newCommentData}
									type="text" className="inpt-comment form-control"
									placeholder={this.state.inputPlaceHolder} /> */}


							</div>

							<div className="col-sm-2 d-flex justify-content-start">

								{/* <button 
									onClick={this.addComment}  
									className="btn btn-outline-secondary" >Post</button> */}


							</div>

							<div className="col-sm-2">

								<div className="d-flex justify-content-end ">

									<div className="likeContent position-relative">
										<svg
											className="bi bi-heart me-3 likeHeart"
											onClick={addLikeToPostHandler}
											xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" viewBox="0 0 16 16">
											<path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
										</svg>

										<span className='mx-2'>
											{post.likeCount}
										</span>
									</div>


									<small className=" text-muted">
										<TimeAgo timeStamp={post.date}></TimeAgo>
									</small>
								</div>
								
							</div>

						</div>


					</div>

				</div>

			</div>
			

		);
	

}
// Post = React.memo(Post);
export default Post;