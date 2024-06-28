// frontend/src/components/Blog.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await axios.get('/api/blogs');
      setBlogs(data.blogs);
    };
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('/api/blogs', { title, content }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTitle('');
    setContent('');
    const { data } = await axios.get('/api/blogs');
    setBlogs(data.blogs);
  };

  return (
    <div className="container mx-auto px-8 sm:px-12 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-24 xl:py-32">
      <div className="w-full sm:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto ">
        <form onSubmit={handleSubmit} className=" space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Create Blog
            </button>
          </div>
        </form>
        <div className="mt-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="border-b border-gray-200 py-4">
              <h3 className="text-lg font-medium text-gray-900">{blog.title}</h3>
              <p className="text-sm text-gray-700">{blog.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
