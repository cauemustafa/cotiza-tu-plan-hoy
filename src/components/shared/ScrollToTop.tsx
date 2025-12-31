import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [offsetBottom, setOffsetBottom] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      const isDesktop = window.innerWidth >= 768;
      const scrolled = window.scrollY > 300 && isDesktop;

      // If not desktop, hide the button and skip calculations
      if (!isDesktop) {
        setIsVisible(false);
        setOffsetBottom(null);
        return;
      }

      setIsVisible(scrolled);

      const base = 24; // desktop base offset (bottom-6)
      const buttonHeight = 48; // px (h-12)
      const margin = 16; // safety margin

      const footer = document.querySelector("footer");
      const header = document.querySelector("header");
      let offset = base;

      if (footer) {
        const rect = footer.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          const overlap = window.innerHeight - rect.top; // how much footer is visible
          const extra = overlap + margin; // margin above footer
          offset = base + extra;
        }
      }

      // Ensure we don't overlap the header: compute the maximum allowed offset
      if (header) {
        const headerRect = header.getBoundingClientRect();
        const maxAllowed = window.innerHeight - headerRect.bottom - margin - buttonHeight;
        if (offset > maxAllowed) {
          // If there's no room to place the button without overlapping header, hide it
          if (maxAllowed < base) {
            setIsVisible(false);
            setOffsetBottom(null);
            return;
          }
          offset = Math.min(offset, maxAllowed);
        }
      }

      setOffsetBottom(offset);
    };

    update();
    window.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed right-6 z-50"
          style={{ bottom: offsetBottom !== null ? `${offsetBottom}px` : undefined }}
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="rounded-full shadow-lg h-12 w-12 bg-primary"
            aria-label="Volver arriba"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
