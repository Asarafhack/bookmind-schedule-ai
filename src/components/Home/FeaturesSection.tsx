
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Calendar, AlertTriangle, BarChart3, Users, Shield } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Regional Booking',
      description: 'Book seats across Delhi, Chennai, Coimbatore, and Bangalore with unique booking codes.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Advanced seat scheduling with real-time availability and booking management.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: AlertTriangle,
      title: 'Incident Tracking',
      description: 'Quick incident reporting with predefined cheat codes for common workplace issues.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics for seat utilization, booking patterns, and regional insights.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Role Management',
      description: 'Separate dashboards for employees and administrators with appropriate permissions.',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'Firebase-powered authentication with role-based access control and security.',
      gradient: 'from-gray-500 to-slate-500'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Workspace
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to manage seat bookings, track incidents, and optimize workspace utilization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
