
import "./App.scss";

import {
  Switch,
  Route,
} from "react-router-dom";

import NavBar from '../components/Navbar/NavBar.jsx';

import Home from "../components/home/Home.jsx";
import Explore from "../components/explore/Explore.jsx";
import Messages from "../components/messages/Messages.jsx";
import Profile from "../components/profile/Profile.jsx";


import { showVisible } from "../helpers/imgLazyLoading";




const enableImageLazyLoading = () => {
  window.addEventListener("scroll", showVisible);
};


export default function App() {
  enableImageLazyLoading();

  return (

    <div className="wrapper">
      <NavBar></NavBar>

      <div className="mainContent">
        <Switch>
          <Route path="/explore">
            <Explore />
          </Route>

          <Route path="/messages">
            <Messages />
          </Route>

          <Route path="/profile">
            <Profile />
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

          <Route path="/">
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




