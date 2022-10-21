import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { RouteLinks } from '../../App-Routes';
import { Blog } from '../models/blog';
import { User, UserFormValues } from '../models/user';
import { store } from '../stores/store';

const routeLinks = new RouteLinks();

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'http://localhost:5000';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers!.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
        await sleep(1000);
        return response;
}, (error: AxiosError) => {
    const {data, status, config}: { data: any; status: number, config: any} = error.response!;
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
    list: () => requests.get<Blog[]>('/blog'),
    userBlogList: () => requests.get<Blog[]>('/blog/UserBlogs'),
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
    uploadPhoto: (file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post('photo', formData, {
            headers: {'Content-type': 'mulitpart/form-data'}
        })
    }
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user),
    bio: () => requests.get<string>('/account/bio')
}

const agent = {
    Blogs,
    Account
}

export default agent;