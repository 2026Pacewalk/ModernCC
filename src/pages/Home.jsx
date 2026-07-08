import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { SITE, HERO_SLIDES, PRODUCT_CATEGORIES, ASSET_VERSION } from '../data/site.js'
import { PRODUCTS } from '../data/products.js'
import SectionHeading from '../components/SectionHeading.jsx'
import ContactForm from '../components/ContactForm.jsx'
import Seo from '../components/Seo.jsx'

// One highlighted product from each category for the home showcase.
const FEATURED = PRODUCT_CATEGORIES.map((cat) => {
  const product = (PRODUCTS[cat.slug] || []).find((p) => p.image)
  return product ? { ...product, category: cat.slug } : null
}).filter(Boolean)

function Hero() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => setCurrent((c) => (c + 1) % HERO_SLIDES.length), [])
  const prev = () => setCurrent((c) => (c - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)

  useEffect(() => {
    const t = setInterval(next, 6000)
    return () => clearInterval(t)
  }, [next])

  return (
    <section className="relative h-[70vh] min-h-[480px] overflow-hidden bg-leaf-950" aria-label="Highlights">
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={i !== current}
        >
          <img
            src={slide.image}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-leaf-950/90 via-leaf-950/20 to-leaf-950/10" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div key={current} className="max-w-2xl animate-[fadeUp_0.8s_ease_both] [text-shadow:0_2px_16px_rgb(0_0_0/45%)]">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-harvest-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-harvest-300 ring-1 ring-harvest-400/40 [text-shadow:none]">
            {HERO_SLIDES[current].subtitle}
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {HERO_SLIDES[current].title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
            {HERO_SLIDES[current].text}
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              to="/about"
              className="rounded-full bg-harvest-500 px-7 py-3.5 text-sm font-bold text-leaf-950 shadow-lg shadow-harvest-500/25 transition-all hover:bg-harvest-400 hover:shadow-xl"
            >
              Learn More
            </Link>
            <Link
              to="/contact"
              className="rounded-full border-2 border-white/25 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition-colors hover:border-harvest-400 hover:text-harvest-400"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Slider controls */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              i === current ? 'w-8 bg-harvest-400' : 'w-2.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-harvest-500 hover:text-leaf-950 md:flex"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-harvest-500 hover:text-leaf-950 md:flex"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>
    </section>
  )
}

function AboutIntro() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Who We Are"
            title="A trusted partner to farmers since 2015"
          />
          <p className="mt-6 leading-relaxed text-soil-800/80">
            <strong className="text-leaf-800">Modern Crop Care Chemicals</strong> was established in the year 2015
            and offers a wide range of insecticides, weedicides, fungicides, fertilizers and plant growth regulator
            products which we market all over Punjab and Rajasthan. We have a big distributors and dealers network
            in these regions to sell our products to farmers. MODERN is a marketing company specializing in the
            development and supply of high-quality products.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-leaf-100 bg-leaf-50/60 p-6 transition-shadow hover:shadow-lg hover:shadow-leaf-600/5">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-600 text-2xl">🛡️</div>
              <h3 className="font-display text-lg font-bold text-soil-900">Our Values</h3>
              <p className="mt-2 text-sm leading-relaxed text-soil-800/70">
                The most important business theory is customer satisfaction.
              </p>
            </div>
            <div className="rounded-2xl border border-leaf-100 bg-leaf-50/60 p-6 transition-shadow hover:shadow-lg hover:shadow-leaf-600/5">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-harvest-500 text-2xl">🤝</div>
              <h3 className="font-display text-lg font-bold text-soil-900">Team Work</h3>
              <p className="mt-2 text-sm leading-relaxed text-soil-800/70">
                Our employees and channel partners think and work together.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src="/images/home-about.jpg"
            alt="Modern Crop Care Chemicals in the field"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl shadow-leaf-900/15"
          />
          <div className="absolute -bottom-6 -left-2 max-w-xs rounded-2xl bg-leaf-800 p-6 text-white shadow-xl sm:-left-6">
            <h4 className="font-display text-lg font-bold text-harvest-400">Our Vision</h4>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              To lead the market with product excellence and support the end-user with cost-effective and
              innovative products and practices for rapid growth and high performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Principles() {
  return (
    <section className="relative overflow-hidden bg-leaf-950 py-24">
      <img src="/images/principles-bg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-leaf-950/80 to-leaf-950/95" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <SectionHeading light eyebrow="What Drives Us" title="Our Principles" />
        <p className="mt-8 leading-relaxed text-white/70">
          They are well-defined and are as binding to our employees as they are clear to our partners and customers.
          We put our principles into practice in our daily routine. We say what we think, and we will act on those
          words to meet our social, economic, and ecological concerns. The world faces difficult challenges such as
          limited natural resources, population growth and climate change.
        </p>
        <p className="mt-4 leading-relaxed text-white/70">
          Increasing demand for food, feed, fiber, and renewable raw materials — we believe that sustainable farming
          is the best way to overcome these challenges. That&apos;s why we have made it an integral part of our
          business. We run programs and training courses to encourage the greatest possible care in handling our
          crop protection products. We firmly believe that respect for people is essential to achieving lasting
          business excellence.
        </p>
        <Link
          to="/contact"
          className="mt-10 inline-block rounded-full bg-harvest-500 px-8 py-3.5 text-sm font-bold text-leaf-950 shadow-lg shadow-harvest-500/20 transition-all hover:bg-harvest-400"
        >
          Get a Quote
        </Link>
      </div>
    </section>
  )
}

function ProductRange() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Finest Products, Finest Agriculture"
        title="Our Product Range"
        subtitle="We have a wide variety of products so that our clients have good options."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCT_CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            to={`/products/${cat.slug}`}
            className="group flex flex-col items-center rounded-3xl border border-soil-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1.5 hover:border-leaf-200 hover:shadow-xl hover:shadow-leaf-600/10"
          >
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-leaf-50 p-4 transition-colors group-hover:bg-leaf-100">
              <img src={cat.image} alt={cat.name} className="max-h-full max-w-full object-contain" loading="lazy" />
            </div>
            <h3 className="mt-5 font-display text-base font-bold text-soil-900 group-hover:text-leaf-700">
              {cat.name}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-soil-800/60">{cat.blurb}</p>
            <span className="mt-4 text-xs font-bold uppercase tracking-wider text-leaf-600 opacity-0 transition-opacity group-hover:opacity-100">
              View Products →
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function FeaturedProducts() {
  return (
    <section className="bg-soil-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Products"
          title="Trusted by farmers across the region"
          subtitle="A glimpse of our crop protection and nutrition range — explore the full catalogue for detailed specifications."
        />

        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {FEATURED.map((product) => (
            <Link
              key={`${product.category}-${product.name}`}
              to={`/products/${product.category}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-soil-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-leaf-200 hover:shadow-xl hover:shadow-leaf-600/10"
            >
              <div className="flex h-44 shrink-0 items-center justify-center bg-gradient-to-b from-leaf-50/60 to-white p-4">
                <img
                  src={`${product.image}?v=${ASSET_VERSION}`}
                  alt={product.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center border-t border-soil-100 p-3 text-center">
                <h3 className="truncate font-display text-sm font-bold text-soil-900 group-hover:text-leaf-700">
                  {product.name}
                </h3>
                <p className="mt-0.5 truncate text-[11px] font-medium text-harvest-500">{product.technical}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/products/insecticides"
            className="inline-flex items-center gap-2 rounded-full bg-leaf-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-leaf-600/20 transition-all hover:bg-leaf-700 hover:shadow-xl"
          >
            View All Products
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

function ContactStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Keep in Touch"
            title="We're here to help your crops thrive"
            subtitle="We will be the leading company in the national market with each of our products."
          />
          <div className="mt-8 flex flex-col gap-4">
            <a
              href={`tel:${SITE.phones[0].replace(/\s/g, '')}`}
              className="flex items-center gap-4 rounded-2xl border border-soil-100 p-5 transition-colors hover:border-leaf-200 hover:bg-leaf-50/50"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-leaf-600 text-xl text-white">📞</span>
              <span>
                <span className="block font-display font-bold text-soil-900">{SITE.phones[0]}</span>
                <span className="text-sm text-soil-800/60">Contact us if you have a question</span>
              </span>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-4 rounded-2xl border border-soil-100 p-5 transition-colors hover:border-leaf-200 hover:bg-leaf-50/50"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-harvest-500 text-xl text-white">✉️</span>
              <span>
                <span className="block font-display font-bold text-soil-900">{SITE.email}</span>
                <span className="text-sm text-soil-800/60">Send us an email to keep in touch</span>
              </span>
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-soil-100 bg-white p-8 shadow-xl shadow-soil-900/5">
          <h3 className="font-display text-xl font-bold text-soil-900">Send a Message</h3>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Seo
        title="Modern Crop Care Chemicals | Insecticides, Herbicides, Fungicides & Fertilizers"
        description="Trusted agrochemical company in Bathinda since 2015. We supply insecticides, herbicides, fungicides, plant growth regulators, fertilizers and bio-stimulants across Punjab and Rajasthan."
        path="/"
      />
      <Hero />
      <AboutIntro />
      <Principles />
      <ProductRange />
      <FeaturedProducts />
      <ContactStrip />
    </>
  )
}
