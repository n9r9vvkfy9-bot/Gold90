import { useState } from 'react'
import { categories, products, type Category } from '../data/products'
import ProductGrid from './ProductGrid'

export default function CategoryPage({ cat, sub }: { cat: Category; sub?: string }) {
  const [order, setOrder] = useState<'asc' | 'desc' | ''>('')
  const all = products.filter((p) => p.categoria === cat)
  // la subcategoría con más modelos va primero
  const subs = [...categories[cat]].sort((a, b) => all.filter((p) => p.subcategoria === b).length - all.filter((p) => p.subcategoria === a).length)
  const items = all
    .filter((p) => !sub || p.subcategoria === sub)
    .sort((a, b) => (order === 'asc' ? a.precio - b.precio : order === 'desc' ? b.precio - a.precio : 0))

  return (
    <div>
      <ProductGridHeader cat={cat} subs={subs} sub={sub} order={order} setOrder={setOrder} />
      <ProductGrid items={items} />
    </div>
  )
}

function ProductGridHeader(props: { cat: string; subs: string[]; sub?: string; order: string; setOrder: (o: 'asc' | 'desc' | '') => void }) {
  const { cat, subs, sub, order, setOrder } = props
  const tab = (active: boolean) => `label rounded-full border px-4 py-2 ${active ? 'border-ink bg-ink text-pearl' : 'border-rose bg-pearl/70'}`
  return (
    <div className="mx-auto max-w-7xl px-4 pt-10">
      <h1 className="text-center font-script text-6xl text-gold">{cat}</h1>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Subcategorías">
          {subs.length > 1 && <a role="tab" aria-selected={!sub} href={`#/c/${cat}`} className={tab(!sub)}>Todo</a>}
          {subs.length > 1 && subs.map((s) => <a key={s} role="tab" aria-selected={sub === s} href={`#/c/${cat}/${s}`} className={tab(sub === s)}>{s}</a>)}
        </div>
        <label className="flex items-center gap-2 text-sm">
          Ordenar
          <select value={order} onChange={(e) => setOrder(e.target.value as 'asc' | 'desc' | '')} className="rounded-full border border-rose bg-pearl px-3 py-2">
            <option value="">Destacados</option>
            <option value="asc">Precio: menor a mayor</option>
            <option value="desc">Precio: mayor a menor</option>
          </select>
        </label>
      </div>
    </div>
  )
}
