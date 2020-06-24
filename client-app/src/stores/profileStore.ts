import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed } from "mobx";
import { IProfile, IProfileFormValues } from "../app/models/profile";
import agent from "../app/api/agent";
import { toast } from "react-toastify";
import { IPost } from "../app/models/post";

export default class ProfileStore {
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    @observable profile: IProfile | null = null
    @observable loadingProfile = false
    @observable uploading = false
    @observable deleting = false
    @observable userPosts = new Map()
    @observable postLoader = false
    @observable disableLike = false

    @computed get isCurrentUser() {
        if (this.profile && this.rootStore.userStore.user) {
            return this.profile.userName === this.rootStore.userStore.user.userName
        }
        else return false
    }

    @computed get postsByDate() {
        return this.sortByDate(Array.from(this.userPosts.values()))
    }

    sortByDate = (posts: IPost[]) => {
        return posts.sort(
            (a, b) => b.postTime.getTime() - a.postTime.getTime()
        )
    }

    @action loadProfile = async (userName: string) => {
        this.loadingProfile = true
        try {
            let profile = await agent.Profiles.getProfile(userName)
            runInAction(() => {
                profile.dateOfBirth = new Date(profile.dateOfBirth)
                this.profile = profile
                this.loadingProfile = false
            })
        }
        catch (error) {
            console.log(error)
            runInAction(() => {
                this.loadingProfile = false
            })
        }
    }

    @action updateProfile = async (userName: string, values: IProfileFormValues) => {
        try {
            let profile = await agent.Profiles.update(userName, values)
            runInAction(() => {
                profile.dateOfBirth = new Date(profile.dateOfBirth)
                this.profile = profile
                if (this.rootStore.userStore.user) {
                    this.rootStore.userStore.user!.displayName = profile.displayName
                }
            })
        } catch (error) {
            console.log(error)
            toast.error("Error updating profile")
        }
    }

    @action uploadPhoto = async (file: Blob) => {
        this.uploading = true
        try {
            let photo = await agent.Photo.upload(file)
            runInAction(() => {
                if (this.profile && this.rootStore.userStore.user) {
                    this.profile.photo = photo
                    this.rootStore.userStore.user.photo = photo
                    this.uploading = false
                }
            })
        }
        catch (error) {
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
                if (this.profile && this.rootStore.userStore.user) {
                    this.profile.photo = null
                    this.rootStore.userStore.user.photo = null
                }
            })
        } catch (error) {
            console.log(error)
            toast.error("Problem deleting photo")
        } finally {
            runInAction(() => {
                this.deleting = false
            })
        }
    }

    @action loadUserPosts = async () => {
        this.postLoader = true
        try {
            let posts = await agent.Posts.list()
            posts = posts.filter(p => p.appUser.userName === this.profile?.userName)
            runInAction(() => {
                posts.forEach(post => {
                    post.postTime = new Date(post.postTime)
                    let liked = post.likes.some(p => p.userName === this.rootStore.userStore.user?.userName)
                    if (liked) post.isLiked = true
                    this.userPosts.set(post.postId, post)
                })
            })

        } catch (error) {
            console.log(error)
            toast.error("Problem loading posts")
        } finally {
            runInAction(() => {
                this.postLoader = false
            })
        }
    }

    @action likePost = async (id: string) => {
        this.disableLike = true
        try {
            let post = await agent.Posts.like(id)
            runInAction(() => {
                this.userPosts.get(id).likes = post.likes
                this.userPosts.get(id).isLiked = !this.userPosts.get(id).isLiked
                this.disableLike = false
            })
        }
        catch (error) {
            console.log(error)
            toast.error("An error occured")
            runInAction(() => {
                this.disableLike = false
            })
        }
    }
}