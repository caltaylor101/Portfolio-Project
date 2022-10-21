export interface Blog {
    id: string;
    title: string;
    date: Date;
    description: string;
    category: string;
    body: string;
    urlSuffix: string;
    appUser?: string;
    photos?: Photo[];
}

export interface Photo {
    id: string;
    url: string;
}