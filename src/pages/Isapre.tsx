import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Check, Phone, Heart } from 'lucide-react';
import heroImage from '@/assets/isapre-hero.jpg';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { trackFormSubmit, trackWhatsAppClick } from '@/lib/analytics';
import {
	productWithOfferSchema,
	buildImageObjects,
} from '@/lib/structured-data';
import { z } from 'zod';

// Whatsapp Isapre message functions
const isapreWhatsappMessage =
	'Hola, me gustaría obtener más información de planes de Isapre.';
const isapreWhatsappUrl = `https://wa.me/56928360499?text=${encodeURIComponent(
	isapreWhatsappMessage
)}`;

// RUT validation and form schema (copied from Contacto)
const validateRut = (rut: string): boolean => {
	if (!rut || rut.length < 8) return false;
	const cleanRut = rut.replace(/[.-]/g, '').toUpperCase();
	const body = cleanRut.slice(0, -1);
	const dv = cleanRut.slice(-1);

	let sum = 0;
	let multiplier = 2;

	for (let i = body.length - 1; i >= 0; i--) {
		sum += parseInt(body[i]) * multiplier;
		multiplier = multiplier === 7 ? 2 : multiplier + 1;
	}

	const expectedDv = 11 - (sum % 11);
	const calculatedDv =
		expectedDv === 11 ? '0' : expectedDv === 10 ? 'K' : String(expectedDv);

	return dv === calculatedDv;
};

const formSchema = z.object({
	nombre: z
		.string()
		.min(3, 'Nombre debe tener al menos 3 caracteres')
		.max(100, 'Nombre muy largo'),
	email: z.string().email('Email inválido').max(255, 'Email muy largo'),
	telefono: z
		.string()
		.min(8, 'Teléfono debe tener al menos 8 dígitos')
		.max(15, 'Teléfono muy largo'),
	edad: z.string().refine((val) => {
		const num = parseInt(val);
		return num >= 18 && num <= 120;
	}, 'Edad debe estar entre 18 y 120 años'),
	rut: z.string().refine(validateRut, 'RUT inválido'),
	isapreActual: z.string().min(1, 'Seleccione una Isapre'),
	rangoSueldo: z.string().min(1, 'Seleccione un rango de sueldo'),
	cantidadCargas: z.string().min(1, 'Seleccione cantidad de cargas'),
	region: z.string().min(1, 'Seleccione una región'),
	mensaje: z.string().max(1000, 'Mensaje muy largo').optional(),
});

type FormData = z.infer<typeof formSchema>;

const ISAPRES = [
	'Fonasa',
	'Banmédica',
	'Colmena',
	'Consalud',
	'CruzBlanca',
	'Nueva Masvida',
	'Vida Tres',
	'Otra',
];

const RANGOS_SUELDO = [
	'Menos de $500.000',
	'$500.000 - $1.000.000',
	'$1.000.000 - $1.500.000',
	'$1.500.000 - $2.000.000',
	'$2.000.000 - $3.000.000',
	'Más de $3.000.000',
];

const CANTIDAD_CARGAS = ['0', '1', '2', '3', '4', '5 o más'];

