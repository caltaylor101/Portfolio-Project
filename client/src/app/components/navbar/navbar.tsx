import { Layout, Menu, Image, Button, Avatar} from "antd";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { RouteLinks } from "../../../App-Routes";
import { useStore } from "../../stores/store";
import LoginForm from "../users/login-form";
import RegisterForm from "../users/register-form";
import './navbar.css';

export default observer(function NavBar() {
    const routeLinks = new RouteLinks();
    const { userStore, modalStore } = useStore();
    const items = [
        { label: '', key: 'blank1', style: { paddingLeft: '15%', opacity: '0', cursor: 'default' } },
        { label: <Link to={routeLinks.home}>Home</Link>, key: 'item-1' },
        { label: <Link to={routeLinks.blogList}>Blog</Link>, key: 'item-2' }, 
        { label: 'item 2', key: 'item-3' }, 
        {
            label: 'sub menu',
            key: 'submenu'
        },
        { label: <Link to={routeLinks.testErrors}>Errors</Link>, key: 'item-5' },
    ] as any;
    //This adds the login or logged in buttons to the navbar. The blank label helps adjust the buttons to the correct spot on the page. 
    if (!userStore.isLoggedIn) 
    {
        items.push({ label: '', key: 'blank2', style: { paddingLeft: '45%', opacity: '0', cursor: 'default' } },
        { label: <Button type='primary' className='success-btn' onClick={() => modalStore.openModal(<LoginForm isBackRedirect={false} />)} >Login</Button>, key: 'item-6' },
        { label: <Button type='primary' className='success-btn' onClick={() => modalStore.openModal(<RegisterForm />)} >Register</Button>, key: 'item-7' },
        )
    }
    else
    {
        items.push({ label: '', key: 'blank3', style: { paddingLeft: '45%', opacity: '0', cursor: 'default' } },
        { label: <Link to={routeLinks.blogForm}><Button type='primary' className='success-btn' >Post Blog</Button></Link>, key: 'item-8' },
        
        { label: <Avatar
            style={{ border: '1px solid teal' }}
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 50 }}
            icon={<Image
                preview={false}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"

            />}
        />, key: 'item-10', children: [{ label: <Link to={routeLinks.myProfile}>My Profile</Link>, key: 'item-9' }, { label: <Button type='primary' danger onClick={userStore.logout} >Logout</Button>, key: 'item-11' }]}
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
                // defaultSelectedKeys={['1']}
        defaultSelectedKeys={['2']}

                items={items}
            />
        </Layout>
    )
});
