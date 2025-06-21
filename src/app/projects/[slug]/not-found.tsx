import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="text-8xl mb-6">🤖</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Project Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, the project you're looking for doesn't exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/projects"
            className="btn-primary px-6 py-3 inline-flex items-center space-x-2"
          >
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </Link>
          <Link
            href="/"
            className="btn-secondary px-6 py-3 inline-flex items-center space-x-2"
          >
            <Search size={20} />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 