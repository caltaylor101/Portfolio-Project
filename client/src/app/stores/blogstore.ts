import { action, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { Blog } from "../models/blog";
import { v4 as uuid } from 'uuid';
import { Photo } from "../models/photo";

export default class BlogStore {
    blogs: Blog[] = [];
    selectedBlog: Blog | undefined = undefined;
    blogRegistry = new Map<string, Blog>();
    loading = false;
    loadingInitial = false;
    submitting = false;


    constructor() {
        makeAutoObservable(this)
    }

    get blogsByDate() {
        try
        {
            return Array.from(this.blogRegistry.values()).sort((a, b) => (a.date.getTime()) - (b.date.getTime()));
        }
        catch
        {
            return Array.from(this.blogRegistry.values());
        }
    }

    // get groupedBlogs() {
    //     return Object.entries(
    //         this.blogsByDate.reduce((blogs, blog) => {
    //             const date = blog.date.toISOString().split('T')[0];
    //             blogs[date] = blogs[date] ? [...blogs[date], blog] : [blog];
    //             return blogs;
    //         }, {} as {[key: string]: Blog[]} )
    //     )
    // }

    loadBlogs = async (isUserDashboard: boolean) => {
        this.setLoadingInitial(true);
        try {
            if (!isUserDashboard)
            {
                this.blogs = await agent.Blogs.list();
            }
            else
            {
                this.blogs = await agent.Blogs.userBlogList();
            }
            const blogs = this.blogs;
            runInAction(() => {
                blogs.forEach(blog => {
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

    createBlog = async (blog: Blog, photos: Photo[] | null) => {
        this.loading = true;
        blog.id = uuid();

        //Find the position of the image tags fro the form.
        const blog_image_posititions = blog.body.match(/(<image_\d>)/gs);
        //Initialize an array
        const photos_to_add = [] as Photo[];
        //Loop through the image positions
        blog_image_posititions?.forEach(element => {
            //Get the digit in an array
            let photoIndexes = element.match(/(\d)/);
            //Check if something is there
            if (photoIndexes?.length! >= 1)
                //Attach the photo at that index to the blog
                photos![photoIndexes![0] as any].blog = blog;
                //Order the picture
                photos![photoIndexes![0] as any].order = Number(photoIndexes![0]);
                //push to the array
                photos_to_add.push(photos![photoIndexes![0] as any]);
            }
        );

        blog.photos = photos_to_add;
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
    sleep = (delay: number) => {
        return new Promise((resolve) => {
            setTimeout(resolve, delay);
        })
    }
    updateBlog = async (blog: Blog) => {
        this.loading = true;
        try {
            await this.sleep(1000);
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

    getBlog = async (urlSuffix: string) => {
        this.loading = true;
        try {
            const selectedBlog = await agent.Blogs.details(urlSuffix);
            this.blogRegistry.delete(selectedBlog.id);
            this.blogRegistry.set(selectedBlog.id, selectedBlog);
            this.selectBlog(selectedBlog.id);
            this.loading = false;
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    }

    getBlogById = async (urlSuffix="null", id: string) => {
        this.loading = true;
        try {
            const selectedBlog = await agent.Blogs.details(urlSuffix, id);
            this.blogRegistry.delete(selectedBlog.id);
            this.blogRegistry.set(selectedBlog.id, selectedBlog);
            this.selectBlog(selectedBlog.id);
            this.loading = false;
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    }

    

}

