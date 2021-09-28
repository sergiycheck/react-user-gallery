import { Link } from "react-router-dom";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import SvgIcon from "@material-ui/core/SvgIcon";

import {
  // searchUsersPostsByUserName,
  removeAllEntities,
  setSearchQuery,
  // selectFromAndToForPagination,
  // changePaginationPropsForSearchQuery
} from "../explore/searchComponent/searchDataSlice";

import {
  searchForUsersNames,
  selectSearchedNamesAndIds,
} from "../explore/searchComponent/searchDataSlice.js";

import { StatusData } from "../../api/ApiRoutes";
import navbarStyles from "./NavBar.module.scss";
import classNames from "classnames";

import { unwrapResult } from "@reduxjs/toolkit";
import { throttle } from "./throttle";
import { useHistory } from "react-router-dom";

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
            <div className="col-md-8 col-sm-8">
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

            <div className="col-md-4 col-sm-8">
              <div className="nav navbar-nav">
                <Link to="/messages" className="nav-link">
                  Messages
                </Link>

                <Link to="/profile" className="nav-link disabled">
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

async function dispatchSearchRequest(trimmedText, dispatch) {
  try {
    const arrNamesResult = await dispatch(
      searchForUsersNames({ query: trimmedText })
    );
    // console.log(`arrNamesResult`, arrNamesResult);
    const unwrappedResult = unwrapResult(arrNamesResult);
    console.log(`unwrappedResult`, unwrappedResult);
    // setSearchedArrName(unwrappedResult.slice());
    return unwrappedResult;
  } catch (error) {
    console.log(error.message);
  }
}
const TIME_AFTER_WHICH_TO_DISPATCH = 500;
const throttledRequest = throttle(
  dispatchSearchRequest,
  TIME_AFTER_WHICH_TO_DISPATCH
);

const SearchForm = (props) => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(StatusData.idle);

  const searchInput = useRef(null);
  const [isListHidden, setListHidden] = useState(true);

  const history = useHistory();

  // const fromAndTo = useSelector(selectFromAndToForPagination);

  const handleListItemClick = (e) => {
    setText(e.target.innerText.trim());
    searchInput.current.focus();
  };

  // const [searchedArrNames, setSearchedArrName] = useState([]);
  const searchedArrNames = useSelector(selectSearchedNamesAndIds);

  let renderedArrNames = searchedArrNames.map((name) => (
    <li key={name.id} onClick={handleListItemClick} className="list-group-item">
      {name.userName}
    </li>
  ));

  if (Array.from(searchedArrNames).length === 0 && text.trim()) {
    renderedArrNames = (
      <li key="no-items-found" className="list-group-item">
        No items fount
      </li>
    );
  }

  const requestForUserNames = (value) => {
    const unwrappedResultPromise = throttledRequest(value.trim(), dispatch);

    if (unwrappedResultPromise) {
      console.log("setting promise result");
      unwrappedResultPromise.then((result) => {
        console.log("result of resolved promise", result);
        // setSearchedArrName(result.slice());
      });
    }
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
    setListHidden(false);

    if (e.target.value) {
      e.target.style.background = "none";
    } else {
      e.target.style = "";
    }
    requestForUserNames(e.target.value);
  };

  const handleKeyDown = (e) => {
    const trimmedText = text.trim();

    if (e.key === "Enter" && trimmedText) {
      setLoadingStatus(StatusData.loading);
      setListHidden(true);

      // console.log(`searching for posts with query ${trimmedText}...`);
      
      dispatch(removeAllEntities());

      dispatch(setSearchQuery({query:trimmedText}))

      history.push(`/searchResults/${trimmedText}`);

      setLoadingStatus(StatusData.idle);
    }
  };
  let isLoading = loadingStatus === StatusData.loading;

  const searchInputClasses = classNames(
    `list-group`,
    navbarStyles.searchClasses
  );

  return (
    <div className="mt-2">
      <div className={navbarStyles.inputWrapper}>
        <input
          ref={searchInput}
          id="search"
          className="form-control"
          type="search"
          placeholder="search for an author"
          value={text}
          onClick={() => {
            setListHidden(false);
          }}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          aria-label="Search"
          disabled={isLoading}
          autoComplete="off"
        />

        <ul className={searchInputClasses} hidden={isListHidden}>
          {renderedArrNames}
        </ul>
      </div>
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
