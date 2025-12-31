import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Users } from "lucide-react";
import ComparisonTable from "@/components/shared/ComparisonTable";
import PlanCards from "@/components/shared/PlanCards";
import PymeCalculator from "@/components/pyme/PymeCalculator";
import { pymePlans, pymeFeatures } from "@/data/plans";
import { toast } from "sonner";
import heroImage from "@/assets/seguros-pyme-hero.jpg";

const SegurosPyme = () => {
  const handleSelectPlan = (planIndex: number) => {
    const planName = pymePlans[planIndex].name;
    const whatsappMessage = `Hola, me gustaría cotizar el plan PYME: ${planName}.`;
    const whatsappUrl = `https://wa.me/56928360499?text=${encodeURIComponent(whatsappMessage)}`;

    toast.success(`Plan ${planName} seleccionado`, {
      description: "Serás redirigido a WhatsApp para completar tu cotización empresarial"
    });
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 1500);
  };

  const genericWhatsappMessage = "Hola, me gustaría obtener más información sobre los seguros para PYME.";
  const genericWhatsappUrl = `https://wa.me/56928360499?text=${encodeURIComponent(genericWhatsappMessage)}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Image */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="Equipo de pequeña empresa protegido con seguro PYME"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-accent/85 via-accent/75 to-primary/65" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="flex justify-center mb-4">
                <Users className="h-16 w-16 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Seguros para PYME
              </h1>
              <p className="text-xl text-white/90">
                Protege a tu equipo con planes corporativos de Bupa Seguros
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-gradient-to-br from-accent/5 to-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            {/* Plan Cards */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-4">
                Nuestros Planes Corporativos
              </h2>
              <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                Planes diseñados para empresas de todos los tamaños
              </p>
              <PlanCards 
                plans={pymePlans}
                onSelectPlan={handleSelectPlan}
                variant="pyme"
              />
            </div>

            {/* Calculator Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">
                Calcula tu Plan Empresarial
              </h2>
              <PymeCalculator />
            </div>

            {/* Comparison Table */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">
                Compara Nuestros Planes Corporativos
              </h2>
              <ComparisonTable 
                plans={pymePlans}
                features={pymeFeatures}
                onSelectPlan={handleSelectPlan}
              />
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
              <a href={genericWhatsappUrl} target="_blank" rel="noopener noreferrer">
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
