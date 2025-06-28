
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ProfessionalFooter from '@/components/Layout/ProfessionalFooter';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1 space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
                Welcome to <span className="text-blue-600">BookMind</span>
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Professional seat booking and workspace management platform
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-white/60 backdrop-blur-sm rounded-lg">
                  <h3 className="font-semibold text-gray-900">For Employees</h3>
                  <p className="text-sm text-gray-600">Book seats, report incidents</p>
                </div>
                <div className="p-4 bg-white/60 backdrop-blur-sm rounded-lg">
                  <h3 className="font-semibold text-gray-900">For Admins</h3>
                  <p className="text-sm text-gray-600">Manage bookings, analytics</p>
                </div>
              </div>
            </div>
            <ProfessionalFooter />
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="w-full max-w-md">
              {isLogin ? (
                <LoginForm onToggleMode={toggleMode} />
              ) : (
                <RegisterForm onToggleMode={toggleMode} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
