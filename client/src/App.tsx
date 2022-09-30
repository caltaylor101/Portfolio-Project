import './App.css';
import NavBar from './app/components/navbar/navbar';
import BlogList from './app/components/blog-list/blog-list';
import BlogDetails from './app/components/blog-details/blog-details';
import { Route, Routes, useLocation } from 'react-router-dom';
import BlogForm from './app/components/blog-form/blog-form';
import BlogEditForm from './app/components/blog-form/blog-edit-form';
import {v4 as uuid} from 'uuid';
import { useStore } from './app/stores/store';
import TestErrors from './app/errors/TestError';
import { ToastContainer } from 'react-toastify';

function App() {
  
  const location = useLocation();

  const store = useStore();

  const {blogStore} = store;

  return (
    <div className="App">
      <ToastContainer position='bottom-right' hideProgressBar/>
      <NavBar />
        <Routes>
          <Route path='/' element={<BlogList />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path={`/read-blog/:urlSuffix`} element={<BlogDetails />} />
          <Route path={`/read-blog`} element={<BlogDetails />} />

          <Route path="/blog-form" element={<BlogForm />} />
          <Route path="/edit-blog" element={<BlogEditForm />} />
          <Route path="/errors" element={<TestErrors />} />

        </Routes>
    </div>
  );
}

export default App;

