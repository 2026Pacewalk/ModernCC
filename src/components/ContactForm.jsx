import { useState } from 'react'
import { SITE } from '../data/site.js'

const inputClass =
  'w-full rounded-xl border border-soil-200 bg-white px-4 py-3 text-sm text-soil-900 placeholder:text-soil-800/40 outline-none transition-colors focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`,
    )
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      `Website enquiry from ${form.name}`,
    )}&body=${body}`
    setSent(true)
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-leaf-50 p-6 text-center">
        <p className="text-3xl">✅</p>
        <p className="mt-3 font-display font-bold text-leaf-800">Thank you, {form.name}!</p>
        <p className="mt-1 text-sm text-soil-800/70">
          Your email app should have opened with your message. You can also reach us directly at{' '}
          <a href={`mailto:${SITE.email}`} className="font-semibold text-leaf-700">{SITE.email}</a>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          required
          placeholder="*Name"
          value={form.name}
          onChange={update('name')}
          className={inputClass}
          aria-label="Name"
        />
        <input
          type="email"
          required
          placeholder="*Email address"
          value={form.email}
          onChange={update('email')}
          className={inputClass}
          aria-label="Email address"
        />
      </div>
      <input
        type="tel"
        required
        placeholder="*Please enter your phone"
        value={form.phone}
        onChange={update('phone')}
        className={inputClass}
        aria-label="Phone"
      />
      <textarea
        required
        rows={5}
        placeholder="*Your message"
        value={form.message}
        onChange={update('message')}
        className={inputClass}
        aria-label="Your message"
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-soil-800/50">* These fields are required.</p>
        <button
          type="submit"
          className="rounded-full bg-leaf-600 px-8 py-3 text-sm font-bold text-white shadow-md shadow-leaf-600/20 transition-all hover:bg-leaf-700 hover:shadow-lg"
        >
          Send Message
        </button>
      </div>
    </form>
  )
}
