import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const TerminosCondiciones = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Términos y Condiciones</h1>
            
            <div className="prose prose-lg max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Aceptación de los Términos</h2>
                <p className="text-muted-foreground">
                  Al acceder y utilizar el sitio web cotizatuplanhoy.cl y nuestros servicios, usted acepta estar sujeto a estos términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Descripción del Servicio</h2>
                <p className="text-muted-foreground">
                  Cotiza Tu Plan Hoy es un servicio de correduría de seguros autorizado que actúa como intermediario entre clientes y compañías de seguros, específicamente Bupa Seguros Chile y CruzBlanca. Proporcionamos:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Cotizaciones de seguros personalizadas</li>
                  <li>Asesoría en la selección de planes</li>
                  <li>Asistencia en el proceso de contratación</li>
                  <li>Soporte continuo durante la vigencia del seguro</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Responsabilidades del Usuario</h2>
                <p className="text-muted-foreground">
                  El usuario se compromete a:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Proporcionar información veraz y actualizada</li>
                  <li>Mantener la confidencialidad de cualquier información de cuenta</li>
                  <li>Notificar inmediatamente cualquier uso no autorizado</li>
                  <li>Cumplir con todas las leyes aplicables</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Limitación de Responsabilidad</h2>
                <p className="text-muted-foreground">
                  Cotiza Tu Plan Hoy actúa como corredor de seguros y no como aseguradora. La responsabilidad por la cobertura y el pago de reclamaciones recae en las compañías de seguros correspondientes (Bupa Seguros, CruzBlanca). No nos hacemos responsables por:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Decisiones de suscripción de las aseguradoras</li>
                  <li>Rechazos de reclamaciones por parte de las aseguradoras</li>
                  <li>Cambios en las condiciones de las pólizas por parte de las aseguradoras</li>
                  <li>Información incorrecta proporcionada por el usuario</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Propiedad Intelectual</h2>
                <p className="text-muted-foreground">
                  Todo el contenido de este sitio web, incluyendo pero no limitado a texto, gráficos, logos, imágenes y software, es propiedad de Cotiza Tu Plan Hoy o sus proveedores de contenido y está protegido por las leyes de propiedad intelectual de Chile.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Cotizaciones y Precios</h2>
                <p className="text-muted-foreground">
                  Las cotizaciones proporcionadas son estimaciones basadas en la información proporcionada y están sujetas a:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Aprobación por parte de la compañía de seguros</li>
                  <li>Verificación de la información proporcionada</li>
                  <li>Evaluación médica cuando sea requerida</li>
                  <li>Cambios en las condiciones del mercado</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Cancelación y Modificación</h2>
                <p className="text-muted-foreground">
                  Los términos de cancelación y modificación de las pólizas están sujetos a las condiciones establecidas por cada compañía de seguros. Consulte las condiciones específicas de su póliza para más información.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Privacidad</h2>
                <p className="text-muted-foreground">
                  El uso de nuestros servicios también está regido por nuestra Política de Privacidad, que describe cómo recopilamos, usamos y protegemos su información personal.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Modificaciones</h2>
                <p className="text-muted-foreground">
                  Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios entrarán en vigencia inmediatamente después de su publicación en el sitio web. Es responsabilidad del usuario revisar periódicamente estos términos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Ley Aplicable</h2>
                <p className="text-muted-foreground">
                  Estos términos y condiciones se rigen por las leyes de la República de Chile. Cualquier disputa será resuelta en los tribunales competentes de Chile.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Contacto</h2>
                <p className="text-muted-foreground">
                  Para preguntas sobre estos términos y condiciones, contáctenos en:
                </p>
                <p className="text-muted-foreground mt-2">
                  Email: contacto@cotizatuplanhoy.cl<br />
                  WhatsApp: +56 9 2836 0499
                </p>
              </section>

              <p className="text-sm text-muted-foreground mt-8">
                Última actualización: {new Date().toLocaleDateString('es-CL')}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TerminosCondiciones;
