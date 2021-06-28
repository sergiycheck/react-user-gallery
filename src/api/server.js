import {
	createServer,
  Server,
  Model,
  Factory,
  belongsTo,
  hasMany,
  association,
  RestSerializer,
	JSONAPISerializer
} from 'miragejs'

import { nanoid } from '@reduxjs/toolkit'

import faker from 'faker'
import { sentence, paragraph, article, setRandom } from 'txtgen'
import { parseISO } from 'date-fns'
import seedrandom from 'seedrandom'



export default function makeServer(environment="development"){
	
	
	return new Server({
		environment:environment,

		routes(){

			this.namespace = 'fakeApi';
			const server = this;
			
			this.resource('users')
			this.resource('posts')
			this.resource('comments')
			this.resource('videos')


			// this.get('/posts',(schema,req)=>{
			// 	return schema.posts.all();
			// })

			// this.get('/users',(schema,req)=>{
			// 	return schema.users.all();
			// })
			// this.get('/videos',(schema,req)=>{
			// 	return schema.videos.all();
			// })

			

			this.get('/posts/:postId/comments', (schema, req) => {
				console.log(`Server /posts/:postId/comments `);

				const postId = req.params['postId'];
				console.log('server got postId ', postId);
				const post = schema.posts.find(postId);
				return post.comments;
			})

			this.get('/users/:userId/posts',(schema,req)=>{
				const userId = req.params['userId'];
				console.log('server got userId ', userId);
				const user = schema.users.find(userId);
				return user.posts;
			})

			this.get('/posts/:postId',(schema,req)=>{
				const postId = req.params['postId'];
				console.log('server got postId ', postId);
				const post = schema.posts.find(postId);
				return post;
			})

		},


		models: {
			user: Model.extend({
				posts: hasMany(),
			}),
			post: Model.extend({
				user: belongsTo(),
				comments: hasMany(),
			}),
			comment: Model.extend({
	
				post: belongsTo(),
			}),
			notification: Model.extend({}),

			video:Model.extend({
				user:belongsTo()
			}),
		},

		factories:{

			user: Factory.extend({
				id () { return nanoid() },
				firstName(){ return faker.name.firstName() },
				lastName (){ return faker.name.lastName() },
				userName () { 
					return faker.internet.userName(
						this.firstName, this.lastName )},

				gender (){ return faker.name.gender() },
				phoneNumber () { return faker.phone.phoneNumber() },

				afterCreate(user,server){
					server.createList('post', 3 ,{user})
				}
			}),

			post: Factory.extend({
				id(){ return nanoid() },
				date(){ return faker.date.recent(3) },
				title(){ return sentence() },
				image(){ return faker.random.image() },
				content(){ return article(1) },

				afterCreate(post, server) {
					server.createList('comment', 3, { post })
				},
	
				user: association(),
			}),
			comment: Factory.extend({
				id(){ return nanoid() },
				date(){ return faker.date.recent(2) },
				content(){ return paragraph() },

				//to much recursion
				// user:association(),
				post:association(),
			}),

			//no user, post, comment properties in ressponse 
			// without that serializers
		},

		serializers: {
			application: RestSerializer,
			// user: IdSerializer,
			// post:IdSerializer,
			// comment: IdSerializer,
		
		},


		
		seeds(server){
			server.createList('user', 3);

			server.create('user',{img:usersData[0].img})
			server.create('user',{img:usersData[1].img})
			server.create('user',{img:usersData[2].img})
			server.create('user',{img:usersData[3].img})
			server.create('user',{img:usersData[4].img})
			server.create('user',{img:usersData[5].img})

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


}

const IdSerializer = RestSerializer.extend({
	serializeIds:'always'
})

function getRandomInt(min,max){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random()*(max-min+1))+min;
}


let usersData = [
	{id:nanoid(),name:'Stephanie',isOnline:true,img:"https://randomuser.me/api/portraits/med/women/5.jpg"},
	{id:nanoid(),name:'Julie',isOnline:true,img:"https://randomuser.me/api/portraits/med/women/6.jpg"},
	{id:nanoid(),name:'Terrence ',isOnline:true,img:"https://randomuser.me/api/portraits/med/women/7.jpg"},
	{id:nanoid(),name:'Bradley ',isOnline:false,img:"https://randomuser.me/api/portraits/med/men/5.jpg"},
	{id:nanoid(),name:'Regina ',isOnline:true,img:"https://randomuser.me/api/portraits/med/women/8.jpg"},
	{id:nanoid(),name:'Dana ',isOnline:false,img:"https://randomuser.me/api/portraits/med/women/9.jpg"},
];


