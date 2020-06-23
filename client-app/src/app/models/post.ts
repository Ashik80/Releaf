import { IPhoto } from "./photo";

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
    displayName: string,
    photo: IPhoto | null
}

export interface ILike {
    userName: string,
    displayName: string
}

export interface IPostFormValues {
    text: string
}