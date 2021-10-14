

export const throttle = (func,time) =>{
	let allowedToCall = true;

	function wrapper(...args){
 
		if(!allowedToCall){
			wrapper.savedArgs = arguments;
			wrapper.savedThis = this;
			// console.log(`func, args `, func,args)
			return;
		}

		const res = func.apply(this,args);//this is passed function, (args is 1 for first call)


		allowedToCall = false;
		setTimeout(()=>{
			allowedToCall = true;
			if(wrapper.savedArgs){

				const wrappedRes = wrapper.apply(wrapper.savedThis,wrapper.savedArgs);//calling wrapper with last this and argumets
				wrapper.savedThis = null;
				wrapper.savedArgs = null;

				return wrappedRes;
			}

		},time);

		return res;

	}
	
	return wrapper;

}



