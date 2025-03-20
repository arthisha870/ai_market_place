import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">AI Tools Marketplace</h3>
            <p className="text-gray-300 text-sm mb-4">
              Discover the best AI tools to enhance your productivity and workflows.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-white transition-colors">Categories</Link>
              </li>
              <li>
                <Link to="/popular" className="hover:text-white transition-colors">Popular Tools</Link>
              </li>
              <li>
                <Link to="/new" className="hover:text-white transition-colors">New Additions</Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Email: info@aitoolsmarketplace.com</li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Form</Link>
              </li>
              <li>
                <Link to="/feedback" className="hover:text-white transition-colors">Submit Feedback</Link>
              </li>
              <li>
                <Link to="/submit-tool" className="hover:text-white transition-colors">Submit a Tool</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} AI Tools Marketplace. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex flex-wrap space-x-4 text-sm text-gray-400">
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
} 