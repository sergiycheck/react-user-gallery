

import {
  Link,
} from "react-router-dom";

import SvgIcon from "@material-ui/core/SvgIcon";


const NavBar = (props) => {
  return (
    <nav
      className="navbar navbar-expand-md fixed-top navbar-light shadow p-0 bg-light"
      role="navigation"
    >
      <div className="container  text-dark">
        <Link className="navbar-brand" to="/">
          <HomeIcon color="action" />
          <span>Home</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="row w-100 ">
            <div className="col">
              <ul className="nav navbar-nav">
                <li className="p-2">
                  <Link className="nav-link" to="/explore">
                    Explore
                  </Link>
                </li>
              </ul>
            </div>

            <div className="seach-col col-md-auto">
              <div className="mt-2">
                <form className="">
                  <input
                    id="search"
                    className="form-control"
                    type="search"
                    placeholder=""
                    aria-label="Search"
                  />
                </form>
              </div>
            </div>

            <div className="col col-md-auto">
              <div className="nav navbar-nav d-flex justify-content-end">
                <Link to="/messages" className="nav-link">
                  Messages
                </Link>

                <Link to="/profile" className="nav-link">
                  Profile
                </Link>

                <div className="dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Manage
                  </span>

                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li>
                      <Link to="/options" className="dropdown-item">
                        Options
                      </Link>
                    </li>
                    <li>
                      <Link to="/help" className="dropdown-item">
                        Help
                      </Link>
                    </li>
                    <li>
                      <Link to="/log out" className="dropdown-item">
                        Log out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default NavBar;




