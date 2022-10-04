import { createContext, useContext } from "react";
import BlogStore from "./blogstore";
import CommonStore from "./commonStore";

interface Store {
    blogStore: BlogStore
    commonStore: CommonStore;
}

export const store: Store = {
    blogStore: new BlogStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}