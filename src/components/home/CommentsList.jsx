import { useState } from 'react';
import {useSelector} from 'react-redux';
import {
	selectCommentById,
	selectCommentsByPostId
} from '../redux_components/comments/commentSlice'

import './Home.scss';

import { StatusData } from '../../api/ApiRoutes';

import {TimeAgo} from '../home/TimeAgo'



export const CommentsList = (props) => {

	const {
		postId
	} = props;

	const commentsStatus = useSelector(state=>state.comments.status);

	const comments = useSelector(state=>selectCommentsByPostId(state, postId));
	

	if(commentsStatus === StatusData.succeeded){
		console.log('commentsStatus === StatusData.succeeded');
		// commentReadMoreWithClassName();
	}

	const contentComments = comments.map(comment=>{
		return <CommentExcerpt 
			key={comment.id}
			commentId={comment.id} 
			className="row justify-content-between" ></CommentExcerpt>
	})

	return(

		<div className="row comments-container">

			{contentComments}

		</div>
		
	);

}

export const CommentExcerpt = (props) => {

	const {commentId} = props;
	//for rerendering only current comment
	const comment = useSelector(state => selectCommentById(state,commentId));
	const {content} = comment;
	const textShortPart = content.substring(0,120);
	const textRemainingPart = content.substring(120, content.length);

	const [readMoreSpan, setReadMoreState] = useState(false);
	const [readMoreText, setReadMoreText] = useState('read more');
	const setReadMoreParams = () => {
		setReadMoreState(!readMoreSpan);
		if(readMoreSpan){
			setReadMoreText(' read more')
		}else{
			setReadMoreText(' read less');
		}
	}

	return(
		<>

			<div className="col-sm-3 mb-2">
				<img className="img-fluid mx-auto"
				style={{height: "30px"}}
				src={comment.commentatorAvatar}
				alt="comment user profile"/>
			</div>

			<div className="col-sm-6">
				<p className="comment-content">
					{textShortPart}

					{!readMoreSpan && 
						<span className="dots">...</span>
					}

					{readMoreSpan && 
						<span  className="more">
							{textRemainingPart}
						</span>
					}


					<span
						onClick={setReadMoreParams} 
						className="readmore">{readMoreText}</span>
				</p>
			</div>
			<div className="col-sm-2">
				<TimeAgo timeStamp={comment.date} ></TimeAgo>
			</div>

		</>

	)

}

