import React from 'react';
import {render, screen,waitForElementToBeRemoved,fireEvent } from '@testing-library/react';
import Home from '../components/home/Home';
import {Provider} from 'react-redux';
import store from '../App/store';
import makeServer from '../api/server';
import { nanoid } from '@reduxjs/toolkit';

import {
	ClientBuilder
} from '../api/client';
import {
	postsRoute,
	usersRoute
} from '../api/ApiRoutes'
import { Collection } from 'miragejs';

describe('Home',()=>{

	let server;

	beforeEach(()=>{
		//if environment of makeServer is test 
		// it skips the seed hook
		// server = makeServer('test');
		server = makeServer();
		renderHome();
	})
	
	afterEach(()=>{
		server.shutdown();
	})

	function renderHome(){
		render(
			<Provider store={store}>

				<Home></Home>

			</Provider>
		);
	}

	test('renders home component with initial loading videos, posts text', ()=>{

		const textVid = screen.getByText(/loading videos/i);
		expect(textVid).toBeInTheDocument();

		const textPost = screen.getByAltText(/loader image/i);
		expect(textPost).toBeInTheDocument();
	})


	test('renders Home component, fetches videos with test server',async ()=>{

		await waitForElementToBeRemoved(()=>screen.getByText('loading videos'));

		expect(screen.getAllByTestId('video-source-element')).not.toBeNull();
	})

	
	test('renders Home component, fetches posts', async()=>{
		
		//await waitForElementToBeRemoved(()=>screen.getByText('loading posts'));
		//post alt text: "user post"
		expect(screen.getAllByAltText(/user post/i)).not.toBeNull()
		
	})
	test('carousel video change on button click', async ()=>{

		expect(await screen.findAllByTestId(/video-source-element/i)).not.toBeNull();
		const btns = screen.queryAllByRole('button');
		const btn  = btns.find(btn=>btn.classList.contains('carsl-control-prev'));
		expect(btn).toBeInTheDocument();
		fireEvent.click(btn);

	})

	test('load posts with users', async()=>{
		console.log('getting posts');
		expect.assertions(1);
		const client = new ClientBuilder(postsRoute)
		const response = await client.fetchWithConfig();
		const posts = response;
		expect(posts.every(p=>p.userId!==null)).toBeTruthy();
	})

	test('load posts with comments', async()=>{
		console.log('getting posts');
		expect.assertions(1);
		const client = new ClientBuilder(postsRoute)
		const response = await client.fetchWithConfig();
		const posts = response;
		expect(posts.every(p=>p.commentIds.length>0)).toBeTruthy()
	})

	test('fetch single post with user and commetns', async()=>{

		expect.assertions(1);
		const client = new ClientBuilder(postsRoute)
		let response = await client.fetchWithConfig();
		const posts = response;
		const postId = posts[0].id;

		response = await client.fetchWithConfig(`fakeApi/posts/${postId}`);
		const post = response.post;

		expect(post).not.toBeNull();
		console.log(post);

	})

	test('fetch post comments', async()=>{
		console.log('getting comments');
		expect.assertions(2);
		const client = new ClientBuilder(postsRoute)
		let response = await client.fetchWithConfig();
		const posts = response;
		const postId = posts[0].id;

		response = await client.fetchWithConfig(`fakeApi/posts/${postId}/comments`);
		const comments = response.comments;
		expect(comments).toBeInstanceOf(Array);
		expect(comments.length>0).toBe(true);

	})


	test('creates users ', async()=>{
		console.log('getting users');
		expect.assertions(3);
		const client = new ClientBuilder(usersRoute)
		let response = await client.fetchWithConfig();
		const users = response.users
		expect(users.length).toBeGreaterThan(0)
		const userId = users[0].id;

		response = await client.fetchWithConfig(`fakeApi/users/${userId}/posts`);
		const posts = response.posts;
		expect(posts).toBeInstanceOf(Array);
		expect(posts.length>0).toBe(true);

	})


	function seedVideos(server){

		server.create('video',{
			id:nanoid(),
			name:"FMJ Widebody 370z [4K].mp4",
			link:"https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
		});

		server.create('video',{
			id:nanoid(),
			name:"PDX Evo X _ Rowena Point [4K].mp4",
			link:"http://vjs.zencdn.net/v/oceans.mp4"
		});

		server.create('video',{
			id:nanoid(),
			name:"Super Trofeo [4K].mp4",
			link:"http://vjs.zencdn.net/v/oceans.mp4"
		});

	}
	


})