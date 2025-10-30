import { Check, Shield, Users, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Corredor Oficial Bupa",
      description: "Representante autorizado con acceso directo a todos los planes y beneficios",
    },
    {
      icon: Users,
      title: "Asesoría Personalizada",
      description: "Te ayudamos a encontrar el plan ideal según tu situación y presupuesto",
    },
    {
      icon: Clock,
      title: "Respuesta Inmediata",
      description: "Cotizaciones rápidas y atención personalizada por WhatsApp o email",
    },
    {
      icon: Award,
      title: "Sin Costo Adicional",
      description: "Nuestro servicio de asesoría es completamente gratuito para ti",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            ¿Por Qué Elegirnos?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Más de 10 años ayudando a familias y empresas a encontrar su seguro ideal
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, translateY: -5 }}
                className="flex gap-4 p-6 rounded-lg bg-card shadow-card hover:shadow-elegant transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white shadow-lg"
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
