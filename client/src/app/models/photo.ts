import { Blog } from "./blog";

export interface Photo {
    id: string,
    url: string,
    isProfilePicture: boolean,
    isMainProfilePicture: boolean,
    blog?: Blog
}