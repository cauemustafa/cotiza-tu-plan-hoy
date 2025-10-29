# Cotiza Tu Plan Hoy

A modern web platform for health insurance quotes and comparisons in Chile, built with React, TypeScript, and Tailwind CSS.

## 🌟 Overview

Cotiza Tu Plan Hoy is a comprehensive health insurance platform that helps individuals and businesses (PYME) find and compare health insurance plans. The platform features interactive calculators, plan comparisons, and seamless WhatsApp integration for customer support.

## ✨ Key Features

### Core Functionality
- **Individual Insurance Plans**: Browse and compare individual health insurance options
- **PYME Insurance Plans**: Specialized insurance solutions for businesses (minimum 5 employees)
- **Interactive Calculator**: Real-time plan recommendations based on company size
- **Comparison Tables**: Side-by-side plan comparisons (responsive: table on desktop, accordion on mobile)
- **ISAPRE Information**: Comprehensive information about Chilean health insurance system

### User Experience
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Dark/Light Mode**: Theme switching support
- **Floating WhatsApp**: Instant customer support via WhatsApp
- **Smooth Animations**: Powered by Framer Motion for engaging interactions
- **Loading States**: Skeleton loaders for better perceived performance
- **Error Boundaries**: Graceful error handling and recovery

### Performance & SEO
- **Code Splitting**: Optimized bundle sizes with lazy loading
- **Image Optimization**: Efficient asset loading
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Google Analytics**: Integrated tracking and analytics
- **Cookie Consent**: GDPR-compliant cookie management
- **Performance Score**: Lighthouse score >90

## 🚀 Tech Stack

### Frontend Framework
- **React 18.3.1**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

### Routing & State
- **React Router DOM**: Client-side routing
- **TanStack Query**: Server state management
- **React Hook Form**: Form handling and validation

### Additional Tools
- **Zod**: Schema validation
- **date-fns**: Date manipulation
- **Recharts**: Chart and data visualization
- **Sonner**: Toast notifications

## 📦 Installation

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Setup

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
bun run dev
```

4. Open your browser at `http://localhost:8080`

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start dev server at localhost:8080

# Building
npm run build        # Production build
npm run build:dev    # Development build

# Preview
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── home/              # Home page components
│   │   ├── Hero.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   └── CTASection.tsx
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── pyme/              # PYME-specific components
│   │   └── PymeCalculator.tsx
│   ├── shared/            # Shared components
│   │   ├── ComparisonTable.tsx
│   │   ├── CookieConsent.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── FloatingWhatsApp.tsx
│   │   ├── GoogleAnalytics.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   ├── ScrollToTop.tsx
│   │   ├── StickyCTABar.tsx
│   │   └── StructuredData.tsx
│   └── ui/                # UI components (Radix/shadcn)
├── pages/                 # Page components
│   ├── Index.tsx
│   ├── SegurosIndividuales.tsx
│   ├── SegurosPyme.tsx
│   ├── Isapre.tsx
│   ├── Contacto.tsx
│   ├── PoliticaPrivacidad.tsx
│   ├── TerminosCondiciones.tsx
│   └── NotFound.tsx
├── data/                  # Data and constants
│   └── plans.ts
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and helpers
│   ├── utils.ts
│   ├── analytics.ts
│   └── structured-data.ts
├── App.tsx               # Main app component
├── main.tsx              # Entry point
└── index.css             # Global styles
```

## 🎨 Design System

The project uses a comprehensive design system with:
- **Semantic Color Tokens**: HSL-based color system for consistent theming
- **Typography Scale**: Carefully crafted font sizes and weights
- **Spacing System**: Consistent spacing using Tailwind's scale
- **Animation Library**: Pre-built animations for common patterns
- **Component Variants**: Multiple variants for buttons, cards, and other UI elements

See [Design Guidelines](./CONTRIBUTING.md#design-guidelines) for more details.

## 🧪 Testing

The project includes comprehensive testing guidelines:
- Manual testing checklist for functionality, UI/UX, and performance
- Cross-browser testing procedures
- Mobile device testing guidelines
- Accessibility (A11y) testing
- Form validation testing
- SEO verification

See [TESTING.md](./TESTING.md) for complete testing documentation.

## ⚡ Performance

Performance optimizations include:
- Code splitting and lazy loading
- Tree shaking and dead code elimination
- Bundle size optimization (<1000kb chunks)
- Image optimization and lazy loading
- Optimized dependencies loading
- Production minification

See [PERFORMANCE.md](./PERFORMANCE.md) for detailed performance guidelines.

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](./CONTRIBUTING.md) for details on:
- Git workflow and branching strategy
- Code style and standards
- Commit message conventions
- Pull request process

### Branch Strategy
- `main`: Production-ready code
- `develop`: Development and local testing
- `ai-agent`: Lovable AI development

## 🔧 Development with Lovable

This project is integrated with [Lovable](https://lovable.dev), enabling AI-assisted development.

**Lovable Project URL**: https://lovable.dev/projects/2de11298-1251-41da-876f-589d0d1033e2

### Editing Options

1. **Use Lovable**: Visit the project URL and start prompting. Changes are automatically committed.
2. **Use your IDE**: Clone the repo and push changes. They will sync to Lovable.
3. **Edit on GitHub**: Make changes directly in the GitHub interface.
4. **Use GitHub Codespaces**: Launch a cloud development environment.

## 🚀 Deployment

Deploy using Lovable:
1. Open the [Lovable Project](https://lovable.dev/projects/2de11298-1251-41da-876f-589d0d1033e2)
2. Click Share → Publish

### Custom Domain

Connect a custom domain via Project > Settings > Domains. [Learn more](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 📄 License

This project is private and proprietary.

## 🔗 Links

- [Live Site](https://cotizatuplanhoy.lovable.app)
- [Lovable Project](https://lovable.dev/projects/2de11298-1251-41da-876f-589d0d1033e2)
- [Contributing Guidelines](./CONTRIBUTING.md)
- [Performance Guide](./PERFORMANCE.md)
- [Testing Guide](./TESTING.md)

## 📞 Contact

For inquiries about insurance plans, visit our [Contact Page](https://cotizatuplanhoy.lovable.app/contacto) or reach out via WhatsApp at +56 9 2836 0499.

---

Built with ❤️ using [Lovable](https://lovable.dev)
