import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { trackFormSubmit, trackWhatsAppClick } from "@/lib/analytics";
import heroImage from "@/assets/contacto-hero.jpg";
import { z } from "zod";

// Chilean RUT validation
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
  const calculatedDv = expectedDv === 11 ? '0' : expectedDv === 10 ? 'K' : String(expectedDv);
  
  return dv === calculatedDv;
};

// Form validation schema
const formSchema = z.object({
  nombre: z.string().min(3, "Nombre debe tener al menos 3 caracteres").max(100, "Nombre muy largo"),
  email: z.string().email("Email inválido").max(255, "Email muy largo"),
  telefono: z.string().min(8, "Teléfono debe tener al menos 8 dígitos").max(15, "Teléfono muy largo"),
  edad: z.string().refine((val) => {
    const num = parseInt(val);
    return num >= 18 && num <= 120;
  }, "Edad debe estar entre 18 y 120 años"),
  rut: z.string().refine(validateRut, "RUT inválido"),
  isapreActual: z.string().min(1, "Seleccione una Isapre"),
  rangoSueldo: z.string().min(1, "Seleccione un rango de sueldo"),
  cantidadCargas: z.string().min(1, "Seleccione cantidad de cargas"),
  region: z.string().min(1, "Seleccione una región"),
  mensaje: z.string().max(1000, "Mensaje muy largo").optional(),
});

type FormData = z.infer<typeof formSchema>;

const ISAPRES = [
  "Fonasa",
  "Banmédica",
  "Colmena",
  "Consalud",
  "CruzBlanca",
  "Nueva Masvida",
  "Vida Tres",
  "Otra",
];

const RANGOS_SUELDO = [
  "Menos de $500.000",
  "$500.000 - $1.000.000",
  "$1.000.000 - $1.500.000",
  "$1.500.000 - $2.000.000",
  "$2.000.000 - $3.000.000",
  "Más de $3.000.000",
];

const CANTIDAD_CARGAS = ["0", "1", "2", "3", "4", "5 o más"];

const REGIONES = [
  "Arica y Parinacota",
  "Tarapacá",
  "Antofagasta",
  "Atacama",
  "Coquimbo",
  "Valparaíso",
  "Metropolitana",
  "O'Higgins",
  "Maule",
  "Ñuble",
  "Biobío",
  "Araucanía",
  "Los Ríos",
  "Los Lagos",
  "Aysén",
  "Magallanes",
];

