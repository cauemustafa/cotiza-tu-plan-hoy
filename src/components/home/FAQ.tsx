import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "¿Cuánto tiempo toma obtener una cotización?",
      answer: "Nuestras cotizaciones son inmediatas. En menos de 5 minutos puedes tener una estimación de tu plan ideal. Contáctanos por WhatsApp para una respuesta aún más rápida.",
    },
    {
      question: "¿Hay algún costo por la asesoría?",
      answer: "No, nuestra asesoría es completamente gratuita. Como corredores oficiales de Bupa y CruzBlanca, recibimos comisión directamente de las aseguradoras, por lo que tú no pagas nada extra.",
    },
    {
      question: "¿Puedo cambiar mi plan después de contratarlo?",
      answer: "Sí, puedes modificar tu plan según las condiciones de cada aseguradora. Te asesoramos en todo el proceso de cambio para que siempre tengas la mejor cobertura para tus necesidades.",
    },
    {
      question: "¿Qué diferencia hay entre seguro e Isapre?",
      answer: "Los seguros complementarios (Bupa) cubren gastos que no cubre tu Fonasa o Isapre. Las Isapres (como CruzBlanca) son instituciones de salud previsional que reemplazan a Fonasa. Te ayudamos a elegir la mejor combinación.",
    },
    {
      question: "¿Ofrecen planes para empresas pequeñas?",
      answer: "¡Sí! Tenemos planes PYME desde 2 personas. Los seguros corporativos ofrecen mejores precios y beneficios adicionales para tus colaboradores.",
    },
    {
      question: "¿Cuánto tiempo demora la activación del plan?",
      answer: "Una vez aprobada tu solicitud, la activación es en 24-48 horas. En casos urgentes, podemos gestionar activaciones express el mismo día.",
    },
    {
      question: "¿Qué pasa si tengo una enfermedad preexistente?",
      answer: "Cada caso se evalúa individualmente. Como corredores, te ayudamos a presentar tu caso de la mejor manera a las aseguradoras y buscamos opciones que se ajusten a tu situación.",
    },
    {
      question: "¿Puedo cancelar mi plan cuando quiera?",
      answer: "Sí, los planes no tienen permanencia mínima obligatoria. Puedes cancelar cuando lo necesites siguiendo el proceso de cada aseguradora. Te acompañamos en todo el trámite.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Resolvemos tus dudas sobre seguros de salud
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card shadow-card rounded-lg px-6 border-none"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
