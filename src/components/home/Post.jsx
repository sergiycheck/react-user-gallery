
import React from 'react';
import './Home.scss';
import Comment from './Comment.jsx'



class Post extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			post:props.postItem,
			comments:props.postItem.comments,
			newCommentData:'',
			inputPlaceHolder:'Add your comment'
		}

		this.setPostState = this.setPostState.bind(this);
		this.concatComments = this.concatComments.bind(this);
		this.handleNewCommentInputChange = this.handleNewCommentInputChange.bind(this);
		this.addComment = this.addComment.bind(this);

		this.commentElement = React.createRef();

	}


	handleNewCommentInputChange(event){
		this.setState({
			newCommentData:event.target.value
		})
	}

	concatComments(newComment){

		let newComments = this.state.comments.concat([newComment]);
		// console.log('newComments length', newComments.length);

		this.setState((state)=>({
			comments:newComments
		}));
		
		// console.log('comments state after Post',this.state.comments.length);
	}

	setPostState(item){
		this.setState(()=>({
			post:item
		}));
	}


	addComment(e){
		e.preventDefault();
		if(this.state.newCommentData.length===0){
			this.addCommentInputWarningMessage();
			return;
		}

		const newComment = {
			postId:this.state.post.postId,
			commentId:Date.now(),
			commentText:this.state.newCommentData,
			commentatorAvatar:this.state.comments
				.find(c=>c.commentatorAvatar!=null).commentatorAvatar
		};
		this.concatComments(newComment);

		this.setState({
			newCommentData:''
		});

		this.commentElement.current.setCommentsState(newComment);
	}

	addCommentInputWarningMessage(){
		
		this.setState({
			inputPlaceHolder:"can't add empty comment"
		})
		
	}


	render(){
		const {post} = this.state;
		const {comments} =  this.state;
		// console.log('render comments length',comments.length);
		
		return(
			<div>
				
				<div className="card p-2 mt-2">

					<div className="bd-placeholder-img d-flex justify-content-center">
						<div  className="d-inline-flex">
							<img className="click-big-post img-fluid  user-img"
							src={post.imageUrl} alt="user post"/>
							{/* use tags to search posts */}
						</div>
					</div>

					<div className="card-body">

						<div className="row">

								<div className="col mb-2">
									<img className="img-fluid mx-auto"
									style={{height: "30px"}}
									src={post.authorAvatar}
									alt="user profile"/>
								</div>

								<div className="col-sm-11">
									<p className="card-text mb-1">
										{post.postText}
									</p>
								</div>

							</div>

						<hr/>

						{/* loop for post comments */}
						<Comment comments={comments} ref={this.commentElement}></Comment>

						<div className="row mb-3">

							<div className="col-sm-8">
								<input
									
									onChange={this.handleNewCommentInputChange}
									value={this.state.newCommentData}
									type="text" className="inpt-comment form-control"
									placeholder={this.state.inputPlaceHolder} />
							</div>

							<div className="col-sm-2 d-flex justify-content-start">
								<button 
									onClick={this.addComment}  
									className="btn btn-outline-secondary" >Post</button>
							</div>

							<div className="col-sm-2">

								<div className="d-flex justify-content-end">
									<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" className="bi bi-heart me-3" viewBox="0 0 16 16">
										<path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
									</svg>
									<small className=" text-muted">9 mins</small>
								</div>
								
							</div>

						</div>


					</div>

				</div>

			</div>
			

		);
	}
}

export default Post;