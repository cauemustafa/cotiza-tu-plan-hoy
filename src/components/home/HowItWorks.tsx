import { motion } from "framer-motion";
import { MessageCircle, FileSearch, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageCircle,
      title: "1. Contáctanos",
      description: "Envíanos un mensaje por WhatsApp o completa el formulario. Es rápido y sin compromiso.",
    },
    {
      icon: FileSearch,
      title: "2. Analizamos tu Caso",
      description: "Evaluamos tus necesidades y presupuesto para encontrar el plan perfecto para ti.",
    },
    {
      icon: CheckCircle,
      title: "3. ¡Listo!",
      description: "Gestionamos todo el proceso. En 24-48 horas tendrás tu seguro activo.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            ¿Cómo Funciona?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Obtén tu seguro en 3 simples pasos
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center shadow-elegant"
                    >
                      {/* use the site's foreground text color so icons match body text and follow dark mode */}
                      <Icon className="h-10 w-10 text-foreground" />
                    </motion.div>
                  
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-accent -z-10" />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
