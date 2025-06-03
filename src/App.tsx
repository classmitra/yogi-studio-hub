
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAnalytics } from "@/hooks/useAnalytics";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import StudioSetup from "./pages/StudioSetup";
import ClassSchedule from "./pages/ClassSchedule";
import Analytics from "./pages/Analytics";
import StudentsManagement from "./pages/StudentsManagement";
import Studio from "./pages/Studio";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancelled from "./pages/PaymentCancelled";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppWithAnalytics() {
  useAnalytics();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/studio-setup" element={<StudioSetup />} />
      <Route path="/class-schedule" element={<ClassSchedule />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/students" element={<StudentsManagement />} />
      <Route path="/studio/:subdomain" element={<Studio />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/payment/cancelled" element={<PaymentCancelled />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppWithAnalytics />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
