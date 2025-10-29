import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import GoogleAnalytics from "./components/shared/GoogleAnalytics";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import ScrollToTop from "./components/shared/ScrollToTop";
import CookieConsent from "./components/shared/CookieConsent";
import { PageSkeleton } from "./components/shared/LoadingSkeleton";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const SegurosIndividuales = lazy(() => import("./pages/SegurosIndividuales"));
const SegurosPyme = lazy(() => import("./pages/SegurosPyme"));
const Isapre = lazy(() => import("./pages/Isapre"));
const Contacto = lazy(() => import("./pages/Contacto"));
const PoliticaPrivacidad = lazy(() => import("./pages/PoliticaPrivacidad"));
const TerminosCondiciones = lazy(() => import("./pages/TerminosCondiciones"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <GoogleAnalytics />
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/seguros-individuales" element={<SegurosIndividuales />} />
              <Route path="/seguros-pyme" element={<SegurosPyme />} />
              <Route path="/isapre" element={<Isapre />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
              <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <ScrollToTop />
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
