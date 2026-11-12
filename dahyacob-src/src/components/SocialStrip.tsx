import { INSTAGRAM, products } from '../data/products'

const base = import.meta.env.BASE_URL
// Fotos reales de modelos de distintas categorías
const IDS = ['tenis-samba', 'mocasines-atenea', 'sandalias-punta-fina', 'morrales', 'mocasines-charol']

export default function SocialStrip() {
  const shots = IDS.map((id) => products.find((p) => p.id === id)).filter((p) => !!p)
  return (
    <section aria-label="Instagram" className="mt-8">
      <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-5">
        {shots.map((p, i) => (
          <a key={p.id} href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label={`${p.nombre} en Instagram`} className={`overflow-hidden bg-[#f5f5f5] ${i > 3 ? 'hidden lg:block' : ''}`}>
            <img src={base + p.fotos[0]} alt={p.nombre} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105" />
          </a>
        ))}
      </div>
    </section>
  )
}
