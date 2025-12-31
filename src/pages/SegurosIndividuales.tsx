import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import ComparisonTable from "@/components/shared/ComparisonTable";
import PlanCards from "@/components/shared/PlanCards";
import { individualPlans, individualFeatures } from "@/data/plans";
import { toast } from "sonner";
import heroImage from "@/assets/seguros-individuales-hero.jpg";
import { productWithOfferSchema, buildImageObjects } from "@/lib/structured-data";

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

  const offerSchemas = individualPlans
    .filter((p) => p.priceNumber)
    .map((p) => {
      const schema = productWithOfferSchema({
        name: p.name,
        description: p.description,
        category: 'Individual',
        price: p.priceNumber,
        priceCurrency: p.priceCurrency,
      });
      schema.image = buildImageObjects('logo');
      return schema;
    });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {offerSchemas.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchemas) }}
          />
        )}
        {/* Hero Section with Image */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="Familia feliz con seguro de salud individual"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/75 to-primary/65" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Seguros de Salud Individuales
              </h1>
              <p className="text-xl text-white/90">
                Compara y elige el plan Bupa perfecto para ti y tu familia
              </p>
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            {/* Plan Cards */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-4">
                Nuestros Planes
              </h2>
              <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                Elige el plan que mejor se adapte a tus necesidades de salud
              </p>
              <PlanCards 
                plans={individualPlans}
                onSelectPlan={handleSelectPlan}
                variant="individual"
              />
            </div>

            {/* Comparison Table */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-4">
                Compara Nuestros Planes
              </h2>
              <p className="text-sm text-muted-foreground text-center mb-8">*Sin deducible en Red de prestadores Bupa</p>
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
                <Button size="lg" className="gradient-accent">
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
