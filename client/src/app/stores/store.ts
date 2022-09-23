import { createContext, useContext } from "react";
import BlogStore from "./blogstore";

interface Store {
    blogStore: BlogStore
}

export const store: Store = {
    blogStore: new BlogStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}