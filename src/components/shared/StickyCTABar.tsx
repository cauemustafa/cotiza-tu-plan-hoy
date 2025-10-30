import { motion, useScroll } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const StickyCTABar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(scrollY.get() > 300);
    };

    const unsubscribe = scrollY.on("change", handleScroll);
    return () => unsubscribe();
  }, [scrollY]);

  const handlePhoneClick = () => {
    window.location.href = "tel:+56928360499";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== 'undefined' && (window as any).gtag) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag('event', 'phone_click', {
        event_category: 'engagement',
        event_label: 'sticky_cta_bar'
      });
    }
  };

  const handleWhatsAppClick = () => {
    const message = "¡Hola! Me gustaría obtener una cotización.";
    window.open(`https://wa.me/56928360499?text=${encodeURIComponent(message)}`, '_blank');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== 'undefined' && (window as any).gtag) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'sticky_cta_bar'
      });
    }
  };

  return (
    <motion.div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-primary text-primary-foreground shadow-elegant"
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex gap-2 p-3">
        <Button
          onClick={handlePhoneClick}
          className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/30"
          size="lg"
        >
          <Phone className="mr-2 h-5 w-5" />
          Llamar
        </Button>
        <Button
          onClick={handleWhatsAppClick}
          className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white"
          size="lg"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          WhatsApp
        </Button>
      </div>
    </motion.div>
  );
};

export default StickyCTABar;
