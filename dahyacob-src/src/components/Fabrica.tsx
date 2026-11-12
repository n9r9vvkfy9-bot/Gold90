import Img from './Img'
import Reveal from './Reveal'

const base = import.meta.env.BASE_URL

// Fotos reales de la fábrica: reemplaza /public/img/fabrica-1.jpg … fabrica-5.jpg (puedes sumar más y ajustar la grilla) (vertical 3:4 o 4:5)
const SHOTS = [
  { n: 1, alt: 'Cortando y preparando el cuero', cls: 'col-span-2 row-span-2 -rotate-2', },
  { n: 2, alt: 'Armando el calzado a mano', cls: 'rotate-3' },
  { n: 3, alt: 'Cosiendo en máquina de costura', cls: '-rotate-1' },
  { n: 4, alt: 'Costurera de Dahyacob trabajando', cls: 'rotate-2' },
  { n: 5, alt: 'Mocasines terminados en el estante', cls: 'col-span-2 -rotate-1' },
]

const PILLS = ['100% cuero', 'Fábrica colombiana', 'Hecho a mano']

export default function Fabrica() {
  return (
    <section id="fabrica" aria-labelledby="fab-t" className="relative overflow-hidden bg-pearl py-16 lg:py-24">
      <span aria-hidden className="spark absolute left-[6%] top-10 text-2xl">✦</span>
      <span aria-hidden className="spark absolute bottom-16 right-[8%] text-xl">✦</span>
      <div className="mx-auto grid max-w-[1224px] items-center gap-12 px-5 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:px-0">
        <Reveal>
          <p className="font-script text-4xl text-gold">Nuestra fábrica</p>
          <h2 id="fab-t" className="mt-1 font-serif text-4xl font-bold uppercase leading-tight lg:text-5xl">Hecho en Colombia, de principio a fin</h2>
          <div className="mt-5 h-px w-[100px] bg-ink" />
          <p className="mt-6 max-w-xl text-lg font-light leading-8">
            Cada par de Dahyacob nace en nuestra propia fábrica, en Colombia. Cortamos, cosemos y armamos a mano cuero colombiano para que
            tu calzado y tus accesorios sean 100% nacionales, de principio a fin.
          </p>
          <p className="mt-4 max-w-xl font-light leading-7">
            Detrás de cada costura hay manos colombianas que cuidan el detalle. Por eso el cuero se siente distinto y dura más.
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {PILLS.map((p) => <li key={p} className="price">{p}</li>)}
          </ul>
        </Reveal>

        <Reveal className="grid auto-rows-[150px] grid-cols-3 gap-3 sm:auto-rows-[190px] lg:auto-rows-[170px]" >
          {SHOTS.map((s) => (
            <figure key={s.n} className={`${s.cls} overflow-hidden border-[6px] border-white bg-white shadow-lg transition duration-300 hover:z-10 hover:rotate-0 hover:scale-[1.04]`}>
              <Img src={`${base}img/fabrica-${s.n}.jpg`} alt={s.alt} className="h-full w-full" />
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
