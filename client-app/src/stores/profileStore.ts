import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed } from "mobx";
import { IProfile } from "../app/models/profile";
import agent from "../app/api/agent";

export default class ProfileStore{
    rootStore: RootStore
    constructor(rootStore: RootStore){
        this.rootStore = rootStore
    }

    @observable profile: IProfile | null = null
    @observable loadingProfile = false
    @observable uploading = false

    @computed get isCurrentUser(){
        if(this.profile && this.rootStore.userStore.user){
            return this.profile.userName === this.rootStore.userStore.user.userName
        }
        else return false
    }

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

    @action uploadPhoto = async (file: Blob) => {
        this.uploading = true
        try{
            let photo = await agent.Photo.upload(file)
            runInAction(() => {
                if(this.profile && this.rootStore.userStore.user){
                    this.profile.photo = photo
                    this.rootStore.userStore.user.photo = photo
                    this.uploading = false
                }
            })
        }
        catch(error){
            console.log(error)
            runInAction(() => {
                this.uploading = false
            })
        }
    }
}