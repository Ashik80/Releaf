import { RootStore } from "./rootStore";
import { observable, action, runInAction } from "mobx";
import { IProfile } from "../app/models/profile";
import agent from "../app/api/agent";

export default class ProfileStore{
    rootStore: RootStore
    constructor(rootStore: RootStore){
        this.rootStore = rootStore
    }

    @observable profile: IProfile | null = null
    @observable loadingProfile = false

    @action loadProfile = async (userName: string) => {
        this.loadingProfile = true
        try{
            let profile = await agent.Profiles.getProfile(userName)
            runInAction(() => {
                // const date = profile.dateOfBirth.split('T')[0]
                // profile.dateOfBirth = format(new Date(date), "do MMMM, yyyy")
                profile.dateOfBirth = new Date(profile.dateOfBirth)
                this.profile = profile
                this.loadingProfile = false
            })
        }
        catch(error){
            console.log(error)
            runInAction(() => {
                this.loadingProfile = false
            })
        }
    }
}