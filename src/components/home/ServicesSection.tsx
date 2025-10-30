import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building2, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import segurosIndividualesImg from "@/assets/seguros-individuales-card.jpg";
import segurosPymeImg from "@/assets/seguros-pyme-card.jpg";
import isapreImg from "@/assets/isapre-card.jpg";

const ServicesSection = () => {
  const services = [
    {
      icon: Users,
      title: "Seguros Individuales",
      description: "4 planes Bupa diseñados para ti y tu familia. Cobertura completa con la mejor calidad.",
      link: "/seguros-individuales",
      color: "text-primary",
      image: segurosIndividualesImg,
    },
    {
      icon: Building2,
      title: "Seguros PYME",
      description: "Protege a tu equipo con 4 planes especiales para empresas. Beneficios corporativos.",
      link: "/seguros-pyme",
      color: "text-accent",
      image: segurosPymeImg,
    },
    {
      icon: Heart,
      title: "Isapre",
      description: "2 planes CruzBlanca con cobertura integral. La mejor opción en salud previsional.",
      link: "/isapre",
      color: "text-primary",
      image: isapreImg,
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Encuentra el plan de salud perfecto para tus necesidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full shadow-card hover:shadow-elegant transition-smooth border-2 hover:border-primary/20 overflow-hidden">
                  <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
                    <img
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                    <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-lg bg-white shadow-lg flex items-center justify-center ${service.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to={service.link}>
                      <Button className="w-full group">
                        Ver Planes
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
