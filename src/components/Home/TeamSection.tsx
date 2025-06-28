
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Github, Linkedin } from 'lucide-react';

const teamMembers = [
  {
    name: 'Irfana Farhath',
    role: 'Lead Developer & UI/UX Designer',
    initials: 'IF',
    color: 'from-blue-500 to-indigo-500',
    email: 'irfanafarhath@gmail.com',
    description: 'Full-stack developer specializing in modern web technologies and user experience design.'
  },
  {
    name: 'Asaraf',
    role: 'Backend Developer & System Architect',
    initials: 'AS',
    color: 'from-purple-500 to-pink-500',
    email: 'asaraf@gmail.com',
    description: 'Backend specialist focused on scalable architecture and system optimization.'
  }
];

const TeamSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate developers dedicated to creating exceptional management solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className={`w-24 h-24 bg-gradient-to-r ${member.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <span className="text-white font-bold text-2xl">{member.initials}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{member.description}</p>
                <div className="flex justify-center space-x-4">
                  <a 
                    href={`mailto:${member.email}`} 
                    className="text-gray-600 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-full"
                    title="Contact via Email"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="text-gray-600 hover:text-gray-800 transition-colors p-2 hover:bg-gray-50 rounded-full"
                    title="GitHub Profile"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="text-gray-600 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-full"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
