import { products } from '../data/products'
import Art, { kindOf } from './Art'
import Reveal from './Reveal'

const TILES = [
  { t: 'Tenis', to: '#/c/Tenis', cat: 'Tenis' },
  { t: 'Sandalias', to: '#/c/Sandalias', cat: 'Sandalias' },
  { t: 'Mocasines', to: '#/c/Mocasines', cat: 'Mocasines' },
  { t: 'Bolsos y correas', to: '#/c/Bolsos', cat: 'Bolsos' },
] as const

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-[1152px] px-5 py-12 lg:px-0" aria-label="Categorías">
      <div className="grid gap-[57px] lg:grid-cols-2 lg:gap-x-16">
        {TILES.map((c, n) => {
          const p = products.find((x) => x.categoria === c.cat)!
          return (
            <Reveal key={c.t} delay={(n % 2) * 100}>
              <a href={c.to} className="card relative block h-[440px] overflow-hidden rounded-[20px] lg:h-[374px]">
                <Art kind={kindOf(p)} name={p.nombre} className="absolute inset-0 h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />
                <div className="relative p-[35px] text-white">
                  <h3 className="font-serif text-[34px] font-bold uppercase leading-9">{c.t}</h3>
                  <p className="mt-2 text-xl font-light lg:text-2xl">Conoce nuestra colección</p>
                  <span className="mt-4 inline-block bg-ink px-[18px] py-3 text-base font-bold uppercase tracking-[1px]">Comprar ahora</span>
                </div>
              </a>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
