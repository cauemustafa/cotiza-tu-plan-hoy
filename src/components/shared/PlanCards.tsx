import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Phone } from "lucide-react";
import { motion } from "framer-motion";

interface Plan {
  name: string;
  price: string;
  priceDetail?: string;
  description: string;
  popular?: boolean;
}

interface PlanCardsProps {
  plans: Plan[];
  onSelectPlan: (index: number) => void;
  variant?: "individual" | "pyme";
}

const PlanCards = ({ plans, onSelectPlan, variant = "individual" }: PlanCardsProps) => {
  return (
    <div className="grid justify-center gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 260px))' }}>
      {plans.map((plan, index) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Card 
            className={`relative h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
              plan.popular
                ? variant === "pyme" ? "border-2 border-primary shadow-lg ring-2 ring-primary/20" : "border-2 border-accent shadow-lg ring-2 ring-accent/20" 
                : "border border-border"
            }`}
          >
            {plan.popular && (
              <Badge 
                className={"absolute -top-3 left-1/2 -translate-x-1/2 " + (variant === "pyme" ? "bg-primary" : "bg-accent") + " text-primary-foreground px-4"}
              >
                Más Popular
              </Badge>
            )}
            
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-lg font-bold">{plan.name}</CardTitle>
              <div className="mt-4">
                <p className={`text-2xl font-bold ${variant === "pyme" ? "text-accent" : "text-primary"}`}>
                  {plan.price}
                </p>
                {plan.priceDetail && (
                  <p className="text-xs text-muted-foreground mt-1">{plan.priceDetail}</p>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col">
              <div className="flex items-center justify-center gap-2">
                <Check className="h-4 w-4 text-green-500 shrink-0" />
                <p className="text-sm text-muted-foreground text-center">{plan.description}</p>
              </div>
              
              <div className="mt-auto pt-4">
                <Button 
                  onClick={() => onSelectPlan(index)}
                  className={`w-full ${variant === "pyme" ? "bg-primary text-accent-foreground hover:bg-accent/90" : "bg-accent text-primary-foreground hover:bg-primary/90"}`}
                  variant={'default'}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Cotizar
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default PlanCards;
