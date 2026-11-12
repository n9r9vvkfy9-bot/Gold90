import { INSTAGRAM, products } from '../data/products'
import Img from './Img'
import { kindOf } from './Art'

export default function SocialStrip() {
  const shots = products.filter((_, i) => i % 18 === 0).slice(0, 5)
  return (
    <section aria-label="Instagram" className="mt-8">
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-5">
        {shots.map((p, i) => (
          <a key={p.id} href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label={`${p.nombre} en Instagram`} className={`overflow-hidden ${i > 3 ? 'sm:hidden lg:block' : ''}`}>
            <Img src={import.meta.env.BASE_URL + `img/social-${i + 1}.jpg`} alt={p.nombre} kind={kindOf(p)} className="aspect-square w-full transition hover:scale-105" />
          </a>
        ))}
      </div>
    </section>
  )
}
