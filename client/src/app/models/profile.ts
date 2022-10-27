import { Photo } from "./photo";

export interface Profile {
    username: string,
    displayName: string,
    bio: string,
    profileImage: string,
    photos: Photo[],
}
