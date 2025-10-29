import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building2, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesSection = () => {
  const services = [
    {
      icon: Users,
      title: "Seguros Individuales",
      description: "4 planes Bupa diseñados para ti y tu familia. Cobertura completa con la mejor calidad.",
      link: "/seguros-individuales",
      color: "text-primary",
    },
    {
      icon: Building2,
      title: "Seguros PYME",
      description: "Protege a tu equipo con 4 planes especiales para empresas. Beneficios corporativos.",
      link: "/seguros-pyme",
      color: "text-accent",
    },
    {
      icon: Heart,
      title: "Isapre",
      description: "2 planes CruzBlanca con cobertura integral. La mejor opción en salud previsional.",
      link: "/isapre",
      color: "text-primary",
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
              <Card key={index} className="shadow-card hover:shadow-elegant transition-smooth border-2 hover:border-primary/20">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 ${service.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
