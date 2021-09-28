import {
  selectExplorePostIds,
  selectExplorePostById,
  fetchExplorePosts,
  selectExplorePostsStatus,
  selectFetchedAllExplorePostsLength,
  changeExplorePostStatusToStartFetching,
  fetchSingleExplorePost
} from "./exploreSlice.js";

import { ExploreWrapped } from "./ExploreWrapped.jsx";


export const ExploreForExplorePage = () => {
  return (
    <div className="site-wrap">
      <ExploreAsideBar></ExploreAsideBar>

      <Explore></Explore>
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
  return (
    <header
      className="header-bar d-flex d-lg-block
			align-items-center
			aos-init aos-animate"
      data-aos="fade-left"
    >
      <div className="main-menu">
        <ul className="">
          <li className="active">
            <a href="/explore">all posts</a>
          </li>
          <li>
            <a href="/explore">photos</a>
          </li>
          <li>
            <a href="/explore">videos</a>
          </li>
          <li>
            <a href="/explore">people</a>
          </li>
          <li>
            <a href="/explore">groups</a>
          </li>
          <li>
            <a href="/explore">channels</a>
          </li>
          <li>
            <a href="/explore">live</a>
          </li>
        </ul>
      </div>
    </header>
  );
};


export default ExploreForExplorePage;
