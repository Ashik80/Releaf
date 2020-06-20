import { observable, action, runInAction, computed } from 'mobx'
import { IPost, IPostFormValues } from "../app/models/post";
import agent from "../app/api/agent";
import { RootStore } from "./rootStore";
import { toast } from "react-toastify";

export default class PostStore {
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    @observable postsRegistry = new Map()
    @observable pageLoader = false
    @observable loading = false
    @observable disableLike = false

    @computed get postsByDate() {
        return this.sortByDate(Array.from(this.postsRegistry.values()))
    }

    sortByDate = (posts: IPost[]) => {
        return posts.sort(
            (a, b) => b.postTime.getTime() - a.postTime.getTime()
        )
    }

    @action loadPosts = async () => {
        this.pageLoader = true
        try {
            const posts = await agent.Posts.list()
            runInAction(() => {
                posts.forEach(post => {
                    post.postTime = new Date(post.postTime)
                    post.likes.forEach(user => {
                        if (user.userName === this.rootStore.userStore.user?.userName) {
                            post.isLiked = true
                        }
                        else post.isLiked = false
                    })
                    this.postsRegistry.set(post.postId, post)
                    this.pageLoader = false
                })
            })
        }
        catch (error) {
            console.log(error)
            runInAction(() => {
                this.pageLoader = false
            })
        }
    }

    @action createPost = async (values: IPostFormValues) => {
        this.loading = true
        try {
            const post = await agent.Posts.create(values)
            runInAction(() => {
                post.postTime = new Date(post.postTime)
                this.postsRegistry.set(post.postId, post)
                this.loading = false
            })
            toast.success("Posted successfully! :)")
        }
        catch (error) {
            console.log(error)
            toast.error("Problem creating post")
            runInAction(() => {
                this.loading = false
            })
        }
    }

    @action likePost = async (id: string) => {
        this.disableLike = true
        try {
            let post = await agent.Posts.like(id)
            runInAction(() => {
                this.postsRegistry.get(id).likes = post.likes
                this.postsRegistry.get(id).isLiked = !this.postsRegistry.get(id).isLiked
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