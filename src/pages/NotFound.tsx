import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoWebp from "@/assets/optimized/logo-512.webp";
import logoPng from "@/assets/optimized/logo-512.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <picture>
          <source srcSet={logoWebp} type="image/webp" />
          <img
            src={logoPng}
            alt="Cotiza Tu Plan Hoy"
            className="h-40 md:h-48 w-auto object-contain mx-auto"
            loading="lazy"
          />
        </picture>
        <h1 className="text-6xl font-bold gradient-hero bg-clip-text text-white">404</h1>
        <p className="text-2xl font-semibold text-foreground">Página no encontrada</p>
        <p className="text-muted-foreground max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Link to="/">
          <Button className="gradient-primary mt-4">
            <Home className="mr-2 h-4 w-4" />
            Volver al Inicio
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
