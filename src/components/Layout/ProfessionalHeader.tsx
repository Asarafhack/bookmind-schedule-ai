
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LogOut, 
  User, 
  Settings, 
  Bell,
  Menu,
  Clock,
  MapPin,
  Building2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ProfessionalHeaderProps {
  title: string;
  subtitle?: string;
  userRole?: string;
}

const ProfessionalHeader: React.FC<ProfessionalHeaderProps> = ({ title, subtitle, userRole }) => {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and title */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-900">BookMind</h1>
              <p className="text-sm text-gray-600">{title}</p>
            </div>
          </div>

          {/* Center - Time and Date */}
          <div className="hidden lg:flex items-center space-x-6 text-sm text-gray-600 bg-gray-50 rounded-lg px-4 py-2">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="font-medium">{getCurrentTime()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-green-600" />
              <span>IST</span>
            </div>
          </div>

          {/* Right side - User menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative hover:bg-blue-50">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                3
              </span>
            </Button>

            {/* User Role Badge */}
            {userRole && (
              <Badge variant={userRole === 'admin' ? 'default' : 'secondary'} className="hidden sm:inline-flex font-semibold">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </Badge>
            )}

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <User className="h-5 w-5 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-sm border shadow-xl" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none text-gray-900">
                      {currentUser?.displayName || 'User'}
                    </p>
                    <p className="text-xs leading-none text-gray-600">
                      {currentUser?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-blue-50">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="hover:bg-red-50 text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile title */}
        <div className="md:hidden pb-3">
          <h1 className="text-lg font-bold text-gray-900">BookMind</h1>
          <p className="text-sm text-gray-600">{title}</p>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
            <span>{getCurrentDate()}</span>
            <span>{getCurrentTime()} IST</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProfessionalHeader;
