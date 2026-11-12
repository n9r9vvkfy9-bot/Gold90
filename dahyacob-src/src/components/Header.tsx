import { useEffect, useState } from 'react'
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react'
import { money } from '../data/products'
import { useStore } from '../store'

const LINKS: [string, string][] = [
  ['Inicio', '#/'], ['Tienda', '#/tienda'], ['Tenis', '#/c/Tenis'], ['Sandalias', '#/c/Sandalias'], ['Mocasines', '#/c/Mocasines'], ['Bolsos y correas', '#/c/Bolsos'],
]

export default function Header() {
  const { count, bump, subtotal, setOpen } = useStore()
  const [menu, setMenu] = useState(false)
  const [searching, setSearching] = useState(false)
  const [q, setQ] = useState('')
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (q.trim()) location.hash = `/buscar/${q.trim()}`
    setSearching(false); setMenu(false)
  }
  const logo = (
    <a href="#/" aria-label="Dahyacob, inicio" className="flex items-center gap-2">
      <img src={`${import.meta.env.BASE_URL}img/logo.png`} alt="Dahyacob SHOES" className="float h-[62px] w-[62px] rounded-full" />
    </a>
  )

  return (
    <header className={`sticky top-0 z-40 h-[79px] bg-pearl transition-shadow ${scrolled ? 'shadow-[0_2px_10px_rgba(0,0,0,.15)]' : ''}`}>
      <div className="flex h-full items-stretch justify-between pl-4 lg:pl-[70px]">
        <div className="flex items-center">{logo}</div>
        <nav aria-label="Principal" className="hidden items-center gap-10 lg:flex">
          {LINKS.map(([t, h]) => <a key={t} href={h} className="text-base font-medium uppercase tracking-[2px] hover:text-gold">{t}</a>)}
        </nav>
        <div className="flex items-center">
          <div className="flex items-center gap-5 px-4 lg:px-8">
            {searching ? (
              <form onSubmit={submit} className="flex items-center border border-rose bg-white px-3">
                <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar productos" placeholder="Buscar…" className="w-24 bg-transparent py-1 text-sm outline-none sm:w-44" />
                <button type="button" aria-label="Cerrar búsqueda" onClick={() => setSearching(false)}><X size={16} /></button>
              </form>
            ) : (
              <button aria-label="Buscar" onClick={() => setSearching(true)}><Search size={24} strokeWidth={1.5} /></button>
            )}
            <a href="#/favoritos" aria-label="Favoritos" className="hidden sm:block"><User size={24} strokeWidth={1.5} /></a>
          </div>
          <button aria-label={`Carrito, ${count} productos`} onClick={() => setOpen(true)} className="flex h-full w-16 items-center justify-center gap-1 bg-rose px-2 text-ink lg:w-[106px] lg:flex-col lg:gap-0">
            <ShoppingCart size={26} strokeWidth={1.5} />
            <span className="flex gap-2 text-xs"><span key={bump} className="pop font-bold">{count}</span><span className="hidden lg:inline">{money(subtotal)}</span></span>
          </button>
          <button className="px-4 lg:hidden" aria-label="Abrir menú" onClick={() => setMenu(true)}><Menu /></button>
        </div>
      </div>

      {menu && (
        <div className="fixed inset-0 z-50 flex lg:hidden" role="dialog" aria-modal="true" aria-label="Menú">
          <div className="w-4/5 max-w-xs overflow-y-auto bg-pearl p-5">
            <button aria-label="Cerrar menú" className="mb-4" onClick={() => setMenu(false)}><X /></button>
            <form onSubmit={submit} className="mb-4">
              <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar productos" placeholder="Buscar…" className="w-full border border-rose px-4 py-2 text-sm" />
            </form>
            {LINKS.map(([t, h]) => <a key={t} href={h} onClick={() => setMenu(false)} className="block py-3 text-base font-medium uppercase tracking-[2px]">{t}</a>)}
            <a href="#/favoritos" onClick={() => setMenu(false)} className="block py-3 text-base font-medium uppercase tracking-[2px]">Favoritos</a>
          </div>
          <button aria-label="Cerrar menú" className="flex-1 bg-ink/40" onClick={() => setMenu(false)} />
        </div>
      )}
    </header>
  )
}
