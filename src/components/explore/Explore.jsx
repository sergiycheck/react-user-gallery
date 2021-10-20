import {
  selectExplorePostIds,
  selectExplorePostById,
  fetchExplorePosts,
  selectExplorePostsStatus,
  selectFetchedAllExplorePostsLength,
  changeExplorePostStatusToStartFetching,
  // fetchSingleExplorePost
} from "./exploreSlice.js";

import {   
  Switch,
  Route,
  Link,
  // useParams,
  useRouteMatch } from "react-router-dom";

import { ExploreWrapped } from "./ExploreWrapped.jsx";

import { UsersList } from "../profile/UsersList.jsx";

export const ExploreForExplorePage = () => {

  const match = useRouteMatch();
  // console.log(``)

  return (
    <div className="site-wrap">
      <ExploreAsideBar></ExploreAsideBar>

      <Switch>
        <Route exact path={`${match.path}`}>
          <Explore></Explore>
        </Route>
        <Route
          exact
          path={`${match.path}/users`}
        >
          <UsersList></UsersList>
        </Route>
      </Switch>


      
    </div>
  );

};

export const Explore = () => {
  const explorePageDataMethods = {
    selectItemsIds: selectExplorePostIds,

    selectItemById: selectExplorePostById,

    selectItemsStatus: selectExplorePostsStatus,

    selectFetchedAllItemsLength: selectFetchedAllExplorePostsLength,

    changeItemsStatusToStartFetching: changeExplorePostStatusToStartFetching,
    fetchItems: fetchExplorePosts,

  };

  return (
    <div className="main-content">
      <ExploreWrapped
        explorePageDataMethods={explorePageDataMethods}
      ></ExploreWrapped>

    </div>
  );
};

export const ExploreAsideBar = (props) => {

  const {url} = useRouteMatch();

  return (
    <header
      className="header-bar d-flex d-lg-block
			align-items-center
			aos-init aos-animate"
      data-aos="fade-left"
    >
      <div className="main-menu">

        <ul className="list-group m-0">

          <li className="list-group-item border-0 m-0 p-0">
            <Link to={url}>all posts</Link>
          </li>

          <li className="list-group-item border-0 m-0 p-0 ">
            <Link to={`${url}/users`}>users</Link>
          </li>

          <li className="list-group-item border-0 disabled m-0 p-0">
            <span className='mx-2'>photos</span>
          </li>
          <li className="list-group-item border-0 disabled m-0 p-0">
            <span className='mx-2' >videos</span>
          </li>

          <li className="list-group-item border-0 disabled m-0 p-0">
            <span className='mx-2' >groups</span>
          </li>
          <li className="list-group-item border-0 disabled m-0 p-0">
            <span className='mx-2'>channels</span>
          </li>
          <li className="list-group-item border-0 disabled m-0 p-0">
            <span className='mx-2'>live</span>
          </li>
        </ul>
        
      </div>
    </header>
  );
};


export default ExploreForExplorePage;
