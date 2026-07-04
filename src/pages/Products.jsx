import { useState, useMemo } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import { PRODUCTS } from '../data/products.js'
import { PRODUCT_CATEGORIES } from '../data/site.js'

function ProductCard({ product, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex flex-col overflow-hidden rounded-3xl border border-soil-100 bg-white text-left shadow-sm transition-all hover:-translate-y-1.5 hover:border-leaf-200 hover:shadow-xl hover:shadow-leaf-600/10"
    >
      <div className="flex aspect-square items-center justify-center bg-gradient-to-b from-leaf-50/60 to-white p-6">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-soil-800/30">
            <span className="text-5xl">🧴</span>
            <span className="text-xs font-medium">Image coming soon</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 border-t border-soil-100 p-5">
        <h3 className="font-display text-lg font-bold text-soil-900 group-hover:text-leaf-700">{product.name}</h3>
        <p className="text-xs font-semibold uppercase tracking-wide text-harvest-500">{product.technical}</p>
        <p className="line-clamp-2 text-sm leading-relaxed text-soil-800/60">{product.description}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {product.packSizes.slice(0, 4).map((size) => (
            <span key={size} className="rounded-full bg-leaf-50 px-2.5 py-1 text-xs font-semibold text-leaf-700">
              {size}
            </span>
          ))}
        </div>
        <span className="pt-2 text-xs font-bold uppercase tracking-wider text-leaf-600 opacity-0 transition-opacity group-hover:opacity-100">
          View Details →
        </span>
      </div>
    </button>
  )
}

function ProductModal({ product, onClose }) {
  if (!product) return null
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-leaf-950/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-soil-50 text-soil-800 transition-colors hover:bg-leaf-600 hover:text-white"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid overflow-y-auto sm:grid-cols-2">
          <div className="flex items-center justify-center bg-gradient-to-b from-leaf-50 to-white px-6 py-8 sm:sticky sm:top-0 sm:h-full sm:min-h-[520px] sm:self-start">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[40vh] w-auto max-w-full object-contain drop-shadow-xl sm:max-h-[460px]"
              />
            ) : (
              <span className="py-16 text-8xl">🧴</span>
            )}
          </div>
          <div className="flex flex-col gap-4 p-6 sm:p-8">
            <div>
              <h2 className="font-display text-3xl font-bold text-soil-900">{product.name}</h2>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-harvest-500">
                {product.technical}
              </p>
            </div>
            <p className="text-sm leading-relaxed text-soil-800/75">{product.description}</p>

            <div className="flex flex-col gap-3 rounded-2xl bg-soil-50 p-4 text-sm">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-soil-800/50">Pack Sizes</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {product.packSizes.map((size) => (
                    <span key={size} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-leaf-700 shadow-sm">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
              {product.crops && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-soil-800/50">Recommended Crops</p>
                  <p className="mt-1 leading-relaxed text-soil-800/80">{product.crops}</p>
                </div>
              )}
              {product.pests && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-soil-800/50">Targets / Usage</p>
                  <p className="mt-1 leading-relaxed text-soil-800/80">{product.pests}</p>
                </div>
              )}
            </div>

            <Link
              to="/contact"
              className="mt-1 inline-block self-start rounded-full bg-leaf-600 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-leaf-700"
            >
              Enquire About This Product
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const { category } = useParams()
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const catInfo = PRODUCT_CATEGORIES.find((c) => c.slug === category)
  const products = PRODUCTS[category]

  const filtered = useMemo(() => {
    if (!products) return []
    const q = search.trim().toLowerCase()
    if (!q) return products
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.technical.toLowerCase().includes(q) ||
        (p.crops ?? '').toLowerCase().includes(q),
    )
  }, [products, search])

  if (!catInfo || !products) return <Navigate to="/" replace />

  return (
    <>
      <PageHero title={catInfo.name} crumb={catInfo.name} image="/images/page-header.jpg" />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Category switcher + search */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {PRODUCT_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/products/${cat.slug}`}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  cat.slug === category
                    ? 'bg-leaf-600 text-white shadow-md shadow-leaf-600/20'
                    : 'bg-soil-50 text-soil-800 hover:bg-leaf-100 hover:text-leaf-800'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
          <div className="relative lg:w-72">
            <svg
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-soil-800/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${catInfo.name.toLowerCase()}...`}
              className="w-full rounded-full border border-soil-200 bg-white py-2.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20"
            />
          </div>
        </div>

        <p className="mt-6 text-sm text-soil-800/60">
          {filtered.length} of {products.length} products
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.name} product={product} onOpen={() => setSelected(product)} />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <span className="text-5xl">🔍</span>
            <p className="font-display font-bold text-soil-900">No products match “{search}”</p>
            <button
              type="button"
              onClick={() => setSearch('')}
              className="text-sm font-semibold text-leaf-600 hover:text-leaf-700"
            >
              Clear search
            </button>
          </div>
        )}
      </section>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </>
  )
}
