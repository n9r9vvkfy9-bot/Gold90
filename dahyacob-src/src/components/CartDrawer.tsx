import { Minus, Plus, Trash2, X } from 'lucide-react'
import { money } from '../data/products'
import { findProduct, useStore } from '../store'
import Img from './Img'
import { kindOf } from './Art'

export default function CartDrawer() {
  const { open, setOpen, lines, subtotal, setQty, remove, checkoutUrl } = useStore()
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Carrito">
      <button aria-label="Cerrar carrito" className="flex-1 bg-ink/40" onClick={() => setOpen(false)} />
      <aside className="flex w-full max-w-md flex-col bg-pearl">
        <div className="flex items-center justify-between border-b border-rose/60 p-4">
          <h2 className="font-script text-3xl text-gold">Tu carrito</h2>
          <button aria-label="Cerrar" onClick={() => setOpen(false)}><X /></button>
        </div>
        <ul className="flex-1 space-y-4 overflow-y-auto p-4">
          {lines.length === 0 && <li className="py-10 text-center">Tu carrito está vacío. ¡Te esperamos pronto!</li>}
          {lines.map((l) => {
            const p = findProduct(l.id)
            if (!p) return null
            return (
              <li key={l.id + l.talla} className="flex gap-3">
                <Img src={import.meta.env.BASE_URL + p.fotos[0]} alt={p.nombre} kind={kindOf(p)} className="h-24 w-20 rounded-lg" />
                <div className="flex-1">
                  <p className="label">{p.nombre}</p>
                  <p className="text-sm">{l.talla ? `Talla ${l.talla} · ` : ''}{money(p.precio)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button aria-label="Menos" onClick={() => setQty(l.id, l.talla, l.qty - 1)} className="rounded-full border border-rose p-1"><Minus size={14} /></button>
                    <span aria-live="polite">{l.qty}</span>
                    <button aria-label="Más" onClick={() => setQty(l.id, l.talla, l.qty + 1)} className="rounded-full border border-rose p-1"><Plus size={14} /></button>
                    <button aria-label={`Eliminar ${p.nombre}`} onClick={() => remove(l.id, l.talla)} className="ml-auto"><Trash2 size={16} /></button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="border-t border-rose/60 p-4">
          <p className="mb-3 flex justify-between"><span className="label">Subtotal</span><span className="price">{money(subtotal)}</span></p>
          <a href={lines.length ? checkoutUrl() : undefined} target="_blank" rel="noreferrer" aria-disabled={!lines.length} className={`btn block text-center ${lines.length ? '' : 'pointer-events-none opacity-40'}`}>Finalizar pedido por WhatsApp</a>
        </div>
      </aside>
    </div>
  )
}
