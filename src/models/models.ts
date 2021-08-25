export interface Base {
	id:string
}

export interface User extends Base{
	image:string,
	firstName:string,
	lastName:string,
	userName:string,
	gender:string,
	phoneNumber:string,

}

export interface Post extends Base{
	date:string,
	title:string,
	image:string,
	content:string,
	user:string, //userId
	likeCount:number,
	commentIds:[]
	
}

export interface Comment extends Base {
	date:string,
	content:string,
	commentatorAvatar:string,
	post:string
}

export interface Video extends Base {
	user:string,
	name:string,
	link:string
}