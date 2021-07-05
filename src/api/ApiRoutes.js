
export const StatusData = {
	loading:'loading',
	succeeded:'succeeded',
	failed:'failed',
	idle:'idle'
}


export const apiName = 'fakeApi';
export const postName = 'posts';
export const videosName = 'videos';
export const usersName = 'users';

export const postsRoute = `${apiName}/${postName}`;
export const videosRoute = `${apiName}/${videosName}`;
export const usersRoute = `${apiName}/${usersName}`;

export const allUsersRoute =`${apiName}/${usersName}`;
export const singleUserPageRoute = `${allUsersRoute}/:userId`;