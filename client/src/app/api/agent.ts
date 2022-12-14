import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { RouteLinks } from '../../App-Routes';
import { Blog } from '../models/blog';
import { PaginatedResult } from '../models/pagination';
import { Photo } from '../models/photo';
import { Profile } from '../models/profile';
import { User, UserFormValues } from '../models/user';
import { store } from '../stores/store';

const routeLinks = new RouteLinks();

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers!.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development') await sleep(1000);
    const pagination = response.headers['pagination'];
    if (pagination)
    {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>
    }

    return response;
}, (error: AxiosError) => {
    const {data, status}: { data: any; status: number, config: any} = error.response!;
    switch (status) {
        case 400:
            if (typeof data === 'string') {
                toast.error(data);
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }
            break;
        case 401: 
            toast.error('unauthorized');
            break;
        case 404: 
            toast.error('not found');
            history.push(routeLinks.notFound);
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push(routeLinks.serverError);
            toast.error('server errors');
            break;
    }
    return Promise.reject(error);
})


const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {} ) => axios.put<T>(url, body).then(responseBody),
    delete: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Blogs = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Blog[]>>('/blog', {params}).then(responseBody),
    userBlogList: (params: URLSearchParams) => axios.get<PaginatedResult<Blog[]>>('/blog/UserBlogs', {params}).then(responseBody),
    details: (urlSuffix: string, id?: string | null) => 
    {
        if (id === undefined)
        {
            return requests.get<Blog>(`/blog/${urlSuffix}`)
        }
        else
        {
            return requests.get<Blog>(`/blog/"null"/${id}`)
        }
} ,
    create: (blog: Blog) => axios.post<void>('/blog', blog),
    update: (blog: Blog) => axios.put<void>(`/blog/${blog.id}`, blog),
    delete: (id: string) => axios.delete<void>(`/blog/${id}`),
    
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user),
    bio: () => requests.get<string>('/account/bio'),
    uploadPhoto: (file: Blob, isProfilePicture: boolean) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post(`photo/${isProfilePicture}`, formData, {
            headers: {'Content-type': 'mulitpart/form-data'}
        })
    },
    getPhotos: (isProfilePicture: boolean) => requests.get<Photo[]>(`/account/get-user-pictures/${isProfilePicture}`)
}

const Profiles = {
    current: () => requests.get<Profile>('/account/get-user-profile'),
    get: (username: string) => requests.get<Profile>(`/profile/${username}`),
    setMainPhoto: (id: string) => requests.post(`/photo/${id}/setMainPhoto`, {}),
    deletePhoto: (id: string) => requests.delete(`/photo/${id}`),
    updateProfile: (profile: Partial<Profile>) => requests.put(`/profiles`, profile)
}

const agent = {
    Blogs,
    Account,
    Profiles
}

export default agent;