const REGIONES = [
	'Arica y Parinacota',
	'Tarapacá',
	'Antofagasta',
	'Atacama',
	'Coquimbo',
	'Valparaíso',
	'Metropolitana',
	"O'Higgins",
	'Maule',
	'Ñuble',
	'Biobío',
	'Araucanía',
	'Los Ríos',
	'Los Lagos',
	'Aysén',
	'Magallanes',
];
const Isapre = () => {
	const { toast } = useToast();
	const [formData, setFormData] = useState<FormData>({
		nombre: '',
		email: '',
		telefono: '',
		edad: '',
		rut: '',
		isapreActual: '',
		rangoSueldo: '',
		cantidadCargas: '',
		region: '',
		mensaje: '',
	});
	const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
		{}
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const result = formSchema.safeParse(formData);

		if (!result.success) {
			const fieldErrors: Partial<Record<keyof FormData, string>> = {};
			result.error.errors.forEach((error) => {
				const field = error.path[0] as keyof FormData;
				fieldErrors[field] = error.message;
			});
			setErrors(fieldErrors);
			toast({
				title: 'Error en el formulario',
				description: 'Por favor, corrige los campos marcados',
				variant: 'destructive',
			});
			return;
		}

		setErrors({});
		trackFormSubmit('isapre_quoter');
		trackWhatsAppClick('isapre_form');

		const whatsappMessage = `*Nueva Cotización de Isapre*\n\n*Nombre:* ${
			formData.nombre
		}\n*Email:* ${formData.email}\n*Teléfono:* +56 ${
			formData.telefono
		}\n*Edad:* ${formData.edad} años\n*RUT:* ${
			formData.rut
		}\n*Isapre Actual:* ${formData.isapreActual}\n*Rango de Sueldo:* ${
			formData.rangoSueldo
		}\n*Cantidad de Cargas:* ${formData.cantidadCargas}\n*Región:* ${
			formData.region
		}\n${formData.mensaje ? `*Mensaje:* ${formData.mensaje}` : ''}`;
		const whatsappUrl = `https://wa.me/56928360499?text=${encodeURIComponent(
			whatsappMessage
		)}`;
		window.open(whatsappUrl, '_blank');

		toast({
			title: '¡Gracias por tu solicitud!',
			description: 'Te contactaremos pronto por WhatsApp',
		});

		setFormData({
			nombre: '',
			email: '',
			telefono: '',
			edad: '',
			rut: '',
			isapreActual: '',
			rangoSueldo: '',
			cantidadCargas: '',
			region: '',
			mensaje: '',
		});
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name as keyof FormData]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	const handleSelectChange = (name: keyof FormData, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value.replace(/[^0-9kK]/g, '').toUpperCase();
		if (value.length > 1) {
			const dv = value.slice(-1);
			const body = value.slice(0, -1);
			const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
			value = `${formattedBody}-${dv}`;
		}
		setFormData((prev) => ({ ...prev, rut: value }));
		if (errors.rut) {
			setErrors((prev) => ({ ...prev, rut: undefined }));
		}
	};

	const isapreProduct = productWithOfferSchema({
		name: 'Cotiza tu Plan de Isapre',
		description:
			'Formulario para cotizar planes de Isapre y enviar solicitudes por WhatsApp',
		category: 'Isapre',
	});
	isapreProduct.image = buildImageObjects('logo');

	return (
		<div className='min-h-screen flex flex-col'>
			<Header />
			<main className='flex-1'>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(isapreProduct) }}
				/>
				{/* Hero Section with Image */}
				<section className='relative h-[400px] flex items-center justify-center overflow-hidden'>
					<div className='absolute inset-0'>
						<img
							src={heroImage}
							alt='Profesionales de la salud con planes Isapre CruzBlanca'
							className='w-full h-full object-cover'
						/>
						<div className='absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/75 to-accent/65' />
					</div>
					<div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
						<div className='max-w-4xl mx-auto text-center text-white'>
							<div className='flex justify-center mb-4'>
								<Heart className='h-16 w-16 text-white' />
							</div>
							<h1 className='text-4xl sm:text-5xl font-bold mb-6'>
								Encontramos tu Plan de Isapre Ideal
							</h1>
							<p className='text-xl text-white/90'>
								Cotiza planes de isapres en un solo lugar y obtén la mejor
								cobertura para ti y tu familia.
							</p>
						</div>
					</div>
				</section>

				{/* Content Section */}
				<section className='py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5'>
					<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
						<div className='max-w-6xl mx-auto'>
							<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch'>
								{/* Cotización Isapre */}
								<div>
									<Card className='shadow-card'>
										<CardHeader>
											<CardTitle>Cotiza tu Plan de Isapre</CardTitle>
											<CardDescription>
												Completa el formulario y te contactaremos por WhatsApp
												con opciones personalizadas
											</CardDescription>
										</CardHeader>
										<CardContent>
											{/* Detailed form copied from Contacto.tsx */}
											<form onSubmit={handleSubmit} className='space-y-4'>
												{/* Row 1: Nombre y Email */}
												<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
													<div>
														<label
															htmlFor='nombre'
															className='block text-sm font-medium mb-2'
														>
															Nombre <span className='text-destructive'>*</span>
														</label>
														<Input
															id='nombre'
															name='nombre'
															value={formData.nombre}
															onChange={handleChange}
															placeholder='Ingrese su nombre y apellido'
															className={
																errors.nombre ? 'border-destructive' : ''
															}
														/>
														{errors.nombre && (
															<p className='text-destructive text-xs mt-1'>
																{errors.nombre}
															</p>
														)}
													</div>
													<div>
														<label
															htmlFor='email'
															className='block text-sm font-medium mb-2'
														>
															Correo Electrónico{' '}
															<span className='text-destructive'>*</span>
														</label>
														<Input
															id='email'
															name='email'
															type='email'
															value={formData.email}
															onChange={handleChange}
															placeholder='Ingrese su correo electrónico'
															className={
																errors.email ? 'border-destructive' : ''
															}
														/>
														{errors.email && (
															<p className='text-destructive text-xs mt-1'>
																{errors.email}
															</p>
														)}
													</div>
												</div>

												{/* Row 2: Teléfono y Edad */}
												<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
													<div>
														<label
															htmlFor='telefono'
															className='block text-sm font-medium mb-2'
														>
															Teléfono{' '}
															<span className='text-destructive'>*</span>
														</label>
														<div className='flex'>
															<div className='flex items-center bg-muted rounded-l-md px-3 border border-r-0 border-input'>
																<span className='text-lg'>🇨🇱</span>
																<span className='ml-1 text-sm text-muted-foreground'>
																	+56
																</span>
															</div>
															<Input
																id='telefono'
																name='telefono'
																value={formData.telefono}
																onChange={handleChange}
																placeholder='9 1234 5678'
																className={`rounded-l-none ${
																	errors.telefono ? 'border-destructive' : ''
																}`}
															/>
														</div>
														{errors.telefono && (
															<p className='text-destructive text-xs mt-1'>
																{errors.telefono}
															</p>
														)}
													</div>
													<div>
														<label
															htmlFor='edad'
															className='block text-sm font-medium mb-2'
														>
															Edad <span className='text-destructive'>*</span>
														</label>
														<Input
															id='edad'
															name='edad'
															type='number'
															min='18'
															max='120'
															value={formData.edad}
															onChange={handleChange}
															placeholder='Ingrese su edad'
															className={
																errors.edad ? 'border-destructive' : ''
															}
														/>
														{errors.edad && (
															<p className='text-destructive text-xs mt-1'>
																{errors.edad}
															</p>
														)}
													</div>
												</div>

												{/* Row 3: RUT */}
												<div>
													<label
														htmlFor='rut'
														className='block text-sm font-medium mb-2'
													>
														RUT <span className='text-destructive'>*</span>
													</label>
													<Input
														id='rut'
														name='rut'
														value={formData.rut}
														onChange={handleRutChange}
														placeholder='12.345.678-9'
														className={errors.rut ? 'border-destructive' : ''}
													/>
													{errors.rut && (
														<p className='text-destructive text-xs mt-1'>
															{errors.rut}
														</p>
													)}
												</div>

												{/* Row 4: Isapre Actual */}
												<div>
													<label className='block text-sm font-medium mb-2'>
														Isapre Actual{' '}
														<span className='text-destructive'>*</span>
													</label>
													<Select
														value={formData.isapreActual}
														onValueChange={(value) =>
															handleSelectChange('isapreActual', value)
														}
													>
														<SelectTrigger
															className={
																errors.isapreActual ? 'border-destructive' : ''
															}
														>
															<SelectValue placeholder='Seleccionar Isapre actual' />
														</SelectTrigger>
														<SelectContent className='bg-background'>
															{ISAPRES.map((isapre) => (
																<SelectItem key={isapre} value={isapre}>
																	{isapre}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													{errors.isapreActual && (
														<p className='text-destructive text-xs mt-1'>
															{errors.isapreActual}
														</p>
													)}
												</div>

												{/* Row 5: Rango de sueldo y Cantidad de Cargas */}
												<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
													<div>
														<label className='block text-sm font-medium mb-2'>
															Rango de sueldo{' '}
															<span className='text-destructive'>*</span>
														</label>
														<Select
															value={formData.rangoSueldo}
															onValueChange={(value) =>
																handleSelectChange('rangoSueldo', value)
															}
														>
															<SelectTrigger
																className={
																	errors.rangoSueldo ? 'border-destructive' : ''
																}
															>
																<SelectValue placeholder='Rango de Sueldo' />
															</SelectTrigger>
															<SelectContent className='bg-background'>
																{RANGOS_SUELDO.map((rango) => (
																	<SelectItem key={rango} value={rango}>
																		{rango}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
														{errors.rangoSueldo && (
															<p className='text-destructive text-xs mt-1'>
																{errors.rangoSueldo}
															</p>
														)}
													</div>
													<div>
														<label className='block text-sm font-medium mb-2'>
															Cantidad de Cargas{' '}
															<span className='text-destructive'>*</span>
														</label>
														<Select
															value={formData.cantidadCargas}
															onValueChange={(value) =>
																handleSelectChange('cantidadCargas', value)
															}
														>
															<SelectTrigger
																className={
																	errors.cantidadCargas
																		? 'border-destructive'
																		: ''
																}
															>
																<SelectValue placeholder='Cantidad de Cargas' />
															</SelectTrigger>
															<SelectContent className='bg-background'>
																{CANTIDAD_CARGAS.map((cantidad) => (
																	<SelectItem key={cantidad} value={cantidad}>
																		{cantidad}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
														{errors.cantidadCargas && (
															<p className='text-destructive text-xs mt-1'>
																{errors.cantidadCargas}
															</p>
														)}
													</div>
												</div>

												{/* Row 6: Región */}
												<div>
													<label className='block text-sm font-medium mb-2'>
														Región <span className='text-destructive'>*</span>
													</label>
													<Select
														value={formData.region}
														onValueChange={(value) =>
															handleSelectChange('region', value)
														}
													>
														<SelectTrigger
															className={
																errors.region ? 'border-destructive' : ''
															}
														>
															<SelectValue placeholder='Seleccione su Región' />
														</SelectTrigger>
														<SelectContent className='bg-background'>
															{REGIONES.map((region) => (
																<SelectItem key={region} value={region}>
																	{region}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													{errors.region && (
														<p className='text-destructive text-xs mt-1'>
															{errors.region}
														</p>
													)}
												</div>

												{/* Row 7: Mensaje */}
												<div>
													<label
														htmlFor='mensaje'
														className='block text-sm font-medium mb-2'
													>
														Mensaje
													</label>
													<Textarea
														id='mensaje'
														name='mensaje'
														value={formData.mensaje}
														onChange={handleChange}
														placeholder='Opcionalmente podrás indicarnos el valor de tu plan actual, edad de tus cargas, clínicas o isapres de preferencia, si cuentas con algún seguro complementario, etc.'
														rows={4}
														className={
															errors.mensaje ? 'border-destructive' : ''
														}
													/>
													{errors.mensaje && (
														<p className='text-destructive text-xs mt-1'>
															{errors.mensaje}
														</p>
													)}
												</div>

												{/* Submit Button */}
												<Button
													type='submit'
													className='w-full gradient-primary'
												>
													Cotizar Ahora
												</Button>
											</form>
										</CardContent>
									</Card>
								</div>

								<div className='bg-gradient-to-b from-primary/5 to-white p-8 rounded-lg shadow-lg border border-primary/10 ring-1 ring-primary/5 h-full flex flex-col justify-between min-h-0'>
									<h3 className='text-2xl font-bold mb-6 text-center'>
										¿Por qué elegir CruzBlanca?
										<span className='ml-3 inline-flex items-center bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold px-3 py-1 rounded-full'>
											Recomendado
										</span>
									</h3>
									<div className='flex flex-col gap-6 my-10 flex-1 justify-center'>
										<div className='text-center p-4 bg-white/80 rounded-lg shadow-sm'>
											<div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3'>
												<Heart className='h-6 w-6 text-primary' />
											</div>
											<p className='font-semibold mb-2'>Red Extensa</p>
											<p className='text-sm text-muted-foreground'>
												Miles de prestadores en todo Chile
											</p>
										</div>
										<div className='text-center p-4 bg-white/80 rounded-lg shadow-sm'>
											<div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3'>
												<Check className='h-6 w-6 text-primary' />
											</div>
											<p className='font-semibold mb-2'>Bonificación Alta</p>
											<p className='text-sm text-muted-foreground'>
												Las mejores coberturas del mercado
											</p>
										</div>
										<div className='text-center p-4 bg-white/80 rounded-lg shadow-sm'>
											<div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3'>
												<Phone className='h-6 w-6 text-primary' />
											</div>
											<p className='font-semibold mb-2'>Atención 24/7</p>
											<p className='text-sm text-muted-foreground'>
												Siempre disponibles cuando nos necesites
											</p>
										</div>
									</div>
									<div className='text-center'>
										<p className='text-muted-foreground mb-4'>
											¿Necesitas ayuda para elegir el plan ideal?
										</p>
										<a
											href={isapreWhatsappUrl}
											target='_blank'
											rel='noopener noreferrer'
										>
											<Button
												size='lg'
												className='gradient-primary shadow-lg transform hover:-translate-y-0.5 transition'
											>
												<Phone className='mr-2 h-5 w-5' />
												Hablar con un Asesor Isapre
											</Button>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default Isapre;
