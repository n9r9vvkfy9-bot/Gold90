import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Product } from '../data/products'
import ProductCard from './ProductCard'

export function SectionTitle({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <div className="mb-10">
      {kicker && <p className="font-script text-3xl text-gold">{kicker}</p>}
      <h2 className="font-serif text-[26px] font-bold uppercase">{title}</h2>
      <div className="mt-4 h-px w-[100px] bg-ink" />
    </div>
  )
}

export default function ProductCarousel({ kicker, title, items, outline = false, to = '#/tienda' }: { kicker?: string; title: string; items: Product[]; outline?: boolean; to?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.9, behavior: 'smooth' })
  return (
    <section className="py-12" aria-label={title}>
      <div className="relative mx-auto max-w-[1224px] px-4 lg:px-0">
        <SectionTitle kicker={kicker} title={title} />
        <div ref={ref} className="flex snap-x gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] lg:gap-[46px] [&::-webkit-scrollbar]:hidden">
          {items.map((p) => (
            <div key={p.id} className="w-[44%] shrink-0 snap-start md:w-[31%] lg:w-[calc((100%-138px)/4)]"><ProductCard p={p} compact /></div>
          ))}
        </div>
        <button aria-label="Anterior" onClick={() => scroll(-1)} className="absolute left-0 top-[45%] hidden -translate-x-10 lg:block"><ChevronLeft size={32} /></button>
        <button aria-label="Siguiente" onClick={() => scroll(1)} className="absolute right-0 top-[45%] hidden translate-x-10 lg:block"><ChevronRight size={32} /></button>
        <div className="mt-10 text-center">
          <a href={to} className={outline ? 'inline-block border border-ink px-8 py-2.5 text-base font-light uppercase hover:bg-ink hover:text-pearl' : 'inline-block bg-gold px-4 py-[5px] text-base font-bold uppercase text-white hover:bg-ink'}>Ver todo</a>
        </div>
      </div>
    </section>
  )
}
