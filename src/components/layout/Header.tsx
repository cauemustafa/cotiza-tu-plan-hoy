import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Seguros Individuales", href: "/seguros-individuales" },
    { name: "Seguros PYME", href: "/seguros-pyme" },
    { name: "Isapre", href: "/isapre" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <span className="text-2xl font-bold gradient-hero bg-clip-text text-transparent">
                Cotiza Tu Plan Hoy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth"
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://wa.me/56928360499"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="gradient-primary">
                <Phone className="mr-2 h-4 w-4" />
                Cotizar Ahora
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-muted"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary hover:bg-muted rounded-md transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://wa.me/56928360499"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="w-full gradient-primary">
                <Phone className="mr-2 h-4 w-4" />
                Cotizar Ahora
              </Button>
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
