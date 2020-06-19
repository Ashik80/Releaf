import PostStore from '../stores/postStore'
import { createContext } from "react";
import ModalStore from './modalStore';
import UserStore from './userStore';
import { configure } from 'mobx';

configure({enforceActions: 'always'})

export class RootStore {
    postsStore: PostStore
    modalStore: ModalStore
    userStore: UserStore

    constructor(){
        this.postsStore = new PostStore(this)
        this.modalStore = new ModalStore(this)
        this.userStore = new UserStore(this)
    }
}

export const RootStoreContext = createContext(new RootStore())