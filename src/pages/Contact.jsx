import PageHero from '../components/PageHero.jsx'
import ContactForm from '../components/ContactForm.jsx'
import Seo from '../components/Seo.jsx'
import { SITE } from '../data/site.js'

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Us"
        description="Contact Modern Crop Care Chemicals, Grain Market, Bathinda. Call +91 96466 93671 or email modernccc2015@gmail.com for products, prices and dealership enquiries."
        path="/contact"
      />
      <PageHero title="Contact Us" image="/images/page-header.jpg" />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Form */}
          <div className="rounded-3xl border border-soil-100 bg-white p-8 shadow-xl shadow-soil-900/5 lg:col-span-3">
            <h2 className="font-display text-2xl font-bold text-soil-900">Send a Message</h2>
            <p className="mt-2 text-sm text-soil-800/60">
              Have a question about our products or want to become a dealer? We&apos;d love to hear from you.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            <div className="rounded-3xl bg-leaf-800 p-8 text-white">
              <h3 className="font-display text-xl font-bold text-harvest-400">Contact Info</h3>
              <ul className="mt-6 flex flex-col gap-5 text-sm">
                <li className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg">📍</span>
                  <div>
                    <p className="font-bold">Our Address</p>
                    <p className="mt-1 leading-relaxed text-white/70">{SITE.address}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg">📞</span>
                  <div>
                    <p className="font-bold">Phone</p>
                    {SITE.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/\s/g, '')}`}
                        className="mt-1 block text-white/70 transition-colors hover:text-harvest-400"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg">✉️</span>
                  <div>
                    <p className="font-bold">Email</p>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="mt-1 block text-white/70 transition-colors hover:text-harvest-400"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-7 flex gap-3">
                <a
                  href={SITE.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-harvest-500 hover:text-leaf-950"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.5 21v-7h2.4l.36-2.8H13.5V9.4c0-.81.22-1.36 1.38-1.36h1.47V5.55c-.25-.03-1.13-.11-2.15-.11-2.13 0-3.58 1.3-3.58 3.69v2.06H8.2V14h2.42v7h2.88z" />
                  </svg>
                </a>
                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-harvest-500 hover:text-leaf-950"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-soil-100 shadow-sm">
              <iframe
                src={SITE.mapEmbed}
                title="Modern Crop Care Chemicals location map"
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
