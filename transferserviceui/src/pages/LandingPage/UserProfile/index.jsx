import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.get('https://localhost:7299/api/Users');
      const users = response.data;

      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === password
      );

      if (user) {
        localStorage.setItem('userEmail', user.email);
        console.log('Login successful:', user);
        if (user.name.toLowerCase() === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/userProfile');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Error connecting to the server. Please try again later.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 pt-16">
      <div className="absolute top-5 left-5 w-32 h-32 bg-blue-200 rounded-full opacity-50"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-300 rounded-full opacity-50"></div>
      <div className="absolute top-10 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-50"></div>

      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Welcome!{' '}
          <span className="text-sm font-normal block">
            Please provide your email and password to login to your user profile
          </span>
        </h1>

        {error && (
          <div className="mb-4 text-red-500 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="text-right mb-6">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;