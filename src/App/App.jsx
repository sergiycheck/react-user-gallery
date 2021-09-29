import "./App.scss";

import { Switch, Route } from "react-router-dom";

import NavBar from "../components/Navbar/NavBar.jsx";

import Home from "../components/home/Home.jsx";

import ExploreForExplorePage from "../components/explore/Explore.jsx";

import Messages from "../components/messages/Messages.jsx";
import { Profile } from "../components/profile/Profile.jsx";
import SearchDataComponent from "../components/explore/searchComponent/searchData";

import { showVisible } from "../helpers/imgLazyLoading";
import { SinglePost } from "../components/PostList/SinglePost.jsx";

import { singlePostRoute } from "../api/ApiRoutes";

import { DismissibleAlert } from "../components/helperComponents/DismissibleAlert";

const enableImageLazyLoading = () => {
  window.addEventListener("scroll", showVisible);
};

export default function App() {
  enableImageLazyLoading();

  return (
    <div className="wrapper">
      <DismissibleAlert></DismissibleAlert>
      <NavBar></NavBar>

      <div className="mainContent">
        <Switch>
          <Route path="/explore">
            <ExploreForExplorePage />
          </Route>

          <Route path="/messages">
            <Messages />
          </Route>

          <Route path="/options">
            <Options />
          </Route>

          <Route path="/help">
            <Help />
          </Route>

          <Route path="/log out">
            <LogOut />
          </Route>

          <Route
            exact
            path="/searchResults/:query"
            component={SearchDataComponent}
          ></Route>

          <Route exact path={singlePostRoute} component={SinglePost}></Route>

          <Route exact path="/profile/:userId" component={Profile}></Route>

          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>

      <footer></footer>
    </div>
  );
}

function Options() {
  return <h2 className="mt-5">Options</h2>;
}
function Help() {
  return <h2 className="mt-5">Help</h2>;
}
function LogOut() {
  return <h2 className="mt-5">LogOut</h2>;
}


