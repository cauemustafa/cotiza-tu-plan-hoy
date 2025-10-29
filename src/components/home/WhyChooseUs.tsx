import { Check, Shield, Users, Clock, Award } from "lucide-react";

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
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            ¿Por Qué Elegirnos?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Más de 10 años ayudando a familias y empresas a encontrar su seguro ideal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="flex gap-4 p-6 rounded-lg bg-card shadow-card hover:shadow-elegant transition-smooth">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
