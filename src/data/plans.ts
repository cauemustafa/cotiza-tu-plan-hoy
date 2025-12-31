// Seguros Individuales Plans - Bupa
const parsePrice = (s?: string) => {
	if (!s) return undefined;
	const match = s.replace(/[^0-9.]/g, '').split('.')[0];
	if (!match) return undefined;
	return Number(match.replace(/\D/g, ''));
};

export const individualPlans = [
	{
		name: 'Bupa Multisalud',
		price: 'Desde $55.501*',
		priceNumber: parsePrice('Desde $55.501*'),
		priceCurrency: 'CLP',
		priceDetail: '(*) UF 1,40 mensual',
		description: '¡Ahora sin deducible!',
		popular: false,
	},
	{
		name: 'Bupa Cuidado Total',
		price: 'Desde $33.879*',
		priceNumber: parsePrice('Desde $33.879*'),
		priceCurrency: 'CLP',
		priceDetail: '(*) UF 0,86 mensual',
		description: '¡Ahora sin deducible!',
		popular: true,
	},
	{
		name: 'Bupa + Protección',
		price: 'Desde $29.546*',
		priceNumber: parsePrice('Desde $29.546*'),
		priceCurrency: 'CLP',
		priceDetail: '(*) UF 0,75 mensual',
		description: '¡Ahora sin deducible!',
		popular: false,
	},
	{
		name: 'Bupa + Protección Ambulatorio 70',
		price: 'Desde $22.507*',
		priceNumber: parsePrice('Desde $22.507*'),
		priceCurrency: 'CLP',
		priceDetail: '(*) UF 0,57 mensual',
		description: 'Amplía tu cobertura Fonasa',
		popular: false,
	},
];

export const individualFeatures = [
	{
		name: 'Cobertura Fonasa',
		values: ['Complementa', 'Complementa', 'Amplía', 'Amplía'],
	},
	{
		name: 'Accede a diferentes coberturas',
		values: [true, true, true, true],
	},
	{
		name: 'Cobertura sobre copago',
		values: ['Hasta 90%', 'Hasta 80%', 'Hasta 80%', 'Hasta 70%'],
	},
	{
		name: 'Extensión cobertura catastrófica',
		values: [true, false, true, false],
	},
	{
		name: 'Beneficio dental',
		values: [true, true, true, true],
	},
	{
		name: 'Sin deducible *Red prestadores Bupa',
		values: [true, true, true, false],
	},
	{
		name: 'Urgencias',
		values: [true, true, true, true],
	},
	{
		name: 'Hospitalización',
		values: [true, true, true, false],
	},
	{
		name: 'Consultas médicas',
		values: [true, true, true, true],
	},
];

// Seguros PYME Plans
export const pymePlans = [
	{
		name: 'PYME 50%',
		price: '$12.411/persona',
		priceNumber: parsePrice('$12.411/persona'),
		priceCurrency: 'CLP',
		priceDetail: '0,3133 UF',
		description: '5 y 350 colaboradores',
		popular: false,
	},
	{
		name: 'PYME 70%',
		price: '$23.134/persona',
		priceNumber: parsePrice('$23.134/persona'),
		priceCurrency: 'CLP',
		priceDetail: '0,5060 UF',
		description: '5 y 350 colaboradores',
		popular: true,
	},
	{
		name: 'PYME 80%',
		price: '$24.271/persona',
		priceNumber: parsePrice('$24.271/persona'),
		priceCurrency: 'CLP',
		priceDetail: '0,6127 UF',
		description: 'Desde 15 colaboradores',
		popular: false,
	},
];

export const pymeFeatures = [
	{
		name: 'Cobertura ambulatoria y hospitalaria',
		values: ['50%', '70%', '80%'],
	},
	{
		name: 'Maximo anual por assegurado (UF)',
		values: ['350 UF', '350 UF', '400 UF'],
	},
	{
		name: 'Consultas médicas y especialidades',
		values: [true, true, true],
	},
	{
		name: 'Maternidad',
		values: [true, true, true],
	},
	{
		name: 'Beneficio dental',
		values: [true, true, true],
	},
	{
		name: 'Imagenología y Examenes',
		values: [true, true, true],
	},
	{
		name: 'Edad maxima de ingreso',
		values: ['69 años', '69 años', '69 años'],
	},
	{
		name: 'Edad maxima de permanencia',
		values: ['75 años', '75 años', '75 años'],
	},
	{
		name: 'Upgrade ambulatorio',
		values: ['80%', '100%', '100%'],
	},
];
