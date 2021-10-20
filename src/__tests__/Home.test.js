import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
  fireEvent,
} from "@testing-library/react";
import Home from "../components/home/Home";
import { Provider } from "react-redux";
import store from "../App/store";
import makeServer from "../api/server";
// import { nanoid } from '@reduxjs/toolkit';

import { client } from "../api/client";
import {
  postsRoute,
  usersRoute,
  userPostsRoute,
  apiName,
} from "../api/ApiRoutes";

import { jest } from "@jest/globals";

// import {
// 	Collection
// } from 'miragejs';

describe("Home", () => {
  let server;

  beforeEach(() => {
    //if environment of makeServer is test
    // it skips the seed hook
    // server = makeServer('test');
    server = makeServer();
    renderHome();
  });

  afterEach(() => {
    server.shutdown();
  });

  function renderHome() {
    render(
      <Provider store={store}>
        <Home></Home>
      </Provider>
    );
  }

  test("renders home component with initial loading videos, posts text", () => {
    const textVid = screen.getByAltText(/video placeholder/i);
    expect(textVid).toBeInTheDocument();

    const textPost = screen.getByAltText(/img loader/i);
    expect(textPost).toBeInTheDocument();
  });

  test("renders Home component, fetches videos with test server", async () => {
    await waitForElementToBeRemoved(() =>
      screen.getByAltText(/video placeholder/i)
    );

    expect(screen.getAllByTestId("video-source-element")).not.toBeNull();
  });

  test("renders Home component, fetches posts", async () => {
    // await waitForElementToBeRemoved(()=>screen.getByAltText(/img loader/i));
    //post alt text: "user post"
    expect(
      await screen.findAllByTestId(/post-card-placeholder/i)
    ).not.toBeNull();
  });
  test("carousel video change on button click", async () => {
    expect(
      await screen.findAllByTestId(/video-source-element/i)
    ).not.toBeNull();
    const btns = screen.queryAllByRole("button");
    const btn = btns.find((btn) =>
      btn.classList.contains("carsl-control-prev")
    );
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
  });

  test("load posts with users", async () => {
    console.log("getting posts");
    // expect.assertions(1);
    const response = await client.get(postsRoute, {
      headers: {
        from: 0,
        to: 5,
      },
    });
    const { posts } = response;
    expect(posts.every((p) => p.userId !== null)).toBeTruthy();
  });

  test("load posts with comments", async () => {
    console.log("getting posts");
    expect.assertions(1);

    const response = await client.get(postsRoute, {
      headers: {
        from: 0,
        to: 5,
      },
    });
    const { posts } = response;

    expect(posts.every((p) => p.commentIds.length > 0)).toBeTruthy();
  });

  test("fetch single post with user and commetns", async () => {
    expect.assertions(1);

    let response = await client.get(postsRoute, {
      headers: {
        from: 0,
        to: 5,
      },
      
    });

    const { posts } = response;
    const postId = posts[0].id;

    response = await client.get(`/fakeApi/posts/${postId}`);
    const post = response.post;

    expect(post).not.toBeNull();
    console.log(post);
  });

  test("fetch post comments", async () => {
    console.log("getting comments");
    expect.assertions(2);

    let response = await client.get(postsRoute, {
      headers: {
        from: 0,
        to: 5,
      },
    });
    const { posts } = response;

    const postId = posts[0].id;

    response = await client.get(`${postsRoute}/${postId}/comments`, {
      headers: {
        from: 0,
        to: 5,
      },
    });

    const comments = response.comments;
    expect(comments).toBeInstanceOf(Array);
    expect(comments.length > 0).toBe(true);
  });

  test("creates users and gets users posts", async () => {
    jest.setTimeout(10000);
    console.log("getting users");

    let from = 0;
    let to = 5;

    let response = await client.get(usersRoute, {
      headers: { from, to },
    });

		//TODO: error with jest here on fetching users posts
    const { users } = response;

    expect(users.length).toBeGreaterThan(0);
    const userId = users[0].id;

    let url = userPostsRoute.replace(":userId", userId);
    response = await client.get(url, {
      headers: { from, to },
    });

    const { posts } = response;

    expect(posts).toBeInstanceOf(Array);
    expect(posts.length > 0).toBe(true);

    expect.assertions(3);
  });

  test("fetchs hash tags", async () => {

		// debugger;
		const response = await client.get(`${apiName}/hashTags/all`);
		const { hashTags,serverHashTagsLength } = response;

		expect(hashTags).toBeInstanceOf(Array);
		expect(hashTags.length).toBeGreaterThan(0);
		expect(serverHashTagsLength).toBeGreaterThan(0);

	});

  test("fetchs subscribe relations", async () => {

		const response = await client.get(`${apiName}/subscribeRelations`);

		expect(response).not.toBeNull();

	});

  test("fetchs subscribe relations for user", async () => {

		const response = await client.get(`${apiName}/subscribeRelations/getUserSubscribeRelations/knownId`);
		debugger;

    const {
      userFollowingRelations,
      userFollowersRelations
    } = response;

		expect(response).not.toBeNull();
		expect(userFollowingRelations).not.toBeNull();
		expect(userFollowersRelations).not.toBeNull();
	});

});
