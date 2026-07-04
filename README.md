# Modern Crop Care Chemicals — Website

Modern React website for **Modern Crop Care Chemicals** (Bathinda, Punjab) — insecticides, herbicides, fungicides, plant growth regulators and fertilizers marketed across Punjab and Rajasthan.

## Tech Stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [React Router 7](https://reactrouter.com/)

## Getting Started

```bash
npm install
npm run dev        # local dev server at http://localhost:5173
npm run build      # production build into dist/
npm run preview    # preview the production build locally
```

## Project Structure

```
src/
  components/    # Navbar, Footer, Layout, ContactForm, shared UI
  pages/         # Home, About, Products, Gallery, Videos, Contact
  data/          # site.js (contact/team/categories), products.js (65 products)
public/
  images/        # logo, product photos, team, gallery, hero slides
```

## Deployment

The site is fully static. Build with `npm run build` and serve the `dist/` folder from any web server. For SPA routing, configure a fallback to `index.html` (e.g. Nginx `try_files $uri $uri/ /index.html;`).
