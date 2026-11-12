import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { WHATSAPP, money, products, type Product } from './data/products'

export interface CartLine { id: string; talla?: number; qty: number }

interface Store {
  lines: CartLine[]
  count: number
  subtotal: number
  open: boolean
  bump: number
  favs: string[]
  setOpen: (o: boolean) => void
  add: (p: Product, talla?: number, qty?: number) => void
  setQty: (id: string, talla: number | undefined, qty: number) => void
  remove: (id: string, talla?: number) => void
  toggleFav: (id: string) => void
  checkoutUrl: () => string
}

const Ctx = createContext<Store>(null as unknown as Store)
export const useStore = () => useContext(Ctx)

function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key)
    return v ? (JSON.parse(v) as T) : fallback
  } catch {
    return fallback
  }
}

export const findProduct = (id: string) => products.find((p) => p.id === id)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => load('dy-cart', []))
  const [favs, setFavs] = useState<string[]>(() => load('dy-favs', []))
  const [open, setOpen] = useState(false)
  const [bump, setBump] = useState(0)

  useEffect(() => localStorage.setItem('dy-cart', JSON.stringify(lines)), [lines])
  useEffect(() => localStorage.setItem('dy-favs', JSON.stringify(favs)), [favs])

  const value = useMemo<Store>(() => {
    const same = (l: CartLine, id: string, t?: number) => l.id === id && l.talla === t
    const subtotal = lines.reduce((s, l) => s + (findProduct(l.id)?.precio ?? 0) * l.qty, 0)
    return {
      lines, subtotal, open, bump, favs, setOpen,
      count: lines.reduce((s, l) => s + l.qty, 0),
      add: (p, talla, qty = 1) => {
        setLines((ls) =>
          ls.some((l) => same(l, p.id, talla))
            ? ls.map((l) => (same(l, p.id, talla) ? { ...l, qty: l.qty + qty } : l))
            : [...ls, { id: p.id, talla, qty }],
        )
        setBump((b) => b + 1)
        setOpen(true)
      },
      setQty: (id, t, qty) => setLines((ls) => ls.map((l) => (same(l, id, t) ? { ...l, qty: Math.max(1, qty) } : l))),
      remove: (id, t) => setLines((ls) => ls.filter((l) => !same(l, id, t))),
      toggleFav: (id) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id])),
      checkoutUrl: () => {
        const items = lines.map((l) => {
          const p = findProduct(l.id)!
          return `• ${p.nombre}${l.talla ? ` · Talla ${l.talla}` : ''} · x${l.qty} · ${money(p.precio * l.qty)}`
        })
        const msg = [
          '¡Hola Dahyacob! Quiero hacer este pedido:', '', ...items, '',
          `Total: ${money(subtotal)}`, '',
          'Nombre:', 'Ciudad:', 'Dirección:',
        ].join('\n')
        return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`
      },
    }
  }, [lines, favs, open, bump])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useRoute() {
  const get = () => decodeURIComponent(location.hash.replace(/^#/, '')) || '/'
  const [route, setRoute] = useState(get)
  useEffect(() => {
    const h = () => { setRoute(get()); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', h)
    return () => window.removeEventListener('hashchange', h)
  }, [])
  return route
}
