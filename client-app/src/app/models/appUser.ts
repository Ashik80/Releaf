export interface IAppUser {
    userName: string,
    displayName: string,
    token: string,
    image?: string
}

export interface ILoginFormValues {
    email: string,
    password: string
}