import { Photo } from "./photo";

export interface Profile {
    username: string,
    displayName: string,
    bio: string,
    profileImage: string,
    images: Photo[],
}
