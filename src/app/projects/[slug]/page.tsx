'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Github, ExternalLink, Calendar, Tag, Award } from 'lucide-react';
import resumeData from '@/data/resume.json';

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    params.then(({ slug }) => setSlug(slug));
  }, [params]);
  // Generate slug from project name to match with URL
  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  // Show loading state while slug is being resolved
  if (!slug) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🤖</div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  // Find the project by slug
  const project = resumeData.projects.find(p => generateSlug(p.name) === slug);

  if (!project) {
    notFound();
  }

  // Mock additional project data for demo (in real app, this would come from a more detailed data source)
  const projectDetails = {
    'hinteract-interactive-robot-learning-framework': {
      fullDescription: 'HINTeract represents a breakthrough in interactive robot learning, combining hierarchical imitation learning with hint-guided feedback mechanisms. This framework addresses the critical challenge of sample efficiency in robot learning by leveraging human demonstrations and interactive feedback to guide policy optimization.',
      keyFeatures: [
        'Hierarchical Imitation Learning with 260+ demonstrations',
        'Hint-guided feedback system for improved sample efficiency',
        'Subtask-level table assembly in Robosuite simulation',
        'Real-time policy adaptation based on human input',
        'Robust handling of complex manipulation tasks'
      ],
      challenges: [
        'Balancing exploration vs exploitation in hint-guided learning',
        'Ensuring stable policy convergence with hierarchical structure',
        'Optimizing demonstration collection for maximum learning efficiency'
      ],
      results: [
        'Achieved 85% success rate in table assembly tasks',
        'Reduced required demonstrations by 40% compared to standard BC',
        'Improved task rollout stability through hierarchical decomposition'
      ],
      githubUrl: 'https://github.com/CherL01/HINTeract',
      paperUrl: null
    },
    'spooderman-autonomous-robot-follower': {
      fullDescription: 'SpooderMan is an autonomous robot follower system built on TurtleBot3, combining advanced computer vision with sophisticated navigation algorithms. The system demonstrates robust person-following capabilities in complex indoor environments using SIFT-based feature extraction and dynamic path planning.',
      keyFeatures: [
        'SIFT-based feature extraction for robust person detection',
        'Advanced image segmentation using OpenCV',
        'Custom ROS2 packages for modular system architecture',
        'SLAM framework integration for global localization',
        'Dynamic window-based controller for smooth navigation'
      ],
      challenges: [
        'Maintaining person tracking in crowded environments',
        'Balancing following distance for optimal performance',
        'Handling dynamic obstacles during maze traversal'
      ],
      results: [
        'Successful maze traversal with 92% navigation accuracy',
        'Real-time person following at various distances',
        'KNN-based directional sign classification with 95% accuracy'
      ],
      githubUrl: 'https://github.com/CherL01/SpooderMan',
      paperUrl: null
    }
  };

  const details = projectDetails[slug as keyof typeof projectDetails];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Projects
          </Link>
        </motion.div>
      </div>

      {/* Hero Banner */}
      <motion.section
        className="relative h-96 bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100 mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-9xl opacity-40">
            {project.name.includes('HINTeract') ? '🤖' : 
             project.name.includes('SpooderMan') ? '🕷️' :
             project.name.includes('PHARMore') ? '💊' :
             project.name.includes('Oogway') ? '🐢' :
             project.name.includes('Kir-B') ? '🚗' :
             project.name.includes('Drowsiness') || project.name.includes('Driver') ? '👁️' : 
             '🔧'}
          </div>
        </div>
        
        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                {project.name}
              </h1>
              <div className="flex items-center text-white/90 text-lg">
                <Calendar size={20} className="mr-2" />
                {project.start_date} - {project.end_date}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Project Overview */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Description */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Overview</h2>
              <div className="card">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {details?.fullDescription || project.details.join(' ')}
                </p>
                
                {/* Original Details */}
                <div className="space-y-4">
                  {project.details.map((detail, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-primary-500 mr-3 mt-1.5 flex-shrink-0">•</span>
                      <p className="text-gray-600">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Meta & Links */}
            <div className="space-y-6">
              {/* Technologies */}
              <div className="card">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Tag size={20} className="mr-2" />
                  Technologies
                </h3>
                <div className="space-y-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="block px-3 py-2 bg-accent-100 text-accent-700 text-sm font-medium rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              <div className="card">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Links</h3>
                <div className="space-y-3">
                  {details?.githubUrl && (
                    <motion.a
                      href={details.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center text-gray-700 font-medium">
                        <Github size={20} className="mr-3" />
                        View Code
                      </span>
                      <ExternalLink size={16} className="text-gray-400" />
                    </motion.a>
                  )}
                  
                  {details?.paperUrl && (
                    <motion.a
                      href={details.paperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center text-gray-700 font-medium">
                        <Award size={20} className="mr-3" />
                        Research Paper
                      </span>
                      <ExternalLink size={16} className="text-gray-400" />
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Key Features */}
        {details?.keyFeatures && (
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {details.keyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start">
                    <span className="text-primary-500 mr-3 mt-1 flex-shrink-0">✓</span>
                    <p className="text-gray-700">{feature}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Screenshots Gallery Placeholder */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                className="h-64 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">📸</div>
                  <p className="text-sm">Screenshot {index}</p>
                  <p className="text-xs">(Coming Soon)</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Results & Challenges */}
        {(details?.results || details?.challenges) && (
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {details?.results && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Results & Impact</h3>
                  <div className="card">
                    <div className="space-y-4">
                      {details.results.map((result, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-green-500 mr-3 mt-1 flex-shrink-0">📊</span>
                          <p className="text-gray-700">{result}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {details?.challenges && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Technical Challenges</h3>
                  <div className="card">
                    <div className="space-y-4">
                      {details.challenges.map((challenge, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-orange-500 mr-3 mt-1 flex-shrink-0">⚡</span>
                          <p className="text-gray-700">{challenge}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.section>
        )}

        {/* Navigation */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="btn-secondary px-8 py-3 inline-flex items-center space-x-2"
            >
              <ArrowLeft size={20} />
              <span>Back to Projects</span>
            </Link>
            <Link
              href="/about"
              className="btn-primary px-8 py-3 inline-flex items-center space-x-2"
            >
              <span>Learn More About Me</span>
              <ExternalLink size={20} />
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
} 