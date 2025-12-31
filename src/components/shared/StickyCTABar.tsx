import { motion, useScroll } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { trackWhatsAppClick } from "@/lib/analytics";

const StickyCTABar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px, but hide when at/near the bottom of the page
      const scrolledPastThreshold = scrollY.get() > 300;

      let scrolledToBottom = false;
      if (typeof window !== 'undefined') {
        const scrollPosition = window.scrollY || 0;
        const windowHeight = window.innerHeight || 0;
        const docHeight = document.documentElement?.scrollHeight || 0;
        // threshold (px) from the bottom to consider "at bottom"
        const bottomThreshold = 100;
        scrolledToBottom = (scrollPosition + windowHeight) >= (docHeight - bottomThreshold);
      }

      setIsVisible(scrolledPastThreshold && !scrolledToBottom);
    };

    const unsubscribe = scrollY.on("change", handleScroll);
    // call once to set initial visibility
    handleScroll();
    return () => unsubscribe();
  }, [scrollY]);

  const handleWhatsAppClick = () => {
    const message = "¡Hola! Me gustaría obtener una cotización.";
    window.open(`https://wa.me/56928360499?text=${encodeURIComponent(message)}`, '_blank');
    trackWhatsAppClick('sticky_cta_bar');
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
