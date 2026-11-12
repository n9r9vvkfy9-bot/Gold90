import Img from './Img'
import Reveal from './Reveal'

const base = import.meta.env.BASE_URL

// Fotos reales de la fábrica: reemplaza /public/img/fabrica-1.jpg … fabrica-3.jpg (vertical 4:5)
const SHOTS = [
  { n: 1, alt: 'Armando el calzado a mano en la fábrica', cap: 'Armado a mano', offset: '' },
  { n: 2, alt: 'Cuero y charol listos para armar', cap: 'Cuero y charol, pieza por pieza', offset: 'md:mt-14' },
  { n: 3, alt: 'Mocasines terminados en el estante', cap: 'Listos para ti', offset: '' },
]

const POINTS = ['Productos 100% colombianos', 'Calzado en cuero', 'Hecho en nuestra fábrica']

export default function Fabrica() {
  return (
    <section id="fabrica" aria-labelledby="fab-t" className="bg-pearl py-20 lg:py-28">
      <div className="mx-auto max-w-[1224px] px-5 lg:px-0">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-script text-4xl text-gold">Nuestra fábrica</p>
          <h2 id="fab-t" className="mt-1 font-serif text-4xl font-bold uppercase leading-tight lg:text-5xl">Hecho en Colombia, de principio a fin</h2>
          <p className="mt-6 text-lg font-light leading-8">
            Somos una fábrica colombiana de calzado de cuero. Todo lo que ves en esta página se hace en Colombia, con cuidado y a mano:
            desde cortar el cuero hasta armar cada par.
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-3">
            {POINTS.map((p) => <li key={p} className="price">{p}</li>)}
          </ul>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-12">
          {SHOTS.map((s, i) => (
            <Reveal key={s.n} delay={i * 120} className={s.offset}>
              <figure className="group">
                <div className="aspect-[4/5] overflow-hidden rounded-[5px] bg-white shadow-md">
                  <Img src={`${base}img/fabrica-${s.n}.jpg`} alt={s.alt} className="h-full w-full transition duration-500 group-hover:scale-105" />
                </div>
                <figcaption className="mt-4 text-center font-script text-3xl text-gold">{s.cap}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
