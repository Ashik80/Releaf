import { IPhoto } from "./photo";

export interface IProfile {
    userName: string,
    displayName: string,
    bio?: string,
    adress?: string,
    dateOfBirth: Date,
    gender: string,
    photo?: IPhoto
}