'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Building, ExternalLink } from 'lucide-react';

interface AffiliationData {
  id: string;
  name: string;
  fullName: string;
  role: string;
  period: string;
  logo: string;
  website: string;
  color: string;
  iconColor: string;
}

interface AffiliationCardProps {
  affiliation: AffiliationData;
  index: number;
}

export default function AffiliationCard({ affiliation, index }: AffiliationCardProps) {
  const [logoError, setLogoError] = useState(false);

  const handleLogoError = () => {
    setLogoError(true);
  };

  const handleClick = () => {
    if (affiliation.website !== '#') {
      window.open(affiliation.website, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      className={`flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group ${
        affiliation.website !== '#' ? 'cursor-pointer' : ''
      }`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={handleClick}
    >
      {/* Logo */}
      <div className="flex-1 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
        {!logoError ? (
          <Image
            src={affiliation.logo}
            alt={`${affiliation.name} logo`}
            width={120}
            height={120}
            className="w-24 h-24 object-contain"
            onError={handleLogoError}
          />
        ) : (
          <div className={`w-16 h-16 bg-gradient-to-br ${affiliation.color} rounded-xl flex items-center justify-center`}>
            <Building className={`w-10 h-10 ${affiliation.iconColor}`} />
          </div>
        )}
      </div>

      {/* Content */}
      <h3 className="font-semibold text-gray-800 text-center mb-1 line-clamp-2">
        {affiliation.name}
      </h3>
      <p className="text-sm text-gray-500 text-center mb-1">
        {affiliation.role}
      </p>
      <p className="text-xs text-gray-400 text-center">
        {affiliation.period}
      </p>

      {/* External link indicator */}
      {affiliation.website !== '#' && (
        <motion.div
          className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <ExternalLink className="w-4 h-4 text-gray-400" />
        </motion.div>
      )}
    </motion.div>
  );
} 