
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Lazy load components for better performance
const Index = lazy(() => import("@/pages/Index"));
const Auth = lazy(() => import("@/pages/Auth"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const StudioSetup = lazy(() => import("@/pages/StudioSetup"));
const ViewStudio = lazy(() => import("@/pages/ViewStudio"));
const StudentsManagement = lazy(() => import("@/pages/StudentsManagement"));
const ClassSchedule = lazy(() => import("@/pages/ClassSchedule"));
const Analytics = lazy(() => import("@/pages/Analytics"));
const Studio = lazy(() => import("@/pages/Studio"));
const StudentDashboard = lazy(() => import("@/pages/StudentDashboard"));
const PaymentSuccess = lazy(() => import("@/pages/PaymentSuccess"));
const PaymentCancelled = lazy(() => import("@/pages/PaymentCancelled"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense 
            fallback={
              <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-gray-600">Loading...</p>
                </div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/studio-setup" element={<StudioSetup />} />
              <Route path="/view-studio" element={<ViewStudio />} />
              <Route path="/students-management" element={<StudentsManagement />} />
              <Route path="/class-schedule" element={<ClassSchedule />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/studio/:subdomain" element={<Studio />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-cancelled" element={<PaymentCancelled />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
