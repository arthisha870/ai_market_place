import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Loader2 } from 'lucide-react';
import { getAllTools, getAllCategories } from '../services/toolsService';
import { Tool } from '../types';

export default function Home() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPricing, setSelectedPricing] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch tools and categories from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch tools
        const fetchedTools = await getAllTools();
        setTools(fetchedTools);
        
        // Fetch categories
        const fetchedCategories = await getAllCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load tools and categories. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const filteredTools = tools.filter(tool => {
    if (selectedCategory !== 'all' && tool.category !== selectedCategory) return false;
    if (selectedPricing !== 'all' && tool.pricing !== selectedPricing) return false;
    return true;
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 inline-block">
          <p className="text-red-700">{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Discover the Best AI Tools
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our curated collection of AI-powered tools to enhance your productivity,
          creativity, and workflow.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full capitalize ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <select
            value={selectedPricing}
            onChange={(e) => setSelectedPricing(e.target.value)}
            className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Pricing</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
            <option value="freemium">Freemium</option>
          </select>
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">No tools found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map(tool => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={tool.logo || "https://placehold.co/100x100/e2e8f0/64748b?text=No+Logo"}
                    alt={tool.name}
                    className="w-12 h-12 rounded-lg object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://placehold.co/100x100/e2e8f0/64748b?text=No+Logo";
                    }}
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
                    <span className="inline-block px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full capitalize">
                      {tool.category}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-600">
                      {tool.rating}
                    </span>
                  </div>
                  <Link
                    to={`/tool/${tool.slug}`}
                    className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}