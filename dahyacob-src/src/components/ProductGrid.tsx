import type { Product } from '../data/products'
import ProductCard from './ProductCard'
import Reveal from './Reveal'

export default function ProductGrid({ items, title }: { items: Product[]; title?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10" aria-label={title ?? 'Productos'}>
      {title && <h2 className="mb-8 text-center font-script text-5xl text-gold">{title}</h2>}
      {items.length === 0 && <p className="py-10 text-center">No encontramos productos. ¡Te esperamos pronto!</p>}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p, i) => <Reveal key={p.id} delay={(i % 4) * 90}><ProductCard p={p} /></Reveal>)}
      </div>
    </section>
  )
}
