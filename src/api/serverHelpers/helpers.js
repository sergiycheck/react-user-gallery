export function getArrOfPostsForUser(schema, req) {
  const { currentUserId } = JSON.parse(req.requestBody);
  const currentUser = schema.users.find(currentUserId);

  if (!currentUser) throw new Error(`can not find user with ${currentUserId}`);

  const userFollowingRelations = schema.db.subscribeRelations.where({
    followerId: currentUserId,
  });

  let allPostsForUser = userFollowingRelations.reduce((prevArr, current) => {
    let currentUserFollowingRelation = current;
    let userFollowingId = currentUserFollowingRelation.followingId;
    let user = schema.users.find(userFollowingId);
    if (!user) return prevArr;
    prevArr = prevArr.concat(user.posts.models);
    return prevArr;
  }, []);

  return allPostsForUser;
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getRandomArrIndex = (arr) => {
  return getRandomInt(0, arr.length - 1);
};
