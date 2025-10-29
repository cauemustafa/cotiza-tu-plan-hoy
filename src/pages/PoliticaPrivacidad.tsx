import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PoliticaPrivacidad = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>
            
            <div className="prose prose-lg max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Información que Recopilamos</h2>
                <p className="text-muted-foreground">
                  En Cotiza Tu Plan Hoy, recopilamos información personal que usted nos proporciona voluntariamente cuando solicita una cotización o se comunica con nosotros, incluyendo: nombre, correo electrónico, número de teléfono, y cualquier otra información relevante para proporcionarle nuestros servicios de correduría de seguros.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Uso de la Información</h2>
                <p className="text-muted-foreground">
                  Utilizamos su información personal para:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Proporcionar cotizaciones de seguros personalizadas</li>
                  <li>Comunicarnos con usted sobre nuestros servicios</li>
                  <li>Procesar sus solicitudes de seguros</li>
                  <li>Mejorar nuestros servicios</li>
                  <li>Cumplir con requisitos legales y regulatorios</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Protección de Datos</h2>
                <p className="text-muted-foreground">
                  Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción. Sus datos son tratados con estricta confidencialidad.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Compartir Información</h2>
                <p className="text-muted-foreground">
                  Compartimos su información únicamente con:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Las compañías de seguros con las que trabajamos (Bupa Seguros, CruzBlanca)</li>
                  <li>Proveedores de servicios que nos ayudan a operar nuestro negocio</li>
                  <li>Autoridades cuando sea requerido por ley</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Sus Derechos</h2>
                <p className="text-muted-foreground">
                  Usted tiene derecho a:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Acceder a su información personal</li>
                  <li>Rectificar datos inexactos</li>
                  <li>Solicitar la eliminación de sus datos</li>
                  <li>Oponerse al procesamiento de sus datos</li>
                  <li>Retirar su consentimiento en cualquier momento</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
                <p className="text-muted-foreground">
                  Nuestro sitio web puede utilizar cookies para mejorar su experiencia de navegación. Puede configurar su navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Cambios a esta Política</h2>
                <p className="text-muted-foreground">
                  Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Le notificaremos sobre cambios significativos publicando la nueva política en esta página.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Contacto</h2>
                <p className="text-muted-foreground">
                  Si tiene preguntas sobre esta política de privacidad o sobre cómo manejamos su información personal, contáctenos en:
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

export default PoliticaPrivacidad;
