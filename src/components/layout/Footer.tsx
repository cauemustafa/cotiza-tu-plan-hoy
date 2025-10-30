import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Shield, Award, CheckCircle } from "lucide-react";
import logoBupa from "@/assets/logo-bupa.jpg";
import logoCruzBlanca from "@/assets/logo-cruzblanca.jpg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Partner Logos Section */}
        <div className="mb-8 pb-8 border-b border-primary-foreground/20">
          <h4 className="text-center font-semibold mb-6 text-primary-foreground/90">Nuestros Socios</h4>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="bg-white rounded-lg p-4 shadow-lg hover:scale-105 transition-transform">
              <img src={logoBupa} alt="Bupa Seguros" className="h-12 w-auto object-contain" />
            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg hover:scale-105 transition-transform">
              <img src={logoCruzBlanca} alt="CruzBlanca Isapre" className="h-12 w-auto object-contain" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Cotiza Tu Plan Hoy</h3>
            <p className="text-sm text-primary-foreground/80">
              Corredor Oficial Bupa Seguros Chile
            </p>
            <p className="text-sm text-primary-foreground/80">
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
            <h4 className="font-semibold">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/seguros-individuales" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Seguros Individuales
                </Link>
              </li>
              <li>
                <Link to="/seguros-pyme" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Seguros PYME
                </Link>
              </li>
              <li>
                <Link to="/isapre" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Isapre
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Phone className="h-4 w-4" />
                <a href="tel:+56928360499" className="hover:text-primary-foreground transition-smooth">
                  +56 9 2836 0499
                </a>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Mail className="h-4 w-4" />
                <a href="mailto:contacto@cotizatuplanhoy.cl" className="hover:text-primary-foreground transition-smooth">
                  contacto@cotizatuplanhoy.cl
                </a>
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/80">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>Chile</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/politica-privacidad" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/terminos-condiciones" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/80">
          <p>© {new Date().getFullYear()} Cotiza Tu Plan Hoy. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
