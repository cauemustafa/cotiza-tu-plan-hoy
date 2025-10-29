# Performance Optimization Guide

## Optimizaciones Implementadas

### 1. Code Splitting y Lazy Loading
- ✅ Lazy loading de todas las páginas usando `React.lazy()`
- ✅ Suspense con skeleton loaders para mejor UX
- ✅ Chunks manuales en Vite para vendor, UI y animations

### 2. Bundle Optimization
- ✅ Tree shaking automático via Vite
- ✅ Minificación con Terser
- ✅ Remove console.log en producción
- ✅ Chunk size warning configurado

### 3. Image Optimization
**Recomendaciones para implementar:**
```bash
# Usar formatos modernos
- WebP para imágenes generales
- AVIF para máxima compresión
- SVG para iconos

# Lazy loading de imágenes
<img loading="lazy" src="..." alt="..." />

# Responsive images
<img 
  srcset="image-320w.webp 320w,
          image-640w.webp 640w,
          image-1280w.webp 1280w"
  sizes="(max-width: 640px) 100vw, 640px"
  src="image-640w.webp"
  alt="..."
/>
```

### 4. Performance Budget
Target Lighthouse Scores:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 95

### 5. Loading States
- ✅ Skeleton loaders implementados
- ✅ Error boundaries para fallos
- ✅ Toast notifications para feedback

### 6. Caching Strategy
```javascript
// Service Worker (para implementar en el futuro)
workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
      }),
    ],
  })
);
```

## Checklist de Optimización

### Imágenes
- [ ] Convertir imágenes a WebP/AVIF
- [ ] Implementar lazy loading
- [ ] Usar srcset para responsive images
- [ ] Comprimir imágenes con herramientas como Squoosh
- [ ] Definir width/height para evitar layout shifts

### JavaScript
- [x] Code splitting implementado
- [x] Lazy loading de rutas
- [x] Tree shaking configurado
- [x] Minificación habilitada
- [ ] Preload crítico de recursos

### CSS
- [x] Tailwind con purge automático
- [x] CSS-in-JS con Tailwind
- [ ] Critical CSS inline (si necesario)

### Fonts
- [x] Google Fonts con preconnect
- [ ] Font-display: swap
- [ ] Subset de caracteres si es posible

### Network
- [ ] CDN para assets estáticos
- [ ] Compression (Brotli/Gzip)
- [ ] HTTP/2 Push
- [ ] Resource hints (preload, prefetch)

### Monitoring
- [ ] Google Analytics configurado
- [ ] Core Web Vitals tracking
- [ ] Error tracking (Sentry/similar)
- [ ] Performance monitoring

## Tools para Testing

### Lighthouse
```bash
# Instalar
npm install -g lighthouse

# Ejecutar
lighthouse https://cotizatuplanhoy.cl --view
```

### WebPageTest
https://www.webpagetest.org/

### Chrome DevTools
- Performance tab
- Coverage tab
- Network tab (Throttling)

## Comandos Útiles

```bash
# Analizar bundle size
npm run build
npx vite-bundle-visualizer

# Test performance local
npm run build
npm run preview
```

## Métricas Objetivo

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Otras Métricas
- **FCP (First Contentful Paint)**: < 1.8s
- **TTI (Time to Interactive)**: < 3.8s
- **Speed Index**: < 3.4s
- **Total Blocking Time**: < 200ms

## Próximos Pasos

1. **Service Worker**: Implementar caching offline
2. **Image CDN**: Usar servicio como Cloudinary
3. **Prerendering**: Para mejor SEO
4. **Monitoring**: Implementar Real User Monitoring (RUM)
