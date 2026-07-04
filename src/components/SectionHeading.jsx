export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', light = false }) {
  const alignment = align === 'left' ? 'items-start text-left' : 'items-center text-center'
  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] ${
            light ? 'bg-white/10 text-harvest-400' : 'bg-leaf-100 text-leaf-700'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2 className={`max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl ${light ? 'text-white' : 'text-soil-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-2xl text-base leading-relaxed ${light ? 'text-white/70' : 'text-soil-800/70'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
