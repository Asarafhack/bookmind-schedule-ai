
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AuthPage from "@/components/Auth/AuthPage";
import EnhancedEmployeeDashboard from "@/components/Dashboard/EnhancedEmployeeDashboard";
import EnhancedAdminDashboard from "@/components/Dashboard/EnhancedAdminDashboard";
import LandingPage from "@/pages/LandingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) => {
  const { currentUser, userRole, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  
  if (!currentUser) return <Navigate to="/auth" replace />;
  
  if (adminOnly && userRole !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppContent = () => {
  const { currentUser, userRole, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/auth" 
          element={currentUser ? <Navigate to="/dashboard" replace /> : <AuthPage />} 
        />
        <Route 
          path="/login" 
          element={currentUser ? <Navigate to="/dashboard" replace /> : <AuthPage />} 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              {userRole === 'admin' ? <EnhancedAdminDashboard /> : <EnhancedEmployeeDashboard />}
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employee/dashboard" 
          element={
            <ProtectedRoute>
              <EnhancedEmployeeDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/panel" 
          element={
            <ProtectedRoute adminOnly>
              <EnhancedAdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
