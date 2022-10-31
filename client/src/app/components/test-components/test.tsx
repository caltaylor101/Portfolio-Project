import { Layout, Menu, Breadcrumb } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import { Link } from "react-router-dom";
import { RouteLinks } from "../../../App-Routes";



export default function TestNav() {

  const routeLinks = new RouteLinks;

  return (
    <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={new Array(15).fill(null).map((_, index) => {
          const key = index + 1;
          return {
            key,
            label: <Link to={routeLinks.blogList}>Blog</Link>,
            children: []
          };
        })}
      />
    </Header>
    <Content
      style={{
        padding: '0 50px',
      }}
    >
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">Content</div>
    </Content>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
  )

}

  

