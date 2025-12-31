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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card 
            className={`relative h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
              plan.popular 
                ? "border-2 border-primary shadow-lg ring-2 ring-primary/20" 
                : "border border-border"
            }`}
          >
            {plan.popular && (
              <Badge 
                className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4"
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
              <div className="flex items-center gap-2 mb-4">
                <Check className="h-4 w-4 text-green-500 shrink-0" />
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              
              <div className="mt-auto pt-4">
                <Button 
                  onClick={() => onSelectPlan(index)}
                  className={`w-full ${plan.popular ? "gradient-primary" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
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
