import Reveal from './Reveal'

const POINTS = ['Productos 100% colombianos', 'Calzado en cuero', 'Hecho en nuestra fábrica']

export default function Fabrica() {
  return (
    <section id="fabrica" aria-labelledby="fab-t" className="relative overflow-hidden bg-pearl py-20 lg:py-28">
      <span aria-hidden className="spark absolute left-[8%] top-12 text-2xl">✦</span>
      <span aria-hidden className="spark absolute bottom-12 right-[10%] text-xl">✦</span>
      <Reveal className="mx-auto max-w-3xl px-5 text-center">
        <p className="font-script text-4xl text-gold">Nuestra fábrica</p>
        <h2 id="fab-t" className="mt-1 font-serif text-4xl font-bold uppercase leading-tight lg:text-5xl">Hecho en Colombia, de principio a fin</h2>
        <div className="mx-auto mt-5 h-px w-[100px] bg-ink" />
        <p className="mt-6 text-lg font-light leading-8">
          Somos una fábrica colombiana de calzado de cuero. Todo lo que ves en esta página se hace en Colombia, con cuidado y a mano:
          desde cortar el cuero hasta armar cada par.
        </p>
        <ul className="mt-6 flex flex-wrap justify-center gap-3">
          {POINTS.map((p) => <li key={p} className="price">{p}</li>)}
        </ul>
      </Reveal>
    </section>
  )
}
