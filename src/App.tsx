import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import ToolDetails from './pages/ToolDetails';
import ContactPage from './pages/ContactPage';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import AdminSetup from './pages/AdminSetup';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ManageTools from './pages/admin/ManageTools';
import ToolForm from './pages/admin/ToolForm';
import ManageCategories from './pages/admin/ManageCategories';
import TermsOfService from './pages/legal/TermsOfService';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import CookiePolicy from './pages/legal/CookiePolicy';
import Disclaimer from './pages/legal/Disclaimer';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import { initializeDefaultCategories } from './services/toolsService';

function App() {
  useEffect(() => {
    // Initialize Firebase with default categories if needed
    const initializeFirebase = async () => {
      try {
        await initializeDefaultCategories();
      } catch (error) {
        console.error('Error initializing Firebase data:', error);
      }
    };

    initializeFirebase();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes with MainLayout */}
          <Route 
            path="/" 
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            } 
          />
          <Route 
            path="/tool/:slug" 
            element={
              <MainLayout>
                <ProtectedRoute>
                  <ToolDetails />
                </ProtectedRoute>
              </MainLayout>
            } 
          />
          
          {/* Legal pages */}
          <Route 
            path="/terms" 
            element={
              <MainLayout>
                <TermsOfService />
              </MainLayout>
            } 
          />
          <Route 
            path="/privacy" 
            element={
              <MainLayout>
                <PrivacyPolicy />
              </MainLayout>
            } 
          />
          <Route 
            path="/cookies" 
            element={
              <MainLayout>
                <CookiePolicy />
              </MainLayout>
            } 
          />
          <Route 
            path="/disclaimer" 
            element={
              <MainLayout>
                <Disclaimer />
              </MainLayout>
            } 
          />
          
          {/* Contact page */}
          <Route 
            path="/contact" 
            element={
              <MainLayout>
                <ContactPage />
              </MainLayout>
            } 
          />
          
          {/* Login pages without full layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/setup" element={<AdminSetup />} />
          
          {/* Admin routes */}
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tools" element={<ManageTools />} />
            <Route path="tools/add" element={<ToolForm />} />
            <Route path="tools/edit/:id" element={<ToolForm />} />
            <Route path="categories" element={<ManageCategories />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;