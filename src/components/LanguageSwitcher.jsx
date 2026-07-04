import { useState, useEffect, useRef } from 'react'

export const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
]

function currentLang() {
  if (typeof document === 'undefined') return 'en'
  const m = document.cookie.match(/googtrans=\/en\/(\w+)/)
  return m ? m[1] : 'en'
}

function setLanguage(code) {
  const host = window.location.hostname
  const parts = host.split('.')
  const root = parts.length > 2 ? `.${parts.slice(-2).join('.')}` : host
  const expire = 'expires=Thu, 01 Jan 1970 00:00:00 UTC'
  if (code === 'en') {
    document.cookie = `googtrans=; path=/; ${expire}`
    document.cookie = `googtrans=; path=/; domain=${root}; ${expire}`
    document.cookie = `googtrans=; path=/; domain=.${host}; ${expire}`
  } else {
    document.cookie = `googtrans=/en/${code}; path=/`
    document.cookie = `googtrans=/en/${code}; path=/; domain=${root}`
  }
  try {
    localStorage.setItem('siteLang', code)
  } catch {
    /* ignore */
  }
  window.location.reload()
}

const GlobeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
  </svg>
)

export default function LanguageSwitcher({ dark = false }) {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState('en')
  const ref = useRef(null)

  useEffect(() => {
    setLang(currentLang())
  }, [])

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const active = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]

  const triggerClass = dark
    ? 'flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10'
    : 'flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm font-semibold text-soil-800 transition-colors hover:text-leaf-700'

  return (
    <div className="relative notranslate" ref={ref} translate="no">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={triggerClass}
        aria-label="Select language"
        aria-expanded={open}
      >
        <GlobeIcon className="h-5 w-5" />
        <span>{active.native}</span>
        <svg className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border shadow-xl ${
            dark ? 'border-white/10 bg-leaf-900' : 'border-soil-100 bg-white'
          }`}
        >
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setLanguage(l.code)}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                dark
                  ? `text-white/85 hover:bg-white/10 ${l.code === lang ? 'bg-white/10 text-harvest-400' : ''}`
                  : `text-soil-800 hover:bg-leaf-50 hover:text-leaf-700 ${l.code === lang ? 'bg-leaf-50 text-leaf-700' : ''}`
              }`}
            >
              <span>{l.native}</span>
              {l.code === lang && (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
