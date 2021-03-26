import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Button from '@material-ui/core/Button';



import { 
	increment,
	decrement,
	incrementByAmount,
	selectItemCount,
}
from './features/itemCounterSlice';




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

			<Button
			variant="contained"
			color="primary"
			onClick={()=>dispatch(increment())}
			className="m-2">
			+
			</Button>
			
			<span className="fs-2">{itemCounter}</span>
			<Button 
			onClick={()=>dispatch(decrement())}
			variant="contained"
			className="btn bg-warning m-2">
				-
			</Button>

			{/* <input
				value={incrementItemsAmount}
				onChange={e=>setIncrementAmount(e.target.value)} 
				className="form-control" type="number"/>
			<Button 
				onClick={()=>
					dispatch(incrementByAmount(Number(incrementItemsAmount) || 0))}
				className="btn bg-success">
				add amount
			</Button> */}
			
		</div>
	)
}