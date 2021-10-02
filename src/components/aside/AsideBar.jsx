import asideStyles from './AsideBar.module.scss';

import classNames from 'classnames';

const AsideBar = (props) => {

	return (

		<aside className={
			classNames('bd-aside text-muted align-self-start mb-3 mb-xl-5 px-2 bg-light',asideStyles.stickyAside)}>
			{/* <h2 className="h6 pt-4 pb-3 mb-4 border-bottom">right aside bar</h2> */}
			<nav className="small" id="toc">
				<ul className="list-unstyled fs-4 fw-bold">

					<li className="my-2">
						<button className="btn d-inline-flex align-items-center collapsed fs-4"
						data-bs-toggle="collapse" aria-expanded="false"
						data-bs-target="#contents-collapse"
						aria-controls="contents-collapse">Explore</button>

						<ul className="list-unstyled ps-3 collapse" id="contents-collapse">
							<li><a className="d-inline-flex align-items-center rounded" href="/explore">explore</a></li>

						</ul>

					</li>

					<li className="my-2">
						<button className="btn d-inline-flex align-items-center collapsed fs-4"
							data-bs-toggle="collapse" aria-expanded="false"
							data-bs-target="#forms-collapse"
							aria-controls="forms-collapse">Contacts</button>

						<ul className="list-unstyled ps-3 collapse" id="forms-collapse">
							<li><a className="d-inline-flex align-items-center rounded" href="/messages">messages</a></li>
						</ul>
					</li>

					<li className="my-2">
						<ul className="list-unstyled ps-3" id="components-collapse">
							<li><a className="d-inline-flex align-items-center rounded" href="/profile">profile</a></li>
							<li><a className="d-inline-flex align-items-center rounded" href="/options">options</a></li>
						</ul>
					</li>

				</ul>

			</nav>
		</aside>



	)

}

export default AsideBar;