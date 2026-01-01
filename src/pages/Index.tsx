import { lazy, Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ServicesSection from "@/components/home/ServicesSection";
import StickyCTABar from "@/components/shared/StickyCTABar";
import StructuredData from "@/components/shared/StructuredData";

// Lazy load below-the-fold components that use framer-motion heavily
const HowItWorks = lazy(() => import("@/components/home/HowItWorks"));
const WhyChooseUs = lazy(() => import("@/components/home/WhyChooseUs"));
const FAQ = lazy(() => import("@/components/home/FAQ"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

const Index = () => {
  return (
    <>
      <StructuredData />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <ServicesSection />
          <Suspense fallback={<div className="min-h-[300px]" />}>
            <HowItWorks />
            <WhyChooseUs />
            <FAQ />
            <CTASection />
          </Suspense>
        </main>
        <Footer />
        {/* <FloatingWhatsApp /> */}
        <StickyCTABar />
      </div>
    </>
  );
};

export default Index;
