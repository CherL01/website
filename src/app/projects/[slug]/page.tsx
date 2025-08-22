'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Github, ExternalLink, Calendar, Tag, Award, Play } from 'lucide-react';
import resumeData from '@/data/resume.json';

// Project image component for hero banner
function ProjectHeroImage({ projectName }: { projectName: string }) {
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
    // Fallback to emoji
    return (
      <div className="text-9xl opacity-40">
        {emoji}
      </div>
    );
  }

  return (
    <div className="relative w-96 h-96 opacity-40">
      <Image
        src={imagePath}
        alt={projectName}
        fill
        className="object-cover rounded-lg"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

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
    'pharmore-data-mining-for-drug-discovery': {
      fullDescription: 'PHARMore is a comprehensive research support tool for drug repurposing that combines automated information extraction, intelligent recommendation systems, and conversational AI assistance. Built for Hacklytics 2025, this system streamlines literature analysis and hypothesis generation using advanced NLP techniques, biomedical databases, and an AI-powered chatbot interface.',
      keyFeatures: [
        'Automated literature analysis from biomedical databases',
        'AI-powered drug repurposing recommendations',
        'Interactive chatbot interface using Gemini AI',
        'Streamlit web application for user-friendly interaction',
        'Integration with AWS cloud services for scalability',
        'Real-time hypothesis generation and validation'
      ],
      challenges: [
        'Processing large volumes of biomedical literature efficiently',
        'Ensuring accuracy in drug-target interaction predictions',
        'Balancing automation with expert domain knowledge requirements'
      ],
      results: [
        'Successfully implemented for Hacklytics 2025 hackathon',
        'Streamlined drug discovery research workflow',
        'Provided intelligent recommendations for drug repurposing'
      ],
      githubUrl: 'https://github.com/CherL01/PHARMore',
      demoUrl: 'https://pharmore.streamlit.app/',
      paperUrl: null
    },
    'hinteract-interactive-robot-learning-framework': {
      fullDescription: 'HINTeract is a hierarchical imitation learning framework that improves sample efficiency in robotic manipulation by combining human demonstrations with interactive, hint-guided feedback. Designed for table assembly tasks in Robosuite, it enables more stable and efficient policy learning through modular subtask decomposition.',
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
      demoUrl: null,
      paperUrl: null
    },
    'spooderman-autonomous-robot-follower': {
      fullDescription: 'SpooderMan is an autonomous robot follower system developed on TurtleBot3, combining SIFT-based visual tracking, semantic scene understanding, and SLAM-enabled navigation. Designed for complex indoor environments, it showcases robust person-following and directional awareness through real-time image processing and adaptive path planning.',
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
      demoUrl: null,
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
          <ProjectHeroImage projectName={project.name} />
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
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center text-gray-700 dark:text-gray-300 font-medium">
                        <Github size={20} className="mr-3" />
                        View Code
                      </span>
                      <ExternalLink size={16} className="text-gray-400" />
                    </motion.a>
                  )}
                  
                  {details?.demoUrl && (
                    <motion.a
                      href={details.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center text-blue-700 dark:text-blue-300 font-medium">
                        <Play size={20} className="mr-3" />
                        Live Demo
                      </span>
                      <ExternalLink size={16} className="text-blue-400" />
                    </motion.a>
                  )}
                  
                  {details?.paperUrl && (
                    <motion.a
                      href={details.paperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center text-gray-700 dark:text-gray-300 font-medium">
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

        {/* Screenshots Gallery Placeholder - Hidden for PHARMore */}
        {!project.name.includes('PHARMore') && (
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.name.includes('HINTeract') ? (
                // HINTeract gallery with actual images
                [1, 2, 3, 4].map((index) => (
                  <motion.div
                    key={index}
                    className="h-64 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600 relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={`/assets/projects/hinteract-gallery/screenshot-${index}.jpg`}
                      alt={`HINTeract Screenshot ${index}`}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="flex items-center justify-center h-full">
                              <div class="text-center text-gray-400 dark:text-gray-500">
                                <div class="text-4xl mb-2">📸</div>
                                <p class="text-sm">Screenshot ${index}</p>
                                <p class="text-xs">(Coming Soon)</p>
                              </div>
                            </div>
                          `;
                        }
                      }}
                    />
                  </motion.div>
                ))
              ) : project.name.includes('SpooderMan') ? (
                // SpooderMan gallery with videos and images
                [
                  { type: 'video', src: '/assets/projects/spooderman-gallery/demo.mp4', title: 'Robot Following Demo' },
                  { type: 'video', src: '/assets/projects/spooderman-gallery/point_nav.mp4', title: 'Point Navigation with Obstacle Avoidance' },
                  { type: 'image', src: '/assets/projects/spooderman-gallery/screenshot-1.jpg', title: 'Maze Testing' },
                  // { type: 'video', src: '/assets/projects/spooderman-gallery/maze-navigation.mp4', title: 'Maze Navigation' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="h-64 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600 relative group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.type === 'video' ? (
                      <video
                        src={item.src}
                        className="w-full h-full object-cover"
                        controls
                        preload="metadata"
                        poster={`/assets/projects/spooderman-gallery/poster-${index + 1}.jpg`}
                        onError={(e) => {
                          // Fallback to placeholder if video fails to load
                          const target = e.target as HTMLVideoElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="flex items-center justify-center h-full">
                                <div class="text-center text-gray-400 dark:text-gray-500">
                                  <div class="text-4xl mb-2">🎥</div>
                                  <p class="text-sm">${item.title}</p>
                                  <p class="text-xs">(Video Coming Soon)</p>
                                </div>
                              </div>
                            `;
                          }
                        }}
                      />
                    ) : (
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="flex items-center justify-center h-full">
                                <div class="text-center text-gray-400 dark:text-gray-500">
                                  <div class="text-4xl mb-2">📸</div>
                                  <p class="text-sm">${item.title}</p>
                                  <p class="text-xs">(Coming Soon)</p>
                                </div>
                              </div>
                            `;
                          }
                        }}
                      />
                    )}
                    {/* Overlay with title */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <p className="text-white text-sm font-medium">{item.title}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                // Placeholder gallery for other projects
                [1, 2, 3, 4].map((index) => (
                  <motion.div
                    key={index}
                    className="h-64 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-600"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-center text-gray-400 dark:text-gray-500">
                      <div className="text-4xl mb-2">📸</div>
                      <p className="text-sm">Screenshot {index}</p>
                      <p className="text-xs">(Coming Soon)</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.section>
        )}

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