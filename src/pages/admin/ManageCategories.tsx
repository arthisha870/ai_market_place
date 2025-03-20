import React, { useState, useEffect } from 'react';
import { Tag, Trash2, Plus, AlertTriangle } from 'lucide-react';
import { getAllCategories, addCategory, deleteCategory } from '../../services/toolsService';

export default function ManageCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const fetchedCategories = await getAllCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add new category
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!newCategory.trim()) {
      setError('Please enter a category name');
      return;
    }
    
    // Check for duplicates
    if (categories.includes(newCategory.toLowerCase().trim())) {
      setError('This category already exists');
      return;
    }
    
    try {
      setError('');
      await addCategory(newCategory.trim());
      setSuccessMessage('Category added successfully!');
      setNewCategory('');
      
      // Refresh categories
      fetchCategories();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error adding category:', error);
      setError('Failed to add category');
    }
  };

  // Delete category
  const handleDeleteConfirm = async (categoryName: string) => {
    try {
      await deleteCategory(categoryName);
      setCategories(prevCategories => prevCategories.filter(cat => cat !== categoryName));
      setDeleteConfirmation(null);
      setSuccessMessage('Category deleted successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('Failed to delete category');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Categories</h1>
        <p className="text-gray-600 mt-1">Add, edit or remove tool categories</p>
      </div>
      
      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {successMessage && (
        <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Category</h2>
        <form onSubmit={handleAddCategory} className="flex items-start">
          <div className="flex-grow mr-3">
            <div className="mt-1">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </button>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-4 py-5 sm:px-6 border-b">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Existing Categories</h3>
        </div>
        
        {categories.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            No categories have been added yet.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {categories.map((category) => (
              <li key={category} className="px-4 py-4 flex items-center justify-between sm:px-6">
                <div className="flex items-center">
                  <Tag className="h-5 w-5 text-indigo-600 mr-3" />
                  <span className="text-gray-900">{category}</span>
                </div>
                <button
                  onClick={() => setDeleteConfirmation(category)}
                  className="text-red-600 hover:text-red-900 p-1"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <div className="flex items-center mb-4 text-red-600">
              <AlertTriangle className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-medium">Confirm Deletion</h3>
            </div>
            <p className="mb-4 text-gray-600">
              Are you sure you want to delete the category "{deleteConfirmation}"? 
              This may affect tools assigned to this category.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirmation(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteConfirm(deleteConfirmation)}
                className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 