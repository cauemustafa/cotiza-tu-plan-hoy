import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import CTASection from "@/components/home/CTASection";
import FloatingWhatsApp from "@/components/shared/FloatingWhatsApp";
import StickyCTABar from "@/components/shared/StickyCTABar";
import StructuredData from "@/components/shared/StructuredData";

const Home = () => {
  return (
    <>
      <StructuredData />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <ServicesSection />
          <HowItWorks />
          <WhyChooseUs />
          <Testimonials />
          <FAQ />
          <CTASection />
        </main>
        <Footer />
        <FloatingWhatsApp />
        <StickyCTABar />
      </div>
    </>
  );
};

export default Home;
