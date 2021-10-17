
export const StatusData = {
	loading:'loading',
	succeeded:'succeeded',
	failed:'failed',
	idle:'idle'
}

export const singlePostRoute = `/posts/:postId`;


export const apiName = '/fakeApi';

export const postName = 'posts';
export const videosName = 'videos';
export const usersName = 'users';

export const postsRoute = `${apiName}/${postName}`;

export const videosRoute = `${apiName}/${videosName}`;

export const usersRoute = `${apiName}/${usersName}`;

export const commentsRoute = `${apiName}/comments`;

export const currentUserForAppRoute = `${apiName}/currentUser`;

export const allUsersRoute =`${apiName}/${usersName}`;
export const singleUserPageRoute = `${allUsersRoute}/:userId`;

export const userPostsRoute = `${usersRoute}/:userId/${postName}`