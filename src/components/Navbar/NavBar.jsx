import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import SvgIcon from "@material-ui/core/SvgIcon";
import {searchUsersPostsByUserName} from '../redux_components/posts/postSlice';
import {StatusData} from '../../api/ApiRoutes'
const NavBar = (props) => {
  return (
    <nav
      className="navbar navbar-expand-md fixed-top navbar-light shadow py-1 bg-light"
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
          <div className="row width-100-media align-items-center justify-content-center">
            <div className="col-md-9 col-sm-8">
              <div className="row justify-content-between">
                <div className="col-md-2 col-sm-3 justify-content-center d-flex">
                  <ul className="nav navbar-nav">
                    <li className="p-2">
                      <Link className="nav-link" to="/explore">
                        Explore
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="col-md-7 col-sm-8">
                  <SearchForm></SearchForm>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-8">
              <div className="nav navbar-nav">
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

const SearchForm = (props) => {

  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(StatusData.idle);

  const handleInputChange = (e) => {
    setText(e.target.value);

    if(e.target.value){

      e.target.style.background = 'none';
    }else{

      e.target.style = '';
    }
  
  }

  const handleKeyDown = async (e) =>{

    const trimmedText = text.trim();  
    if(e.key === 'Enter' && trimmedText){

      setLoadingStatus(StatusData.loading);

      console.log('searching...');

      await dispatch(searchUsersPostsByUserName({searchUserName:trimmedText}));

      setLoadingStatus(StatusData.idle);

    }
  }
  let isLoading = loadingStatus === StatusData.loading;
  return (
    <div className="mt-2">

        <input
          id="search"
          className="form-control"
          type="search"
          placeholder="search for an author"
          value={text}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          aria-label="Search"
          disabled={isLoading}
        />
    </div>
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
