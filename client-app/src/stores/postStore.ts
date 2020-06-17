import { createContext } from "react";
import {observable, action, runInAction, configure} from 'mobx'
import { IPost } from "../app/models/post";
import agent from "../app/api/agent";
import { RootStore } from "./rootStore";

configure({enforceActions: 'always'})

export default class PostStore {
    rootStore: RootStore
    constructor(rootStore: RootStore){
        this.rootStore = rootStore
    }

    @observable postsRegistry = new Map()
    @observable pageLoader = false

    @action loadPosts = async () => {
        this.pageLoader = true
        try{
            const posts = await agent.Posts.list()
            runInAction(() => {
                posts.forEach(post => {
                    post.postTime = post.postTime.split('.')[0]
                    this.postsRegistry.set(post.postId, post)
                    this.pageLoader = false
                })
            })
        }
        catch(error){
            console.log(error)
            runInAction(() => {
                this.pageLoader = false
            })
        }
    }
}