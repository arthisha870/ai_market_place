import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { currentUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to home page
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // Redirect will happen automatically via the useEffect
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Access your favorite AI tools with one click
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <img
                className="h-5 w-5 mr-2"
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google logo"
              />
              Sign in with Google
            </button>
            
            <p className="text-xs text-center text-gray-500">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 