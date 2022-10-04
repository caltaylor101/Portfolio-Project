import './App.css';
import NavBar from './app/components/navbar/navbar';
import BlogList from './app/components/blog-list/blog-list';
import BlogDetails from './app/components/blog-details/blog-details';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import BlogForm from './app/components/blog-form/blog-form';
import BlogEditForm from './app/components/blog-form/blog-edit-form';
import {v4 as uuid} from 'uuid';
import { useStore } from './app/stores/store';
import TestErrors from './app/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFoundError from './app/errors/NotFoundError';
import { RouteLinks } from './App-Routes';
import ServerError from './app/errors/ServerError';


function App() {
  
  const location = useLocation();

  const store = useStore();

  const {blogStore} = store;

  const routeLinks = new RouteLinks();

  return (
    <div className="App">
      <ToastContainer position='bottom-right' hideProgressBar/>
      <NavBar />
        <Routes>
          <Route path={routeLinks.home} element={<BlogList />} />
          <Route path={routeLinks.blogList} element={<BlogList />} />
          <Route path={routeLinks.blogDetails} element={<BlogDetails />} />
          {/* <Route path={`/read-blog`} element={<BlogDetails />} /> */}

          <Route path={routeLinks.blogForm} element={<BlogForm />} />
          <Route path={routeLinks.blogEditForm} element={<BlogEditForm />} />
          <Route path={routeLinks.testErrors} element={<TestErrors />} />
          <Route path={routeLinks.notFound} element={<NotFoundError />} />
          <Route path={routeLinks.serverError} element={<ServerError />} />


        </Routes>
    </div>
  );
}

export default App;

