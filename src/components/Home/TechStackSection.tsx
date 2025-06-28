
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const technologies = [
  { name: 'React', category: 'Frontend', color: 'bg-blue-100 text-blue-800' },
  { name: 'TypeScript', category: 'Language', color: 'bg-blue-100 text-blue-800' },
  { name: 'Firebase', category: 'Backend', color: 'bg-orange-100 text-orange-800' },
  { name: 'Flask', category: 'API', color: 'bg-green-100 text-green-800' },
  { name: 'Tailwind CSS', category: 'Styling', color: 'bg-cyan-100 text-cyan-800' },
  { name: 'Shadcn/ui', category: 'Components', color: 'bg-purple-100 text-purple-800' }
];

const TechStackSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Built with Modern Technology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powered by industry-leading technologies for performance, scalability, and reliability.
          </p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {technologies.map((tech, index) => (
                <div key={index} className="text-center group">
                  <Badge 
                    className={`${tech.color} text-sm font-semibold px-4 py-2 group-hover:scale-105 transition-transform duration-200`}
                  >
                    {tech.name}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-2">{tech.category}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                <span className="font-semibold">Frontend:</span> React + TypeScript for robust user interfaces
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Backend:</span> Firebase + Flask for scalable data management
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TechStackSection;
