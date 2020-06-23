import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed } from "mobx";
import { IProfile } from "../app/models/profile";
import agent from "../app/api/agent";
import { toast } from "react-toastify";

export default class ProfileStore{
    rootStore: RootStore
    constructor(rootStore: RootStore){
        this.rootStore = rootStore
    }

    @observable profile: IProfile | null = null
    @observable loadingProfile = false
    @observable uploading = false
    @observable deleting = false

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

    @action deletePhoto = async (id: string) => {
        this.deleting = true
        try {
            await agent.Photo.deletePhoto(id)
            runInAction(() => {
                if(this.profile && this.rootStore.userStore.user){
                    this.profile.photo = null
                    this.rootStore.userStore.user.photo = null
                }
            })
        } catch (error){
            console.log(error)
            toast.error("Problem deleting photo")
        } finally {
            runInAction(() => {
                this.deleting = false
            })
        }
    }
}