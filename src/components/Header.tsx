import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, LogIn, LogOut, User } from 'lucide-react';
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">AITools</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search AI tools..."
                className="w-64 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
            
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt="Profile" 
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <User className="h-8 w-8 p-1 bg-gray-200 rounded-full" />
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {currentUser.displayName || currentUser.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="relative mx-2 mb-4">
              <input
                type="text"
                placeholder="Search AI tools..."
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
            
            {currentUser ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2 px-4 py-2">
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt="Profile" 
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <User className="h-8 w-8 p-1 bg-gray-200 rounded-full" />
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {currentUser.displayName || currentUser.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center px-4 py-2 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </button>
            )}
          </div>
        </div>
      )}

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
}