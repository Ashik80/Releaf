export interface IPost {
    postId: string,
    text: string,
    postTime: string,
    appUser: IUser,
    likes?: number
}

export interface IUser {
    userName: string,
    displayName: string
}