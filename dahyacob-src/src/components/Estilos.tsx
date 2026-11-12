import { estilos, products, type Estilo } from '../data/products'
import Reveal from './Reveal'

const base = import.meta.env.BASE_URL
// Foto de cada colección: el primer modelo de ese estilo
const PORTADA: Record<Estilo, string> = { formal: 'mocasines-atenea', diario: 'tenis-samba', comodo: 'sandalias-deportivas' }

export default function Estilos() {
  return (
    <section id="estilos" aria-labelledby="est-t" className="bg-pearl py-16 lg:py-24">
      <Reveal className="mx-auto max-w-2xl px-5 text-center">
        <p className="font-script text-4xl text-gold">Para cada momento</p>
        <h2 id="est-t" className="mt-1 font-serif text-4xl font-bold uppercase leading-tight lg:text-5xl">Encuentra tu par</h2>
      </Reveal>
      <div className="mx-auto mt-12 grid max-w-[1224px] gap-6 px-5 md:grid-cols-3 lg:px-0">
        {(Object.keys(estilos) as Estilo[]).map((k, i) => {
          const foto = products.find((p) => p.id === PORTADA[k])?.fotos[0]
          const n = products.filter((p) => p.estilos?.includes(k)).length
          return (
            <Reveal key={k} delay={i * 120}>
              <a href={`#/estilo/${k}`} className="group relative block aspect-[4/5] overflow-hidden bg-[#f5f5f5]">
                {foto && <img src={base + foto} alt={estilos[k].titulo} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="font-serif text-3xl font-bold uppercase">{estilos[k].titulo}</h3>
                  <p className="mt-1 text-sm font-light">{estilos[k].texto}</p>
                  <span className="mt-4 inline-block rounded-full bg-white px-6 py-2 text-base font-medium text-ink transition-colors group-hover:bg-gold group-hover:text-white">Ver {n} modelos</span>
                </div>
              </a>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
