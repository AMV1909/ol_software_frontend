# OL Software Technical Test

Este proyecto es una aplicación web construida con [Next.js](https://nextjs.org), diseñada para pruebas técnicas y desarrollo profesional.

## Tecnologías principales

- **Next.js** (App Router)
- **Tailwind CSS** (estilos utilitarios)
- **shadcn/ui** (componentes UI reutilizables y modernos)
- **React Query** (manejo de datos remotos y caché)
- **Zustand** (estado global)
- **Zod** (validación de formularios y datos)
- **Jest + Testing Library** (pruebas unitarias y de integración)

## Instalación

```bash
pnpm install
# o
npm install
# o
yarn install
```

## Desarrollo

```bash
pnpm dev
# o
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la app.

## Testing

Ejecuta las pruebas unitarias con:

```bash
pnpm test
# o
npm test
# o
yarn test
```

## Estructura del proyecto

- `src/app/` — Entrypoints y rutas de la app (Next.js App Router)
- `src/ui/` — Componentes UI atómicos, moleculares y organismos
- `src/lib/` — Lógica de negocio, hooks, helpers, validaciones y store global
- `src/lib/helpers/` — Funciones utilitarias y helpers
- `src/lib/schemas/` — Esquemas de validación Zod
- `src/lib/hooks/` — Hooks personalizados (React Query, Zustand, etc)

## Pruebas unitarias

- Los tests están en archivos `__tests__` junto a los helpers/componentes.
- Usa Jest + Testing Library para componentes y lógica.
- Mockea dependencias externas cuando sea necesario.
