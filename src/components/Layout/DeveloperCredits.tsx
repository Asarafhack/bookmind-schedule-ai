
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Github, Linkedin, Code } from 'lucide-react';

const DeveloperCredits = () => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Developed By</h3>
          <div className="flex justify-center space-x-2 mb-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Code className="h-3 w-3 mr-1" />
              Full Stack Development
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Developer 1 */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">IF</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Irfana Farhath</h4>
              <p className="text-sm text-gray-600 mb-3">Lead Developer</p>
              <div className="flex justify-center space-x-2">
                <a 
                  href="mailto:irfanafarhath@gmail.com" 
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  title="Contact via Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                  title="GitHub Profile"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a 
                  href="#" 
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Developer 2 */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">AS</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Asaraf</h4>
              <p className="text-sm text-gray-600 mb-3">Partner Developer</p>
              <div className="flex justify-center space-x-2">
                <a 
                  href="mailto:asaraf@gmail.com" 
                  className="text-purple-600 hover:text-purple-800 transition-colors"
                  title="Contact via Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                  title="GitHub Profile"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a 
                  href="#" 
                  className="text-purple-600 hover:text-purple-800 transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            © 2024 BookMind AI. Built with React, TypeScript, and Firebase.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Professional Corporate Management System
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeveloperCredits;
