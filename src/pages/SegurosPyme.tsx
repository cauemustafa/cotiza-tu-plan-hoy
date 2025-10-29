import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Phone, Users } from "lucide-react";

const SegurosPyme = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-br from-accent/5 to-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="flex justify-center mb-4">
                <Users className="h-16 w-16 text-accent" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Seguros para PYME
              </h1>
              <p className="text-xl text-muted-foreground">
                Protege a tu equipo con planes corporativos de Bupa Seguros
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl">Plan Empresa 1</CardTitle>
                  <CardDescription>Ideal para equipos pequeños (2-10 personas)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {["Consultas médicas ilimitadas", "Hospitalización completa", "Urgencias 24/7", "Red de clínicas amplia"].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
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

              <Card className="shadow-card border-2 border-accent">
                <CardHeader>
                  <div className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full mb-2">
                    RECOMENDADO
                  </div>
                  <CardTitle className="text-2xl">Plan Empresa 2</CardTitle>
                  <CardDescription>Para empresas en crecimiento (11-25 personas)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {["Todo del Plan 1", "Dental incluido", "Exámenes preventivos", "Atención domiciliaria"].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="https://wa.me/56928360499" target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full gradient-accent">
                      <Phone className="mr-2 h-4 w-4" />
                      Cotizar Plan
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl">Plan Empresa 3</CardTitle>
                  <CardDescription>Para empresas establecidas (26-50 personas)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {["Todo del Plan 2", "Oftalmología completa", "Medicamentos con descuento", "Chequeos anuales"].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
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
                  <CardTitle className="text-2xl">Plan Empresa 4</CardTitle>
                  <CardDescription>Para grandes empresas (50+ personas)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {["Todo del Plan 3", "Programa de bienestar", "Gestor de cuenta dedicado", "Descuentos corporativos"].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
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

            <div className="bg-card p-8 rounded-lg shadow-card text-center">
              <h3 className="text-2xl font-bold mb-4">Beneficios Corporativos Adicionales</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="font-semibold mb-2">Implementación Rápida</p>
                  <p className="text-sm text-muted-foreground">Tu equipo protegido en menos de 48 horas</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Soporte Dedicado</p>
                  <p className="text-sm text-muted-foreground">Atención prioritaria para tu empresa</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Planes Flexibles</p>
                  <p className="text-sm text-muted-foreground">Adaptamos la cobertura a tus necesidades</p>
                </div>
              </div>
              <a href="https://wa.me/56928360499" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gradient-primary">
                  <Phone className="mr-2 h-5 w-5" />
                  Solicitar Cotización Empresarial
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

export default SegurosPyme;
