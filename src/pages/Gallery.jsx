import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Seo from '../components/Seo.jsx'
import { GALLERY_IMAGES } from '../data/site.js'

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    if (lightbox === null) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % GALLERY_IMAGES.length)
      if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <>
      <Seo
        title="Gallery"
        description="Photo gallery of Modern Crop Care Chemicals — our products, our people and the farms we serve across Punjab and Rajasthan."
        path="/gallery"
      />
      <PageHero title="Gallery" image="/images/page-header.jpg" />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="In the Field"
          title="Solutions for the growing world"
          subtitle="A glimpse of our work, our products and the farms we serve."
        />

        <div className="mt-12 columns-2 gap-4 md:columns-3 [&>button]:mb-4">
          {GALLERY_IMAGES.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setLightbox(i)}
              className="group block w-full overflow-hidden rounded-2xl"
              aria-label={`Open gallery image ${i + 1}`}
            >
              <img
                src={src}
                alt={`Modern Crop Care gallery ${i + 1}`}
                loading="lazy"
                className="w-full transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-leaf-800 py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Need help with Modern Crop Care Chemicals?
          </h3>
          <Link
            to="/contact"
            className="shrink-0 rounded-full bg-harvest-500 px-8 py-4 text-sm font-bold text-leaf-950 shadow-lg transition-all hover:bg-harvest-400"
          >
            Request a Quote
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-leaf-950/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
            onClick={() => setLightbox(null)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Previous image"
            className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
            onClick={(e) => {
              e.stopPropagation()
              setLightbox((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)
            }}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <img
            src={GALLERY_IMAGES[lightbox]}
            alt={`Modern Crop Care gallery ${lightbox + 1}`}
            className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            aria-label="Next image"
            className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
            onClick={(e) => {
              e.stopPropagation()
              setLightbox((i) => (i + 1) % GALLERY_IMAGES.length)
            }}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </>
  )
}
