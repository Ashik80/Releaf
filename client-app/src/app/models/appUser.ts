import { IPhoto } from "./photo";

export interface IAppUser {
    userName: string,
    displayName: string,
    token: string,
    photo: IPhoto | null
}

export interface ILoginFormValues {
    email: string,
    password: string
}

export interface IRegisterFormValues {
    email: string,
    userName: string,
    displayName: string,
    password: string
}