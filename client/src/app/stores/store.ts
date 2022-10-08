import { createContext, useContext } from "react";
import BlogStore from "./blogstore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";

interface Store {
    blogStore: BlogStore
    commonStore: CommonStore;
    userStore: UserStore;
}

export const store: Store = {
    blogStore: new BlogStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}