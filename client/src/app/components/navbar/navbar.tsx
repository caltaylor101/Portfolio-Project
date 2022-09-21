import { Layout, Menu, Image, Button} from "antd";
import { Link } from "react-router-dom";
import './navbar.css';

const NavBar = () => {
    const items = [
        { label: '', key: 'blank1', children: null, style: { paddingLeft: '15%', opacity: '0', cursor: 'default' } },
        { label: <Link to="/">Home</Link>, key: 'item-1', children: null },
        { label: <Link to="/blogs">Blog</Link>, key: 'item-2', children: null }, // remember to pass the key prop
        { label: 'item 2', key: 'item-3', children: null }, // which is required
        {
            label: 'sub menu',
            key: 'submenu',
            children: [{ label: 'item-4', key: 'submenu-item-1' }],
        },

        { label: '', key: 'blank2', children: null, style: { paddingLeft: '45%', opacity: '0', cursor: 'default' } },
        { label: <Link to="/blog-form"><Button type='primary' className='success-btn' >Post Blog</Button></Link>, key: 'item-5', children: null },
    ];

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
};

export default NavBar;
