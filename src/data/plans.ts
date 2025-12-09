// Seguros Individuales Plans - Bupa
export const individualPlans = [
  {
    name: "Bupa Multisalud",
    price: "Desde $55.152*",
    priceDetail: "(*) UF 1,40 mensual",
    description: "¡Ahora sin deducible!",
    popular: false
  },
  {
    name: "Bupa Cuidado Total",
    price: "Desde $33.879*",
    priceDetail: "(*) UF 0,86 mensual",
    description: "¡Ahora sin deducible!",
    popular: true
  },
  {
    name: "Bupa + Protección",
    price: "Desde $29.546*",
    priceDetail: "(*) UF 0,75 mensual",
    description: "¡Ahora sin deducible!",
    popular: false
  },
  {
    name: "Bupa + Protección Ambulatorio 70",
    price: "Desde $22.507*",
    priceDetail: "(*) UF 0,57 mensual",
    description: "Amplía tu cobertura Fonasa",
    popular: false
  }
];

export const individualFeatures = [
  {
    name: "Cobertura Fonasa",
    values: ["Complementa", "Completa", "Amplía", "Amplía"]
  },
  {
    name: "Accede a diferentes coberturas",
    values: [true, true, true, true]
  },
  {
    name: "Cobertura sobre copago",
    values: ["Hasta 90%", "Hasta 80%", "Hasta 80%", "Hasta 70%"]
  },
  {
    name: "Extensión cobertura catastrófica",
    values: [true, false, true, false]
  },
  {
    name: "Beneficio dental",
    values: [true, true, true, "IntegraMédica"]
  },
  {
    name: "Sin deducible*",
    values: [true, true, true, false]
  },
  {
    name: "Red de prestadores",
    values: ["Premium", "Amplia", "Básica", "IntegraMédica"]
  },
  {
    name: "Urgencias",
    values: [true, true, true, true]
  },
  {
    name: "Hospitalización",
    values: [true, true, true, false]
  },
  {
    name: "Consultas médicas",
    values: [true, true, true, true]
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
