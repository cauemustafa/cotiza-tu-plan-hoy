// Seguros Individuales Plans
export const individualPlans = [
  {
    name: "Plan Básico",
    price: "$25.000/mes",
    description: "Protección esencial para ti",
    popular: false
  },
  {
    name: "Plan Completo",
    price: "$45.000/mes",
    description: "Cobertura amplia y flexible",
    popular: true
  },
  {
    name: "Plan Premium",
    price: "$75.000/mes",
    description: "La mejor protección disponible",
    popular: false
  }
];

export const individualFeatures = [
  {
    name: "Consultas médicas",
    values: [true, true, true]
  },
  {
    name: "Hospitalización",
    values: ["Hasta $5M", "Hasta $15M", "Ilimitado"]
  },
  {
    name: "Cirugías",
    values: [true, true, true]
  },
  {
    name: "Medicina preventiva",
    values: [false, true, true]
  },
  {
    name: "Dental",
    values: [false, "Básico", "Completo"]
  },
  {
    name: "Terapias",
    values: [false, true, true]
  },
  {
    name: "Exámenes",
    values: ["50% reembolso", "80% reembolso", "100% reembolso"]
  },
  {
    name: "Red de clínicas",
    values: ["Red básica", "Red amplia", "Red premium + internacional"]
  },
  {
    name: "Telemedicina 24/7",
    values: [false, true, true]
  },
  {
    name: "Copago",
    values: ["20%", "10%", "0%"]
  }
];

// Seguros PYME Plans
export const pymePlans = [
  {
    name: "Starter PYME",
    price: "$35.000/persona",
    description: "5-20 colaboradores",
    popular: false
  },
  {
    name: "Growth PYME",
    price: "$32.000/persona",
    description: "21-50 colaboradores",
    popular: true
  },
  {
    name: "Business PYME",
    price: "$28.000/persona",
    description: "51-100 colaboradores",
    popular: false
  },
  {
    name: "Enterprise PYME",
    price: "$25.000/persona",
    description: "101+ colaboradores",
    popular: false
  }
];

export const pymeFeatures = [
  {
    name: "Cobertura ambulatoria",
    values: [true, true, true, true]
  },
  {
    name: "Hospitalización",
    values: ["Hasta $10M", "Hasta $20M", "Hasta $30M", "Ilimitado"]
  },
  {
    name: "Urgencias",
    values: [true, true, true, true]
  },
  {
    name: "Maternidad",
    values: [false, true, true, true]
  },
  {
    name: "Dental corporativo",
    values: ["Básico", "Básico", "Completo", "Completo"]
  },
  {
    name: "Medicina preventiva",
    values: [true, true, true, true]
  },
  {
    name: "Salud mental",
    values: [false, true, true, true]
  },
  {
    name: "Chequeos anuales",
    values: [false, true, true, true]
  },
  {
    name: "Gestor de cuenta",
    values: [false, false, true, true]
  },
  {
    name: "App móvil empresa",
    values: [false, true, true, true]
  },
  {
    name: "Reportes mensuales",
    values: [false, false, true, true]
  },
  {
    name: "Capacitaciones",
    values: [false, false, "2 al año", "4 al año"]
  }
];
