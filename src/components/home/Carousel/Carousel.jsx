

	const Carousel = (props) => {

		return(
			<div id="carouselExampleDark"
				className="carousel carousel-dark slide d-flex flex-column justify-content-center"
				data-bs-interval="false">
		
			<div className="carousel-inner mb-3">

				{props.contentVideos}
				
			</div>
			
			<CarouselIndicators></CarouselIndicators>

			<button className="carsl-control-prev" type="button"
				aria-label="prev-btn" 
				data-bs-target="#carouselExampleDark"  data-bs-slide="prev">
				<span className="carousel-control-prev-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Previous</span>
			</button>
			<button 
				className="carsl-control-next"
				aria-label="next-btn"
				type="button" data-bs-target="#carouselExampleDark"  data-bs-slide="next">
				<span className="carousel-control-next-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Next</span>
			</button>


		</div>

		)


	}


	const CarouselIndicators = (props) => {

		return(
			<div className="carousel-indicators">
			<button type="button"
					data-bs-target="#carouselExampleDark" data-bs-slide-to="0"
					className="active" aria-current="true" aria-label="Slide 1"></button>

			<button type="button" data-bs-target="#carouselExampleDark"
					data-bs-slide-to="1" aria-label="Slide 2"></button>

			<button type="button" data-bs-target="#carouselExampleDark"
					data-bs-slide-to="2" aria-label="Slide 3"></button>
		</div>


		)

	}

	export default Carousel;