import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Shield, Award, CheckCircle } from "lucide-react";
import logo from "@/assets/logo.svg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// Partner logos
import andesSalud from "@/assets/partners/andes-salud.png";
import bupaAntofagasta from "@/assets/partners/bupa-antofagasta.svg";
import bupaRenaca from "@/assets/partners/bupa-renaca.svg";
import bupaSantiago from "@/assets/partners/bupa-santiago.svg";
import clinicaSantaMaria from "@/assets/partners/clinica-santa-maria.png";
import davila from "@/assets/partners/davila.svg";
import integramedica from "@/assets/partners/integramedica.svg";

const partners = [
  { name: "Andes Salud", logo: andesSalud },
  { name: "Bupa Clínica Antofagasta", logo: bupaAntofagasta },
  { name: "Bupa Clínica Reñaca", logo: bupaRenaca },
  { name: "Bupa Clínica Santiago", logo: bupaSantiago },
  { name: "Clínica Santa María", logo: clinicaSantaMaria },
  { name: "Clínica Dávila", logo: davila },
  { name: "Integramédica", logo: integramedica },
];

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Partner Logos Carousel */}
        <div className="mb-8 pb-8 border-b border-primary-foreground/20">
          <p className="text-center font-semibold mb-6 text-primary-foreground/90" role="heading" aria-level={2}>Nuestros Socios</p>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 2500,
                stopOnInteraction: false,
              }),
            ]}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {partners.map((partner, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                  <div className="bg-white rounded-lg p-4 shadow-lg hover:scale-105 transition-transform h-20 flex items-center justify-center">
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="h-12 w-auto max-w-full object-contain"
                      width={48}
                      height={48}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img 
              src={logo} 
              alt="Cotiza Tu Plan Hoy - Seguros de Salud" 
              className="h-12 w-auto mb-2"
              width={48}
              height={48}
              loading="lazy"
              decoding="async"
            />
            <p className="text-sm text-primary-foreground/90">
              Corredor Oficial Bupa Seguros Chile
            </p>
            <p className="text-sm text-primary-foreground/90">
              Paloma Ramirez
            </p>
            
            {/* Trust Badges */}
            <div className="pt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-white" />
                <span className="text-primary-foreground/90">Corredor Certificado</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="h-4 w-4 text-white" />
                <span className="text-primary-foreground/90">+10 Años Experiencia</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-white" />
                <span className="text-primary-foreground/90">1000+ Clientes Satisfechos</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <p className="font-semibold" role="heading" aria-level={2}>Enlaces Rápidos</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/seguros-individuales" className="text-primary-foreground/90 hover:text-primary-foreground transition-smooth">
                  Seguros Individuales
                </Link>
              </li>
              <li>
                <Link to="/seguros-pyme" className="text-primary-foreground/90 hover:text-primary-foreground transition-smooth">
                  Seguros PYME
                </Link>
              </li>
              <li>
                <Link to="/isapre" className="text-primary-foreground/90 hover:text-primary-foreground transition-smooth">
                  Isapre
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-primary-foreground/90 hover:text-primary-foreground transition-smooth">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <p className="font-semibold" role="heading" aria-level={2}>Contacto</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-primary-foreground/90">
                <Phone className="h-4 w-4" />
                <a href="tel:+56928360499" className="hover:text-primary-foreground transition-smooth">
                  +56 9 2836 0499
                </a>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/90">
                <Mail className="h-4 w-4" />
                <a href="mailto:contacto@cotizatuplanhoy.cl" className="hover:text-primary-foreground transition-smooth">
                  contacto@cotizatuplanhoy.cl
                </a>
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/90">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>Chile</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <p className="font-semibold" role="heading" aria-level={2}>Legal</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/politica-privacidad" className="text-primary-foreground/90 hover:text-primary-foreground transition-smooth">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/terminos-condiciones" className="text-primary-foreground/90 hover:text-primary-foreground transition-smooth">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/90 space-y-2">
          <p>© {new Date().getFullYear()} Cotiza Tu Plan Hoy. Todos los derechos reservados.</p>
          <p className="flex items-center justify-center gap-2">
            Desarrollado por Cauê Mustafá
            <a 
              href="https://github.com/cauemustafa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary-foreground transition-smooth"
              aria-label="GitHub de Cauê Mustafá"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                className="hover:scale-110 transition-transform"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