const Contacto = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    edad: "",
    rut: "",
    isapreActual: "",
    rangoSueldo: "",
    cantidadCargas: "",
    region: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const result = formSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof FormData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      toast({
        title: "Error en el formulario",
        description: "Por favor, corrige los campos marcados",
        variant: "destructive",
      });
      return;
    }
    
    setErrors({});
    
    // Track form submission
    trackFormSubmit('contact_form');
    trackWhatsAppClick('contact_form');
    
    // Create WhatsApp message
    const whatsappMessage = `*Nueva Cotización de Isapre*

*Nombre:* ${formData.nombre}
*Email:* ${formData.email}
*Teléfono:* +56 ${formData.telefono}
*Edad:* ${formData.edad} años
*RUT:* ${formData.rut}
*Isapre Actual:* ${formData.isapreActual}
*Rango de Sueldo:* ${formData.rangoSueldo}
*Cantidad de Cargas:* ${formData.cantidadCargas}
*Región:* ${formData.region}
${formData.mensaje ? `*Mensaje:* ${formData.mensaje}` : ''}`;
    
    const whatsappUrl = `https://wa.me/56928360499?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "¡Gracias por tu solicitud!",
      description: "Te contactaremos pronto por WhatsApp",
    });
    
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      edad: "",
      rut: "",
      isapreActual: "",
      rangoSueldo: "",
      cantidadCargas: "",
      region: "",
      mensaje: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Format RUT as user types
  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9kK]/g, '').toUpperCase();
    if (value.length > 1) {
      const dv = value.slice(-1);
      const body = value.slice(0, -1);
      const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      value = `${formattedBody}-${dv}`;
    }
    setFormData(prev => ({ ...prev, rut: value }));
    if (errors.rut) {
      setErrors(prev => ({ ...prev, rut: undefined }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section with Form */}
      <section className="relative min-h-[800px] flex items-center overflow-hidden py-12 lg:py-20">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Familia feliz con su plan de salud"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-primary/80" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left side - Title */}
            <div className="text-white">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6 leading-tight">
                Encontramos<br />
                tu <span className="font-bold">Plan de<br />Isapre Ideal</span>
              </h1>
              <p className="text-xl text-white/90">
                Cotiza planes de isapres en un solo lugar.
              </p>
            </div>
            
            {/* Right side - Form */}
            <div className="bg-primary/95 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Nombre y Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-white mb-1">
                      Nombre <span className="text-red-400">*</span>
                    </label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Ingrese su nombre y apellido"
                      className={`bg-white border-0 ${errors.nombre ? 'ring-2 ring-red-400' : ''}`}
                    />
                    {errors.nombre && <p className="text-red-300 text-xs mt-1">{errors.nombre}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                      Correo Electrónico <span className="text-red-400">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Ingrese su correo electrónico"
                      className={`bg-white border-0 ${errors.email ? 'ring-2 ring-red-400' : ''}`}
                    />
                    {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Row 2: Teléfono y Edad */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-white mb-1">
                      Teléfono <span className="text-red-400">*</span>
                    </label>
                    <div className="flex">
                      <div className="flex items-center bg-white rounded-l-md px-3 border-r border-gray-200">
                        <span className="text-lg">🇨🇱</span>
                        <span className="ml-1 text-sm text-muted-foreground">+56</span>
                      </div>
                      <Input
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="Ingrese su numero de Tel"
                        className={`bg-white border-0 rounded-l-none ${errors.telefono ? 'ring-2 ring-red-400' : ''}`}
                      />
                    </div>
                    {errors.telefono && <p className="text-red-300 text-xs mt-1">{errors.telefono}</p>}
                  </div>
                  <div>
                    <label htmlFor="edad" className="block text-sm font-medium text-white mb-1">
                      Edad <span className="text-red-400">*</span>
                    </label>
                    <Input
                      id="edad"
                      name="edad"
                      type="number"
                      min="18"
                      max="120"
                      value={formData.edad}
                      onChange={handleChange}
                      placeholder="Ingrese su edad"
                      className={`bg-white border-0 ${errors.edad ? 'ring-2 ring-red-400' : ''}`}
                    />
                    {errors.edad && <p className="text-red-300 text-xs mt-1">{errors.edad}</p>}
                  </div>
                </div>

                {/* Row 3: RUT */}
                <div>
                  <label htmlFor="rut" className="block text-sm font-medium text-white mb-1">
                    RUT <span className="text-red-400">*</span>
                  </label>
                  <Input
                    id="rut"
                    name="rut"
                    value={formData.rut}
                    onChange={handleRutChange}
                    placeholder="Ingresa tu RUT"
                    className={`bg-white border-0 ${errors.rut ? 'ring-2 ring-red-400' : ''}`}
                  />
                  {errors.rut && <p className="text-red-300 text-xs mt-1">{errors.rut}</p>}
                </div>

                {/* Row 4: Isapre Actual */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Isapre Actual <span className="text-red-400">*</span>
                  </label>
                  <Select value={formData.isapreActual} onValueChange={(value) => handleSelectChange('isapreActual', value)}>
                    <SelectTrigger className={`bg-white border-0 ${errors.isapreActual ? 'ring-2 ring-red-400' : ''}`}>
                      <SelectValue placeholder="Seleccionar Isapre actual" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {ISAPRES.map((isapre) => (
                        <SelectItem key={isapre} value={isapre}>{isapre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.isapreActual && <p className="text-red-300 text-xs mt-1">{errors.isapreActual}</p>}
                </div>

                {/* Row 5: Rango de sueldo y Cantidad de Cargas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">
                      Rango de sueldo <span className="text-red-400">*</span>
                    </label>
                    <Select value={formData.rangoSueldo} onValueChange={(value) => handleSelectChange('rangoSueldo', value)}>
                      <SelectTrigger className={`bg-white border-0 ${errors.rangoSueldo ? 'ring-2 ring-red-400' : ''}`}>
                        <SelectValue placeholder="Rango de Sueldo" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {RANGOS_SUELDO.map((rango) => (
                          <SelectItem key={rango} value={rango}>{rango}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.rangoSueldo && <p className="text-red-300 text-xs mt-1">{errors.rangoSueldo}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">
                      Cantidad de Cargas <span className="text-red-400">*</span>
                    </label>
                    <Select value={formData.cantidadCargas} onValueChange={(value) => handleSelectChange('cantidadCargas', value)}>
                      <SelectTrigger className={`bg-white border-0 ${errors.cantidadCargas ? 'ring-2 ring-red-400' : ''}`}>
                        <SelectValue placeholder="Cantidad de Cargas" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {CANTIDAD_CARGAS.map((cantidad) => (
                          <SelectItem key={cantidad} value={cantidad}>{cantidad}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.cantidadCargas && <p className="text-red-300 text-xs mt-1">{errors.cantidadCargas}</p>}
                  </div>
                </div>

                {/* Row 6: Región */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Región <span className="text-red-400">*</span>
                  </label>
                  <Select value={formData.region} onValueChange={(value) => handleSelectChange('region', value)}>
                    <SelectTrigger className={`bg-white border-0 ${errors.region ? 'ring-2 ring-red-400' : ''}`}>
                      <SelectValue placeholder="Seleccione su Región" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {REGIONES.map((region) => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.region && <p className="text-red-300 text-xs mt-1">{errors.region}</p>}
                </div>

                {/* Row 7: Mensaje */}
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-white mb-1">
                    Mensaje
                  </label>
                  <Textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Opcionalmente podrás indicarnos el valor de tu plan actual, edad de tus cargas, clínicas o isapres de preferencia, si cuentas con algún seguro complementario, etc."
                    rows={4}
                    className={`bg-white border-0 resize-none ${errors.mensaje ? 'ring-2 ring-red-400' : ''}`}
                  />
                  {errors.mensaje && <p className="text-red-300 text-xs mt-1">{errors.mensaje}</p>}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 text-lg">
                    Cotizar Ahora
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <main className="flex-1 py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Información de Contacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">WhatsApp</p>
                      <a 
                        href="https://wa.me/56928360499" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-smooth"
                      >
                        +56 9 2836 0499
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <a 
                        href="mailto:contacto@cotizatuplanhoy.cl"
                        className="text-muted-foreground hover:text-primary transition-smooth"
                      >
                        contacto@cotizatuplanhoy.cl
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Ubicación</p>
                      <p className="text-muted-foreground">Chile</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Horario de Atención</p>
                      <p className="text-muted-foreground">
                        Lunes a Viernes: 9:00 - 18:00<br />
                        Sábados: 10:00 - 14:00
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card gradient-primary text-white mt-8">
              <CardContent className="pt-6 text-center">
                <h3 className="text-xl font-bold mb-3">¿Necesitas una respuesta inmediata?</h3>
                <p className="mb-4 text-white/90">
                  Contáctanos por WhatsApp y te responderemos al instante
                </p>
                <a
                  href="https://wa.me/56928360499"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-white text-primary hover:bg-white/90">
                    <Phone className="mr-2 h-4 w-4" />
                    Abrir WhatsApp
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contacto;
