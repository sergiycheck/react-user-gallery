import "./Messages.scss";

import React, { Component, useState } from "react";

import ItemCounter from "./counter/ItemCounter";

import { useSelector, useDispatch } from "react-redux";

import { increment, selectItemCount } from "./counter/itemCounterSlice";

import { showVisible } from "../../helpers/imgLazyLoading";

import classNames from "classnames";

let FRIENDS = [
  {
    id: "1",
    name: "Stephanie",
    isOnline: true,
    img: "https://randomuser.me/api/portraits/med/women/5.jpg",

    messages: [
      {
        id: "1",
        date: "2021-04-06",
        data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      },
    ],
  },
  {
    id: "2",
    name: "Julie",
    isOnline: true,
    img: "https://randomuser.me/api/portraits/med/women/6.jpg",

    messages: [
      {
        id: "2",
        date: "2021-05-07",
        data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      },
    ],
  },
  {
    id: "3",
    name: "Terrence ",
    isOnline: true,
    img: "https://randomuser.me/api/portraits/med/women/7.jpg",

    messages: [
      {
        id: "3",
        date: "2021-08-12",
        data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      },
    ],
  },
  {
    id: "4",
    name: "Bradley ",
    isOnline: false,
    img: "https://randomuser.me/api/portraits/med/men/5.jpg",

    messages: [
      {
        id: "4",
        date: "2021-09-01",
        data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      },
    ],
  },
  {
    id: "5",
    name: "Regina ",
    isOnline: true,
    img: "https://randomuser.me/api/portraits/med/women/8.jpg",

    messages: [
      {
        id: "5",
        date: "2021-10-05",
        data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      },
    ],
  },
  {
    id: "6",
    name: "Dana ",
    isOnline: false,
    img: "https://randomuser.me/api/portraits/med/women/9.jpg",

    messages: [
      {
        id: "6",
        date: "2021-06-18",
        data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      },
    ],
  },
];

const MyId = "&n3f11ve";

export default class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: FRIENDS,
      friend: null,
      filterText: "",
      totalMessageCount: 0,
    };

    this.handleInputChange = this.handleInputChange.bind(this);

    this.startChatWithFriend = this.startChatWithFriend.bind(this);

    this.sendMessage = this.sendMessage.bind(this);
  }

  handleInputChange(event) {
    this.setState((state) => ({
      filterText: event.target.value,
    }));
  }

  componentDidMount() {
    this.updateMessageCount();
  }

  updateMessageCount() {
    let allMsgCount = 0;
    Array.from(this.state.friends).forEach((f) => {
      if (f.messages && f.messages.length > 0) {
        allMsgCount += f.messages.length;
      }
    });
    this.setState({
      totalMessageCount: allMsgCount,
    });
  }

  startChatWithFriend(friend) {
    this.setState({
      friend: friend,
    });
  }

  sendMessage(msg) {
    let message = {
      id: MyId,
      data: msg,
      date: Date.now(),
    };
    let friend = this.state.friends.find((friend) => friend.id === this.state.friend.id);
    friend.messages.push(message);
    this.setState({
      friend: friend,
    });

    this.updateMessageCount();
  }

  render() {
    return (
      <div className="user-wrapper d-flex align-items-stretch mt-5">
        <SideBar
          render={() => {
            return (
              <div className="p-4 pt-5">
                <div className="mb-5">
                  <h3 className="h6">Search user names</h3>
                  <form action="#" className="colorlib-subscribe-form">
                    <div className="form-group d-flex">
                      <div className="icon">
                        <span className="icon-paper-plane"></span>
                      </div>
                      <input
                        onChange={this.handleInputChange}
                        value={this.state.filterText}
                        type="text"
                        className="form-control"
                        placeholder="search user name"
                      />
                    </div>
                  </form>
                </div>

                <ul className="list-unstyled components mb-5">
                  <FriendsContainer
                    friends={this.state.friends}
                    filterTextData={this.state.filterText}
                    startChatWithFriend={this.startChatWithFriend}
                  ></FriendsContainer>
                </ul>
              </div>
            );
          }}
        ></SideBar>
        <div className="container pt-5">
          <div className="row">
            <div className="offset-3 col-sm-4 d-flex justify-content-between align-items-center">
              <h2>Messages send</h2>
              <ItemCounter></ItemCounter>
            </div>
          </div>

          {this.state.friend && (
            <MessagesBox
              messages={this.state.friend.messages}
              sendMessage={this.sendMessage}
              friendName={this.state.friend.name}
              friendImg={this.state.friend.img}
            ></MessagesBox>
          )}
        </div>
      </div>
    );
  }
}

export const SideBar = ({ render }) => {
  const [active, setActive] = useState(false);

  return (
    <nav className={classNames("sidebar", active && "active")}>
      <div className="custom-menu">
        <button
          type="button"
          id="sidebarCollapse"
          onClick={(e) => {
            setActive(!active);
          }}
          className="btn btn-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="25"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
      </div>
      {render()}
    </nav>
  );
};

