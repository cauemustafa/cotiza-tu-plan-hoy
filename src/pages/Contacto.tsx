import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackFormSubmit, trackWhatsAppClick } from "@/lib/analytics";
import heroImage from "@/assets/contacto-hero.jpg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({

  fullName: z.string()

    .min(3, 'El nombre debe tener al menos 3 caracteres')

    .max(100, 'El nombre no puede superar 100 caracteres')

    .regex(/^[\p{L}\s]+$/u, 'El nombre solo puede contener letras'),

  

  email: z.string()

    .email('Email inválido')

    .toLowerCase(),

  

  phone: z.string()

    .regex(/^(\+56)?[\s]?9[\s]?[0-9]{4}[\s]?[0-9]{4}$/, 'Formato: +56 9 1234 5678'),

  

  message: z.string()

    .max(500, 'El mensaje no puede superar 500 caracteres')

    .optional()

    .nullable(),

});



type ContactFormInputs = z.infer<typeof formSchema>;




const Contacto = () => {

  const { toast } = useToast();

  const form = useForm<ContactFormInputs>({

    resolver: zodResolver(formSchema),

    defaultValues: {

      fullName: "",

      email: "",

      phone: "",

      message: "",

    },

  });

  const { register, handleSubmit, reset, formState: { errors } } = form;

  const onSubmit = (values: ContactFormInputs) => {
    trackFormSubmit('contact_form');

    const message = `Nueva solicitud de cotización\nNombre: ${values.fullName}\nEmail: ${values.email}\nTeléfono: ${values.phone}\nMensaje: ${values.message ?? ''}`;
    const waUrl = `https://wa.me/56928360499?text=${encodeURIComponent(message)}`;

    window.open(waUrl, '_blank');
    trackWhatsAppClick('contact_page');

    toast({
      title: 'Abriendo WhatsApp',
      description: 'Se abrirá una conversación en WhatsApp para completar tu solicitud.',
    });

    reset();
  };



  const genericWhatsappMessage = "Hola, me gustaría obtener más información.";

  const genericWhatsappUrl = `https://wa.me/56928360499?text=${encodeURIComponent(genericWhatsappMessage)}`;




  return (

    <div className="min-h-screen flex flex-col">

      <Header />

      

      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0">

          <img 

            src={heroImage} 

            alt="Atención al cliente profesional"

            className="w-full h-full object-cover"

          />

          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/75 to-accent/65" />

        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="max-w-4xl mx-auto text-center text-white">

            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Encontramos tu Plan de Isapre Ideal
            </h1>

            <p className="text-xl text-white/90">
              Cotiza planes de isapres en un solo lugar
            </p>

          </div>

        </div>

      </section>



      <main className="flex-1 py-20">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-6xl mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              <div>

                <Card className="shadow-card">

                  <CardHeader>
                    <CardTitle>Cotiza tu Plan</CardTitle>
                    <CardDescription>
                      Completa el formulario y te contactaremos con las mejores opciones
                    </CardDescription>

                  </CardHeader>

                  <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      {/* Row 1: Nombre y Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                            Nombre <span className="text-destructive">*</span>
                          </label>
                          <Input
                            id="fullName"
                            {...register('fullName')}
                            placeholder="Ingrese su nombre y apellido"
                            className={errors.fullName ? 'border-destructive' : ''}
                          />
                          {errors.fullName && <p className="text-destructive text-xs mt-1">{String(errors.fullName.message)}</p>}
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Correo Electrónico <span className="text-destructive">*</span>
                          </label>
                          <Input
                            id="email"
                            type="email"
                            {...register('email')}
                            placeholder="Ingrese su correo electrónico"
                            className={errors.email ? 'border-destructive' : ''}
                          />
                          {errors.email && <p className="text-destructive text-xs mt-1">{String(errors.email.message)}</p>}
                        </div>
                      </div>

                      {/* Row 2: Teléfono */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Teléfono <span className="text-destructive">*</span>
                        </label>
                        <div className="flex">
                          <div className="flex items-center bg-muted rounded-l-md px-3 border border-r-0 border-input">
                            <span className="text-lg">🇨🇱</span>
                            <span className="ml-1 text-sm text-muted-foreground">+56</span>
                          </div>
                          <Input
                            id="phone"
                            {...register('phone')}
                            placeholder="9 1234 5678"
                            className="rounded-l-none"
                          />
                        </div>
                        {errors.phone && <p className="text-destructive text-xs mt-1">{String(errors.phone.message)}</p>}
                      </div>

                      {/* Mensaje */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Mensaje
                        </label>
                        <Textarea
                          id="message"
                          {...register('message')}
                          placeholder="Opcionalmente, indícanos detalles para ayudarte mejor"
                          rows={4}
                        />
                        {errors.message && <p className="text-destructive text-xs mt-1">{String(errors.message.message)}</p>}
                      </div>

                      {/* Submit Button */}
                      <Button type="submit" className="w-full gradient-primary">
                        Cotizar Ahora
                      </Button>
                    </form>
                  </CardContent>

                </Card>

              </div>



              <div className="space-y-6">

                <Card className="shadow-card">

                  <CardHeader>

                    <CardTitle>Información de Contacto</CardTitle>

                  </CardHeader>

                  <CardContent className="space-y-6">

                    <div className="flex items-start gap-4">

                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">

                        <Phone className="h-6 w-6 text-primary" />

                      </div>

                      <div>

                        <p className="font-semibold mb-1">WhatsApp</p>

                        <a 

                          href={genericWhatsappUrl} 

                          target="_blank" 

                          rel="noopener noreferrer"

                          className="text-muted-foreground hover:text-primary transition-smooth"

                        >

                          +56 9 2836 0499

                        </a>

                      </div>

                    </div>

                    

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

                    

                    <div className="flex items-start gap-4">

                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">

                        <MapPin className="h-6 w-6 text-primary" />

                      </div>

                      <div>

                        <p className="font-semibold mb-1">Ubicación</p>

                        <p className="text-muted-foreground">Chile</p>

                      </div>

                    </div>

                    

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



                <Card className="shadow-card gradient-primary text-white">

                  <CardContent className="pt-6">

                    <h3 className="text-xl font-bold mb-3">¿Necesitas una respuesta inmediata?</h3>

                    <p className="mb-4 text-white/90">

                      Contáctanos por WhatsApp y te responderemos al instante

                    </p>

                    <a

                      href={genericWhatsappUrl}

                      target="_blank"

                      rel="noopener noreferrer"

                    >

                      <Button className="bg-white text-primary hover:bg-white/90 w-full">

                        <Phone className="mr-2 h-4 w-4" />

                        Abrir WhatsApp

                      </Button>

                    </a>

                  </CardContent>

                </Card>

              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />



    </div>

  );

};



export default Contacto;
