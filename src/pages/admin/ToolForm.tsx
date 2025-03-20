import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, UploadCloud, Plus, Minus, Info, RefreshCw } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Tool } from '../../types';
import { 
  addTool, 
  updateTool, 
  getToolById, 
  uploadToolLogo, 
  uploadToolScreenshot,
  getAllCategories,
  DEFAULT_LOGO_PLACEHOLDER,
  DEFAULT_SCREENSHOT_PLACEHOLDER,
  checkSlugExists
} from '../../services/toolsService';

export default function ToolForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  
  // Tool form state
  const [formData, setFormData] = useState<{
    name: string;
    slug: string;
    description: string;
    category: string;
    pricing: 'free' | 'paid' | 'freemium';
    features: string[];
    officialUrl: string;
    logo: string;
    logoFile: File | null;
    screenshots: string[];
    screenshotFiles: File[];
  }>({
    name: '',
    slug: '',
    description: '',
    category: '',
    pricing: 'free',
    features: [''],
    officialUrl: '',
    logo: '',
    logoFile: null,
    screenshots: [],
    screenshotFiles: []
  });
  
  // Fetch categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await getAllCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    
    loadCategories();
  }, []);
  
  // Fetch tool data if in edit mode
  useEffect(() => {
    const fetchTool = async () => {
      if (!isEditMode) return;
      
      try {
        setIsLoading(true);
        const tool = await getToolById(id as string);
        
        if (tool) {
          setFormData({
            name: tool.name,
            slug: tool.slug,
            description: tool.description,
            category: tool.category,
            pricing: tool.pricing,
            features: tool.features.length > 0 ? tool.features : [''],
            officialUrl: tool.officialUrl,
            logo: tool.logo || '',
            logoFile: null,
            screenshots: tool.screenshots || [],
            screenshotFiles: []
          });
        }
      } catch (error) {
        console.error('Error fetching tool data:', error);
        setError('Failed to load tool data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTool();
  }, [id, isEditMode]);
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate slug when name changes if the slug field hasn't been manually edited
    if (name === 'name' && (!formData.slug || formData.slug === generateSlug(formData.name))) {
      setFormData(prev => ({ ...prev, slug: generateSlug(value) }));
    }
  };
  
  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: updatedFeatures }));
  };
  
  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };
  
  const removeFeature = (index: number) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    if (updatedFeatures.length === 0) {
      updatedFeatures.push('');
    }
    
    setFormData(prev => ({ ...prev, features: updatedFeatures }));
  };
  
  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        logoFile: file,
        logo: URL.createObjectURL(file)
      }));
    }
  };
  
  const handleScreenshotsChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const newScreenshotUrls = files.map(file => URL.createObjectURL(file));
      
      setFormData(prev => ({
        ...prev,
        screenshotFiles: [...prev.screenshotFiles, ...files],
        screenshots: [...prev.screenshots, ...newScreenshotUrls]
      }));
    }
  };
  
  const removeScreenshot = (index: number) => {
    const updatedScreenshots = [...formData.screenshots];
    updatedScreenshots.splice(index, 1);
    
    const updatedFiles = [...formData.screenshotFiles];
    if (index < formData.screenshotFiles.length) {
      updatedFiles.splice(index, 1);
    }
    
    setFormData(prev => ({
      ...prev,
      screenshots: updatedScreenshots,
      screenshotFiles: updatedFiles
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSaving(true);
      setError('');
      
      // Validate slug uniqueness
      const slugExists = await checkSlugExists(formData.slug, isEditMode ? id : undefined);
      if (slugExists) {
        setError('This URL slug is already in use. Please choose a different one.');
        setIsSaving(false);
        return;
      }
      
      const toolData: Partial<Tool> = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        category: formData.category,
        pricing: formData.pricing,
        features: formData.features.filter(f => f.trim() !== ''),
        officialUrl: formData.officialUrl,
        rating: 0, // Default rating for new tools
        reviews: [] // Default empty reviews for new tools
      };
      
      // Process logo upload if file exists
      if (formData.logoFile) {
        const logoUrl = await uploadToolLogo(formData.logoFile, isEditMode ? id! : 'temp');
        toolData.logo = logoUrl;
      } else if (formData.logo) {
        // Keep existing logo if already set
        toolData.logo = formData.logo;
      }
      
      // Process screenshots upload
      if (formData.screenshotFiles.length > 0) {
        const screenshotUrls = await Promise.all(
          formData.screenshotFiles.map((file, index) => 
            uploadToolScreenshot(file, isEditMode ? id! : 'temp', index)
          )
        );
        
        // If editing and there are existing screenshots that are being kept
        if (isEditMode && formData.screenshots.length > 0) {
          toolData.screenshots = [...formData.screenshots, ...screenshotUrls];
        } else {
          toolData.screenshots = screenshotUrls;
        }
      } else if (formData.screenshots.length > 0) {
        // Keep existing screenshots if already set
        toolData.screenshots = formData.screenshots;
      }
      
      if (isEditMode && id) {
        await updateTool(id, toolData);
        setSuccessMessage('Tool updated successfully!');
      } else {
        const newToolId = await addTool(toolData as Omit<Tool, 'id'>);
        setSuccessMessage('Tool created successfully!');
        
        // Redirect to the tool details page
        setTimeout(() => {
          navigate(`/tool/${formData.slug}`);
        }, 1500);
      }
    } catch (error) {
      console.error('Error saving tool:', error);
      setError('Failed to save tool. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Render logo preview
  const renderLogoPreview = () => {
    if (formData.logoFile) {
      return URL.createObjectURL(formData.logoFile);
    } else if (formData.logo) {
      return formData.logo;
    }
    return DEFAULT_LOGO_PLACEHOLDER;
  };
  
  // Function to generate a slug from the tool name
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  };
  
  // Function to manually generate slug based on current name
  const regenerateSlug = () => {
    setFormData(prev => ({ ...prev, slug: generateSlug(prev.name) }));
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditMode ? 'Edit Tool' : 'Add New Tool'}
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-800"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <X className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-green-700">{successMessage}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Logo Upload */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tool Logo <span className="text-gray-500 text-xs">(Optional)</span>
                <div className="flex items-center text-xs mt-1 text-gray-500">
                  <Info className="h-3 w-3 mr-1" />
                  If no logo is provided, a placeholder will be used
                </div>
              </label>
              <div className="flex items-center space-x-4">
                <div 
                  className="w-16 h-16 border border-gray-300 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center"
                >
                  <img 
                    src={renderLogoPreview()} 
                    alt="Tool logo preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = DEFAULT_LOGO_PLACEHOLDER;
                    }}
                  />
                </div>
                <div>
                  <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50">
                    <span>Upload Logo</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleLogoChange}
                    />
                  </label>
                </div>
              </div>
            </div>
            
            {/* Name */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tool Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          
          {/* Slug field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL Slug *
              <span className="ml-2 text-xs text-gray-500">(Will be used in the URL: /tool/your-slug)</span>
            </label>
            <div className="flex">
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="your-tool-name"
              />
              <button
                type="button"
                onClick={regenerateSlug}
                className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                title="Generate slug from name"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Pricing */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pricing *
              </label>
              <select
                name="pricing"
                value={formData.pricing}
                onChange={handleInputChange}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="free">Free</option>
                <option value="freemium">Freemium</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>
          
          {/* Official URL */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Official URL
            </label>
            <input
              type="url"
              name="officialUrl"
              value={formData.officialUrl}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="https://example.com"
            />
          </div>
          
          {/* Features */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features
            </label>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter a feature"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="ml-2 inline-flex items-center p-1.5 border border-transparent rounded-full text-red-600 hover:bg-red-50"
                >
                  <Minus className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Feature
            </button>
          </div>
          
          {/* Screenshots */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Screenshots <span className="text-gray-500 text-xs">(Optional)</span>
              <div className="flex items-center text-xs mt-1 text-gray-500">
                <Info className="h-3 w-3 mr-1" />
                If no screenshots are provided, placeholders will be used
              </div>
            </label>
            
            {/* Existing Screenshots */}
            {formData.screenshots.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {formData.screenshots.map((screenshot, index) => (
                  <div 
                    key={index} 
                    className="relative border border-gray-300 rounded-lg overflow-hidden"
                  >
                    <img 
                      src={screenshot} 
                      alt={`Screenshot ${index + 1}`} 
                      className="w-full h-32 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = DEFAULT_SCREENSHOT_PLACEHOLDER;
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeScreenshot(index)}
                      className="absolute top-1 right-1 p-1 bg-red-600 rounded-full text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {/* New Screenshots */}
            <div>
              <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <UploadCloud className="h-5 w-5 mr-2" />
                Upload Screenshots
                <input
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  multiple
                  onChange={handleScreenshotsChange}
                />
              </label>
              {formData.screenshotFiles.length > 0 && (
                <p className="mt-2 text-sm text-gray-500">
                  {formData.screenshotFiles.length} new screenshot(s) selected
                </p>
              )}
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  {isEditMode ? 'Update Tool' : 'Save Tool'}
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 