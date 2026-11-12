import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { WHATSAPP } from '../data/products'
import Reveal from './Reveal'

const base = import.meta.env.BASE_URL

export default function TiendaFisica() {
  const [noPhoto, setNoPhoto] = useState(false)
  const wa = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('¡Hola Dahyacob! Quiero visitar la tienda. ¿Dónde queda y cuál es el horario?')}`
  return (
    <section id="tienda-fisica" aria-labelledby="tf-t" className="border-t border-ink/10 bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1224px] items-center gap-10 px-5 lg:grid-cols-2 lg:gap-16 lg:px-0">
        <Reveal className="order-2 lg:order-1">
          <p className="font-script text-4xl text-gold">Visítanos</p>
          <h2 id="tf-t" className="mt-1 font-serif text-4xl font-bold uppercase leading-tight lg:text-5xl">También tenemos tienda física</h2>
          <div className="mt-5 h-px w-[100px] bg-ink" />
          <p className="mt-6 max-w-lg text-lg font-light leading-8">
            Ven a conocer nuestros modelos en persona, pruébatelos y siente la calidad del cuero antes de elegir tu par.
          </p>
          <p className="mt-5 flex items-start gap-2 font-medium"><MapPin className="mt-0.5 shrink-0 text-gold" size={20} />Dirección y horario: EDITAR</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={wa} target="_blank" rel="noreferrer" className="btn">Cómo llegar por WhatsApp</a>
            <a href="#/tienda" className="btn btn-o">Ver la tienda online</a>
          </div>
          <p className="mt-8 font-script text-3xl text-gold">¿Prefieres comprar desde casa? Mira lo nuevo ↓</p>
        </Reveal>
        <Reveal className="order-1 lg:order-2">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-[5px] bg-[#f1eeee] shadow-md">
            {noPhoto ? (
              <div className="flex h-full w-full items-center justify-center p-8 text-center font-script text-3xl text-gold">Aquí va la foto de la tienda</div>
            ) : (
              <img src={`${base}img/tienda-1.jpg`} alt="Tienda física de Dahyacob" loading="lazy" onError={() => setNoPhoto(true)} className="h-full w-full object-cover" />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
