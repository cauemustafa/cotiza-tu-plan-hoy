import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 gradient-primary text-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            ¿Listo para Proteger tu Salud?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Obtén tu cotización gratis en minutos. Sin compromiso, sin letra chica.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/56928360499"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl">
                <Phone className="mr-2 h-5 w-5" />
                Cotizar por WhatsApp
              </Button>
            </a>
            <Link to="/contacto">
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur">
                <Mail className="mr-2 h-5 w-5" />
                Enviar Consulta
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/80">
            Respuesta en menos de 24 horas • Asesoría gratuita
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
