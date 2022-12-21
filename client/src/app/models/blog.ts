import { Photo } from "./photo";
import { User } from "./user";

export interface Blog {
    id: string;
    title: string;
    date: Date;
    description: string;
    category: string;
    body: string;
    urlSuffix: string;
    appUser?: User;
    photos?: Photo[];
}
