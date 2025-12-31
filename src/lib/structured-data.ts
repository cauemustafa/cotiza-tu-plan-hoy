// JSON-LD Structured Data for SEO

// Basic types for structured-data helpers
export type ImageObject = {
	'@type': 'ImageObject';
	contentUrl: string;
	height: number;
	width: number;
	encodingFormat: string;
};

export type Offer = {
	'@type': 'Offer';
	price?: number;
	priceCurrency?: string;
	availability?: string;
};

export type ProductWithOffer = {
	'@context': string;
	'@type': 'Product';
	name: string;
	description: string;
	category: string;
	brand: { '@type': string; name: string };
	offers: Offer | Offer[];
	image?: ImageObject[];
};

// CDN base (override with VITE_CDN_BASE)
const CDN_BASE =
	(import.meta.env.VITE_CDN_BASE as string | undefined) ||
	'https://cotizatuplanhoy.cl';
const cdn = (path: string) =>
	`${CDN_BASE}${path.startsWith('/') ? '' : '/'}${path}`;

export const buildImageObjects = (baseName: string): ImageObject[] => [
	{
		'@type': 'ImageObject',
		contentUrl: cdn(`/assets/optimized/${baseName}-192.webp`),
		height: 192,
		width: 192,
		encodingFormat: 'image/webp',
	},
	{
		'@type': 'ImageObject',
		contentUrl: cdn(`/assets/optimized/${baseName}-512.webp`),
		height: 512,
		width: 512,
		encodingFormat: 'image/webp',
	},
	{
		'@type': 'ImageObject',
		contentUrl: cdn(`/assets/optimized/${baseName}-512.png`),
		height: 512,
		width: 512,
		encodingFormat: 'image/png',
	},
];

export const organizationSchema = {
	'@context': 'https://schema.org',
	'@type': 'InsuranceAgency',
	name: 'Cotiza Tu Plan Hoy',
	description:
		'Corredora de Seguros de Salud en Chile. Planes Bupa, PYME e Isapre.',
	url: cdn(''),
	logo: cdn('/assets/optimized/logo-512.webp'),
	image: buildImageObjects('logo'),
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
	// Homepage services as Service objects to improve discoverability
	service: [
		{
			'@type': 'Service',
			name: 'Seguros Individuales',
			description:
				'Planes Bupa diseñados para ti y tu familia. Cobertura completa con la mejor calidad.',
			url: cdn('/seguros-individuales'),
		},
		{
			'@type': 'Service',
			name: 'Seguros PYME',
			description:
				'Protege a tu equipo con planes especiales para empresas. Beneficios corporativos.',
			url: cdn('/seguros-pyme'),
		},
		{
			'@type': 'Service',
			name: 'Isapre',
			description:
				'Planes CruzBlanca con cobertura integral. La mejor opción en salud previsional.',
			url: cdn('/isapre'),
		},
	],
};

export const localBusinessSchema = {
	'@context': 'https://schema.org',
	'@type': 'LocalBusiness',
	name: 'Cotiza Tu Plan Hoy',
	image: buildImageObjects('logo'),
	logo: cdn('/assets/optimized/logo-512.webp'),
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

// Offer-enabled Product schema generator
export const productWithOfferSchema = (product: {
	name: string;
	description: string;
	category: string;
	price?: number;
	priceCurrency?: string;
	availability?: string;
}): ProductWithOffer => {
	return {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: product.name,
		description: product.description,
		category: product.category,
		brand: { '@type': 'Brand', name: 'Bupa Seguros Chile' },
		offers: {
			'@type': 'Offer',
			price: product.price ?? undefined,
			priceCurrency: product.priceCurrency ?? 'CLP',
			availability: product.availability ?? 'https://schema.org/InStock',
		},
	};
};

// Website SearchBox (optional)
export const websiteSearchSchema = (
	siteUrl: string,
	queryInput: string = `${siteUrl}/?s={search_term_string}`
) => ({
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	url: siteUrl,
	potentialAction: {
		'@type': 'SearchAction',
		target: queryInput,
		'query-input': 'required name=search_term_string',
	},
});

// Suggested improvements for structured data (prioritized)
export const suggestedImprovements: Array<{
	id: string;
	title: string;
	description: string;
	priority: 'high' | 'medium' | 'low';
}> = [
	{
		id: 'sd-images',
		title: 'Add multi-size ImageObject and WebP fallbacks',
		description:
			'Include multiple `ImageObject` entries (192px, 512px) and explicit `contentUrl` for WebP/PNG fallbacks to improve SEO and social previews.',
		priority: 'high',
	},
	{
		id: 'sd-offers',
		title: 'Add Offer/Product structured data for plans',
		description:
			'Add `Offer` schema for plan prices (when available) to enable rich results for plan offerings.',
		priority: 'medium',
	},
	{
		id: 'sd-logos-sameAs',
		title: 'Add partner logos to `sameAs` and `brand` references',
		description:
			'Reference partner/payer pages and optimized logo URLs on `sameAs` and `brand` to strengthen entity signals.',
		priority: 'medium',
	},
	{
		id: 'searchbox',
		title: 'Add WebSite SearchBox structured data',
		description:
			'Enable SearchBox markup so site search queries can appear in search engine results.',
		priority: 'low',
	},
	{
		id: 'cdn-images',
		title: 'Serve structured-data images from CDN with cache headers',
		description:
			'Host optimized images on CDN with long cache TTL and add `image` urls to structured data to improve load and crawler efficiency.',
		priority: 'high',
	},
	{
		id: 'signed-commits',
		title: 'Repository hygiene & release checklist',
		description:
			'Adopt commit signing and PR-only merges to satisfy branch protection rules previously bypassed on `main`.',
		priority: 'high',
	},
];