class FriendsContainer extends Component {
  constructor(props) {
    super(props);

    // this.state = {

    // }

    this.startChatWithFriend = this.startChatWithFriend.bind(this);
  }

  startChatWithFriend(friend) {
    this.props.startChatWithFriend(friend);
  }

  render() {
    let friends = this.props.friends;
    let filterText = this.props.filterTextData;
    const friendItems = [];

    //todo: add more options for filtering

    Array.from(friends).forEach((friend) => {
      if (
        String(friend.name).toUpperCase().indexOf(filterText.toUpperCase()) !== -1 ||
        String(friend.message).toUpperCase().indexOf(filterText.toUpperCase()) !== -1
      ) {
        friendItems.push(
          <Friend key={friend.id} friend={friend} startChatWithFriend={this.startChatWithFriend}></Friend>
        );
      }
    });

    return <React.Fragment>{friendItems}</React.Fragment>;
  }
}

class Friend extends Component {
  constructor(props) {
    super(props);

    this.startChatWithFriend = this.startChatWithFriend.bind(this);
  }

  startChatWithFriend(friend) {
    this.props.startChatWithFriend(friend);
  }
  render() {
    let date = "";
    let message = "";
    let msgArr = this.props.friend.messages;

    if (msgArr && msgArr.length > 0) {
      date = Array.from(msgArr)[msgArr.length - 1].date;
      date = new Date(date);
      date = date.toLocaleDateString();
      message = Array.from(msgArr)[msgArr.length - 1].data;
    }

    if (this.props.friend) {
      showVisible("Friend");
    }

    return (
      <li onClick={() => this.startChatWithFriend(this.props.friend)}>
        <span className="list-group-item list-group-item-action rounded-0  ">
          <div className="d-flex">
            <div className="col-sm-2 ">
              <img
                className="img-fluid m-2 rounded-circle"
                style={{ height: "50px" }}
                src="/assets/img/img-placeholder.gif"
                data-src={this.props.friend.img}
                alt={this.props.friend.name}
                width="50"
                height="65"
              />
              <div
                className={this.props.friend.isOnline ? "bg-success rounded-circle" : "bg-dark rounded-circle"}
                style={{ height: "20px", width: "20px" }}
              ></div>
            </div>

            <div className="col-sm-9">
              <div className="d-flex align-items-center justify-content-between mb-1">
                <h6 className="mb-0">{this.props.friend.name}</h6>
                <small className="small font-weight-bold">{date}</small>
              </div>
              <p className="font-italic mb-0 text-small">{message}</p>
            </div>
          </div>
        </span>
      </li>
    );
  }
}

function MessagesBox(props) {
  const [msgText, setMsgText] = useState("");

  const dispatch = useDispatch();
  const itemCounter = useSelector(selectItemCount);

  const handleInputMsgChange = function (event) {
    setMsgText(event.target.value.trim());
  };
  const innerSendMessageHandler = (message) => {
    props.sendMessage(msgText);
    setMsgText("");
    dispatch(increment());
  };

  const sendMessage = (_) => {
    if (msgText) {
      innerSendMessageHandler(msgText);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && msgText) {
      innerSendMessageHandler(msgText);
    }
  };

  //render() {

  return (
    <div className="row align-items-end chat-content justify-content-start">
      <div className="col-sm-7">
        <div className="chat-message-container d-flex flex-column overflow-auto">
          {props.messages.map((msg, index) => (
            <MessageData
              key={msg.id + index}
              message={msg}
              friendName={props.friendName}
              friendImg={props.friendImg}
            ></MessageData>
          ))}
        </div>

        <div className="p-1 m-2">
          <div className="row justify-content-start">
            <div className="col-md-9 col-sm-12">
              <input
                onChange={handleInputMsgChange}
                onKeyDown={handleKeyDown}
                value={msgText}
                id="message-data"
                type="text"
                className="form-control border-2 pl-2"
                placeholder="Write your message..."
              />
            </div>

            <div className="col-md-2 col-sm-2">
              <button onClick={sendMessage} id="send-message-btn" type="submit" className="btn btn-primary">
                <span className="material-icons">send</span>
              </button>
            </div>

            <div>
              <span className="">messages send: {itemCounter}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  //}
}

function MessageData(props) {
  let date = new Date(props.message.date);
  date = date.toLocaleDateString();

  return (
    <div className={props.message.id === MyId ? "my-2 align-self-end" : "my-2 align-self-end"}>
      <div className="rounded d-flex mb-1">
        {props.message.id !== MyId && (
          <div className="me-2">
            <img src={props.friendImg} width="50" height="50" className="rounded me-2" alt="user profile" />
            <p>{props.friendName}</p>
          </div>
        )}

        <div className="bg-light">
          <div className="d-flex justify-content-end">
            <small className="text-muted me-2 edit-msg">Edit</small>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>

          <div className="p-2">
            <p
              className={
                props.message.id === MyId
                  ? "text-small mb-0 text-white bg-primary p-2 rounded"
                  : "text-small mb-0 text-muted"
              }
            >
              {props.message.data}
            </p>
          </div>
        </div>
      </div>

      <p className="small text-muted">{date}</p>
    </div>
  );
}
