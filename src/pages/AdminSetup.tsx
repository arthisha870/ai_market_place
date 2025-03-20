import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createAdminUser, verifyUserCredentials } from '../utils/createAdminUser';

export default function AdminSetup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState<'create' | 'verify'>('create');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setIsError(false);

    try {
      if (action === 'create') {
        const uid = await createAdminUser(email, password);
        setMessage(`Admin user created successfully! User ID: ${uid}`);
      } else {
        const isValid = await verifyUserCredentials(email, password);
        if (isValid) {
          setMessage('Credentials are valid! Try logging in with these credentials.');
        } else {
          setIsError(true);
          setMessage('Credentials verification failed. Check console for details.');
        }
      }
    } catch (error: any) {
      setIsError(true);
      setMessage(error.message || 'An error occurred');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Setup Utility
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          This utility is for development purposes only
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-4 flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setAction('create')}
              className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 ${
                action === 'create' 
                  ? 'bg-indigo-600 text-white border-indigo-600' 
                  : 'bg-white text-gray-700'
              }`}
            >
              Create Admin
            </button>
            <button
              type="button"
              onClick={() => setAction('verify')}
              className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 ${
                action === 'verify' 
                  ? 'bg-indigo-600 text-white border-indigo-600' 
                  : 'bg-white text-gray-700'
              }`}
            >
              Verify Credentials
            </button>
          </div>
          
          {message && (
            <div className={`mb-4 ${isError ? 'bg-red-50 border-red-400' : 'bg-green-50 border-green-400'} border-l-4 p-4`}>
              <div className="flex">
                <div className="ml-3">
                  <p className={`text-sm ${isError ? 'text-red-700' : 'text-green-700'}`}>{message}</p>
                </div>
              </div>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : action === 'create' ? 'Create Admin User' : 'Verify Credentials'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Admin Navigation</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Link
                to="/admin/login"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Admin Login
              </Link>
              <Link
                to="/"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 