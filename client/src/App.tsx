import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/blog').then(response => {
      console.log(response);
      setBlogs(response.data);
    });
  }, []);


  return (
    <div className="App">
      <ul>
        {blogs.map((blog: any) => (
          <li key={blog.id}>
              {blog.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
