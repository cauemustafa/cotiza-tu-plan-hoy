import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackFormSubmit } from "@/lib/analytics";
import heroImage from "@/assets/contacto-hero.jpg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const form = useForm<ContactFormInputs>({

    resolver: zodResolver(formSchema),

    defaultValues: {

      fullName: "",

      email: "",

      phone: "",

      message: "",

    },

  });



  const onSubmit = async (values: ContactFormInputs) => {

    trackFormSubmit('contact_form');



    // ORIGINAL CODE: Uncomment for actual API integration
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al enviar el mensaje.');
      }

      setShowConfirmationDialog(true);
      // form.reset() will be called when the dialog is closed
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: error.message || "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }

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

              Contáctanos

            </h1>

            <p className="text-xl text-white/90">

              Estamos aquí para ayudarte a encontrar el seguro perfecto

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

                    <CardTitle>Envíanos un Mensaje</CardTitle>

                    <CardDescription>

                      Completa el formulario y te responderemos en menos de 24 horas

                    </CardDescription>

                  </CardHeader>

                  <CardContent>

                    <Form {...form}>

                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <FormField

                          control={form.control}

                          name="fullName"

                          render={({ field }) => (

                            <FormItem>

                              <FormLabel>Nombre Completo</FormLabel>

                              <FormControl>

                                <Input placeholder="Juan Pérez" {...field} />

                              </FormControl>

                              <FormMessage />

                            </FormItem>

                          )}

                        />

                        <FormField

                          control={form.control}

                          name="email"

                          render={({ field }) => (

                            <FormItem>

                              <FormLabel>Email</FormLabel>

                              <FormControl>

                                <Input placeholder="juan@ejemplo.com" {...field} />

                              </FormControl>

                              <FormMessage />

                            </FormItem>

                          )}

                        />

                        <FormField

                          control={form.control}

                          name="phone"

                          render={({ field }) => (

                            <FormItem>

                              <FormLabel>Teléfono</FormLabel>

                              <FormControl>

                                <Input placeholder="+56 9 1234 5678" {...field} />

                              </FormControl>

                              <FormMessage />

                            </FormItem>

                          )}

                        />

                        <FormField

                          control={form.control}

                          name="message"

                          render={({ field }) => (

                            <FormItem>

                              <FormLabel>Mensaje</FormLabel>

                              <FormControl>

                                <Textarea

                                  placeholder="Cuéntanos qué tipo de seguro necesitas..."

                                  rows={5}

                                  {...field}

                                />

                              </FormControl>

                              <FormMessage />

                            </FormItem>

                          )}

                        />

                        <Button type="submit" className="w-full gradient-primary">

                          Enviar Mensaje

                        </Button>

                      </form>

                    </Form>

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

      <ConfirmationDialog

        isOpen={showConfirmationDialog}

        onClose={() => {

          setShowConfirmationDialog(false);

          form.reset();

        }}

      />

    </div>

  );

};



export default Contacto;
