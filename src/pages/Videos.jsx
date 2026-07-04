import PageHero from '../components/PageHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { VIDEOS } from '../data/site.js'

export default function Videos() {
  return (
    <>
      <PageHero title="Our Videos" image="/images/page-header.jpg" />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Watch"
          title="We provide leading solutions to agriculture"
          subtitle="See our products and people in action."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((video) => (
            <div
              key={video.id}
              className="overflow-hidden rounded-3xl border border-soil-100 bg-white shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={video.title}
                  className="h-full w-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
