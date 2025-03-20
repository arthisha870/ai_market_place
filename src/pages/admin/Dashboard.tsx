import React, { useState, useEffect } from 'react';
import { Package, Tag, Users, BarChart2 } from 'lucide-react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import { Tool } from '../../types';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTools: 0,
    totalCategories: 0,
    recentTools: [] as Tool[]
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        
        // Get tool count
        const toolsSnapshot = await getDocs(collection(db, 'tools'));
        const toolCount = toolsSnapshot.size;
        
        // Get category count
        const categoriesSnapshot = await getDocs(collection(db, 'categories'));
        const categoryCount = categoriesSnapshot.size;
        
        // Get recent tools
        const recentToolsQuery = query(
          collection(db, 'tools'), 
          orderBy('createdAt', 'desc'), 
          limit(5)
        );
        const recentToolsSnapshot = await getDocs(recentToolsQuery);
        const recentTools = recentToolsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Tool[];
        
        setStats({
          totalTools: toolCount,
          totalCategories: categoryCount,
          recentTools
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Tools',
      value: stats.totalTools,
      icon: <Package className="h-6 w-6 text-indigo-600" />,
      bgColor: 'bg-indigo-50',
      link: '/admin/tools'
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      icon: <Tag className="h-6 w-6 text-green-600" />,
      bgColor: 'bg-green-50',
      link: '/admin/categories'
    }
  ];

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
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to your admin dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className={`${card.bgColor} p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
              </div>
              <div>{card.icon}</div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">Recent Tools</h2>
          <Link to="/admin/tools" className="text-sm text-indigo-600 hover:text-indigo-800">
            View all
          </Link>
        </div>
        
        {stats.recentTools.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-sm font-medium text-gray-500">Name</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-500">Category</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-500">Pricing</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentTools.map((tool) => (
                  <tr key={tool.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <img 
                          src={tool.logo} 
                          alt={tool.name}
                          className="h-8 w-8 rounded mr-3 object-cover" 
                        />
                        <span className="font-medium">{tool.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{tool.category}</td>
                    <td className="py-3 px-4">
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            No tools added yet. Start by adding your first tool.
          </div>
        )}
      </div>
      
      <div className="flex justify-center">
        <Link
          to="/admin/tools/add"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Package className="h-4 w-4 mr-2" />
          Add New Tool
        </Link>
      </div>
    </div>
  );
} 