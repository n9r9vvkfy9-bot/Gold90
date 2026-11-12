import Reveal from './Reveal'

const base = import.meta.env.BASE_URL

// Estilo editorial tipo Nike: fotos grandes sin bordes redondeados, texto pequeño abajo a la izquierda y botón blanco.
// Para sumar más fotos, agrega un objeto aquí y la imagen en /public/img.
const TILES = [
  { img: 'look-crema.jpg', alt: 'Tenis, mocasines, sandalias y bolso en tonos crema', label: 'Formales', to: '#/estilo/formal', pos: '50% 60%' },
  { img: 'look-metal.jpg', alt: 'Tenis metálicos en dorado, plata y rosa dorado', label: 'De diario', to: '#/estilo/diario', pos: '50% 50%' },
  { img: 'look-nude.jpg', alt: 'Sandalias, tenis, balerinas y bolso en tonos nude', label: 'Cómodos', to: '#/estilo/comodo', pos: '50% 50%' },
]

export default function Destacados() {
  return (
    <section id="destacados" aria-labelledby="dest-t" className="bg-white py-16 lg:py-24">
      <Reveal className="px-5 text-center">
        <h2 id="dest-t" className="font-display text-5xl uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">Elige tu estilo</h2>
        <p className="mt-4 text-base font-medium">Formales, de diario y cómodos: cuero colombiano en cada par</p>
      </Reveal>
      <div className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-12 [&::-webkit-scrollbar]:hidden">
        {TILES.map((t, i) => (
          <Reveal key={t.img} delay={i * 120} className="w-[82%] shrink-0 snap-center lg:w-auto">
            <a href={t.to} className="group relative block aspect-[4/5] touch-manipulation overflow-hidden bg-[#f5f5f5] lg:aspect-auto lg:h-[620px]">
              <img src={`${base}img/${t.img}`} alt={t.alt} loading="lazy" style={{ objectPosition: t.pos }} className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent" />
              <span className="absolute bottom-6 left-6 rounded-full bg-white px-6 py-2 text-base font-medium text-ink transition-colors group-hover:bg-ink group-hover:text-white">{t.label}</span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
