

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectAllSearchedPostByIds,
  selectSearchedPostById,

  searchUsersPostsByUserName,

  selectSearchDataStatus,

  selectSearchDataAllEntitiesLength,

  changeSearchDataStatusToStartFetching,

  changePaginationPropsForSearchQuery,
  // removeAllEntities,
  
  selectSearchQuery,
  setSearchQuery,
  selectFromAndToForPagination

} from "./searchDataSlice";

import { fetchSingleUser, selectUserById } from "../../profile/usersSlice";

import { StatusData } from "../../../api/ApiRoutes";
import { showVisible } from "../../../helpers/imgLazyLoading";
import { Loader } from "../../helperComponents/Loader.jsx";

import "../Explore.scss";

import classNames from "classnames";

import {Link} from 'react-router-dom';

import {atTheBottom} from '../../../helpers/atTheBottom';


export const SearchDataComponent = ({match}) => {

  console.log("match.params ", match.params);

  const { query } = match.params; // bug. Dispatching action for previous query

  const dispatch = useDispatch();

  const searchDataPostsIds = useSelector(selectAllSearchedPostByIds);

  const searchDataPostsStatus = useSelector(selectSearchDataStatus);

  const allFetchedSearchDataPostsLength = useSelector(selectSearchDataAllEntitiesLength);

  // const searchQuery = useSelector(selectSearchQuery);

  const fromAndTo = useSelector(selectFromAndToForPagination);


  useEffect(()=>{
    
    dispatch(setSearchQuery({query}))
    
  },[dispatch, query]);


  // const increment = 5;
  // const [from, setFromPaginationProp] = useState(0);
  // const [to, setToPaginationProp] = useState(increment);

  useEffect(() => {
  
    const requestProcessing = searchDataPostsStatus === StatusData.loading;
    if (requestProcessing) {
      console.log('requestProcessing')
      return;
    }

    const allPostsFetched = searchDataPostsIds.length >= allFetchedSearchDataPostsLength;
    const somePostsFetched = searchDataPostsIds.length > 0;

    if (allPostsFetched && somePostsFetched) {
      console.log('allPostsFetched && somePostsFetched')

      window.removeEventListener("scroll", handleScroll);
      return;
    }

    const statusChangedToFetchMorePosts = searchDataPostsStatus === StatusData.idle;
    if (statusChangedToFetchMorePosts) {
      console.log('statusChangedToFetchMorePosts')

      fetchPostAndSetPagination();
    }

    async function fetchPostAndSetPagination() {

      console.log('fetching posts for query', query);


      await dispatch(searchUsersPostsByUserName({...fromAndTo}));

      await dispatch(changePaginationPropsForSearchQuery({query:query}));

    }
  }, [dispatch, searchDataPostsStatus, query]);


  const handleScroll = () => {
    
    if (atTheBottom()) {

      dispatch(changeSearchDataStatusToStartFetching({ newStatus: StatusData.idle }));
    }
  };

  useEffect(() => {

    const allSearchedPostsNotFetched = searchDataPostsIds.length !== allFetchedSearchDataPostsLength;
    const fetchedSomeSearchPosts = searchDataPostsIds.length > 0;

    if ( allSearchedPostsNotFetched && fetchedSomeSearchPosts) {
      console.log('allSearchedPostsNotFetched && fetchedSomeSearchPosts setting handleScroll')

      window.addEventListener("scroll", handleScroll);
    }

    return function removeScrollListener() {

      console.log('removeScrollListener')

      window.removeEventListener("scroll", handleScroll);
    };
  });

  let statusPostLoadingData = "";
  if (searchDataPostsStatus === StatusData.loading) {
    statusPostLoadingData = <Loader></Loader>;
  } else if (searchDataPostsStatus === StatusData.succeeded) {
    statusPostLoadingData = "";
  }

  const searchPostsContent = searchDataPostsIds.map((postId, index) => {

    const postClassName = classNames(
      `col-sm-12 col-md-6 aos-init aos-animate p-1 col-lg-${4}`
    );
    return (
      <SearchDataExcerpt
        key={postId}
        postExploreClassName={postClassName}
        postId={postId}
      ></SearchDataExcerpt>
    );
  });

  return (
    <div className="site-wrap">
      <div className="main-content">
        <div className="container-fluid photos">

          <div className="container">
            <div className="row justify-content-center">
              <div className="col my-4 ">
                <h2>Search results for {query? query: 'none'}</h2>
              </div>
            </div>
          </div>
          
          <div className="row align-items-stretch my-4 p-2">

            {searchPostsContent}

            {statusPostLoadingData}

          </div>
        </div>
      </div>
    </div>
  );


};


export const SearchDataExcerpt = (props) => {

  const dispatch = useDispatch();
  const { postId, postExploreClassName } = props;

  const post = useSelector((state) => selectSearchedPostById(state, postId));
  const { userId } = post;

  const user = useSelector((state) => selectUserById(state, userId));

  useEffect(() => {
    if(!user){
      dispatch(fetchSingleUser(userId));
    }
    
  }, [userId, dispatch, user]);

  

  if (!user || !post) {

    // console.log('!user || !post', user, post);

    return (
      <div className={postExploreClassName} data-aos="fade-up">
        <span className="d-block photo-item">
          <img
            src="/assets/img/img-placeholder.gif"
            alt="Post"
            className="img-fluid rounded"
          />
        </span>
      </div>
    );
  }

  if (user && post) {
    
    // console.log('user && post');

    showVisible("searchDataExcerpt");
  }

  return (
    <div className={postExploreClassName} data-aos="fade-up">
      <Link to={`/posts/${post.id}`} className="d-block photo-item">
        <img
          src="/assets/img/img-placeholder.gif"
          data-src={post.image}
          alt="Post"
          className="img-fluid rounded"
        />

        <div className="photo-text-more">
          <div className="photo-text-more">
            <h3 className="heading">{user.userName}</h3>
            <span className="meta">{post.title}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};


export default SearchDataComponent;
