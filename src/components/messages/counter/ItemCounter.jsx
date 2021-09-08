import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Button from '@material-ui/core/Button';



import { 
	increment,
	decrement,
	incrementByAmount,
	selectItemCount,
}
from './itemCounterSlice';



export default function ItemCounter(props){

	//console.log('MessageCounter',props.msgCount);

	const itemCounter = useSelector(selectItemCount);
	const dispatch = useDispatch();

	const [incrementItemsAmount,setIncrementAmount] = useState(0);

//error prone behaviour
	// useEffect(()=>{
	// 	//console.log('MessageCounter useEffect',props.msgCount);
	// 	setIncrementAmount(props.msgCount);
	// 	dispatch(incrementByAmount(incrementItemsAmount));
	
	//  },[props.msgCount]);

	return(
		<div className="d-flex">			
			<div>
				<span className="fs-2">{itemCounter}</span>
			</div>
			
		</div>
	)
}