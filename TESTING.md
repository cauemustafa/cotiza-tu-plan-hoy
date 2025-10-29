# Testing Guide - Cotiza Tu Plan Hoy

## Testing Checklist Fase 3

### ✅ Funcionalidad Core

#### Navegación
- [ ] Header links funcionan en todas las páginas
- [ ] Footer links funcionan correctamente
- [ ] Navegación mobile con hamburger menu
- [ ] Scroll suave en navegación interna
- [ ] 404 page funciona para rutas inexistentes

#### Páginas Principales
- [ ] Home: Todos los componentes cargan correctamente
- [ ] Seguros Individuales: Tabla comparativa funciona
- [ ] Seguros PYME: Calculadora funciona correctamente
- [ ] Isapre: Contenido se muestra correctamente
- [ ] Contacto: Formulario valida correctamente

#### Componentes Interactivos
- [ ] WhatsApp floating button abre chat
- [ ] Sticky CTA bar aparece al scroll
- [ ] Scroll to top button funciona
- [ ] Cookie consent guarda preferencias
- [ ] Accordion FAQ expande/colapsa
- [ ] Calculadora PYME valida input correctamente
- [ ] Toast notifications se muestran

### 🔍 Testing Manual

#### Desktop (Chrome, Firefox, Safari, Edge)
```
Resoluciones a probar:
- 1920x1080 (Full HD)
- 1366x768 (Laptop común)
- 2560x1440 (2K)
```

**Checklist Desktop:**
- [ ] Layout se ve correctamente
- [ ] Hover effects funcionan
- [ ] Animaciones son suaves
- [ ] Formularios validan input
- [ ] Links externos abren en nueva pestaña
- [ ] No hay console errors

#### Mobile (iOS Safari, Chrome Android)
```
Dispositivos a probar:
- iPhone SE (375px)
- iPhone 12/13 (390px)
- iPhone 14 Pro Max (430px)
- Samsung Galaxy S21 (360px)
- iPad (768px)
```

**Checklist Mobile:**
- [ ] Mobile menu funciona
- [ ] Tablas se convierten en accordion
- [ ] Touch targets tienen tamaño adecuado (min 44x44px)
- [ ] Formularios son accesibles con teclado móvil
- [ ] WhatsApp button no bloquea contenido
- [ ] Sticky bar no interfiere con navegación
- [ ] Scroll suave funciona
- [ ] Orientación landscape funciona

#### Tablet (iPad, Android tablets)
```
Resoluciones:
- 768x1024 (iPad)
- 810x1080 (Android)
```

**Checklist Tablet:**
- [ ] Layout adaptado correctamente
- [ ] Touch interactions funcionan
- [ ] Tablas legibles
- [ ] Navegación intuitiva

### 🚀 Performance Testing

#### Lighthouse Audit
```bash
# Ejecutar en producción
lighthouse https://cotizatuplanhoy.cl --view

# Targets:
Performance: > 90
Accessibility: > 95
Best Practices: > 90
SEO: > 95
```

**Checklist Performance:**
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] No unused JavaScript > 10%
- [ ] Images optimizadas
- [ ] Fonts cargadas eficientemente

#### Network Testing
```bash
# Test con throttling
Chrome DevTools > Network > Throttling:
- Fast 3G
- Slow 3G
- Offline
```

**Checklist Network:**
- [ ] Página carga en 3G lento
- [ ] Loading states visibles
- [ ] Offline page (si implementado)
- [ ] No failed requests críticos
- [ ] Assets cacheados correctamente

### ♿ Accessibility Testing

#### Manual Testing
**Checklist A11y:**
- [ ] Navegación con teclado (Tab, Enter, Escape)
- [ ] Screen reader compatible (NVDA/JAWS)
- [ ] Contraste de colores WCAG AA (min 4.5:1)
- [ ] Alt text en todas las imágenes
- [ ] Labels en inputs de formularios
- [ ] Focus visible en elementos interactivos
- [ ] Heading hierarchy correcta (H1 > H2 > H3)
- [ ] ARIA labels donde necesarios

#### Herramientas
```bash
# axe DevTools (Chrome Extension)
# WAVE (Web Accessibility Evaluation Tool)
# Lighthouse Accessibility Audit
```

### 🔐 Security Testing

**Checklist Security:**
- [ ] No console.log con datos sensibles
- [ ] Validación de formularios client-side
- [ ] Links externos con rel="noopener noreferrer"
- [ ] HTTPS en producción
- [ ] No XSS vulnerabilities
- [ ] CSP headers configurados (producción)

### 📱 Cross-Browser Testing

