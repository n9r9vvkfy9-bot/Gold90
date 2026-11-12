import Reveal from './Reveal'

const base = import.meta.env.BASE_URL

// Fotos reales de clientas en la tienda: /public/img/clientas/clienta-1.jpg … 3
const FOTOS = [
  { n: 1, alt: 'Clienta feliz con su bolsa de Dahyacob Shoes en la tienda', pos: '50% 25%' },
  { n: 2, alt: 'Dos clientas felices con su caja y su bolsa de Dahyacob Shoes', pos: '50% 30%' },
  { n: 3, alt: 'Dos clientas felices con sus bolsas de Dahyacob Shoes', pos: '50% 30%' },
]

export default function Clientas() {
  return (
    <section id="clientas" aria-labelledby="cli-t" className="bg-white py-16 lg:py-24">
      <Reveal className="mx-auto max-w-2xl px-5 text-center">
        <p className="font-script text-4xl text-gold">Gracias por elegirnos</p>
        <h2 id="cli-t" className="mt-1 font-serif text-4xl font-bold uppercase leading-tight lg:text-5xl">Clientas felices</h2>
        <p className="mt-4 text-base font-light leading-7">Ellas ya estrenaron su par Dahyacob. ¡Te esperamos pronto en la tienda!</p>
      </Reveal>
      <div className="mx-auto mt-12 grid max-w-[1224px] gap-4 px-5 md:grid-cols-3 lg:px-0">
        {FOTOS.map((f, i) => (
          <Reveal key={f.n} delay={i * 120}>
            <figure className="group overflow-hidden bg-[#f5f5f5]">
              <img src={`${base}img/clientas/clienta-${f.n}.jpg`} alt={f.alt} loading="lazy" style={{ objectPosition: f.pos }} className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
            </figure>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center">
        <a href="https://www.instagram.com/calzadocuerodahyacob_" target="_blank" rel="noreferrer" className="btn btn-o inline-flex items-center gap-2">
          <svg aria-hidden viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
          Más en Instagram
        </a>
      </div>
    </section>
  )
}
