
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Github, Linkedin, Code, Building2, Heart } from 'lucide-react';

const ProfessionalFooter = () => {
  return (
    <footer className="bg-white/90 backdrop-blur-sm border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">BookMind</h3>
                <p className="text-sm text-gray-600">Professional Management Platform</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Advanced management solution for modern businesses. 
              Streamline operations with intelligent features and professional design.
            </p>
            <div className="flex space-x-2">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Firebase</Badge>
              <Badge variant="secondary">Flask</Badge>
            </div>
          </div>

          {/* Developers Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Code className="h-5 w-5 text-blue-600" />
              <span>Development Team</span>
            </h3>
            
            <div className="space-y-4">
              {/* Developer 1 */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">IF</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Irfana Farhath</h4>
                    <p className="text-sm text-gray-600">Lead Developer & UI/UX Designer</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <a 
                        href="mailto:irfanafarhath@gmail.com" 
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Contact via Email"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                      <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                        <Github className="h-4 w-4" />
                      </a>
                      <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Developer 2 */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AS</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Asaraf</h4>
                    <p className="text-sm text-gray-600">Backend Developer & System Architect</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <a 
                        href="mailto:asaraf@gmail.com" 
                        className="text-purple-600 hover:text-purple-800 transition-colors"
                        title="Contact via Email"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                      <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                        <Github className="h-4 w-4" />
                      </a>
                      <a href="#" className="text-purple-600 hover:text-purple-800 transition-colors">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Core Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Smart Booking Management</li>
              <li>• Time Tracking Solutions</li>
              <li>• Incident Management System</li>
              <li>• Task Assignment Tools</li>
              <li>• Analytics Dashboard</li>
              <li>• Flexible Access Controls</li>
              <li>• Professional Interface</li>
              <li>• Real-time Updates</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600">
                © 2024 BookMind. Professional Management Platform.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Built with React, TypeScript, Firebase, and Flask
              </p>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <span>Developed with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>by Irfana Farhath & Asaraf</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ProfessionalFooter;
