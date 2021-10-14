import {
  // createServer,
  Server,
  Model,
  Factory,
  belongsTo,
  hasMany,
  association,
  RestSerializer,
  // JSONAPISerializer,
} from "miragejs";

import { nanoid } from "@reduxjs/toolkit";

import faker from "faker";
import {
  sentence,
  paragraph,
  article,
  // setRandom
} from "txtgen";
// import { parseISO } from "date-fns";
// import seedrandom from "seedrandom";
// import { randomInt } from "crypto";

import _ from "lodash";

// to understand mirage better go -> node_modules -> miragejs -> lib -> orm model.js

export default function makeServer(environment = "development") {
  return new Server({
    environment: environment,

    routes() {
      // this.timing = 2000;

      this.namespace = "/fakeApi";
      const server = this;

      // this.resource("users");
      // this.resource('posts')
      this.resource("comments");
      this.resource("videos");

      this.get(
        "/users",
        (schema, req) => {
          const { from, to } = req.requestHeaders;

          let allUsers = schema.users.all();

          const resultUsers = allUsers.models.slice(from, to);

          return {
            users: resultUsers,
            allUsersLength: allUsers.length,
          };
        },
        { timing: 2000 }
      );

      this.get("/posts/:postId/comments", (schema, req) => {
        // console.log(`Server /posts/:postId/comments `);
        const postId = req.params["postId"];
        // console.log('server got postId ', postId);
        const post = schema.posts.find(postId);
        const comments = post.comments;

        const { from, to } = req.requestHeaders;
        // console.log(`server got from ${from}, and to ${to}`);
        let commentsSliced = comments.slice(from, to).sort((a, b) => {
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);

          // console.log('aDate.toLocaleString() ', aDate.toLocaleString());
          // console.log('bDate.toLocaleString() ',bDate.toLocaleString());
          // const res = aDate.toLocaleString().localeCompare(bDate.toLocaleString());
          // console.log('res', res);

          return aDate.toLocaleString().localeCompare(bDate.toLocaleString());
        });

        // console.log("sorted comments ", commentsSliced);

        return commentsSliced;
      });

      this.get("/users/:userId/posts", (schema, req) => {
        const userId = req.params["userId"];
        // console.log('server got userId ', userId);
        const user = schema.users.find(userId);

        if (!user) throw new Error(`can not find user with ${userId}`);

        let resultPosts;
        let allUserPosts = user.posts;

        if (
          Object.keys(req.requestHeaders).includes("from") &&
          Object.keys(req.requestHeaders).includes("to")
        ) {
          const { from, to } = req.requestHeaders;
          resultPosts = allUserPosts.models.slice(from, to);
        } else {
          resultPosts = allUserPosts;
        }

        return {
          posts: resultPosts,
          allPostsLength: allUserPosts.length,
        };
      });

      this.get("/users/:userId/posts/single/:postId", (schema, req) => {
        const userId = req.params["userId"];
        const user = schema.users.find(userId);
        if (!user) throw new Error(`can not find user with ${userId}`);

        const postId = req.params["postId"];
        const post = user.posts.find(postId);
        if (!post) throw new Error(`can not find post with ${postId}`);

        let allUserPosts = user.posts;

        return {
          fetchedPost: post,
          allPostsLength: allUserPosts.length,
        };
      });

      this.get("/posts/single/:postId", (schema, req) => {
        const postId = req.params["postId"];
        // console.log('server got postId ', postId);
        const allPosts = schema.posts.all();

        const post = schema.posts.find(postId);
        if (!post) throw new Error(`can not find post with ${postId}`);

        return {
          fetchedPost: post,
          allPostsLength: allPosts.length,
        };
      });

      this.get("/posts/:postId/hashTags", (schema, req) => {
        const postId = req.params["postId"];
        const post = schema.posts.find(postId);
        if (!post) throw new Error(`can not find post with ${postId}`);

        return post.hashTags;
      });

      this.post("/posts/addLikeToPost", function (schema, req) {
        // const postId = req.params['postId'];
        // console.log('request \n',req);
        // const postId = this.normalizedRequestAttrs()//addLikeToPost model does not exist
        const { postId } = JSON.parse(req.requestBody);
        // console.log('postId ', postId);

        if (!postId) {
          console.log(" no postId provided ");
          return {};
        }
        const result = schema.posts.find(postId);
        let { likeCount, postLiked } = result;
        let newLikes = !postLiked ? ++likeCount : --likeCount;
        if (result) {
          result.update("likeCount", newLikes);
          result.update("postLiked", !postLiked);
        }

        return { result };
      });

      this.get("/users/:userId", (schema, req) => {
        const userId = req.params["userId"];
        let allUsers = schema.users.all();
        const user = schema.users.find(userId);
        if (!user) throw new Error(`can not find user with ${userId}`);

        return {
          user: user,
          allUsersLength: allUsers.length,
        };
      });

      this.get("/posts", (schema, req) => {
        const { from, to } = req.requestHeaders;

        let allPosts = schema.posts.all();

        const resultPosts = allPosts.models.slice(from, to);

        return {
          posts: resultPosts,
          allPostsLength: allPosts.length,
        };
      });

      this.post("/users/searchForUsersPosts", (schema, req) => {
        const { searchUserName } = JSON.parse(req.requestBody);

        const { from, to } = req.requestHeaders;

        console.log(`searchUserName from, to `, searchUserName, from, to);

        const allUsers = schema.users.all().models;
        // console.log(`allUsers`, allUsers);

        let filteredUsers = allUsers.filter((user) => {
          const normalizedUserName = user.userName.toLocaleLowerCase();
          const normalizedSearchName = searchUserName.toLocaleLowerCase();
          return normalizedUserName.includes(normalizedSearchName);
        });

        if (!filteredUsers || filteredUsers.length === 0) {
          const normQuery = searchUserName.toLocaleLowerCase();
          const queryChars = normQuery.split("");

          filteredUsers = allUsers
            .reduce((previousArr, currentUser) => {
              // console.log("currentUser", currentUser.userName);

              const charsName = currentUser.userName
                .toLocaleLowerCase()
                .split("");

              const intersectedArr = _.intersectionWith(
                charsName,
                queryChars,
                _.isEqual
              );

              if (intersectedArr.length > 0) {
                return previousArr.concat(currentUser);
              }
              return previousArr;
            }, [])
            .sort((first, second) => {
              return (
                _.intersectionWith(
                  second.userName.split(""),
                  queryChars,
                  _.isEqual
                ).length -
                _.intersectionWith(
                  first.userName.split(""),
                  queryChars,
                  _.isEqual
                ).length
              );
            })
            .sort((first, second) => {
              return (
                second.userName.toLocaleLowerCase().indexOf(normQuery) -
                first.userName.toLocaleLowerCase().indexOf(normQuery)
              );
            });
        }

        const reducedPosts = filteredUsers.reduce(
          (previousArr, currentUser) => {
            return previousArr.concat(currentUser.posts);
          },
          []
        );
        // console.log("reducedPosts.models ", reducedPosts);

        const mappedPosts = reducedPosts
          .map((collection) => collection.models)
          .flat();

        console.log("mappedPosts ", mappedPosts);

        let sliceTo = to;
        if (to >= mappedPosts.length) {
          sliceTo = mappedPosts.length;
        }
        const slicedPosts = mappedPosts.slice(from, sliceTo);

        console.log("slicedPosts ", slicedPosts);

        return { posts: slicedPosts, allPostsLength: mappedPosts.length };
      });

      this.get("/users/searchForNames/:query", (schema, req) => {
        const query = req.params["query"];

        console.log("query", query);

        const allUsers = schema.users.all().models;

        const normQuery = query.toLocaleLowerCase();

        const queryChars = normQuery.split("");

        const resultArr = allUsers
          .reduce((previousArr, currentName) => {
            // console.log("currentName", currentName);

            const charsName = currentName.userName
              .toLocaleLowerCase()
              .split("");

            const intersectedArr = _.intersectionWith(
              charsName,
              queryChars,
              _.isEqual
            );

            if (intersectedArr.length > 0) {
              return previousArr.concat({
                userName: currentName.userName,
                id: currentName.id,
              });
            }
            return previousArr;
          }, [])
          .sort((first, second) => {
            return (
              _.intersectionWith(
                second.userName.split(""),
                queryChars,
                _.isEqual
              ).length -
              _.intersectionWith(
                first.userName.split(""),
                queryChars,
                _.isEqual
              ).length
            );
          })
          .sort((first, second) => {
            return (
              second.userName.toLocaleLowerCase().indexOf(normQuery) -
              first.userName.toLocaleLowerCase().indexOf(normQuery)
            );
          })
          .slice(0, 5);

        return { userNamesArr: resultArr };
      });

      this.get("/comments/:commentId", (schema, req) => {
        const commentId = req.params["commentId"];
        // console.log('server got comment id ', commentId);
        const comment = schema.comments.find(commentId);
        return comment;
      });

      this.post("/comments/addNew", (schema, req) => {
        const parsedBody = JSON.parse(req.requestBody);
        const { postId, text } = parsedBody;

        if (text === "error") {
          throw new Error("Could not add new todo");
        }

        const post = schema.posts.find(postId);

        const comment = { post: post, content: text };

        console.log("comment ", comment);

        const addedComment = server.create("comment", comment);

        return { addedComment };
      });

      // /posts/postIdToFindSameHashTags=postId&other=params&other1=params1
      //or
      // /posts/postIdToFindSameHashTags=postId
      this.get("/posts/:filters", (schema, req) => {
        // const postId = req.params["postId"];

        let filters = req.params["filters"];

        const paramObject = filters.split("&").reduce((prev, curr) => {
          let keyValArr = curr.split("=");
          prev[`${keyValArr[0]}`] = keyValArr[1];
          return prev;
        }, {});

        if (!Object.keys(paramObject).includes("postIdToFindSameHashTags"))
          return;

        const postId = paramObject["postIdToFindSameHashTags"];

        const foundPost = schema.posts.find(postId);
        if (!foundPost) throw new Error(`can not find post with ${postId}`);

        const { from, to } = req.requestHeaders;

        const allPosts = schema.posts.all();

        const filteredPostsByHashTags = allPosts.filter((post) => {
          const hashTagIntersection = _.intersectionBy(
            post.hashTags.models,
            foundPost.hashTags.models,
            "name"
          );
          const hasIntersection = Array.from(hashTagIntersection).length > 0;
          return hasIntersection;
        });

        const resultPosts = filteredPostsByHashTags.models.slice(from, to);

        return {
          posts: resultPosts,
          filteredPostsByHashTagsLength: filteredPostsByHashTags.length,
        };
      });
    },

    models: {
      currentUser: Model.extend({
        subscribedUsers: hasMany('users'),
        posts: hasMany()
      }),
      user: Model.extend({
        posts: hasMany(),
        // comments: hasMany()
      }),
      post: Model.extend({
        user: belongsTo(),
        comments: hasMany(),
        hashTags: hasMany(),
      }),
      hashTag: Model.extend({
        posts: hasMany(),
      }),
      comment: Model.extend({
        // commentable: belongsTo({ polymorphic: true }),

        // user: belongsTo(),
        post: belongsTo(),
      }),
      notification: Model.extend({}),

      video: Model.extend({
        user: belongsTo(),
      }),
    },

    factories: {
      currentUser: Factory.extend({
        ...userConfigObject,

      }),
      user: Factory.extend({
        ...userConfigObject
      }),

      post: Factory.extend({
        id() {
          return nanoid();
        },
        date() {
          return faker.date.recent(3);
        },
        title() {
          return sentence();
        },
        image() {
          return faker.random.image();
        },
        content() {
          return article(1);
        },
        likeCount() {
          return getRandomInt(3, 17);
        },
        postLiked() {
          return false;
        },
        // afterCreate(post, server) {
        //   server.createList("comment", 3, { post });
        // },

        user: association(),
      }),

      hashTag: Factory.extend({
        id() {
          return nanoid();
        },
        name() {
          return `#`.concat(faker.lorem.word());
        },
      }),
      comment: Factory.extend({
        id() {
          return nanoid();
        },
        date() {
          return faker.date.recent(2);
        },
        content() {
          return faker.lorem.sentence();
        },

        commentatorAvatar() {
          return faker.image.avatar();
        },

        author() {
          return faker.name.findName();
        },

        //to much recursion
        // user:association(),
        post: association(),

        // ofPost:trait({
        // post:association(),
        // })
      }),

      video: Factory.extend({
        id() {
          return nanoid();
        },
        user: association(),
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

    seeds(server) {
      // server.createList("user", 6);//6 //100

      server.createList("user", 50).forEach((user) => {
        let postA = server.create("post", { user });
        let postB = server.create("post", { user });
        let postC = server.create("post", { user });

        let postsCreated = [postA, postB, postC];

        postsCreated.forEach((post) => {
          server.createList("comment", 3, { post });
        });

        server.create("hashTag", { posts: [postA, postB] });
        server.create("hashTag", { posts: [postA] });
        server.create("hashTag", { posts: [postB, postC] });
        server.create("hashTag", { posts: [postC, postA] });
      });

      let knownIdUser = server.create("user", { id: "knownId" });
      let knownPost = server.create("post", {
        id: "knownPostId",
        user: knownIdUser,
      });

      let postList = server.createList("post", 10, { user: knownIdUser });
      postList = [...postList, knownPost];

      postList.forEach((post) => {
        server.createList("comment", 5, { post });
      });

      server.create("hashTag", {
        posts: postList,
      });
      server.create("hashTag", {
        posts: postList,
      });
      server.create("hashTag", {
        posts: postList,
      });
      server.create("hashTag", {
        posts: postList,
      });

      let userForVideos = server.create("user");
      server.create("video", {
        name: videoDataStoredArr[0].name,
        link: videoDataStoredArr[0].link,
        user: userForVideos,
      });
      server.create("video", {
        name: videoDataStoredArr[1].name,
        link: videoDataStoredArr[1].link,
        user: userForVideos,
      });
      server.create("video", {
        name: videoDataStoredArr[2].name,
        link: videoDataStoredArr[2].link,
        user: userForVideos,
      });
    },
  });
}

// const IdSerializer = RestSerializer.extend({
//   serializeIds: "always",
// });

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// const getRandomArrIndex = (arr) => {
//   return getRandomInt(0, arr.length - 1);
// };

let videoDataStoredArr = [
  {
    name: "FMJ Widebody 370z [4K].mp4",
    link: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4",
  },
  {
    name: "PDX Evo X _ Rowena Point [4K].mp4",
    link: "http://vjs.zencdn.net/v/oceans.mp4",
  },
  {
    name: "Super Trofeo [4K].mp4",
    link: "http://vjs.zencdn.net/v/oceans.mp4",
  },
];

const userConfigObject = {
  id() {
    return nanoid();
  },
  allData() {
    return faker.name;
  },
  firstName() {
    return this.allData.firstName();
  },
  lastName() {
    return this.allData.lastName();
  },
  userName() {
    return faker.internet.userName(this.firstName, this.lastName);
  },
  bio() {
    return faker.lorem.paragraph();
  },
  gender() {
    return this.allData.gender();
  },
  phoneNumber() {
    return faker.phone.phoneNumber();
  },
  image() {
    return faker.image.avatar();
  },
};
