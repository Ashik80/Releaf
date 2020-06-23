import { IPhoto } from "./photo";

export interface IProfile {
    userName: string,
    displayName: string,
    bio?: string,
    address?: string,
    dateOfBirth: Date,
    gender?: string,
    photo: IPhoto | null
}

export interface IProfileFormValues {
    displayName?: string,
    bio?: string,
    address?: string,
    dateOfBirth?: Date,
    gender?: string
}