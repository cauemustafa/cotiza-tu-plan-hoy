import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Cookie } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { loadGtag, setConsent, pageview } from "@/lib/analytics";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Show after 1 second
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }

    // Respect previously saved consent
    if (consent === "accepted") {
      // initialize analytics if consent was previously given
      loadGtag();
      setConsent(true);
    } else if (consent === "declined") {
      setConsent(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
    // load analytics and mark consent
    loadGtag();
    setConsent(true);
    // send initial pageview
    if (typeof window !== 'undefined') pageview(window.location.pathname);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
    setConsent(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:max-w-md"
        >
          <Card className="shadow-2xl border-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Cookie className="h-5 w-5" />
                Cookies
              </CardTitle>
              <CardDescription className="text-xs">
                Usamos cookies para mejorar tu experiencia
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <p className="text-sm text-muted-foreground">
                Utilizamos cookies para analizar el tráfico y mejorar tu experiencia. 
                Al continuar navegando, aceptas nuestro uso de cookies.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2">
              <Button 
                onClick={handleAccept} 
                className="w-full sm:flex-1"
              >
                Aceptar
              </Button>
              <Button 
                onClick={handleDecline} 
                variant="outline" 
                className="w-full sm:flex-1"
              >
                Rechazar
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
