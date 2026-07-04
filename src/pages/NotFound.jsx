import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="font-display text-7xl font-bold text-leaf-200">404</p>
      <h1 className="text-2xl font-bold text-soil-900">Page not found</h1>
      <p className="max-w-md text-soil-800/70">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        to="/"
        className="rounded-full bg-leaf-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-leaf-700"
      >
        Back to Home
      </Link>
    </section>
  )
}
