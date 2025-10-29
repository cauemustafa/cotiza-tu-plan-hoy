import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { trackFormSubmit, trackWhatsAppClick } from "@/lib/analytics";

const Contacto = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track form submission
    trackFormSubmit('contact_form');
    trackWhatsAppClick('contact_form');
    
    // Create WhatsApp message
    const whatsappMessage = `Hola! Mi nombre es ${formData.name}.
Email: ${formData.email}
Teléfono: ${formData.phone}

Mensaje: ${formData.message}`;
    
    const whatsappUrl = `https://wa.me/56928360499?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "¡Gracias por tu mensaje!",
      description: "Te contactaremos pronto por WhatsApp",
    });
    
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Contáctanos
              </h1>
              <p className="text-xl text-muted-foreground">
                Estamos aquí para ayudarte a encontrar el seguro perfecto
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Envíanos un Mensaje</CardTitle>
                    <CardDescription>
                      Completa el formulario y te responderemos en menos de 24 horas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Nombre Completo
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Juan Pérez"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="juan@ejemplo.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Teléfono
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+56 9 1234 5678"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Mensaje
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Cuéntanos qué tipo de seguro necesitas..."
                          rows={5}
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full gradient-primary">
                        Enviar Mensaje
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
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
                          href="https://wa.me/56928360499" 
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
                      href="https://wa.me/56928360499"
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
