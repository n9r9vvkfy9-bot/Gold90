import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { WHATSAPP, money, products } from '../data/products'
import { useStore } from '../store'
import Img from './Img'
import { kindOf } from './Art'
import ProductGrid from './ProductGrid'

const base = import.meta.env.BASE_URL

export default function ProductDetail({ id }: { id: string }) {
  const p = products.find((x) => x.id === id)
  const { add } = useStore()
  const [photo, setPhoto] = useState(0)
  const [talla, setTalla] = useState<number>()
  const [qty, setQty] = useState(1)
  const [zoom, setZoom] = useState(false)
  const [pos, setPos] = useState('50% 50%')
  const [warn, setWarn] = useState(false)
  const x0 = useRef<number | null>(null)
  if (!p) return <p className="p-10 text-center">Producto no encontrado. <a className="underline" href="#/">Volver al inicio</a></p>

  const needSize = p.tallas.length > 0
  const tryAdd = () => (needSize && !talla ? setWarn(true) : (add(p, talla, qty), setWarn(false)))
  const wa = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`¡Hola Dahyacob! Quiero pedir: ${p.nombre}${talla ? `, talla ${talla}` : ''} (${money(p.precio)})`)}`
  const related = products.filter((x) => x.categoria === p.categoria && x.id !== p.id).slice(0, 4)

  return (
    <div>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2">
        <div>
          <div
            className="aspect-[4/5] cursor-zoom-in overflow-hidden rounded-2xl bg-pearl"
            onMouseEnter={() => setZoom(true)} onMouseLeave={() => setZoom(false)}
            onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setPos(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`) }}
            onTouchStart={(e) => (x0.current = e.touches[0].clientX)}
            onTouchEnd={(e) => { if (x0.current !== null && Math.abs(e.changedTouches[0].clientX - x0.current) > 40) setPhoto((photo + (e.changedTouches[0].clientX < x0.current ? 1 : p.fotos.length - 1)) % p.fotos.length) }}
          >
            <div className="h-full w-full transition-transform duration-200" style={{ transform: zoom ? 'scale(1.8)' : 'none', transformOrigin: pos }}>
              <Img src={base + p.fotos[photo]} alt={p.nombre} kind={kindOf(p)} eager className="h-full w-full" />
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            {p.fotos.map((f, k) => (
              <button key={f} aria-label={`Ver foto ${k + 1}`} onClick={() => setPhoto(k)} className={`h-20 w-16 overflow-hidden rounded-lg border-2 ${k === photo ? 'border-gold' : 'border-transparent'}`}>
                <Img src={base + f} alt={p.nombre} kind={kindOf(p)} className="h-full w-full" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="label text-gold">{p.subcategoria}</p>
          <h1 className="mt-1 font-serif text-4xl font-semibold uppercase">{p.nombre}</h1>
          <p className="mt-3"><span className="price text-lg">{money(p.precio)}</span></p>

          {needSize && (
            <fieldset className="mt-6">
              <legend className="label mb-2">Talla</legend>
              <div className="flex flex-wrap gap-2">
                {p.tallas.map((t) => (
                  <button key={t} aria-pressed={talla === t} onClick={() => { setTalla(t); setWarn(false) }} className={`h-11 w-11 rounded-full border text-sm ${talla === t ? 'border-ink bg-ink text-pearl' : 'border-rose bg-pearl'}`}>{t}</button>
                ))}
              </div>
              {warn && <p role="alert" className="mt-2 text-sm text-red-700">Elige tu talla para continuar.</p>}
            </fieldset>
          )}

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-full border border-rose bg-pearl">
              <button aria-label="Menos" className="px-4 py-2" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span aria-live="polite" className="w-6 text-center">{qty}</span>
              <button aria-label="Más" className="px-4 py-2" onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>
          <button disabled={p.agotado} onClick={tryAdd} className="btn mt-4 w-full py-4 text-sm disabled:opacity-40">Agregar al carrito</button>
          <a href={wa} target="_blank" rel="noreferrer" className="btn btn-o mt-3 block w-full py-4 text-center text-sm">Pedir por WhatsApp</a>

          <div className="mt-8 divide-y divide-rose/60 border-y border-rose/60">
            {[
              ['Descripción', `${p.nombre}: ${p.subcategoria.toLowerCase()} en cuero, hecho en Colombia. EDITAR con la descripción real.`],
              ['Material y cuidados', '100% cuero. Limpia con un paño suave y húmedo, evita el exceso de agua y guárdalo lejos del sol directo.'],
              ['Envíos y pagos', 'Envíos a todo el país con Inter Rapidísimo en 24 a 72 horas. Paga contra entrega, con Addi o con Sistecrédito.'],
            ].map(([t, c]) => (
              <details key={t} className="group py-3">
                <summary className="label flex cursor-pointer list-none items-center justify-between">{t}<ChevronDown size={16} className="transition group-open:rotate-180" /></summary>
                <p className="mt-2 text-sm">{c}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
      <ProductGrid items={related} title="También te puede gustar" />
    </div>
  )
}
