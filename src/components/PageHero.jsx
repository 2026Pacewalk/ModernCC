import { Link } from 'react-router-dom'

export default function PageHero({ title, crumb, image = '/images/clip-background.jpg' }) {
  return (
    <section className="relative overflow-hidden bg-leaf-950">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-leaf-950/90 via-leaf-950/70 to-leaf-900/40" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-3 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <nav className="flex items-center gap-2 text-sm font-medium text-white/60">
          <Link to="/" className="transition-colors hover:text-harvest-400">Home</Link>
          <span>/</span>
          <span className="text-harvest-400">{crumb ?? title}</span>
        </nav>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
      </div>
    </section>
  )
}
