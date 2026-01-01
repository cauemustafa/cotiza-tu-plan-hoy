import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Shield, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { trackWhatsAppClick } from "@/lib/analytics";
import heroImage from "@/assets/hero-health-insurance.jpg";

const Hero = () => {
  const handleWhatsAppClick = () => {
    trackWhatsAppClick('hero_section');
  };

  const whatsappMessage = "Hola, me gustaría cotizar un plan de seguro de salud.";
  const whatsappUrl = `https://wa.me/56928360499?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Familia feliz protegida con seguro de salud"
          className="w-full h-full object-cover"
          width={1920}
          height={864}
          fetchpriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/70" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <Shield className="h-16 w-16 text-white/90" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            Tu Seguro de Salud Ideal
            <br />
            <span className="text-white/90">Comienza Aquí</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl sm:text-2xl mb-8 text-white/90 max-w-2xl mx-auto"
          >
            Encuentra el plan perfecto para ti y tu familia. Asesoría personalizada y gratuita.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
            >
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-elegant text-lg px-8 py-6">
                <Phone className="mr-2 h-5 w-5" />
                Cotizar por WhatsApp
              </Button>
            </a>
            <Link to="/contacto">
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 text-lg px-8 py-6 backdrop-blur">
                Solicitar Contacto
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 text-white/90"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <Heart className="h-5 w-5" />
              <span className="text-sm font-medium">Corredor Oficial Bupa</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">Asesoría Gratuita</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <Phone className="h-5 w-5" />
              <span className="text-sm font-medium">Respuesta Inmediata</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
