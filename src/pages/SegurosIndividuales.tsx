import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Phone } from "lucide-react";

const SegurosIndividuales = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Seguros de Salud Individuales
              </h1>
              <p className="text-xl text-muted-foreground">
                4 Planes Bupa diseñados para proteger tu salud y la de tu familia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl">Plan Básico</CardTitle>
                  <CardDescription>Protección esencial para tu salud</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {["Consultas médicas", "Exámenes básicos", "Hospitalización", "Urgencias 24/7"].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="https://wa.me/56928360499" target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full">
                      <Phone className="mr-2 h-4 w-4" />
                      Cotizar Plan
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl">Plan Intermedio</CardTitle>
                  <CardDescription>Cobertura completa para tu tranquilidad</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {["Todo del Plan Básico", "Especialistas", "Exámenes avanzados", "Medicamentos"].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="https://wa.me/56928360499" target="_blank" rel="noopener noreferrer" className="block">
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
                    MÁS POPULAR
                  </div>
                  <CardTitle className="text-2xl">Plan Avanzado</CardTitle>
                  <CardDescription>La mejor protección para tu familia</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {["Todo del Plan Intermedio", "Dental incluido", "Oftalmología", "Medicina preventiva"].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="https://wa.me/56928360499" target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full gradient-primary">
                      <Phone className="mr-2 h-4 w-4" />
                      Cotizar Plan
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl">Plan Premium</CardTitle>
                  <CardDescription>Cobertura total sin límites</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {["Todo del Plan Avanzado", "Sin copago", "Red internacional", "Asistencia prioritaria"].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="https://wa.me/56928360499" target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full">
                      <Phone className="mr-2 h-4 w-4" />
                      Cotizar Plan
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                ¿No estás seguro cuál plan es mejor para ti?
              </p>
              <a href="https://wa.me/56928360499" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gradient-primary">
                  <Phone className="mr-2 h-5 w-5" />
                  Habla con un Asesor
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SegurosIndividuales;
