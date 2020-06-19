import { observable, action, runInAction, computed } from "mobx";
import { IAppUser, ILoginFormValues } from '../app/models/appUser'
import { RootStore } from "./rootStore";
import agent from "../app/api/agent";
import { history } from "../index";

export default class UserStore {
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    @observable user: IAppUser | null = null
    @observable token: string | null = window.localStorage.getItem('jwt')
    @observable appLoaded = false

    @computed get isLoggedIn() {
        return !!this.user
    }

    @action login = async (content: ILoginFormValues) => {
        try {
            const user = await agent.Users.login(content)
            runInAction(() => {
                this.user = user
                window.localStorage.setItem('jwt', this.user.token)
                this.rootStore.modalStore.closeModal()
                history.push('/feed')
            })
        }
        catch (error) {
            throw error
        }
    }

    @action getUser = async () => {
        try {
            let user = await agent.Users.currentUser()
            runInAction(() => {
                this.user = user
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    @action setAppLoaded = () => {
        this.appLoaded = true
    }

    @action logout = () => {
        window.localStorage.removeItem('jwt')
        this.user = null
        history.push('/')
    }
}