import './Messages.scss';

import React, { Component } from 'react';

import activateMessageHandlers from './message-scripts.js';

export default class Messages extends Component {

	constructor(props) {
		super(props)
	
		this.state = {
			 
		}

	}

	componentDidMount(){
		activateMessageHandlers();
	}
	

	render() {

		return (
<div className="user-wrapper d-flex align-items-stretch mt-5">

	<nav className="sidebar ">

		<div className="custom-menu">
			<button type="button" id="sidebarCollapse" className="btn btn-primary">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="25" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
					<path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
				</svg>
			</button>
		</div>

		<div className="p-4 pt-5">

			<div className="mb-5">
				<h3 className="h6">Search user names</h3>
				<form action="#" className="colorlib-subscribe-form">
					<div className="form-group d-flex">
						<div className="icon"><span className="icon-paper-plane"></span></div>
						<input type="text" className="form-control" placeholder="search user name"/>
					</div>
				</form>
			</div>

			<ul className="list-unstyled components mb-5">

				<li className="active">
					<a href="#"
						data-bs-target="#homeSubmenu" aria-controls="homeSubmenu"
						data-bs-toggle="collapse" aria-expanded="true"
						className="dropdown-toggle">Group 1</a>
					<ul className="collapse list-unstyled list-group" id="homeSubmenu">

						<a className="list-group-item list-group-item-action rounded-0">
							<div className="d-flex flex-row">
								<img className=" me-1"
								src="https://cdn.iconscout.com/icon/free/png-256/avatar-human-man-profile-auto-user-30483.png"
								alt="user" width="50" height="65" className="rounded-circle" />

								<div className="ml-4">
									<div className="d-flex align-items-center justify-content-between mb-1">
										<h6 className="mb-0">First1 Last1</h6><small className="small font-weight-bold">25 Feb</small>
									</div>
									<p className="font-italic mb-0 text-small">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
										eiusmod tempor incididunt ut labore.
									</p>
								</div>
							</div>
						</a>

						<a className="list-group-item list-group-item-action rounded-0">
							<div className="d-flex flex-row">
								<img className=" me-1"
								src="https://cdn.iconscout.com/icon/free/png-256/avatar-human-man-profile-auto-user-30483.png"
								alt="user" width="50" height="65" className="rounded-circle"/>

								<div className="ml-4">
									<div className="d-flex align-items-center justify-content-between mb-1">
										<h6 className="mb-0">First1 Last1</h6><small className="small font-weight-bold">25 Feb</small>
									</div>
									<p className="font-italic mb-0 text-small">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
										eiusmod tempor incididunt ut labore.
									</p>
								</div>
							</div>
						</a>

						<a className="list-group-item list-group-item-action rounded-0">
							<div className="d-flex flex-row">
								<img className=" me-1"
								src="https://cdn.iconscout.com/icon/free/png-256/avatar-human-man-profile-auto-user-30483.png"
								alt="user" width="50" height="65" className="rounded-circle"/>

								<div className="ml-4">
									<div className="d-flex align-items-center justify-content-between mb-1">
										<h6 className="mb-0">First1 Last1</h6><small className="small font-weight-bold">25 Feb</small>
									</div>
									<p className="font-italic mb-0 text-small">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
										eiusmod tempor incididunt ut labore.
									</p>
								</div>
							</div>
						</a>

					</ul>
				</li>

				<li>
					<a className="list-group-item list-group-item-action rounded-0  ">
						<div className="d-flex flex-row">
							<img className=" me-1"
							src="https://cdn.iconscout.com/icon/free/png-256/avatar-human-man-profile-auto-user-30483.png"
							alt="user" width="50" height="65" className="rounded-circle"/>

							<div className="ml-4">
								<div className="d-flex align-items-center justify-content-between mb-1">
									<h6 className="mb-0">First1 Last1</h6><small className="small font-weight-bold">25 Feb</small>
								</div>
								<p className="font-italic mb-0 text-small">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
									eiusmod tempor incididunt ut labore.
								</p>
							</div>
						</div>
					</a>
				</li>


				<li>
					<a href="#"
					data-bs-target="#pageSubmenu" aria-controls="pageSubmenu"
					data-bs-toggle="collapse" aria-expanded="true"
					className="dropdown-toggle">Group 2</a>
					<ul className="collapse list-unstyled list-group" id="pageSubmenu">
						<li>
							<a className="list-group-item list-group-item-action rounded-0  ">
								<div className="d-flex flex-row">
									<img className=" me-1"
									src="https://cdn.iconscout.com/icon/free/png-256/avatar-human-man-profile-auto-user-30483.png"
									alt="user" width="50" height="65" className="rounded-circle"/>

									<div className="ml-4">
										<div className="d-flex align-items-center justify-content-between mb-1">
											<h6 className="mb-0">First1 Last1</h6><small className="small font-weight-bold">25 Feb</small>
										</div>
										<p className="font-italic mb-0 text-small">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
											eiusmod tempor incididunt ut labore.
										</p>
									</div>
								</div>
							</a>
						</li>
						<li>
							<a className="list-group-item list-group-item-action rounded-0  ">
								<div className="d-flex flex-row">
									<img className=" me-1"
									src="https://cdn.iconscout.com/icon/free/png-256/avatar-human-man-profile-auto-user-30483.png"
									alt="user" width="50" height="65" className="rounded-circle"/>

									<div className="ml-4">
										<div className="d-flex align-items-center justify-content-between mb-1">
											<h6 className="mb-0">First1 Last1</h6><small className="small font-weight-bold">25 Feb</small>
										</div>
										<p className="font-italic mb-0 text-small">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
											eiusmod tempor incididunt ut labore.
										</p>
									</div>
								</div>
							</a>
						</li>
						<li>
							<a className="list-group-item list-group-item-action rounded-0  ">
								<div className="d-flex flex-row">
									<img className=" me-1"
									src="https://cdn.iconscout.com/icon/free/png-256/avatar-human-man-profile-auto-user-30483.png"
									alt="user" width="50" height="65" className="rounded-circle"/>

									<div className="ml-4">
										<div className="d-flex align-items-center justify-content-between mb-1">
											<h6 className="mb-0">First1 Last1</h6><small className="small font-weight-bold">25 Feb</small>
										</div>
										<p className="font-italic mb-0 text-small">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
											eiusmod tempor incididunt ut labore.
										</p>
									</div>
								</div>
							</a>
						</li>
					</ul>
				</li>

				<li>
					<a className="list-group-item list-group-item-action rounded-0  ">
						<div className="d-flex flex-row">
							<img className=" me-1"
							src="https://cdn.iconscout.com/icon/free/png-256/avatar-human-man-profile-auto-user-30483.png"
							alt="user" width="50" height="65" className="rounded-circle"/>

							<div className="ml-4">
								<div className="d-flex align-items-center justify-content-between mb-1">
									<h6 className="mb-0">First1 Last1</h6><small className="small font-weight-bold">25 Feb</small>
								</div>
								<p className="font-italic mb-0 text-small">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
									eiusmod tempor incididunt ut labore.
								</p>
							</div>
						</div>
					</a>
				</li>

				<li>
					<a className="list-group-item list-group-item-action rounded-0  ">
						<div className="d-flex flex-row">
							<img className=" me-1"
							src="https://cdn.iconscout.com/icon/free/png-256/avatar-human-man-profile-auto-user-30483.png"
							alt="user" width="50" height="65" className="rounded-circle"/>

							<div className="ml-4">
								<div className="d-flex align-items-center justify-content-between mb-1">
									<h6 className="mb-0">First1 Last1</h6><small className="small font-weight-bold">25 Feb</small>
								</div>
								<p className="font-italic mb-0 text-small">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
									eiusmod tempor incididunt ut labore.
								</p>
							</div>
						</div>
					</a>
				</li>

			</ul>

		</div>

	</nav>

	<div className="container">

		<div className="row align-items-end chat-content justify-content-start">
			<div className="col-sm-7">

				<div className="chat-message-container d-flex flex-column overflow-auto">

					<div className="my-2 align-self-start">
						<div className="rounded d-flex mb-1">

							<div className="me-2">
								<img src="https://img.icons8.com/pastel-glyph/2x/person-male--v2.png"
								width="50" height="50" className="rounded me-2" alt="user picture"/>
							</div>

							<div className="bg-light">
								<div className="d-flex justify-content-end">
									<small className="text-muted me-2 edit-msg">Edit</small>
									<button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
								</div>

								<div className="p-2">
									<p className="text-small mb-0 text-muted">
										Message one Lorem, ipsum dolor sit amet
									</p>
								</div>
							</div>

						</div>
						<p className="small text-muted">12:00 PM | Apr. 13</p>
					</div>

					<div className="my-2 align-self-start">
						<div className="rounded d-flex mb-1">

							<div className="me-2">
								<img src="https://img.icons8.com/pastel-glyph/2x/person-male--v2.png"
								width="50" height="50" className="rounded me-2" alt="user picture"/>
							</div>

							<div className="bg-light">
								<div className="d-flex justify-content-end">
									<small className="text-muted me-2 edit-msg">Edit</small>
									<button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
								</div>

								<div className="p-2">
									<p className="text-small mb-0 text-muted">
										Message one Lorem, ipsum dolor sit amet
									</p>
								</div>
							</div>

						</div>
						<p className="small text-muted">12:00 PM | Apr. 13</p>
					</div>

					<div className="my-2 align-self-end">
						<div className="rounded d-flex mb-1">
							<div className="bg-light">
								<div className="d-flex justify-content-end">
									<small className="text-muted me-2 edit-msg">Edit</small>
									<button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
								</div>

								<div className="p-2">
									<p className="text-small mb-0 text-white bg-primary p-2 rounded">
										Message one Lorem, ipsum dolor sit amet
									</p>
								</div>
							</div>

						</div>
						<p className="small text-muted">5:00 PM | Apr. 23</p>
					</div>
				</div>

				<div className="p-1 m-2">
					<div className="row justify-content-start">
						<div className="col-md-9 col-sm-12">

							{/* <!-- <input id="message-data"
								type="text"
								className="form-control border-2 pl-2"
								placeholder="Write your message..."> --> */}

								<span
									id="message-data"
									className="input-span form-control border-2 pl-2"
									role="textbox"
									contentEditable>
								</span>

						</div>
						<div className="col-md-2 col-sm-2">
							<button id="send-message-btn" type="submit" className="btn btn-primary">
								<span className="material-icons">send</span>
							</button>
						</div>
					</div>
				</div>

			</div>


		</div>

	</div>

</div>
		)
	}
}
