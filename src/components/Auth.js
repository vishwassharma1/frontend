// frontend/src/components/Auth.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const { data } = await axios.post('/api/users/login', { email, password });
        localStorage.setItem('token', data.token);
        navigate('/blogs'); // Redirect to the blog page
      } catch (error) {
        console.error('Login failed:', error);
      }
    } else {
      try {
        await axios.post('/api/users/register', { username, email, password });
        navigate('/'); // Redirect to the blog page
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-8 sm:px-12 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-24 xl:py-32">
      <div className="w-full sm:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              {isLogin ? 'Login' : 'Register'}
            </button>
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="ml-20 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
              {isLogin ? 'Switch to Register' : 'Switch to Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Auth;
