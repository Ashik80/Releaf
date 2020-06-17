import PostStore from '../stores/postStore'
import { createContext } from "react";
import ModalStore from './modalStore';

export class RootStore {
    postsStore: PostStore
    modalStore: ModalStore

    constructor(){
        this.postsStore = new PostStore(this)
        this.modalStore = new ModalStore(this)
    }
}

export const RootStoreContext = createContext(new RootStore())