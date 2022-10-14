import { makeAutoObservable, runInAction } from "mobx";
import { RouteLinks } from "../../App-Routes";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";
import { history } from '../..';


export default class UserStore {
    
    user: User | null = null
    routeLinks = new RouteLinks();

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues, isBackRedirect: boolean) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            if (isBackRedirect) history.back();
            else history.push(this.routeLinks.blogList);
            store.modalStore.closeModal();
            
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null; 
        history.push(this.routeLinks.home);
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user)
        } catch (error) {
            console.log(error);
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push(this.routeLinks.blogList);
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

}