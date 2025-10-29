import { Button } from "@/components/ui/button";
import { Phone, Shield, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-hero opacity-95" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-white/90" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Tu Seguro de Salud Ideal
            <br />
            <span className="text-white/90">Comienza Aquí</span>
          </h1>
          
          <p className="text-xl sm:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Encuentra el plan perfecto para ti y tu familia. Asesoría personalizada y gratuita.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="https://wa.me/56928360499"
              target="_blank"
              rel="noopener noreferrer"
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
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-white/90">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              <span className="text-sm font-medium">Corredor Oficial Bupa</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">Asesoría Gratuita</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span className="text-sm font-medium">Respuesta Inmediata</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
