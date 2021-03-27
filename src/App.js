import React from "react";
import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './components/home/Home.jsx';
import Explore from './components/explore/Explore.jsx';
import Messages from './components/messages/Messages.jsx';
import Profile from './components/profile/Profile.jsx';

import SvgIcon from '@material-ui/core/SvgIcon';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      finished:false
    }
  }

  render(){
    return (
      <Router>

        <div className="wrapper">

          <nav className="navbar navbar-expand-md fixed-top navbar-light shadow p-0 bg-light" 
              role="navigation">

            <div className="container  text-dark">
              <Link className="navbar-brand" to="/">
              <HomeIcon color="action" />
              <span>Home</span>
              </Link>
              
              <button className="navbar-toggler" type="button"
                data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="row w-100 ">

                  <div className="col">
                    <ul className="nav navbar-nav">
                      <li className="p-2">
                        <Link className="nav-link" to="/explore">Explore</Link>
                      </li>
                    </ul>
                  </div>

                  <div className="seach-col col-md-auto">
                    <div className="mt-2">
                      <form className="">
                        <input id="search" className="form-control"
                          type="search" placeholder=""
                          aria-label="Search"/>
                      </form>

                    </div>

                  </div>

                  <div className="col col-md-auto">
                    <div className="nav navbar-nav d-flex justify-content-end">

                      <Link to="/messages" className="nav-link" >Messages</Link>

                      <Link to="/profile" className="nav-link">Profile</Link>
                      
                      <div className="dropdown">
                        <span className="nav-link dropdown-toggle"
                          role="button" id="dropdownMenuLink"
                          data-bs-toggle="dropdown" aria-expanded="false">
                          Manage
                        </span>

                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                          <li>
                            <Link to="/options" className="dropdown-item">Options</Link>
                          </li>
                          <li>
                            <Link to="/help" className="dropdown-item">Help</Link>
                          </li>
                          <li>
                            <Link to="/log out" className="dropdown-item">Log out</Link>
                          </li>
                        </ul>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          </nav>          
          
          
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
          
          <footer>
          </footer>


        </div>

      </Router>
    );
  }

}

// function Home() {
//   return <h2 className="mt-5">Home</h2>;
// }

// function Explore() {
//   return <h2 className="mt-5">Explore</h2>;
// }

// function Messages() {
//   return <h2 className="mt-5">Messages</h2>;
// }
// function Profile() {
//   return <h2 className="mt-5">Profile</h2>;
// }

function Options() {
  return <h2 className="mt-5">Options</h2>;
}
function Help() {
  return <h2 className="mt-5">Help</h2>;
}
function LogOut() {
  return <h2 className="mt-5">LogOut</h2>;
}


export default App;
