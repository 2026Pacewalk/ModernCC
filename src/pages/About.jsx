import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { SITE, PRODUCT_CATEGORIES } from '../data/site.js'

const VALUES = [
  {
    icon: '🛡️',
    accent: 'bg-leaf-600',
    title: 'Our Values',
    text: 'The most important business theory is customer satisfaction. With deep appreciation towards our customers, we will strive to build a reliable and trustworthy partnership with them, behind a mind that all businesses fail to exist without customers.',
  },
  {
    icon: '⭐',
    accent: 'bg-harvest-500',
    title: 'Quality Assurance',
    text: 'We uphold a proactive strategy for quality assurance at MCCC. Raw materials are procured from established organizations to ensure excellent product quality. A certain set of procedures is followed as prescribed in ISI & ISO standards to get an accurate analysis in testing. Each and every product passes through several strict parameters till it reaches the end-user.',
  },
  {
    icon: '🤝',
    accent: 'bg-leaf-800',
    title: 'Teamwork',
    text: 'Our employees and channel partners think and work together across functions, businesses, and geographies, leveraging the available resources to achieve common goals.',
  },
]

const MISSION_POINTS = [
  'To exceed our customers’ expectations in quality, delivery, and cost through continuous improvement and customer interaction.',
  'To provide the highest quality products and continuity in the marketing process through our highly skilled and dedicated team.',
  'To provide insecticides, herbicides, fungicides, weedicides, plant growth regulators, and fertilizers that are both affordable and effective — committed to the effective utilization of resources and innovative initiatives for the well-being of the farming community.',
  'To maintain a superior level of integrity in interactions with our business partners and associates.',
]

export default function About() {
  const years = new Date().getFullYear() - SITE.established

  return (
    <>
      <PageHero title="About Us" image="/images/page-header.jpg" />

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our Mission"
              title="Building on a history of product excellence"
              subtitle="Our vision is to build on our history of product excellence by adhering to the following principles."
            />
            <ul className="mt-8 flex flex-col gap-4">
              {MISSION_POINTS.map((point) => (
                <li key={point.slice(0, 32)} className="flex gap-4">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leaf-100 text-xs font-bold text-leaf-700">
                    ✓
                  </span>
                  <p className="leading-relaxed text-soil-800/80">{point}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-4 rounded-2xl bg-leaf-50 p-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-leaf-600 text-2xl text-white">📞</span>
              <div>
                <p className="text-sm font-medium text-soil-800/60">Contact us for service</p>
                <a
                  href={`tel:${SITE.phones[0].replace(/\s/g, '')}`}
                  className="font-display text-xl font-bold text-leaf-800 transition-colors hover:text-leaf-600"
                >
                  {SITE.phones[0]}
                </a>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/about-image.jpg"
              alt="Modern Crop Care Chemicals"
              className="aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl shadow-leaf-900/15"
            />
            <div className="absolute -bottom-5 right-4 rounded-2xl bg-harvest-500 px-7 py-5 text-center shadow-xl">
              <p className="font-display text-4xl font-bold text-leaf-950">{years}+</p>
              <p className="text-xs font-bold uppercase tracking-wider text-leaf-950/70">Years of Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-soil-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="What We Stand For" title="Values that guide every decision" />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-3xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-leaf-600/10"
              >
                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-white ${v.accent}`}>
                  {v.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-soil-900">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-soil-800/70">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product categories strip */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Offer"
          title="Our Products"
          subtitle="Affordable and effective crop protection and nutrition for the farming community."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products/${cat.slug}`}
              className="group rounded-2xl border border-soil-100 p-6 text-center transition-all hover:border-leaf-200 hover:bg-leaf-50/50 hover:shadow-lg"
            >
              <span className="text-3xl">{cat.icon}</span>
              <h3 className="mt-3 font-display text-sm font-bold text-soil-900 group-hover:text-leaf-700">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
