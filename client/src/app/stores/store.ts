import { createContext, useContext } from "react";
import BlogStore from "./blogstore";
import CommonStore from "./commonStore";
import ModalStore from "./modalstore";
import UserStore from "./userStore";

interface Store {
    blogStore: BlogStore
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    blogStore: new BlogStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}