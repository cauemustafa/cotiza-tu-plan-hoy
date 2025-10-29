import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import ComparisonTable from "@/components/shared/ComparisonTable";
import { individualPlans, individualFeatures } from "@/data/plans";
import { toast } from "sonner";

const SegurosIndividuales = () => {
  const handleSelectPlan = (planIndex: number) => {
    const planName = individualPlans[planIndex].name;
    toast.success(`Plan ${planName} seleccionado`, {
      description: "Serás redirigido a WhatsApp para completar tu cotización"
    });
    setTimeout(() => {
      window.open("https://wa.me/56928360499", "_blank");
    }, 1500);
  };

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
                Compara y elige el plan Bupa perfecto para ti y tu familia
              </p>
            </div>

            {/* Comparison Table */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">
                Compara Nuestros Planes
              </h2>
              <ComparisonTable 
                plans={individualPlans}
                features={individualFeatures}
                onSelectPlan={handleSelectPlan}
              />
            </div>

            <div className="text-center bg-card p-8 rounded-lg shadow-card">
              <h3 className="text-2xl font-bold mb-4">
                ¿No estás seguro cuál plan es mejor para ti?
              </h3>
              <p className="text-muted-foreground mb-6">
                Nuestros asesores están listos para ayudarte a encontrar la cobertura perfecta
              </p>
              <a href="https://wa.me/56928360499" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gradient-primary">
                  <Phone className="mr-2 h-5 w-5" />
                  Habla con un Asesor Gratis
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
