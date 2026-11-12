import { INSTAGRAM } from '../data/products'

const COLS: [string, [string, string][]][] = [
  ['Tienda', [['Todos los productos', '#/tienda'], ['Tenis', '#/c/Tenis'], ['Sandalias', '#/c/Sandalias'], ['Mocasines', '#/c/Mocasines'], ['Bolsos', '#/c/Bolsos'], ['Correas', '#/c/Correas']]],
  ['Compañía', [['Nuestra fábrica', '#/'], ['Contacto', 'https://wa.me/573150950719'], ['Instagram', INSTAGRAM]]],
  ['Ayuda', [['Envíos y pagos', '#/'], ['Preguntas frecuentes', '#/'], ['Pedir por WhatsApp', 'https://wa.me/573150950719']]],
]

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-[1152px] gap-10 px-5 py-14 lg:grid-cols-[1fr_auto] lg:px-0">
        <div>
          <img src={`${import.meta.env.BASE_URL}img/logo.png`} alt="Dahyacob SHOES" className="h-28 w-28 rounded-full" />
          <p className="mt-6 text-sm font-light leading-6">
            WhatsApp +57 315 095 0719<br />Instagram @calzadocuerodahyacob_
          </p>
        </div>
        <nav aria-label="Pie de página" className="grid gap-8 sm:grid-cols-3 lg:gap-14">
          {COLS.map(([t, links]) => (
            <div key={t}>
              <p className="font-serif text-base font-bold uppercase">{t}</p>
              <ul className="mt-4 space-y-3">
                {links.map(([l, h]) => <li key={l}><a href={h} className="text-sm font-light hover:text-gold">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="mx-auto max-w-[1152px] border-t border-white/30 px-5 py-6 text-center lg:px-0">
        <p className="font-script text-3xl text-gold">¡Te esperamos pronto!</p>
        <p className="mt-2 text-sm font-light">© 2026 Dahyacob. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
