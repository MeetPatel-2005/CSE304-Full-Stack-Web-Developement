import React from 'react';
import { GraduationCap, Users, BookOpen } from 'lucide-react';

/**
 * Navbar Component
 * Professional navigation bar for the Tuition Class Admin Panel
 */
const Navbar = () => {
  return (
    <nav className="glass-card sticky top-0 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">
                Tuition Class Admin Panel
              </h1>
              <p className="text-sm text-gray-600 hidden sm:block">
                Student Management System
              </p>
            </div>
          </div>

          {/* Navigation Stats */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Students</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">Courses</span>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 hidden sm:block">Online</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;