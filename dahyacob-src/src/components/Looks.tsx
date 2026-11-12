import { WHATSAPP } from '../data/products'
import Reveal from './Reveal'

const base = import.meta.env.BASE_URL
const wa = (t: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`

const LOOKS = [
  {
    img: 'look-crema.jpg', chip: 'Colección crema', title: 'Crema, tejido y dorado',
    text: 'Tenis, mocasines, sandalias de plataforma, bolso y correa en tonos crema con detalles tejidos y herrajes dorados. Piezas que combinan entre sí para armar tu look completo.',
    ratio: 'aspect-[1290/1186]', links: [['Ver tenis', '#/c/Tenis'], ['Ver sandalias', '#/c/Sandalias']], msg: 'Hola Dahyacob, me gustó la colección crema. ¿Qué modelos tienen disponibles?',
  },
  {
    img: 'look-nude.jpg', chip: 'Colección nude', title: 'Tonos nude y camel',
    text: 'Sandalias, tenis, balerinas y bolso en tonos neutros y elegantes que combinan con todo. Para el día a día y para las ocasiones especiales.',
    ratio: 'aspect-[1290/1479]', links: [['Ver sandalias', '#/c/Sandalias'], ['Ver bolsos', '#/c/Bolsos']], msg: 'Hola Dahyacob, me gustó la colección nude. ¿Qué modelos tienen disponibles?',
  },
]

export default function Looks() {
  return (
    <section id="colecciones" aria-labelledby="col-t" className="bg-pearl py-20 lg:py-28">
      <div className="mx-auto max-w-[1224px] px-5 lg:px-0">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-script text-4xl text-gold">Nuestras colecciones</p>
          <h2 id="col-t" className="mt-1 font-serif text-4xl font-bold uppercase leading-tight lg:text-5xl">Looks que combinan contigo</h2>
        </Reveal>

        <div className="mt-16 space-y-20 lg:space-y-28">
          {LOOKS.map((l, i) => (
            <Reveal key={l.img}>
              <div className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <div className="relative">
                  <div className={`wipe overflow-hidden rounded-[5px] shadow-xl ${l.ratio} max-h-[720px] w-full`}>
                    <img src={`${base}img/${l.img}`} alt={l.title} loading="lazy" className="slowzoom h-full w-full object-cover" />
                  </div>
                  <span className="sheen absolute -bottom-4 left-6 border border-gold bg-white px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-gold shadow">{l.chip}</span>
                </div>
                <div>
                  <h3 className="font-serif text-3xl font-bold uppercase lg:text-4xl">{l.title}</h3>
                  <div className="mt-4 h-px w-[100px] bg-ink" />
                  <p className="mt-6 max-w-lg text-lg font-light leading-8">{l.text}</p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    {l.links.map(([t, h]) => <a key={t} href={h} className="btn">{t}</a>)}
                    <a href={wa(l.msg)} target="_blank" rel="noreferrer" className="btn btn-o">Pedir por WhatsApp</a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* banda oscura: texto a la izquierda y la foto completa a la derecha */}
      <div className="mt-24 bg-ink text-white lg:mt-32">
        <Reveal className="mx-auto grid max-w-[1224px] items-center gap-10 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-0 lg:py-20">
          <div>
            <p className="font-script text-4xl text-[#f2d98a]">Brillo en cada paso</p>
            <h3 className="mt-1 max-w-md font-serif text-4xl font-bold uppercase leading-tight lg:text-5xl">Tenis metálicos en cuero</h3>
            <p className="mt-4 max-w-md text-lg font-light leading-8">Dorado, plata y rosa dorado. Un tenis que se nota y que combina con todo.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#/c/Tenis/Tenis Samba" className="inline-block bg-gold px-6 py-3 text-sm font-bold uppercase tracking-[1px] text-white hover:bg-white hover:text-ink">Ver los tenis</a>
              <a href={wa('Hola Dahyacob, me gustaron los tenis metálicos. ¿Qué colores y tallas tienen?')} target="_blank" rel="noreferrer" className="inline-block border border-white px-6 py-3 text-sm font-bold uppercase tracking-[1px] hover:bg-white hover:text-ink">Pedir por WhatsApp</a>
            </div>
          </div>
          <div className="sheen wipe mx-auto aspect-[1290/1502] w-full max-w-md overflow-hidden rounded-[5px] shadow-2xl">
            <img src={`${base}img/look-metal.jpg`} alt="Tenis metálicos Dahyacob en dorado, plata y rosa dorado" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
