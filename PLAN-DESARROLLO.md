# Plan: Sitio Web MECOL ESTUDIO con Astro 5

## Contexto

MECOL ESTUDIO es un estudio jurídico/consultoría profesional que necesita un sitio web corporativo. Se parte de un boceto visual (JPG) que define las secciones y el estilo. El proyecto está en punto cero — no hay código existente. El sitio debe ser bilingüe (español + inglés), estático (SSG), y el formulario de contacto será reemplazado por links directos a email/WhatsApp. El proyecto se crea directamente en `/Users/naradirocco/Desktop/MECOL ESTUDIO/`.

---

## Fase 0: Inicialización del proyecto

**Objetivo:** Scaffolding Astro + dependencias + configuración base.

**Acciones:**
1. Ejecutar `npm create astro@latest . -- --template minimal --typescript strict`
2. Instalar integraciones: `npx astro add tailwind mdx sitemap`
3. Configurar `astro.config.mjs`:
   - `output: 'static'`
   - `site: 'https://mecolestudio.com.ar'` (placeholder)
   - `i18n: { defaultLocale: 'es', locales: ['es', 'en'] }`
   - Integraciones: tailwind, mdx, sitemap
4. Configurar `tsconfig.json` con path aliases (`@components/*`, `@layouts/*`, `@lib/*`, `@assets/*`)

**Archivos a crear/modificar:**
- `astro.config.mjs`
- `tsconfig.json`
- `package.json`

---

## Fase 1: Sistema de diseño y estilos globales

**Objetivo:** Establecer paleta de colores, tipografía y tokens antes de cualquier componente.

**Paleta de colores (del boceto):**
- Azul marino principal: `#1a2e4a`
- Azul medio: `#2d5b8e`
- Dorado acento: `#c9a84c`
- Blanco: `#ffffff`
- Gris claro fondo: `#f5f7fa`
- Gris texto: `#6b7280`

**Tipografía:** Montserrat (títulos) + Inter (cuerpo)

**Archivos a crear:**
- `src/styles/global.css` — Variables CSS, directivas Tailwind v4 con `@theme`, reset base, utilities globales (`.section-padding`, `.container-main`)

---

## Fase 2: Content Collections

**Objetivo:** Definir esquemas de datos para contenido dinámico.

**Archivos a crear:**
- `src/content/config.ts` — Schemas Zod para 3 colecciones:
  - `team`: name, role, specialization, photo, order, linkedin, email
  - `services`: title, shortDescription, icon, order, featured
  - `blog`: title, description, publishDate, author, category, coverImage, tags, draft
- `src/content/team/fundadora.md` — Placeholder
- `src/content/services/derecho-societario.md` — Placeholder
- `src/content/blog/primer-articulo.md` — Placeholder (draft: true)

---

## Fase 3: Componentes comunes (infraestructura)

**Objetivo:** Componentes reutilizables que usan todas las secciones.

**Archivos a crear:**
- `src/components/common/SEO.astro` — Meta tags, Open Graph, Twitter Card, JSON-LD (LegalService/Organization), canonical URLs
- `src/components/common/Button.astro` — Variantes: primary (navy), secondary (outline gold), ghost. Tamaños: sm, md, lg
- `src/components/common/Card.astro` — Card genérica con slots
- `src/components/common/Icon.astro` — Renderiza SVGs inline desde `src/assets/icons/`
- `src/lib/utils.ts` — `formatDate()`, `slugify()`, `truncate()`
- `src/assets/icons/` — SVGs para servicios (building, scale, file-text, users, globe, shield, briefcase, gavel)

---

## Fase 4: Layouts

**Objetivo:** Estructura HTML consistente en todo el sitio.

**Archivos a crear:**
- `src/layouts/BaseLayout.astro` — HTML shell (`lang="es"`), SEO component, Google Fonts (Montserrat + Inter), global.css import, Header + Footer, script de scroll para header
- `src/layouts/PageLayout.astro` — Extiende BaseLayout, agrega banner/hero de página interna con título
- `src/layouts/BlogLayout.astro` — Extiende BaseLayout, agrega metadata de artículo (fecha, autor, categoría), breadcrumb

---

## Fase 5: Header y Footer

**Archivos a crear:**

### `src/components/layout/Header.astro`
- Position fixed, z-50, fondo `bg-navy/80 backdrop-blur` → sólido al scroll
- Logo MECOL a la izquierda
- Nav links: NOSOTROS, NUESTRO EQUIPO, SERVICIOS, NOVEDADES, CONTACTO
- Active state con `text-gold border-b border-gold`
- Mobile: hamburger → drawer/panel con animación
- Accesibilidad: aria-expanded, aria-controls, skip-to-content link

### `src/components/layout/Footer.astro`
- Fondo `bg-navy`, texto blanco
- 4 columnas desktop → 1 mobile: Logo+desc, Navegación, Servicios, Contacto+RRSS
- Bottom bar: copyright + créditos
- Links a LinkedIn, Instagram, WhatsApp

---

## Fase 6: Secciones de la home page

Cada sección es un componente en `src/components/sections/`.

### 6.1 `Hero.astro`
- `min-h-screen`, imagen fondo Buenos Aires con overlay `bg-navy/70`
- 2 columnas: texto izquierda ("UNA MIRADA INTEGRAL PARA DECISIONES IMPORTANTES") + foto fundadora derecha
- 2 CTAs: "NUESTROS SERVICIOS" + "CONTACTO" (link a WhatsApp/email)

