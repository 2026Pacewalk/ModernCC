import { useEffect } from 'react'

const SITE_URL = 'https://moderncropcarechemicals.com'
const DEFAULT_IMAGE = `${SITE_URL}/images/logo.png`

function upsertMeta(attr, key, content) {
  const all = document.head.querySelectorAll(`meta[${attr}="${key}"]`)
  for (let i = 1; i < all.length; i += 1) all[i].remove()
  let el = all[0]
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  const all = document.head.querySelectorAll(`link[rel="${rel}"]`)
  for (let i = 1; i < all.length; i += 1) all[i].remove()
  let el = all[0]
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

// Updates the document's SEO tags in place for the current route. Using an effect
// (rather than rendering tags) keeps a single set of head tags — the static ones
// from index.html are updated, not duplicated — which is cleaner for crawlers.
export default function Seo({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  noindex = false,
  jsonLd,
}) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`
    const fullTitle = title.includes('Modern Crop Care')
      ? title
      : `${title} | Modern Crop Care Chemicals`

    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow')
    upsertLink('canonical', url)

    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', image)

    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', image)

    let script = document.getElementById('page-jsonld')
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script')
        script.type = 'application/ld+json'
        script.id = 'page-jsonld'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(jsonLd)
    } else if (script) {
      script.remove()
    }
  }, [title, description, path, image, noindex, jsonLd])

  return null
}
