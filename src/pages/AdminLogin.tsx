import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [detailedError, setDetailedError] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser, userRole, signInWithEmail } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if user is logged in and is an admin
    if (currentUser && userRole?.isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [currentUser, userRole, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setError('');
      setDetailedError('');
      setLoading(true);
      await signInWithEmail(email, password);
      
      // Check if user is logged in but not admin
      if (currentUser && userRole && !userRole.isAdmin) {
        setError('You do not have admin privileges');
        setDetailedError('Your account exists but does not have admin access. Please contact the administrator.');
      }
      // Navigation will happen in useEffect if user is admin
    } catch (error: any) {
      console.error('Error during sign in:', error);
      
      // Extract the error message
      let message = 'Failed to sign in. Please check your credentials.';
      let detailedMessage = '';
      
      if (error.code) {
        switch (error.code) {
          case 'auth/invalid-email':
            message = 'Invalid email format.';
            break;
          case 'auth/user-not-found':
            message = 'User not found.';
            detailedMessage = 'This email is not registered in our system.';
            break;
          case 'auth/wrong-password':
            message = 'Incorrect password.';
            detailedMessage = 'The password you entered is incorrect.';
            break;
          case 'auth/too-many-requests':
            message = 'Too many failed login attempts.';
            detailedMessage = 'Account has been temporarily disabled due to many failed login attempts. Try again later or reset your password.';
            break;
          default:
            message = 'Authentication error.';
            detailedMessage = error.message || error.toString();
        }
      }
      
      setError(message);
      setDetailedError(detailedMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Access the admin dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                  {detailedError && (
                    <p className="text-sm text-red-600 mt-1">{detailedError}</p>
                  )}
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
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need to create an admin account?{' '}
              <Link to="/admin/setup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Go to setup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 