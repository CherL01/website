'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Filter, Github, ExternalLink, Calendar, X } from 'lucide-react';
import resumeData from '@/data/resume.json';

// Project image component with fallback - same as home page
function ProjectImage({ projectName, className }: { projectName: string; className?: string }) {
  const [imageError, setImageError] = useState(false);
  
  // Map project names to shorter image filenames
  const getProjectImageName = (name: string): string => {
    const nameLower = name.toLowerCase();
    
    // Direct mapping for known projects
    if (nameLower.includes('hinteract')) return 'hinteract-framework';
    if (nameLower.includes('spooderman')) return 'spooderman';
    if (nameLower.includes('pharmore')) return 'pharmore';
    
    // For unknown projects, use first word only
    const firstWord = name.split(/[,\s]+/)[0].toLowerCase().replace(/[^a-z0-9]/g, '');
    return firstWord;
  };

  // Project-specific emoji mapping
  const getProjectEmoji = (name: string) => {
    if (name.toLowerCase().includes('hinteract')) return '🤖';
    if (name.toLowerCase().includes('spooderman') || name.toLowerCase().includes('spider')) return '🕷️';
    if (name.toLowerCase().includes('pharmore')) return '💊';
    if (name.toLowerCase().includes('oogway')) return '🐢';
    if (name.toLowerCase().includes('kir-b')) return '🚗';
    if (name.toLowerCase().includes('drowsiness') || name.toLowerCase().includes('driver')) return '👁️';
    return '🔧'; // Default for other projects
  };

  const imageFileName = getProjectImageName(projectName);
  const imagePath = `/assets/projects/${imageFileName}.jpg`;
  const emoji = getProjectEmoji(projectName);

  if (imageError) {
    // Fallback to styled emoji placeholder
    return (
      <div className={`bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center ${className || ''}`}>
        <span className="text-white text-6xl opacity-60">{emoji}</span>
      </div>
    );
  }

  return (
    <Image
      src={imagePath}
      alt={projectName}
      fill
      className={`object-cover ${className || ''}`}
      onError={() => setImageError(true)}
    />
  );
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState('');

  // Extract all unique technologies from projects
  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();
    resumeData.projects.forEach(project => {
      project.technologies.forEach(tech => techs.add(tech));
    });
    return Array.from(techs).sort();
  }, []);

  // Filter projects based on search term and selected technology
  const filteredProjects = useMemo(() => {
    return resumeData.projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.details.some(detail => detail.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesTech = !selectedTech || project.technologies.includes(selectedTech);
      return matchesSearch && matchesTech;
    });
  }, [searchTerm, selectedTech]);

  // Generate slug from project name
  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            My <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore my work in robotics and machine learning, from interactive learning frameworks 
            to autonomous navigation systems.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="card">
            <div className="flex flex-col gap-4">
              {/* Filters Row */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                {/* Technology Filter */}
                <div className="relative">
                  <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={selectedTech}
                    onChange={(e) => setSelectedTech(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 min-w-[200px] text-gray-900 dark:text-gray-100"
                  >
                    <option value="">All Technologies</option>
                    {allTechnologies.map(tech => (
                      <option key={tech} value={tech}>{tech}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedTech('');
                    }}
                    disabled={!searchTerm && !selectedTech}
                    className={`px-4 py-2 transition-colors duration-200 ${
                      searchTerm || selectedTech
                        ? 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Active Filters Display */}
              {(searchTerm || selectedTech) && (
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
                  {selectedTech && (
                    <span className="px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-full flex items-center gap-2">
                      <span className="font-bold">Tech:</span> {selectedTech}
                      <button
                        onClick={() => setSelectedTech('')}
                        className="hover:bg-secondary-200 rounded-full p-0.5 transition-colors duration-200"
                        aria-label="Clear technology filter"
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Link href={`/projects/${generateSlug(project.name)}`}>
                <motion.div
                  className="card group cursor-pointer h-full"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Project Image */}
                  <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg mb-6 relative overflow-hidden">
                    <ProjectImage 
                      projectName={project.name}
                      className="w-full h-full"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>

                  {/* Project Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                      {project.name}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                      {project.details.join(' ')}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-accent-100 text-accent-700 text-sm font-medium rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Project Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <Calendar size={16} className="mr-1" />
                        {project.start_date} - {project.end_date}
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <motion.div
                          className="text-primary-600 hover:text-primary-700 p-2"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github size={20} />
                        </motion.div>
                        <motion.div
                          className="text-primary-600 hover:text-primary-700 p-2"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink size={20} />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">No projects found</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Try adjusting your search terms or filters to find what you&apos;re looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedTech('');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Call to Action */}
        {filteredProjects.length > 0 && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
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