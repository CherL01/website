'use client';

import { motion } from 'framer-motion';
import { Mail, ExternalLink, Github, Linkedin, Download, MessageCircle } from 'lucide-react';
import resumeData from '@/data/resume.json';

export default function ContactPage() {
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
            Get In <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interested in collaborating on robotics projects, discussing research opportunities, 
            or just want to connect? I'd love to hear from you!
          </p>
        </motion.div>

        {/* Main Contact Card */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="card text-center">
            <div className="mb-8">
              <motion.div
                className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Mail size={32} className="text-primary-600" />
              </motion.div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Let's Start a Conversation
              </h2>
              
              <p className="text-lg text-gray-600 mb-6">
                Email me at{' '}
                <motion.a
                  href={`mailto:${resumeData.contact.email}`}
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {resumeData.contact.email}
                </motion.a>
              </p>

              <motion.a
                href={`mailto:${resumeData.contact.email}?subject=Hello Cherry - Let's Connect!&body=Hi Cherry,%0D%0A%0D%0AI'd love to connect with you about...`}
                className="btn-primary text-lg px-8 py-3 inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle size={20} />
                <span>Send Email</span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Connect on Social Media
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* LinkedIn */}
            <motion.a
              href={resumeData.profiles.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="card hover:shadow-xl transition-shadow duration-300 text-center group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                  <Linkedin size={24} className="text-blue-600" />
                </div>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">LinkedIn</h4>
              <p className="text-sm text-gray-600 mb-3">Professional network and updates</p>
              <div className="flex items-center justify-center text-primary-600 text-sm">
                <span>Connect</span>
                <ExternalLink size={14} className="ml-1" />
              </div>
            </motion.a>

            {/* GitHub */}
            <motion.a
              href={resumeData.profiles.github}
              target="_blank"
              rel="noopener noreferrer"
              className="card hover:shadow-xl transition-shadow duration-300 text-center group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-200">
                  <Github size={24} className="text-gray-700" />
                </div>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">GitHub</h4>
              <p className="text-sm text-gray-600 mb-3">Code repositories and projects</p>
              <div className="flex items-center justify-center text-primary-600 text-sm">
                <span>View Code</span>
                <ExternalLink size={14} className="ml-1" />
              </div>
            </motion.a>

            {/* Portfolio */}
            <motion.a
              href={resumeData.profiles.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="card hover:shadow-xl transition-shadow duration-300 text-center group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center group-hover:bg-secondary-200 transition-colors duration-200">
                  <ExternalLink size={24} className="text-secondary-600" />
                </div>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Portfolio</h4>
              <p className="text-sm text-gray-600 mb-3">Engineering project showcase</p>
              <div className="flex items-center justify-center text-primary-600 text-sm">
                <span>Explore</span>
                <ExternalLink size={14} className="ml-1" />
              </div>
            </motion.a>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Quick Actions
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/assets/Yi_Lian_Resume.pdf"
                download
                className="btn-secondary px-6 py-3 inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={18} />
                <span>Download Resume</span>
              </motion.a>

              <motion.a
                href="/about"
                className="btn-primary px-6 py-3 inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Learn About Me</span>
                <ExternalLink size={18} />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Response Time Note */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-sm text-gray-500">
            I typically respond to emails within 24-48 hours. 
            Looking forward to connecting with you! 🤖
          </p>
        </motion.div>
      </div>
    </div>
  );
} 