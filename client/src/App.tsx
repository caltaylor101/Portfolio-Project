import './App.css';
import NavBar from './app/components/navbar/navbar';
import BlogList from './app/components/blog-list/blog-list';
import BlogDetails from './app/components/blog-details/blog-details';
import { Route, Routes, useLocation } from 'react-router-dom';
import BlogForm from './app/components/blog-form/blog-form';
import BlogEditForm from './app/components/blog-form/blog-edit-form';



function App() {
  
  const location = useLocation();

  return (
    <div className="App">
      <NavBar />
        <Routes>
          <Route path='/' element={<BlogList />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/read-blog" element={<BlogDetails blog={location.state}/>} />
          <Route path="/blog-form" element={<BlogForm />} />
          <Route path="/edit-blog" element={<BlogEditForm blog={location.state} />} />
        </Routes>
    </div>
  );
}

export default App;

