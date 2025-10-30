import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, Calculator, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PlanResult {
  name: string;
  minEmployees: number;
  maxEmployees: number;
  pricePerEmployee: number;
  description: string;
}

const PYME_PLANS: PlanResult[] = [
  {
    name: "Plan Starter PYME",
    minEmployees: 5,
    maxEmployees: 20,
    pricePerEmployee: 35000,
    description: "Ideal para pequeñas empresas iniciando"
  },
  {
    name: "Plan Growth PYME",
    minEmployees: 21,
    maxEmployees: 50,
    pricePerEmployee: 32000,
    description: "Para empresas en crecimiento"
  },
  {
    name: "Plan Business PYME",
    minEmployees: 51,
    maxEmployees: 100,
    pricePerEmployee: 28000,
    description: "Para empresas consolidadas"
  },
  {
    name: "Plan Enterprise PYME",
    minEmployees: 101,
    maxEmployees: Infinity,
    pricePerEmployee: 25000,
    description: "Para grandes empresas"
  }
];

const PymeCalculator = () => {
  const [employees, setEmployees] = useState<string>("");
  const [result, setResult] = useState<PlanResult | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const calculatePlan = () => {
      if (employees === "") {
        setError("");
        setResult(null);
        return;
      }

      const numEmployees = parseInt(employees);
      
      if (isNaN(numEmployees)) {
        setError("Por favor ingrese un número válido");
        setResult(null);
        return;
      }

      if (numEmployees < 5) {
        setError("El número mínimo de colaboradores es 5");
        setResult(null);
        return;
      }

      setError("");
      const plan = PYME_PLANS.find(
        p => numEmployees >= p.minEmployees && numEmployees <= p.maxEmployees
      );

      if (plan) {
        setResult(plan);
      } else {
        setResult(null);
      }
    };

    calculatePlan();
  }, [employees]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-6 w-6 text-primary" />
          Calculadora de Planes PYME
        </CardTitle>
        <CardDescription>
          Descubre el plan ideal según el tamaño de tu empresa
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="employees" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Número de Colaboradores
          </Label>
          <div className="flex gap-2">
            <Input
              id="employees"
              type="number"
              min="5"
              placeholder="Ej: 25"
              value={employees}
              onChange={(e) => setEmployees(e.target.value)}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-4"
            >
              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    {result.name}
                  </CardTitle>
                  <CardDescription>{result.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Precio por Colaborador</p>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(result.pricePerEmployee)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Mensual Estimado</p>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(result.pricePerEmployee * parseInt(employees))}
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground mb-3">
                      * Precio estimado. El valor final puede variar según coberturas específicas.
                    </p>
                    <Link to="/contacto" className="w-full">
                      <Button className="w-full">
                        Solicitar Cotización Detallada
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default PymeCalculator;
