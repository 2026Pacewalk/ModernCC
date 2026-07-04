import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // Load the Google website translator once; it reads the googtrans cookie
  // set by the language switcher and translates the whole page (en/hi/pa).
  useEffect(() => {
    if (document.getElementById('gt-script')) return
    window.googleTranslateElementInit = () => {
      /* eslint-disable-next-line no-new */
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: 'en,hi,pa', autoDisplay: false },
        'google_translate_element',
      )
    }
    const s = document.createElement('script')
    s.id = 'gt-script'
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    s.async = true
    document.body.appendChild(s)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-white text-soil-900">
      <div id="google_translate_element" className="hidden" />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
