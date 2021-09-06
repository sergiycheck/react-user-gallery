

export const  Loader =  (props)=> {
	return(
		<div className="loader">
			<div className="d-flex justify-content-center">
				<img  className="img img-fluid"
					style={{
						width:`150px`,
						height:`150px`
					}} 
					src="./assets/img/loader.gif"
					/>
			</div>
		</div>
	)
}