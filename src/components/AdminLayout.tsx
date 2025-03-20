import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Grid, LayoutGrid, Package, Tag, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: <Grid size={18} /> },
    { to: '/admin/tools', label: 'Manage Tools', icon: <Package size={18} /> },
    { to: '/admin/categories', label: 'Manage Categories', icon: <Tag size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white z-20 px-4 py-3 flex items-center justify-between shadow">
        <div className="font-bold text-xl text-indigo-600">Admin Panel</div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-600 hover:text-gray-900"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6">
          <div className="text-2xl font-bold text-indigo-600 hidden lg:block">Admin Panel</div>
        </div>
        
        <nav className="mt-4">
          <div className="px-4 mb-4">
            <div className="text-xs uppercase text-gray-500 font-semibold tracking-wider">
              Navigation
            </div>
          </div>
          
          <ul>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => 
                    `flex items-center px-6 py-3 text-sm font-medium ${
                      isActive
                        ? 'text-indigo-600 bg-indigo-50 border-r-4 border-indigo-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          
          <div className="px-4 mt-8 mb-2">
            <div className="text-xs uppercase text-gray-500 font-semibold tracking-wider">
              Account
            </div>
          </div>
          
          <div className="px-6 py-4">
            <div className="text-sm font-medium text-gray-700">
              {currentUser?.email}
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            <span className="mr-3"><LogOut size={18} /></span>
            Logout
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className={`lg:ml-64 min-h-screen ${isSidebarOpen ? 'overflow-hidden' : ''}`}>
        <div className="p-6 lg:p-10 pt-10 lg:pt-6">
          {/* Mobile header spacer */}
          <div className="h-12 lg:hidden"></div>
          <Outlet />
        </div>
      </div>
      
      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
} 