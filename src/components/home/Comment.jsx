import React from 'react';
import './Home.scss';
import commentReadMoreWithClassName from './home-scripts.js';



class Comment extends React.Component{
	constructor(props){
		super(props);

		this.state={
			comments:props.comments
		}
		this.setCommentsState = this.setCommentsState.bind(this);

	}
	setCommentsState(newComment){
		this.setState((state)=>({
			comments:state.comments.concat(newComment)
		}));
		// console.log('comments state after Comment',this.state.comments.length);
	}


	divideCommentText(comment){
    if(comment.commentText.length>133){
      comment.textShortPart = comment.commentText.slice(0,132);
      comment.textRemainingPart = comment.commentText.slice(133,comment.commentText.length-1);
    }else{
      comment.textShortPart = comment.commentText;
    }
  }
	divideCommentsText(comments){
		Array.from(this.state.comments).forEach(cmt=>{
			this.divideCommentText(cmt);
		});
	}

	componentDidUpdate(){
		commentReadMoreWithClassName();
	}
	
	componentDidMount(){
		
	}

	componentWillUnmount(){

	}


	render(){
		const {comments} = this.state.comments;
		this.divideCommentsText(comments);

		return(

			<div className="comments-container">

				{this.state.comments.map((comment)=>(

					<div key={comment.commentId} className="row justify-content-between">

						<div className="col-2 mb-2">
							<img className="img-fluid mx-auto"
							style={{height: "30px"}}
							src={comment.commentatorAvatar}
							alt="comment user profile"/>
						</div>

						<div className="col-10">
							<p className="comment-content">{comment.textShortPart}<span className="dots">...</span>
								<span  className="more">
									{comment.textRemainingPart}
								</span>
								<span className="readmore"> read more</span>
							</p>
						</div>

					</div>
				))}

			</div>
			

		);
	}
}

export default Comment