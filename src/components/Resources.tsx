import React, { useState } from 'react';
import { 
  BookOpenIcon, 
  HeartIcon, 
  AcademicCapIcon, 
  CurrencyDollarIcon,
  ExternalLinkIcon,
  MagnifyingGlassIcon,
  TagIcon
} from '@heroicons/react/24/outline';

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'mental-health' | 'academic' | 'financial' | 'career' | 'wellness';
  tags: string[];
  featured: boolean;
}

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const resources: Resource[] = [
    {
      id: '1',
      title: 'National Suicide Prevention Lifeline',
      description: '24/7 crisis support and suicide prevention services',
      url: 'https://suicidepreventionlifeline.org',
      category: 'mental-health',
      tags: ['crisis', 'suicide-prevention', '24-7'],
      featured: true
    },
    {
      id: '2',
      title: 'Crisis Text Line',
      description: 'Text HOME to 741741 for 24/7 crisis support',
      url: 'https://www.crisistextline.org',
      category: 'mental-health',
      tags: ['crisis', 'text', '24-7'],
      featured: true
    },
    {
      id: '3',
      title: 'SAMHSA National Helpline',
      description: 'Substance abuse and mental health services',
      url: 'https://www.samhsa.gov/find-help/national-helpline',
      category: 'mental-health',
      tags: ['substance-abuse', 'mental-health', 'helpline'],
      featured: false
    },
    {
      id: '4',
      title: 'Spotify Premium Student',
      description: '50% off Spotify Premium for students',
      url: 'https://www.spotify.com/us/student/',
      category: 'financial',
      tags: ['music', 'entertainment', 'discount'],
      featured: true
    },
    {
      id: '5',
      title: 'Amazon Prime Student',
      description: '6 months free, then 50% off Amazon Prime',
      url: 'https://www.amazon.com/Amazon-Student/b?node=668781011',
      category: 'financial',
      tags: ['shopping', 'shipping', 'discount'],
      featured: true
    },
    {
      id: '6',
      title: 'Microsoft Office 365 Education',
      description: 'Free Office 365 for students and educators',
      url: 'https://www.microsoft.com/en-us/education/products/office',
      category: 'academic',
      tags: ['office', 'productivity', 'free'],
      featured: true
    },
    {
      id: '7',
      title: 'GitHub Student Developer Pack',
      description: 'Free access to developer tools and services',
      url: 'https://education.github.com/pack',
      category: 'academic',
      tags: ['development', 'tools', 'free'],
      featured: true
    },
    {
      id: '8',
      title: 'Khan Academy',
      description: 'Free online courses and educational resources',
      url: 'https://www.khanacademy.org',
      category: 'academic',
      tags: ['courses', 'learning', 'free'],
      featured: false
    },
    {
      id: '9',
      title: 'LinkedIn Learning',
      description: 'Professional development courses (often free through schools)',
      url: 'https://www.linkedin.com/learning',
      category: 'career',
      tags: ['professional', 'skills', 'career'],
      featured: false
    },
    {
      id: '10',
      title: 'Headspace for Students',
      description: 'Meditation and mindfulness app with student discount',
      url: 'https://www.headspace.com/student-plan',
      category: 'wellness',
      tags: ['meditation', 'mindfulness', 'wellness'],
      featured: false
    },
    {
      id: '11',
      title: 'Coursera Financial Aid',
      description: 'Apply for financial aid on Coursera courses',
      url: 'https://www.coursera.org/apply-for-financial-aid',
      category: 'academic',
      tags: ['courses', 'financial-aid', 'learning'],
      featured: false
    },
    {
      id: '12',
      title: 'Student Loan Forgiveness Programs',
      description: 'Information about federal student loan forgiveness',
      url: 'https://studentaid.gov/manage-loans/forgiveness-cancellation',
      category: 'financial',
      tags: ['loans', 'forgiveness', 'financial-aid'],
      featured: false
    }
  ];

  const categories = [
    { value: 'all', label: 'All Resources', icon: BookOpenIcon, color: 'bg-gray-500' },
    { value: 'mental-health', label: 'Mental Health', icon: HeartIcon, color: 'bg-red-500' },
    { value: 'academic', label: 'Academic', icon: AcademicCapIcon, color: 'bg-blue-500' },
    { value: 'financial', label: 'Financial', icon: CurrencyDollarIcon, color: 'bg-green-500' },
    { value: 'career', label: 'Career', icon: BookOpenIcon, color: 'bg-purple-500' },
    { value: 'wellness', label: 'Wellness', icon: HeartIcon, color: 'bg-pink-500' }
  ];

  const getFilteredResources = () => {
    let filtered = resources;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(c => c.value === category);
    return categoryData?.icon || BookOpenIcon;
  };

  const getCategoryColor = (category: string) => {
    const categoryData = categories.find(c => c.value === category);
    return categoryData?.color || 'bg-gray-500';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Student Resources</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Essential resources for your academic and personal well-being
        </p>
      </div>

      {/* Search and Filter */}
      <div className="card mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category.value
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Resources */}
      {selectedCategory === 'all' && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.filter(r => r.featured).map((resource) => {
              const Icon = getCategoryIcon(resource.category);
              return (
                <div key={resource.id} className="card hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg ${getCategoryColor(resource.category)}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{resource.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{resource.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <span>Visit Resource</span>
                    <ExternalLinkIcon className="w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All Resources */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {selectedCategory === 'all' ? 'All Resources' : categories.find(c => c.value === selectedCategory)?.label}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredResources().map((resource) => {
            const Icon = getCategoryIcon(resource.category);
            return (
              <div key={resource.id} className="card hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${getCategoryColor(resource.category)}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {resource.featured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs font-medium rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{resource.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{resource.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {resource.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <span>Visit Resource</span>
                  <ExternalLinkIcon className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* No Results */}
      {getFilteredResources().length === 0 && (
        <div className="text-center py-12">
          <BookOpenIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No resources found</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Try adjusting your search terms or category filter.
          </p>
        </div>
      )}

      {/* Emergency Resources Notice */}
      <div className="mt-12 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <div className="flex items-start space-x-3">
          <HeartIcon className="w-6 h-6 text-red-600 dark:text-red-400 mt-1" />
          <div>
            <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
              Need Immediate Help?
            </h3>
            <p className="text-red-700 dark:text-red-300 text-sm mb-3">
              If you're experiencing a mental health crisis or having thoughts of self-harm, please reach out for help immediately.
            </p>
            <div className="space-y-2">
              <a
                href="https://suicidepreventionlifeline.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-red-700 dark:text-red-300 hover:text-red-800 dark:hover:text-red-200 font-medium"
              >
                <span>National Suicide Prevention Lifeline: 988</span>
                <ExternalLinkIcon className="w-4 h-4" />
              </a>
              <br />
              <a
                href="https://www.crisistextline.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-red-700 dark:text-red-300 hover:text-red-800 dark:hover:text-red-200 font-medium"
              >
                <span>Crisis Text Line: Text HOME to 741741</span>
                <ExternalLinkIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
