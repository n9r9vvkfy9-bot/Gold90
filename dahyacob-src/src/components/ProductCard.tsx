import { useState } from 'react'
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { money, type Product } from '../data/products'
import { useStore } from '../store'
import Img from './Img'
import { kindOf } from './Art'

export default function ProductCard({ p, compact = false }: { p: Product; compact?: boolean }) {
  const { add, favs, toggleFav } = useStore()
  const [i, setI] = useState(0)
  const [x0, setX0] = useState<number | null>(null)
  const fav = favs.includes(p.id)
  const go = (d: number) => setI((i + d + p.fotos.length) % p.fotos.length)
  const base = import.meta.env.BASE_URL

  return (
    <article className="card group flex flex-col rounded-[5px] bg-pearl/80">
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-[5px] bg-pearl"
        onMouseEnter={() => p.fotos.length > 1 && setI(1)}
        onMouseLeave={() => setI(0)}
        onTouchStart={(e) => setX0(e.touches[0].clientX)}
        onTouchEnd={(e) => { if (x0 !== null && Math.abs(e.changedTouches[0].clientX - x0) > 40) go(e.changedTouches[0].clientX < x0 ? 1 : -1); setX0(null) }}
      >
        <a href={`#/p/${p.id}`} aria-label={p.nombre}><Img src={base + p.fotos[i]} alt={p.nombre} kind={kindOf(p)} className="h-full w-full" /></a>
        <button aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'} aria-pressed={fav} onClick={() => toggleFav(p.id)} className="absolute right-2 top-2 rounded-full bg-white/80 p-1.5">
          <Heart size={18} className={fav ? 'fill-gold text-gold' : ''} />
        </button>
        {p.nuevo && <span className="label absolute left-2 top-2 rounded-full bg-gold px-2 py-0.5 text-white">Nuevo</span>}
        {p.agotado && <span className="label absolute left-2 top-9 rounded-full bg-ink px-2 py-0.5 text-white">Agotado</span>}
        {p.fotos.length > 1 && (
          <>
            <button aria-label="Foto anterior" onClick={() => go(-1)} className="absolute left-1 top-1/2 hidden rounded-full bg-white/80 p-1 group-hover:block"><ChevronLeft size={16} /></button>
            <button aria-label="Foto siguiente" onClick={() => go(1)} className="absolute right-1 top-1/2 hidden rounded-full bg-white/80 p-1 group-hover:block"><ChevronRight size={16} /></button>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col items-start gap-2 px-0 pb-2 pt-4 text-left">
        <h3 className="min-h-8 text-sm font-light uppercase leading-4 tracking-[1px]">{p.nombre}</h3>
        <span className="price">{money(p.precio)}</span>
        {!compact && <button
          disabled={p.agotado}
          onClick={() => (p.tallas.length ? (location.hash = `/p/${p.id}`) : add(p))}
          className="btn btn-o mt-auto w-full disabled:opacity-40"
        >
          {p.tallas.length ? 'Elegir talla' : 'Agregar'}
        </button>}
      </div>
    </article>
  )
}
