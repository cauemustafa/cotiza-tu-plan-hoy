import { Check, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface PlanFeature {
  name: string;
  values: (boolean | string)[];
}

interface Plan {
  name: string;
  price: string;
  priceDetail?: string;
  description: string;
  popular?: boolean;
}

interface ComparisonTableProps {
  plans: Plan[];
  features: PlanFeature[];
  onSelectPlan: (planIndex: number) => void;
}

const ComparisonTable = ({ plans, features, onSelectPlan }: ComparisonTableProps) => {
  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-muted-foreground mx-auto" />
      );
    }
    return <span className="text-sm">{value}</span>;
  };

  return (
    <>
      {/* Desktop View - Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse">
      <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-semibold">Características</th>
              {plans.map((plan, index) => (
                <th key={index} className="p-4 text-center font-bold text-lg">
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, featureIndex) => (
              <tr key={featureIndex} className="border-b hover:bg-muted/50 transition-colors">
                <td className="p-4 font-medium">{feature.name}</td>
                {feature.values.map((value, planIndex) => (
                  <td key={planIndex} className="p-4 text-center">
                    {renderFeatureValue(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Accordion */}
      <div className="lg:hidden">
        <Accordion type="single" collapsible className="space-y-4">
          {plans.map((plan, planIndex) => (
            <AccordionItem key={planIndex} value={`plan-${planIndex}`} className="border rounded-lg overflow-hidden">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex flex-col items-start gap-1 text-left w-full">
                    {plan.popular && (
                      <Badge className="text-xs">Más Popular</Badge>
                    )}
                    <h3 className="font-bold text-base">{plan.name}</h3>
                    <p className="text-lg font-bold text-primary">{plan.price}</p>
                    {plan.priceDetail && (
                      <p className="text-xs text-muted-foreground">{plan.priceDetail}</p>
                    )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="space-y-3 mb-4">
                  {features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{feature.name}</span>
                      <div>{renderFeatureValue(feature.values[planIndex])}</div>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={() => onSelectPlan(planIndex)}
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full"
                >
                  Ver Detalles
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default ComparisonTable;
