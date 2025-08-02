
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import JoinUs from "./pages/JoinUs";
import NotFound from "./pages/NotFound";
import MembershipFormPage from '@/pages/MembershipFormPage';
import PartnerPage from '@/pages/PartnerPage';
import InvestorsPage from '@/pages/InvestorsPage';
import ThankYouPage from '@/pages/ThankYouPage';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/join-us" element={<JoinUs />} />
            <Route path="/membership-form/:tierId" element={<MembershipFormPage />} />
            <Route path="/partner" element={<PartnerPage />} />
            <Route path="/investors" element={<InvestorsPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
