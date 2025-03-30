import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Hardcoded user data for validation
  const hardcodedUsers = [
    { username: 'user', password: '123', role: 'user' },
    { username: 'admin', password: '123', role: 'admin' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const user = hardcodedUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      console.log('Login successful:', user);
      if (user.role === 'admin') {
        navigate('/dashboard'); // Navigate to dashboard for admin
      } else {
        navigate('/userProfile'); // Navigate to userProfile for regular user
      }
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 pt-16">
      {/* Background shapes */}
      <div className="absolute top-5 left-5 w-32 h-32 bg-blue-200 rounded-full opacity-50"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-300 rounded-full opacity-50"></div>
      <div className="absolute top-10 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-50"></div>

      {/* Login Card */}
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Welcome!{' '}
          <span className="text-sm font-normal block">
            Please provide your email and password to login to your user profile
          </span>
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-red-500 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
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