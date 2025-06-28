
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/10 backdrop-blur-md border-0 shadow-2xl">
          <CardContent className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <Sparkles className="h-16 w-16 text-yellow-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Workplace?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of companies already using BookMind to streamline their operations 
              and boost productivity with our intelligent management platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 font-semibold"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-4"
              >
                Schedule Demo
              </Button>
            </div>
            <p className="text-blue-200 text-sm mt-6">
              No credit card required • 30-day free trial • Setup in minutes
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTASection;
