import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Phone, Heart } from "lucide-react";
import heroImage from "@/assets/isapre-hero.jpg";

const Isapre = () => {
  const whatsappMessage = "Hola, me gustaría obtener más información sobre los planes de Isapre.";
  const whatsappUrl = `https://wa.me/56928360499?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Image */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="Profesionales de la salud con planes Isapre CruzBlanca"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/75 to-accent/65" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="flex justify-center mb-4">
                <Heart className="h-16 w-16 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Planes Isapre CruzBlanca
              </h1>
              <p className="text-xl text-white/90">
                La mejor opción en salud previsional con cobertura integral
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl">Plan Isapre Esencial</CardTitle>
                  <CardDescription>Cobertura completa para toda tu familia</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="mb-4">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Beneficios Destacados:</p>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "Red de prestadores nacional",
                      "Cobertura hospitalaria completa",
                      "Bonificación competitiva",
                      "Atención ambulatoria",
                      "Exámenes y procedimientos",
                      "Programa de salud preventiva"
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full">
                      <Phone className="mr-2 h-4 w-4" />
                      Cotizar Plan
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="shadow-card border-2 border-primary">
                <CardHeader>
                  <div className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-2">
                    PLAN SUPERIOR
                  </div>
                  <CardTitle className="text-2xl">Plan Isapre Premium</CardTitle>
                  <CardDescription>La máxima protección para tu salud</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="mb-4">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Todo del Plan Esencial, más:</p>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "Mayor bonificación",
                      "Red de clínicas premium",
                      "Dental incluido",
                      "Oftalmología completa",
                      "Medicina preventiva avanzada",
                      "Atención preferente"
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full gradient-primary">
                      <Phone className="mr-2 h-4 w-4" />
                      Cotizar Plan
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-card">
              <h3 className="text-2xl font-bold mb-6 text-center">¿Por qué elegir CruzBlanca?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-semibold mb-2">Red Extensa</p>
                  <p className="text-sm text-muted-foreground">Miles de prestadores en todo Chile</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-semibold mb-2">Bonificación Alta</p>
                  <p className="text-sm text-muted-foreground">Las mejores coberturas del mercado</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-semibold mb-2">Atención 24/7</p>
                  <p className="text-sm text-muted-foreground">Siempre disponibles cuando nos necesites</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  ¿Necesitas ayuda para elegir el plan ideal?
                </p>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gradient-primary">
                    <Phone className="mr-2 h-5 w-5" />
                    Hablar con un Asesor Isapre
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Isapre;
