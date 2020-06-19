export interface IPost {
    postId: string,
    text: string,
    postTime: Date,
    appUser: IUser,
    likes: ILike[],
    isLiked: boolean 
}

export interface IUser {
    userName: string,
    displayName: string
}

export interface ILike {
    userName: string,
    displayName: string
}

export interface IPostFormValues {
    text: string
}