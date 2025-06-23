'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink, Award, Users, MapPin, Search, X } from 'lucide-react';
import Link from 'next/link';
import publicationsData from '@/data/publications.json';

export default function PublicationsPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');

  // Get unique years, types, and tags for filtering
  const years = [...new Set(publicationsData.map(pub => pub.year))].sort((a, b) => b.localeCompare(a));
  const types = [...new Set(publicationsData.map(pub => pub.type))];
  const tags = [...new Set(publicationsData.flatMap(pub => pub.keywords))].sort();

  // Filter publications
  const filteredPublications = publicationsData.filter(pub => {
    const matchesSearch = !searchTerm || 
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pub.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pub.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = !selectedYear || pub.year === selectedYear;
    const matchesType = !selectedType || pub.type === selectedType;
    const matchesTag = !selectedTag || pub.keywords.includes(selectedTag);
    return matchesSearch && matchesYear && matchesType && matchesTag;
  }).sort((a, b) => b.year.localeCompare(a.year));

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'journal': return 'bg-blue-100 text-blue-700';
      case 'conference': return 'bg-green-100 text-green-700';
      case 'workshop': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'accepted': return 'bg-blue-100 text-blue-700';
      case 'submitted': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            <span className="text-gradient">Publications</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Research contributions in machine learning, robotics, and network optimization 
            from my work at Georgia Tech and Huawei Canada.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="card">
            <div className="flex flex-col gap-4">
              {/* Search Input */}
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search publications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all duration-200 text-black"
                />
              </div>

                            {/* Filters Row */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all duration-200 text-black"
                  >
                    <option value="">All Years</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all duration-200 text-black"
                  >
                    <option value="">All Types</option>
                    {types.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Tag</label>
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all duration-200 text-black"
                  >
                    <option value="">All Tags</option>
                    {tags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedYear('');
                      setSelectedType('');
                      setSelectedTag('');
                    }}
                    disabled={!searchTerm && !selectedYear && !selectedType && !selectedTag}
                    className={`px-4 py-2 transition-colors duration-200 ${
                      searchTerm || selectedYear || selectedType || selectedTag
                        ? 'text-gray-500 hover:text-gray-700 cursor-pointer'
                        : 'text-gray-300'
                    }`}
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Active Filters Display */}
              {(searchTerm || selectedYear || selectedType || selectedTag) && (
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full flex items-center gap-2">
                      <span className="font-bold">Search:</span> &ldquo;{searchTerm}&rdquo;
                      <button
                        onClick={() => setSearchTerm('')}
                        className="hover:bg-primary-200 rounded-full p-0.5 transition-colors duration-200"
                        aria-label="Clear search"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {selectedYear && (
                    <span className="px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-full flex items-center gap-2">
                      <span className="font-bold">Year:</span> {selectedYear}
                      <button
                        onClick={() => setSelectedYear('')}
                        className="hover:bg-secondary-200 rounded-full p-0.5 transition-colors duration-200"
                        aria-label="Clear year filter"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {selectedType && (
                    <span className="px-3 py-1 bg-accent-100 text-accent-700 text-sm rounded-full flex items-center gap-2">
                      <span className="font-bold">Type:</span> {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
                      <button
                        onClick={() => setSelectedType('')}
                        className="hover:bg-accent-200 rounded-full p-0.5 transition-colors duration-200"
                        aria-label="Clear type filter"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {selectedTag && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full flex items-center gap-2">
                      <span className="font-bold">Tag:</span> {selectedTag}
                      <button
                        onClick={() => setSelectedTag('')}
                        className="hover:bg-gray-200 rounded-full p-0.5 transition-colors duration-200"
                        aria-label="Clear tag filter"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Publications List */}
        <div className="space-y-6">
          {filteredPublications.map((publication, index) => (
            <motion.div
              key={publication.id}
              className="card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(publication.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Publication Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  {/* Year Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
                      {publication.year}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(publication.type)}`}>
                      {publication.type}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(publication.status)}`}>
                      {publication.status}
                    </span>
                    {publication.award && (
                      <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                        <Award size={12} className="mr-1" />
                        {publication.award}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
                    {publication.title}
                  </h3>

                  {/* Authors */}
                  <p className="text-gray-600 mb-2">
                    <span className="inline-flex items-center mr-2">
                      <Users size={14} className="mr-1" />
                      {publication.authors.map((author, idx) => (
                        <span key={idx} className={author === 'Yi Lian' ? 'font-semibold' : ''}>
                          {author}{idx < publication.authors.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </span>
                  </p>

                  {/* Venue */}
                  <p className="text-gray-600 mb-3">
                    <span className="inline-flex items-center">
                      <MapPin size={14} className="mr-1" />
                      <span className="font-medium">{publication.venue}</span>
                    </span>
                  </p>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {publication.keywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-start space-x-2 ml-4">
                  {publication.doi_url && (
                    <motion.a
                      href={publication.doi_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="View DOI"
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Dropdown Arrow */}
              <div className="flex justify-center py-2">
                <div className="text-primary-600 transition-all duration-200">
                  {hoveredId === publication.id ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
              </div>

              {/* Expandable Abstract */}
              <AnimatePresence>
                {hoveredId === publication.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Abstract</h4>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {publication.abstract}
                      </p>
                      
                      {publication.affiliations && (
                        <div className="mt-3">
                          <h5 className="text-xs font-semibold text-gray-600 mb-1">Affiliations</h5>
                          <p className="text-xs text-gray-500">
                            {publication.affiliations.join(', ')}
                          </p>
                        </div>
                      )}

                      {publication.doi && (
                        <div className="mt-3">
                          <h5 className="text-xs font-semibold text-gray-600 mb-1">DOI</h5>
                          <p className="text-xs text-gray-500 font-mono">
                            {publication.doi}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredPublications.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No publications found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters to see more publications.
            </p>
            <button
              onClick={() => {
                setSelectedYear('');
                setSelectedType('');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Summary Stats */}
        {filteredPublications.length > 0 && (
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="card">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {publicationsData.length}
                  </div>
                  <div className="text-gray-600">Total Publications</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary-600 mb-2">
                    {years.length}
                  </div>
                  <div className="text-gray-600">Years Active</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-600 mb-2">
                    {publicationsData.filter(p => p.award).length}
                  </div>
                  <div className="text-gray-600">Award Winners</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        {filteredPublications.length > 0 && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-600 mb-6">
              Interested in learning more about my background and experience?
            </p>
            <Link
              href="/about"
              className="btn-primary text-lg px-8 py-3 inline-flex items-center space-x-2"
            >
              <span>Learn More About Me</span>
              <ExternalLink size={20} />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
} 