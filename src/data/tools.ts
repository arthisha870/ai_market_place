import { Tool } from '../types';

export const tools: Tool[] = [
  {
    id: '1',
    name: 'ContentGenius AI',
    description: 'Advanced AI content generation platform for bloggers and marketers',
    logo: 'https://images.unsplash.com/photo-1664575198308-3959904fa430?w=100&h=100&fit=crop',
    category: 'content',
    pricing: 'freemium',
    rating: 4.8,
    features: [
      'Blog post generation',
      'Social media content',
      'SEO optimization',
      'Content repurposing'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1674027444485-cec3da58eef0?w=800',
      'https://images.unsplash.com/photo-1675467139899-06488d4362f7?w=800'
    ],
    officialUrl: 'https://example.com/contentgenius',
    reviews: [
      {
        id: 'r1',
        userName: 'Sarah Johnson',
        rating: 5,
        comment: 'Game-changing tool for content creation!',
        date: '2024-03-10'
      }
    ]
  },
  {
    id: '2',
    name: 'DataMind Analytics',
    description: 'AI-powered data analysis and visualization platform',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    category: 'data',
    pricing: 'paid',
    rating: 4.7,
    features: [
      'Automated data analysis',
      'Custom dashboards',
      'Predictive analytics',
      'Report generation'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      'https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800'
    ],
    officialUrl: 'https://example.com/datamind',
    reviews: [
      {
        id: 'r2',
        userName: 'Mike Chen',
        rating: 4.5,
        comment: 'Powerful analytics capabilities!',
        date: '2024-03-09'
      }
    ]
  }
];

export const categories = [
  'content',
  'productivity',
  'data',
  'marketing',
  'design',
  'development'
];