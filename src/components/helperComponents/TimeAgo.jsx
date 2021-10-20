import React from 'react';

import { parseISO, formatDistanceToNow } from 'date-fns';

import timeAgoStyles from './TimeAgo.module.scss';

export const TimeAgo =({timeStamp})=>{
	let timeAgo = '';
	if(timeStamp){
		const date = parseISO(timeStamp);
		const timeDistance = formatDistanceToNow(date);
		timeAgo = `${timeDistance} ago`
	}
	return (
		<span className={timeAgoStyles.timeAgo} title={timeStamp}>
			&nbsp; <i>{timeAgo}</i>
		</span>
	);
}