#### Browsers a Probar
- [ ] Chrome (últimas 2 versiones)
- [ ] Firefox (últimas 2 versiones)
- [ ] Safari (últimas 2 versiones)
- [ ] Edge (últimas 2 versiones)
- [ ] Samsung Internet (Android)

#### Herramientas
- BrowserStack: https://www.browserstack.com/
- LambdaTest: https://www.lambdatest.com/
- CrossBrowserTesting

### 📧 Form Testing

#### Contacto Form
**Checklist:**
- [ ] Validación de email
- [ ] Validación de teléfono chileno
- [ ] Campo de mensaje required
- [ ] Error messages claros
- [ ] Success feedback visible
- [ ] No envío si campos inválidos
- [ ] Loading state durante envío
- [ ] WhatsApp link funciona

#### Calculadora PYME
**Checklist:**
- [ ] Valida número mínimo (5)
- [ ] Muestra error para input inválido
- [ ] Calcula precio correctamente
- [ ] Muestra plan adecuado por rango
- [ ] Formatea moneda chilena
- [ ] Animation suave de resultados
- [ ] CTA a WhatsApp funciona

### 🔄 Integration Testing

#### Analytics
**Checklist:**
- [ ] Pageviews se registran
- [ ] Events de WhatsApp se trackean
- [ ] Form submits se trackean
- [ ] Plan selections se trackean
- [ ] User journey visible en GA4

#### Third-Party Services
**Checklist:**
- [ ] WhatsApp links abren correctamente
- [ ] Phone links funcionan en mobile
- [ ] Google Analytics carga
- [ ] Fonts de Google cargan

### 📊 SEO Testing

**Checklist:**
- [ ] Meta tags en todas las páginas
- [ ] Open Graph tags configurados
- [ ] Structured Data válido (JSON-LD)
- [ ] Sitemap.xml accesible
- [ ] Robots.txt configurado
- [ ] Canonical URLs correctos
- [ ] Heading hierarchy correcta
- [ ] Alt text en imágenes
- [ ] URLs descriptivas
- [ ] 404 page configurada

#### Herramientas
```bash
# Google Search Console
# Screaming Frog
# Schema.org Validator: https://validator.schema.org/
# Google Rich Results Test
```

### 🐛 Bug Tracking Template

```markdown
### Bug Report

**Título:** [Descripción breve]

**Severidad:** Critical / High / Medium / Low

**Ambiente:**
- Browser: 
- OS: 
- Device: 
- URL: 

**Pasos para Reproducir:**
1. 
2. 
3. 

**Comportamiento Actual:**

**Comportamiento Esperado:**

**Screenshots/Video:**

**Console Errors:**
```

### ✅ Pre-Launch Checklist

#### Técnico
- [ ] Build de producción sin errors
- [ ] Performance > 90 en Lighthouse
- [ ] Accessibility > 95 en Lighthouse
- [ ] No console errors en producción
- [ ] Analytics funcionando
- [ ] Structured data válido
- [ ] Sitemap enviado a Google
- [ ] Robots.txt configurado

#### Contenido
- [ ] Todos los textos revisados
- [ ] Links funcionan
- [ ] Imágenes optimizadas
- [ ] WhatsApp número correcto
- [ ] Email de contacto correcto
- [ ] Información legal actualizada

#### UX
- [ ] Loading states implementados
- [ ] Error states claros
- [ ] Success feedback visible
- [ ] Mobile experience fluida
- [ ] Animations suaves
- [ ] No layout shifts

### 📝 Test Cases

#### TC001: Navegación Home to Seguros Individuales
```
1. Abrir homepage
2. Click en "Seguros Individuales"
3. Verificar: Página carga correctamente
4. Verificar: Tabla comparativa visible
5. Verificar: CTA buttons funcionan
```

#### TC002: Calculadora PYME
```
1. Ir a /seguros-pyme
2. Ingresar 25 en calculadora
3. Click "Calcular"
4. Verificar: Muestra "Plan Growth PYME"
5. Verificar: Precio calculado correcto
6. Click CTA WhatsApp
7. Verificar: Abre WhatsApp
```

#### TC003: Formulario de Contacto
```
1. Ir a /contacto
2. Llenar formulario con datos válidos
3. Submit form
4. Verificar: Toast success aparece
5. Verificar: Formulario se resetea
6. Verificar: Analytics event registrado
```

## Continuous Testing

### Automated Testing (Futuro)
```bash
# Vitest para unit tests
npm run test

# Playwright para e2e
npm run test:e2e

# Lighthouse CI
npm run lighthouse
```

### Monitoring
- [ ] Error tracking configurado
- [ ] Performance monitoring activo
- [ ] Uptime monitoring
- [ ] Analytics reporting semanal
