import React, { Component } from 'react'

export default class Profile extends Component {
	render() {
		return (
			<div className="w-100">
				
				<main>
					<section className="py-5 text-center container">
						<div className="row py-lg-5">
							<div className="col-lg-3 col-md-2">
								<img className=" img-fluid " src="http://simpleicon.com/wp-content/uploads/user1.png"
								alt="user photo" height="300"/>
							</div>

							<div className="col-lg-6 col-md-8 mx-auto">
								<h1 className="fw-light">First Last</h1>
								<p className="lead text-muted">Something short and leading about the collection below—its contents,
									the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.
								</p>
								<p className="small">@username</p>
							</div>

						</div>
					</section>

					<div className="py-5 bg-light">
						<div className="container">
							<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2">


								<div className="col">
									<div className="card shadow-sm">

										<img className="img-fluid p-2"
											src="https://source.unsplash.com/user/solase/300x400"
											height="400" />

										<div className="card-body">
											<p className="card-text">
												This is a wider card with supporting text below as a natural lead-in to additional content.
												This content is a little bit longer.
											</p>
										</div>
									</div>
								</div>
								<div className="col">
									<div className="card shadow-sm p-2">

										<img className="img-fluid"
											src="https://source.unsplash.com/user/tom/300x400"
											height="400" />

										<div className="card-body">
											<p className="card-text">
												This is a wider card with supporting text below as a natural lead-in to additional content.
												This content is a little bit longer.
											</p>
										</div>
									</div>
								</div>
								<div className="col">
									<div className="card shadow-sm p-2">

										<img className="img-fluid"
											src="https://source.unsplash.com/user/mike/300x400"
											height="400" />

										<div className="card-body">
											<p className="card-text">
												This is a wider card with supporting text below as a natural lead-in to additional content.
												This content is a little bit longer.
											</p>
										</div>
									</div>
								</div>
								<div className="col">
									<div className="card shadow-sm p-2">

										<img className="img-fluid"
											src="https://source.unsplash.com/user/anna/300x400"
											height="400" />

										<div className="card-body">
											<p className="card-text">
												This is a wider card with supporting text below as a natural lead-in to additional content.
												This content is a little bit longer.
											</p>
										</div>
									</div>
								</div>


							</div>
						</div>
					</div>


				</main>

			</div>
		)
	}
}
