import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ExternalLink, Heart, ArrowLeft, Loader2 } from 'lucide-react';
import { getToolBySlug, getToolById, DEFAULT_LOGO_PLACEHOLDER, DEFAULT_SCREENSHOT_PLACEHOLDER } from '../services/toolsService';
import { Tool } from '../types';

export default function ToolDetails() {
  const { slug } = useParams();
  const [tool, setTool] = useState<Tool | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTool = async () => {
      if (!slug) return;
      
      try {
        setIsLoading(true);
        // Try to fetch by slug first
        let fetchedTool = await getToolBySlug(slug);
        
        // If no tool found by slug, try to fetch by ID (for backward compatibility)
        if (!fetchedTool) {
          fetchedTool = await getToolById(slug);  // Using slug param which might be an ID
        }
        
        setTool(fetchedTool);
      } catch (error) {
        console.error('Error fetching tool:', error);
        setError('Failed to load tool details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTool();
  }, [slug]);

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
        <Link to="/" className="text-indigo-600 hover:text-indigo-500 flex items-center justify-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Return to homepage
        </Link>
      </div>
    );
  }

  // Tool not found
  if (!tool) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900">Tool not found</h2>
        <Link to="/" className="text-indigo-600 hover:text-indigo-500 flex items-center mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Return to homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link to="/" className="text-indigo-600 hover:text-indigo-500 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all tools
        </Link>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center">
              <img
                src={tool.logo || DEFAULT_LOGO_PLACEHOLDER}
                alt={tool.name}
                className="w-16 h-16 rounded-lg object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = DEFAULT_LOGO_PLACEHOLDER;
                }}
              />
              <div className="ml-4">
                <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
                <div className="flex items-center mt-2">
                  <span className="inline-block px-2 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full capitalize">
                    {tool.category}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="capitalize text-gray-600">{tool.pricing}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Heart className="h-5 w-5 mr-2" />
                Add to Favorites
              </button>
              {tool.officialUrl && (
                <a
                  href={tool.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Visit Website
                </a>
              )}
            </div>
          </div>

          <p className="text-lg text-gray-600 mb-8">{tool.description}</p>

          {tool.features && tool.features.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tool.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-600"
                  >
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tool.screenshots && tool.screenshots.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Screenshots</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tool.screenshots.map((screenshot, index) => (
                  <img
                    key={index}
                    src={screenshot}
                    alt={`${tool.name} screenshot ${index + 1}`}
                    className="rounded-lg shadow-md w-full h-64 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = DEFAULT_SCREENSHOT_PLACEHOLDER;
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {tool.reviews && tool.reviews.length > 0 ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h2>
              <div className="space-y-6">
                {tool.reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {review.userName}
                      </span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-center py-6 border-t border-gray-200">
              No reviews yet. Be the first to add one!
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}