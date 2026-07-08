import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { SITE, PRODUCT_CATEGORIES } from '../data/site.js'
import LanguageSwitcher from './LanguageSwitcher.jsx'

const navLinkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
    isActive ? 'text-leaf-700' : 'text-soil-800 hover:text-leaf-700'
  }`

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [drawerIn, setDrawerIn] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    if (!mobileOpen) {
      setDrawerIn(false)
      return undefined
    }
    const t = setTimeout(() => setDrawerIn(true), 30)
    return () => clearTimeout(t)
  }, [mobileOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setProductsOpen(false)
  }, [pathname])

  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProductsOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const isProductsActive = pathname.startsWith('/products')

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow ${
        scrolled ? 'shadow-md shadow-soil-900/5' : ''
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <img src="/images/logo.png" alt="Modern Crop Care Chemicals logo" className="h-14 w-auto" />
          <span className="notranslate hidden flex-col leading-tight min-[420px]:flex" translate="no">
            <span className="font-display text-base font-800 font-bold tracking-tight text-leaf-800">
              Modern Crop Care
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-harvest-500">
              Chemicals
            </span>
          </span>
          <img
            src="/images/logo-animated.gif"
            alt="MODERN flag"
            className="hidden h-12 w-auto sm:block"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass}>About Us</NavLink>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setProductsOpen((o) => !o)}
              className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                isProductsActive ? 'text-leaf-700' : 'text-soil-800 hover:text-leaf-700'
              }`}
              aria-expanded={productsOpen}
            >
              Products
              <svg className={`h-4 w-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {productsOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 overflow-hidden rounded-xl border border-soil-100 bg-white shadow-xl shadow-soil-900/10">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/products/${cat.slug}`}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-soil-800 transition-colors hover:bg-leaf-50 hover:text-leaf-700"
                  >
                    <span className="text-lg">{cat.icon}</span>
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/gallery" className={navLinkClass}>Gallery</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>

          <div className="ml-1">
            <LanguageSwitcher />
          </div>

          <Link
            to="/contact"
            className="ml-2 rounded-full bg-leaf-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-leaf-700 hover:shadow-md"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="rounded-md p-2 text-soil-800 hover:bg-leaf-50 lg:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu — slide-in drawer (portal escapes the header's backdrop-filter containing block) */}
      {mobileOpen && createPortal(
        <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className={`absolute inset-0 bg-leaf-950/60 backdrop-blur-sm transition-opacity duration-300 ${
              drawerIn ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Drawer */}
          <div
            className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-gradient-to-b from-leaf-900 to-leaf-950 shadow-2xl transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
              drawerIn ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-harvest-500/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-leaf-500/10 blur-3xl" />

            {/* Header */}
            <div className="relative flex items-center justify-between px-6 pb-2 pt-5">
              <div className="flex items-center gap-3">
                <img src="/images/logo.png" alt="Modern Crop Care Chemicals logo" className="h-12 w-auto" />
                <img src="/images/logo-animated.gif" alt="MODERN flag" className="h-10 w-auto" />
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Language */}
            <div className="relative flex justify-start px-6 pt-4">
              <LanguageSwitcher dark />
            </div>

            {/* Main links */}
            <nav className="relative flex flex-col gap-1 px-6 pt-4">
              {[
                { to: '/', label: 'Home', end: true },
                { to: '/about', label: 'About Us' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/contact', label: 'Contact' },
              ].map((item, i) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  style={{ transitionDelay: `${80 + i * 60}ms` }}
                  className={({ isActive }) =>
                    `group flex items-center justify-between rounded-xl px-3 py-2.5 font-display text-2xl font-bold transition-all duration-500 ${
                      drawerIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    } ${isActive ? 'text-harvest-400' : 'text-white hover:text-harvest-400'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      <span
                        className={`text-base transition-all ${
                          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                        }`}
                      >
                        🌿
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Products */}
            <div className="relative mt-5 px-6">
              <p
                className={`text-xs font-bold uppercase tracking-[0.25em] text-white/40 transition-all duration-500 ${
                  drawerIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                Our Products
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                {PRODUCT_CATEGORIES.map((cat, i) => (
                  <Link
                    key={cat.slug}
                    to={`/products/${cat.slug}`}
                    style={{ transitionDelay: `${450 + i * 50}ms` }}
                    className={`flex items-center gap-2.5 rounded-2xl border px-3.5 py-3 text-sm font-semibold transition-all duration-500 ${
                      drawerIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    } ${
                      pathname === `/products/${cat.slug}`
                        ? 'border-harvest-400/60 bg-harvest-500/15 text-harvest-400'
                        : 'border-white/10 bg-white/5 text-white/85 hover:border-harvest-400/40 hover:bg-white/10'
                    } ${
                      PRODUCT_CATEGORIES.length % 2 === 1 && i === PRODUCT_CATEGORIES.length - 1
                        ? 'col-span-2'
                        : ''
                    }`}
                  >
                    <span className="text-xl">{cat.icon}</span>
                    <span className="leading-tight">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact footer */}
            <div
              className={`relative mt-auto px-6 pb-7 pt-8 transition-all duration-500 ${
                drawerIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <a
                  href={`tel:${SITE.phones[0].replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-harvest-400"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-harvest-500 text-base text-leaf-950">📞</span>
                  {SITE.phones[0]}
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-3 flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-harvest-400"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-base">✉️</span>
                  {SITE.email}
                </a>
              </div>
              <p className="mt-4 text-center text-[11px] font-medium uppercase tracking-[0.3em] text-white/30">
                Bringing Growth to Agriculture
              </p>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </header>
  )
}
