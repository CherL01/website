'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { MapPin, Calendar, Award, ExternalLink } from 'lucide-react';
import resumeData from '@/data/resume.json';

export default function AboutPage() {
  // Combine education and experience for timeline, sorted by start date
  const timelineItems = [
    ...resumeData.experience.map(item => ({ ...item, type: 'experience' as const })),
    ...resumeData.education.map(item => ({ ...item, type: 'education' as const }))
  ].sort((a, b) => {
    // Convert dates to comparable format (assuming YYYY format or "MMM YYYY")
    const getYear = (date: string) => {
      if (date === 'Present') return 2025;
      const match = date.match(/\d{4}/);
      return match ? parseInt(match[0]) : 0;
    };
    return getYear(b.start_date) - getYear(a.start_date);
  });

  // Refs and state for dynamic line heights
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lineHeights, setLineHeights] = useState<string[]>([]);

  useEffect(() => {
    const calculateLineHeights = () => {
      const heights = cardRefs.current.map((cardRef, index) => {
        if (!cardRef) return '2rem';
        
        const cardHeight = cardRef.offsetHeight;
        const isLastItem = index === timelineItems.length - 1;
        
        if (isLastItem) {
          // Last item line ends where the card ends
          return `${cardHeight - 65}px`; // Card height minus padding to align with card content bottom
        } else {
          // Calculate distance to next icon
          // Card height + full spacing between timeline items + reach toward next icon
          // space-y-12 = 48px, plus we need to account for the circle position
          return `${cardHeight}px`; // Card height + spacing + reach toward next icon
        }
      });
      setLineHeights(heights);
    };

    // Calculate on mount and when window resizes
    calculateLineHeights();
    window.addEventListener('resize', calculateLineHeights);
    
    // Also calculate after a short delay to ensure content is fully rendered
    const timer = setTimeout(calculateLineHeights, 100);

    return () => {
      window.removeEventListener('resize', calculateLineHeights);
      clearTimeout(timer);
    };
  }, [timelineItems.length]);

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
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">
            About <span className="text-gradient">Cherry</span>
          </h1>
        </motion.div>

        {/* Personal Bio */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="card text-center">
                          <p className="text-lg text-gray-700 leading-relaxed mb-6">
                I&apos;m a robotics engineer and machine learning researcher currently pursuing my Master&apos;s 
                in Robotics at Georgia Institute of Technology, where I focus on Human-Robot Interaction, 
                Perception, and AI. My work spans from developing SLAM-based navigation systems for 
                autonomous mobile robots to creating interactive learning frameworks that enhance 
                robot-human collaboration.
              </p>
                          <p className="text-lg text-gray-700 leading-relaxed">
                With experience at Huawei Canada developing ML models for network optimization and 
                current research at Georgia Tech on semantic visual-inertial SLAM systems, I&apos;m passionate 
                about bridging the gap between theoretical research and practical robotic applications.
              </p>
          </div>
        </motion.section>

        {/* Vertical Timeline */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Academic & Professional Journey
          </h2>
          
          <div className="relative">
            <div className="space-y-12">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={`${item.type}-${index}`}
                  className="relative flex items-start"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Timeline marker */}
                  <div className="flex-shrink-0 mr-8 relative">
                    {/* Timeline circle */}
                    <motion.div 
                      className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center relative z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-2xl">
                        {item.type === 'education' ? '🎓' : '💼'}
                      </div>
                    </motion.div>
                    
                    {/* Animated line segment - dynamically calculated height */}
                    <motion.div
                      className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-primary-300"
                      style={{ top: '4rem' }} // Start right at the bottom edge of the circle
                      initial={{ height: 0 }}
                      whileInView={{ 
                        height: lineHeights[index] || '2rem'
                      }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1 + 0.4,
                        ease: "easeOut"
                      }}
                      viewport={{ once: true }}
                    />
                  </div>
                  
                  {/* Content */}
                  <div 
                    ref={(el) => { cardRefs.current[index] = el; }}
                    className="flex-grow card min-h-[120px]"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {'title' in item ? item.title : item.degree}
                        </h3>
                        <div className="flex items-center text-primary-600 font-medium mb-2">
                          <MapPin size={16} className="mr-1" />
                          {'company' in item ? item.company : item.institution}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm mb-3">
                          <Calendar size={16} className="mr-1" />
                          {item.start_date} - {item.end_date}
                        </div>
                      </div>
                      {'cgpa' in item && item.cgpa && (
                        <div className="flex items-center text-primary-600 font-medium">
                          <Award size={16} className="mr-1" />
                          GPA: {item.cgpa}
                        </div>
                      )}
                    </div>
                    
                    {'responsibilities' in item ? (
                      <ul className="space-y-2">
                        {item.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="text-gray-600 text-sm leading-relaxed flex items-start">
                            <span className="text-primary-500 mr-2 mt-1.5 flex-shrink-0">•</span>
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-600">
                        {'location' in item && (
                          <div className="flex items-center text-gray-500 text-sm">
                            <MapPin size={14} className="mr-1" />
                            {item.location}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Skills Matrix */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Technical Skills
          </h2>
          
          <div className="card">
            <div className="flex flex-wrap gap-3 justify-center">
              {resumeData.technical_skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 bg-primary-100 text-primary-700 text-sm font-medium rounded-full hover:bg-primary-200 transition-colors duration-200"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Links */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Let&apos;s Connect</h3>
          <div className="flex justify-center space-x-6">
            <motion.a
              href={`mailto:${resumeData.contact.email}`}
              className="text-primary-600 hover:text-primary-700 font-medium"
              whileHover={{ scale: 1.05 }}
            >
              Email
            </motion.a>
            <motion.a
              href={resumeData.profiles.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              LinkedIn <ExternalLink size={14} className="ml-1" />
            </motion.a>
            <motion.a
              href={resumeData.profiles.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              GitHub <ExternalLink size={14} className="ml-1" />
            </motion.a>
          </div>
        </motion.section>
      </div>
    </div>
  );
} 