### 6.2 `Services.astro` + `ServiceCard.astro`
- Fondo `bg-gray-light`
- Título: "INVERTIMOS EN ESTUDIO, ANÁLISIS, GESTIÓN Y GRAN EXPERIENCIA"
- Grid 3 columnas con cards (icono + título + descripción + link)
- Datos desde Content Collection `services`

### 6.3 `WorkProcess.astro`
- Fondo `bg-navy` (sección oscura)
- "NUESTRA FORMA DE TRABAJO"
- 4 pasos horizontales con números, títulos y descripciones
- Línea conectora dorada entre pasos (solo desktop)

### 6.4 `Team.astro` + `TeamCard.astro`
- Fondo blanco
- Grid de tarjetas con foto, nombre, cargo, especialización
- Datos desde Content Collection `team`

### 6.5 `Trust.astro`
- "CONFIANZA EN CADA ACOMPAÑAMIENTO"
- Métricas/valores del estudio en cards o counters

### 6.6 `RegionalMap.astro`
- "PRESENCIA Y ACOMPAÑAMIENTO EN LA REGIÓN"
- SVG de Sudamérica con países resaltados donde tienen presencia
- Lista de ciudades/países al costado

### 6.7 `Contact.astro`
- 2 columnas: info de contacto + botones directos (WhatsApp, Email)
- Sin formulario dinámico — links directos con `tel:`, `mailto:`, link WhatsApp
- Dirección, teléfono, email, horario de atención

---

## Fase 7: Páginas

**Archivos a crear en `src/pages/`:**

| Página | Archivo | Descripción |
|--------|---------|-------------|
| Home | `index.astro` | Ensambla todas las secciones de la Fase 6 |
| Nosotros | `nosotros.astro` | Historia, misión, visión, valores |
| Equipo | `equipo.astro` | Grid completo del equipo con bios |
| Servicios | `servicios.astro` | Grid de áreas de práctica |
| Servicio detalle | `servicios/[slug].astro` | Página dinámica por servicio |
| Novedades | `novedades/index.astro` | Lista paginada de artículos |
| Artículo | `novedades/[...slug].astro` | Contenido del artículo MDX |
| Contacto | `contacto.astro` | Datos de contacto + mapa Google embebido + FAQ |
| RSS | `rss.xml.ts` | Feed RSS de novedades |
| 404 | `404.astro` | Página de error personalizada |

---

## Fase 8: i18n (Español + Inglés)

**Objetivo:** Configurar internacionalización con Astro i18n nativo.

**Acciones:**
- Configurar `i18n` en `astro.config.mjs`: `defaultLocale: 'es'`, `locales: ['es', 'en']`
- Español sin prefijo en URL (`/nosotros`), inglés con prefijo (`/en/about-us`)
- Crear archivo de traducciones `src/lib/i18n.ts` con strings UI
- Duplicar páginas clave en inglés o usar middleware de routing

---

## Fase 9: SEO y optimizaciones finales

**Acciones:**
- Imágenes optimizadas con `<Image>` de `astro:assets` (WebP, lazy loading)
- Hero image con `loading="eager"` y `fetchpriority="high"`
- JSON-LD: LegalService + Organization en home, Person en equipo, Article en blog
- `public/robots.txt`
- `public/og-default.jpg` (1200x630px)
- Favicon en múltiples formatos
- Skip-to-content link, ARIA labels, contraste verificado
- Blog components: `PostCard.astro`, `PostList.astro`

---

## Fase 10: Verificación

### Build
```bash
npm run build   # Sin errores TypeScript ni Astro
npm run preview # Visual check
```

### Checklist visual
- [ ] Header sticky + mobile menu funcional
- [ ] Hero responsive (320px a 1920px)
- [ ] Grids de servicios, equipo, proceso responsivos
- [ ] Mapa SVG visible
- [ ] Links WhatsApp/email funcionan
- [ ] Footer completo en todas las páginas

### Checklist técnico
- [ ] Lighthouse >90 en Performance, Accessibility, SEO, Best Practices
- [ ] Open Graph tags verificados
- [ ] JSON-LD validado en schema.org
- [ ] Sitemap accesible en `/sitemap.xml`
- [ ] i18n: rutas `/en/` funcionan correctamente

---

## Contenido que el cliente debe proveer

| Recurso | Formato | Uso |
|---------|---------|-----|
| Logo MECOL | SVG + PNG | Header, Footer, OG image |
| Fotos equipo | JPG/PNG alta res | Hero, Team |
| Foto Buenos Aires | JPG panorámica >2000px | Hero background |
| Textos definitivos | Doc/Google Docs | Todas las secciones |
| Áreas de práctica | Lista con descripciones | Services |
| Datos contacto | Dirección, tel, email, horario | Contact, Footer |
| Países con presencia | Lista | Mapa regional |

---

## Secuencia de ejecución

```
Fase 0  → Inicializar proyecto Astro
Fase 1  → Estilos globales y tokens de diseño
Fase 2  → Content Collections + contenido placeholder
Fase 3  → Componentes comunes (SEO, Button, Card, Icon, utils)
Fase 4  → Layouts (Base → Page → Blog)
Fase 5  → Header + Footer
Fase 6  → Secciones home (Hero → Services → WorkProcess → Team → Trust → Map → Contact)
Fase 7  → Páginas (index → internas → blog → 404)
Fase 8  → i18n (español + inglés)
Fase 9  → SEO, imágenes, accesibilidad
Fase 10 → Testing y verificación
```
