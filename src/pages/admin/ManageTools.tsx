import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Plus, Search, AlertTriangle } from 'lucide-react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Tool } from '../../types';

export default function ManageTools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchTools = async () => {
    try {
      setIsLoading(true);
      const toolsCollection = collection(db, 'tools');
      const toolsSnapshot = await getDocs(toolsCollection);
      const toolsList = toolsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Tool[];
      
      setTools(toolsList);
    } catch (error) {
      console.error('Error fetching tools:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const filteredTools = searchTerm 
    ? tools.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : tools;

  const handleDeleteConfirm = async (toolId: string) => {
    try {
      await deleteDoc(doc(db, 'tools', toolId));
      setTools(prevTools => prevTools.filter(tool => tool.id !== toolId));
      setDeleteConfirmation(null);
      setSuccessMessage('Tool deleted successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error deleting tool:', error);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Tools</h1>
        <Link
          to="/admin/tools/add"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Tool
        </Link>
      </div>
      
      {successMessage && (
        <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
          </div>
        </div>
        
        {filteredTools.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            {searchTerm 
              ? 'No tools match your search criteria.' 
              : 'No tools have been added yet.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tool
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pricing
                  </th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTools.map((tool) => (
                  <tr key={tool.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={tool.logo} 
                          alt={tool.name} 
                          className="h-10 w-10 rounded-md mr-3 object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{tool.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{tool.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-full">
                        {tool.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        tool.pricing === 'free' 
                          ? 'bg-green-100 text-green-800' 
                          : tool.pricing === 'paid' 
                          ? 'bg-pink-100 text-pink-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {tool.pricing}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link 
                          to={`/admin/tools/edit/${tool.id}`}
                          className="text-indigo-600 hover:text-indigo-900 p-1"
                        >
                          <Edit2 className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => setDeleteConfirmation(tool.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
              Are you sure you want to delete this tool? This action cannot be undone.
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