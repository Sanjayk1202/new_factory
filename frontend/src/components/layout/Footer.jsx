import React from 'react';
import { Clock, Heart, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">FactoryShift</h2>
                <p className="text-sm text-gray-600">Smart Attendance System</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              Streamlining factory operations since 2024
            </p>
          </div>

          {/* Middle Section */}
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                Help Center
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end space-x-2 mb-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <a href="mailto:support@factoryshift.com" className="text-sm text-gray-600">
                support@factoryshift.com
              </a>
            </div>
            <p className="text-sm text-gray-500 flex items-center justify-center md:justify-end">
              Made with <Heart className="w-3 h-3 mx-1 text-red-500" /> by FactoryShift Team
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">
            © 2024 FactoryShift Attendance & Scheduling System. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Version 2.0.0 | Last updated: January 2024
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;