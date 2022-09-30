import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { RouteLinks } from '../../App-Routes';
import { Blog } from '../models/blog';

const routeLinks = new RouteLinks();

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'http://localhost:5000';

axios.interceptors.response.use(async response => {
        await sleep(1000);
        return response;
}, (error: AxiosError) => {
    const {data, status} = error.response!;
    switch (status) {
        case 400:
            toast.error('bad request');
            break;
        case 401: 
            toast.error('unauthorized');
            break;
        case 404: 
            toast.error('not found');
            history.push(routeLinks.notFound);
            break;
        case 500:
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
    delete: (id: string) => axios.delete<void>(`/blog/${id}`)
}

const agent = {
    Blogs
}

export default agent;