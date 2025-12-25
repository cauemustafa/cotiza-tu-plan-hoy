// JSON-LD Structured Data for SEO

export const organizationSchema = {
	'@context': 'https://schema.org',
	'@type': 'InsuranceAgency',
	name: 'Cotiza Tu Plan Hoy',
	description:
		'Corredora de Seguros de Salud en Chile. Planes Bupa, PYME e Isapre.',
	url: 'https://cotizatuplanhoy.cl',
	logo: 'https://cotizatuplanhoy.cl/logo-shield.svg',
	image: 'https://cotizatuplanhoy.cl/logo-shield.svg',
	contactPoint: {
		'@type': 'ContactPoint',
		telephone: '+56-9-2836-0499',
		contactType: 'customer service',
		email: 'contacto@cotizatuplanhoy.cl',
		availableLanguage: 'Spanish',
		areaServed: 'CL',
	},
	address: {
		'@type': 'PostalAddress',
		addressCountry: 'CL',
	},
	sameAs: ['https://wa.me/56928360499'],
};

export const localBusinessSchema = {
	'@context': 'https://schema.org',
	'@type': 'LocalBusiness',
	name: 'Cotiza Tu Plan Hoy',
	image: 'https://cotizatuplanhoy.cl/logo-shield.svg',
	logo: 'https://cotizatuplanhoy.cl/logo-shield.svg',
	priceRange: '$$',
	telephone: '+56-9-2836-0499',
	email: 'contacto@cotizatuplanhoy.cl',
	address: {
		'@type': 'PostalAddress',
		addressCountry: 'Chile',
	},
	geo: {
		'@type': 'GeoCoordinates',
		addressCountry: 'CL',
	},
};

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
	'@context': 'https://schema.org',
	'@type': 'FAQPage',
	mainEntity: faqs.map((faq) => ({
		'@type': 'Question',
		name: faq.question,
		acceptedAnswer: {
			'@type': 'Answer',
			text: faq.answer,
		},
	})),
});

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
	'@context': 'https://schema.org',
	'@type': 'BreadcrumbList',
	itemListElement: items.map((item, index) => ({
		'@type': 'ListItem',
		position: index + 1,
		name: item.name,
		item: item.url,
	})),
});

export const productSchema = (product: {
	name: string;
	description: string;
	category: string;
}) => ({
	'@context': 'https://schema.org',
	'@type': 'Product',
	name: product.name,
	description: product.description,
	category: product.category,
	brand: {
		'@type': 'Brand',
		name: 'Bupa Seguros Chile',
	},
	offers: {
		'@type': 'Offer',
		availability: 'https://schema.org/InStock',
		priceCurrency: 'CLP',
	},
});
