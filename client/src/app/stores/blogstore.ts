import { action, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { Blog } from "../models/blog";
import { v4 as uuid } from 'uuid';

export default class BlogStore {
    // blogs: Blog[] = [];
    selectedBlog: Blog | undefined = undefined;
    blogRegistry = new Map<string, Blog>();
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get blogsByDate() {
        return Array.from(this.blogRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    loadBlogs = async () => {
        this.setLoadingInitial(true);
        try {
            const blogs = await agent.Blogs.list();

            runInAction(() => {
                blogs.forEach(blog => {
                    blog.date = blog.date.split('T')[0];
                    this.blogRegistry.set(blog.id, blog);
                });
                this.setLoadingInitial(false);
            })
        }
        catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingInitial(false);
            })
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectBlog = async (id: string) => {
        this.selectedBlog = this.blogRegistry.get(id);
    }

    createBlog = async (blog: Blog) => {
        this.loading = true;
        blog.id = uuid();

        try {
            await agent.Blogs.create(blog);
            runInAction(() => {
                this.blogRegistry.set(blog.id, blog);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateBlog = async (blog: Blog) => {
        this.loading = true;
        try {
            await agent.Blogs.update(blog);
            runInAction(() => {
                this.blogRegistry.set(blog.id, blog);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteBlog = async (id: string) => {
        this.loading = true;
        try {
            await agent.Blogs.delete(id);
            runInAction(() => {
                this.blogRegistry.delete(id);
                this.loading = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    getBlog = async (id: string) => {
        this.loading = true;
        try {
            const selectedBlog = await agent.Blogs.details(id);
            this.blogRegistry.set(selectedBlog.id, selectedBlog);

        } catch (error) {
            console.log(error);
        }
    }



}

