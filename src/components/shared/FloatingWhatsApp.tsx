import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppClick = async () => {
    const message = "¡Hola! Me gustaría obtener más información sobre los planes de seguros.";
    window.open(`https://wa.me/56928360499?text=${encodeURIComponent(message)}`, '_blank');

    // Track event via analytics helper if available (dynamic import to avoid bundling analytics with main bundle)
    try {
      const mod = await import('@/lib/analytics');
      if (typeof mod.trackWhatsAppClick === 'function') mod.trackWhatsAppClick('floating_button');
    } catch (e) {
      // ignore — analytics may not be loaded or consented
    }
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="relative">
        <motion.button
          onClick={handleWhatsAppClick}
          className="bg-[#25D366] text-white rounded-full p-4 shadow-elegant hover:shadow-2xl transition-shadow relative z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
        </motion.button>

        {/* Pulse animation */}
        <motion.div
          className="absolute inset-0 bg-[#25D366] rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-20 top-1/2 -translate-y-1/2 bg-card px-4 py-2 rounded-lg shadow-card whitespace-nowrap pointer-events-none"
        >
          <p className="text-sm font-medium">¿Necesitas ayuda?</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FloatingWhatsApp;
