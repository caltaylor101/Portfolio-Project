import { createContext, useContext } from "react";
import BlogStore from "./blogstore";
import CommentStore from "./commentStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalstore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";

interface Store {
    blogStore: BlogStore
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
    commentStore: CommentStore;
}

export const store: Store = {
    blogStore: new BlogStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore(),
    commentStore: new CommentStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}