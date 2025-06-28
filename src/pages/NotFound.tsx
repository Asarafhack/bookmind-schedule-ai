
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, AlertCircle } from "lucide-react";
import ProfessionalFooter from "@/components/Layout/ProfessionalFooter";
import { authBackgrounds, getRandomBackground } from "@/data/backgrounds";

const NotFound = () => {
  const location = useLocation();
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    setBackgroundImage(getRandomBackground(authBackgrounds));
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${backgroundImage})`
      }}
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-4xl font-bold text-gray-900 mb-2">404</CardTitle>
              <p className="text-xl text-gray-600">Oops! Page not found</p>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-500 mb-6">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <a href="/" className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Return to Home</span>
                </a>
              </Button>
            </CardContent>
          </Card>
          
          <div>
            <ProfessionalFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
