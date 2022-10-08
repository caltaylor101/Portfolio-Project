import { Layout, Menu, Image, Button} from "antd";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { RouteLinks } from "../../../App-Routes";
import { useStore } from "../../stores/store";
import LoginForm from "../users/login-form";
import './navbar.css';

export default observer(function NavBar() {
    const routeLinks = new RouteLinks();
    const { userStore, modalStore } = useStore();
    const items = [
        { label: '', key: 'blank1', children: null, style: { paddingLeft: '15%', opacity: '0', cursor: 'default' } },
        { label: <Link to={routeLinks.home}>Home</Link>, key: 'item-1', children: null },
        { label: <Link to={routeLinks.blogList}>Blog</Link>, key: 'item-2', children: null }, // remember to pass the key prop
        { label: 'item 2', key: 'item-3', children: null }, // which is required
        {
            label: 'sub menu',
            key: 'submenu',
            children: [{ label: 'item-4', key: 'submenu-item-1' }],
        },
        { label: <Link to={routeLinks.testErrors}>Errors</Link>, key: 'item-5', children: null },
    ];
    //This adds the login or logged in buttons to the navbar. The blank label helps adjust the buttons to the correct spot on the page. 
    if (!userStore.isLoggedIn) 
    {
        items.push({ label: '', key: 'blank2', children: null, style: { paddingLeft: '45%', opacity: '0', cursor: 'default' } },
        { label: <Button type='primary' className='success-btn' onClick={() => modalStore.openModal(<LoginForm />)} >Login</Button>, key: 'item-6', children: null },
        { label: <Button type='primary' className='success-btn' onClick={() => modalStore.openModal(<LoginForm />)} >Register</Button>, key: 'item-7', children: null },

        
        )
    }
    else
    {
        items.push({ label: '', key: 'blank3', children: null, style: { paddingLeft: '45%', opacity: '0', cursor: 'default' } },
        { label: <Link to={routeLinks.blogForm}><Button type='primary' className='success-btn' >Post Blog</Button></Link>, key: 'item-8', children: null },
        { label: <Button type='primary' className='success-btn' onClick={userStore.logout} >Logout</Button>, key: 'item-9', children: null },

        
        )
    }
        
    

    return (
        <Layout className="layout">
            <div className="logo">
                <Image
                    preview={false}
                    src="/assets/NavBar_Logo.png"
                />
            </div>
            <Menu
                className="menu"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                items={items}
            />
        </Layout>
    )
});
