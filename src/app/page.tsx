'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Eye, BookOpen, Code, MapPin } from 'lucide-react';
import resumeData from '@/data/resume.json';
import affiliationsData from '@/data/affiliations.json';
import ResumeModal from '@/components/ResumeModal';
import AffiliationCard from '@/components/AffiliationCard';

// Type definition for publication data
interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: string;
  type: string;
  status: string;
  award?: string;
  doi?: string;
  doi_url?: string;
  abstract: string;
  keywords: string[];
  affiliations: string[];
}

// Project image component with fallback
function ProjectImage({ projectName, className }: { projectName: string; className?: string }) {
  const [imageError, setImageError] = useState(false);
  
  // Map project names to shorter image filenames
  const getProjectImageName = (name: string): string => {
    const nameLower = name.toLowerCase();
    
    // Direct mapping for known projects
    if (nameLower.includes('hinteract')) return 'hinteract-framework';
    if (nameLower.includes('spooderman')) return 'spooderman';
    
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
        <span className="text-white text-lg font-bold">{emoji}</span>
      </div>
    );
  }

  return (
    <Image
      src={imagePath}
      alt={projectName}
      width={48}
      height={48}
      className={`object-cover ${className || ''}`}
      onError={() => setImageError(true)}
    />
  );
}

export default function HomePage() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [publicationsData, setPublicationsData] = useState<Publication[]>([]);

  // Load publications data dynamically
  useEffect(() => {
    const loadPublications = async () => {
      try {
        const { default: publications } = await import('@/data/publications.json');
        setPublicationsData(publications as Publication[]);
      } catch (error) {
        console.warn('Failed to load publications data:', error);
        // Fallback data
        setPublicationsData([
          {
            id: "icra-2025-ptas",
            title: "Implicit Behavioral Cues for Enhancing Trust and Comfort in Robot Social Navigation",
            authors: ["Yi Lian", "J. Taery Kim", "Sehoon Ha"],
            venue: "ICRA 2025 PTAS Workshop",
            year: "2025",
            type: "workshop",
            status: "accepted",
            award: "Best Presentation Award",
            abstract: "This work explores implicit behavioral cues in robot navigation systems to enhance human trust and comfort in social navigation scenarios.",
            keywords: ["Human-Robot Interaction", "Social Navigation", "Trust", "Behavioral Cues"],
            affiliations: ["Georgia Institute of Technology"]
          }
        ]);
      }
    };

    loadPublications();
  }, []);

  // Count projects and publications
  const projectCount = resumeData.projects.length;
  const publicationCount = publicationsData.length;
  const recentPublication = publicationsData.find(pub => pub.award) || publicationsData[0] || {
    id: "default",
    title: "Loading...",
    authors: [],
    venue: "",
    year: "2025",
    type: "",
    status: "",
    abstract: "Loading publication data...",
    keywords: ["Loading"],
    affiliations: []
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 gradient-bg dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-primary-300 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-secondary-300 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-accent-300 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-primary-200 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Left: Photo */}
            <motion.div
              className="flex justify-center lg:justify-start lg:pl-20"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <motion.div
                  className="w-80 h-80 rounded-full overflow-hidden shadow-2xl ring-8 ring-white/50 bg-white"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/assets/Cherry.jpg"
                    alt="Yi (Cherry) Lian"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover object-bottom"
                    priority
                  />
                </motion.div>
                {/* Decorative ring */}
                <div className="absolute -inset-4 rounded-full border-2 border-primary-300 opacity-60 animate-pulse"></div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              className="text-center lg:text-left space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1
                className="text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Welcome! I&apos;m{' '}
                <span className="text-primary-400">Cherry Lian</span>
              </motion.h1>

              <motion.p
                className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Robotics Engineer & Researcher
              </motion.p>

              <motion.p
                className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl text-center lg:text-left mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                I&apos;m passionate about building robots that move, think, and collaborate with humans.
                My work focuses on human-robot interaction (HRI), perception, and motion planning for autonomous systems.
                I&apos;m currently pursuing my M.S. in Robotics at Georgia Tech, where I&apos;m developing a robot guide dog to assist people with visual impairments.
                When I&apos;m not debugging robots, I&apos;m probably exploring a new city. Check out my map to see where I&apos;ve been!
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => setIsResumeModalOpen(true)}
                    className="btn-primary text-lg px-8 py-3 inline-flex items-center space-x-2"
                  >
                    <Eye size={20} />
                    <span>View Resume</span>
                  </button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/about"
                    className="btn-secondary text-lg px-8 py-3 inline-flex items-center space-x-2"
                  >
                    <span>Learn More</span>
                    <ArrowRight size={20} />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects & Publications Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Explore My Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover my projects and publications in robotics and machine learning.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-0">
            {/* Projects Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Link href="/projects" className="block h-full">
                <motion.div
                  className="card group cursor-pointer h-full hover:shadow-2xl transition-all duration-300"
                  whileHover={{ y: -8 }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-xl">
                        <span className="text-2xl">⚙️</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">Projects</h3>
                        <p className="text-gray-500">{projectCount} technical projects</p>
                      </div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  </div>

                  {/* Featured Project Preview */}
                  <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-lg p-6 mb-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-secondary-200 to-secondary-300 flex-shrink-0">
                        <ProjectImage 
                          projectName={resumeData.projects[0]?.name || "HINTeract Framework"} 
                          className="w-full h-full"
                        />
                      </div>
                      <h4 className="font-semibold text-gray-800">{resumeData.projects[0]?.name || "HINTeract Framework"}</h4>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      {resumeData.projects[0]?.details.join(' ') || "Interactive robot learning with hierarchical imitation learning and hint-guided feedback"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(resumeData.projects[0]?.technologies || ["Python", "PyTorch", "Robosuite"]).slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-secondary-200 text-secondary-800 text-xs font-medium rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Robotics • ML • Computer Vision</span>
                    <span className="text-primary-600 font-medium group-hover:text-primary-700">
                      Explore All Projects →
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>

            {/* Publications Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Link href="/publications" className="block h-full">
                <motion.div
                  className="card group cursor-pointer h-full hover:shadow-2xl transition-all duration-300"
                  whileHover={{ y: -8 }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl">
                        <BookOpen className="w-8 h-8 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">Publications</h3>
                        <p className="text-gray-500">{publicationCount} research papers</p>
                      </div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  </div>

                  {/* Featured Publication Preview */}
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">🏆</span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                          Best Presentation Award
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{recentPublication.year}</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {recentPublication.title}
                    </h4>
                    <div className="flex items-center mb-3">
                      <span className="text-sm text-gray-600 font-medium inline-flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {recentPublication.venue}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {recentPublication.abstract}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {recentPublication.keywords?.slice(0, 2).map((keyword: string) => (
                        <span key={keyword} className="px-2 py-1 bg-primary-200 text-primary-800 text-xs font-medium rounded-full">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">HRI • SLAM • Network ML</span>
                    <span className="text-primary-600 font-medium group-hover:text-primary-700">
                      View All Publications →
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Affiliations Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Affiliations
            </h2>
            <p className="text-lg text-gray-600">
              Institutions and organizations I&apos;ve had the privilege to work with
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {affiliationsData.map((affiliation, index) => (
              <AffiliationCard 
                key={affiliation.id} 
                affiliation={affiliation} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Resume Modal */}
      <ResumeModal 
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
} 