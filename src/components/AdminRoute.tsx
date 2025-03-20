import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { currentUser, userRole, loading, checkIfUserIsAdmin } = useAuth();
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      if (currentUser) {
        try {
          const adminStatus = await checkIfUserIsAdmin();
          setIsAdmin(adminStatus);
          
          if (!adminStatus) {
            setError('You do not have admin privileges');
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
          setError('Failed to verify admin privileges');
        }
      }
      setIsCheckingAdmin(false);
    };

    if (!loading) {
      checkAdmin();
    }
  }, [currentUser, loading, checkIfUserIsAdmin]);

  // If auth is still loading or we're checking admin status, show a loader
  if (loading || isCheckingAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If not logged in, redirect to admin login
  if (!currentUser) {
    return <Navigate to="/admin/login" />;
  }

  // If logged in but not admin, show access denied page
  if (!isAdmin && !userRole?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
              Access Denied
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {error || 'You do not have permission to access the admin area'}
            </p>
          </div>
          <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <p className="text-gray-700 text-center mb-6">
              Your account is logged in as: <span className="font-medium">{currentUser.email}</span>
            </p>
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go to Homepage
              </Link>
              <Link
                to="/admin/setup"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Admin Setup
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If logged in and admin, render the children
  return <>{children}</>;
} 