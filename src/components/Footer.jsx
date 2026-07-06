import { Link } from 'react-router-dom'
import { SITE, PRODUCT_CATEGORIES } from '../data/site.js'

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.5 21v-7h2.4l.36-2.8H13.5V9.4c0-.81.22-1.36 1.38-1.36h1.47V5.55c-.25-.03-1.13-.11-2.15-.11-2.13 0-3.58 1.3-3.58 3.69v2.06H8.2V14h2.42v7h2.88z" />
  </svg>
)

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-leaf-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* About */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Modern Crop Care Chemicals logo" className="h-16 w-auto" />
            <div className="leading-tight">
              <p className="font-display text-sm font-bold">Modern Crop Care</p>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-harvest-400">Chemicals</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/60">
            Established in {SITE.established}, we offer a wide range of insecticides, weedicides, fungicides,
            fertilizers and plant growth regulator products marketed all over Punjab and Rajasthan.
          </p>
          <div className="mt-1 flex gap-3">
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-harvest-500 hover:text-leaf-950"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-harvest-500 hover:text-leaf-950"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Products */}
        <div>
          <h5 className="mb-5 font-display text-sm font-bold uppercase tracking-[0.18em] text-harvest-400">
            Our Products
          </h5>
          <ul className="flex flex-col gap-2.5">
            {PRODUCT_CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link
                  to={`/products/${cat.slug}`}
                  className="text-sm text-white/70 transition-colors hover:text-harvest-400"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links + contact */}
        <div>
          <h5 className="mb-5 font-display text-sm font-bold uppercase tracking-[0.18em] text-harvest-400">
            Contact Info
          </h5>
          <ul className="flex flex-col gap-3 text-sm text-white/70">
            <li className="flex gap-3">
              <span aria-hidden="true">📍</span>
              <span>{SITE.address}</span>
            </li>
            {SITE.phones.map((p) => (
              <li key={p} className="flex gap-3">
                <span aria-hidden="true">📞</span>
                <a href={`tel:${p.replace(/\s/g, '')}`} className="transition-colors hover:text-harvest-400">{p}</a>
              </li>
            ))}
            <li className="flex gap-3">
              <span aria-hidden="true">✉️</span>
              <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-harvest-400">{SITE.email}</a>
            </li>
          </ul>
        </div>

        {/* Map */}
        <div>
          <h5 className="mb-5 font-display text-sm font-bold uppercase tracking-[0.18em] text-harvest-400">
            Find Location
          </h5>
          <div className="overflow-hidden rounded-xl border border-white/10">
            <iframe
              src={SITE.mapEmbed}
              title="Modern Crop Care Chemicals location"
              className="h-48 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Modern Crop Care Chemicals. All rights reserved.</p>
          <p>
            Designed by{' '}
            <a
              href="https://pacewalk.com"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-harvest-400 transition-colors hover:text-harvest-500"
            >
              PACEWALK
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
