import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Button from '@mui/material/Button';



import { 
	increment,
	decrement,
	incrementByAmount,
	selectItemCount,
}
from './itemCounterSlice';



export default function ItemCounter(props){

	const itemCounter = useSelector(selectItemCount);
	const dispatch = useDispatch();

	const [incrementItemsAmount,setIncrementAmount] = useState(0);

	return(
		<div className="d-flex">			
			<div>
				<span className="fs-2">{itemCounter}</span>
			</div>
			
		</div>
	)
}