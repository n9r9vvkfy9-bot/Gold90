import { CreditCard, HandCoins, Tag, Truck } from 'lucide-react'

const ITEMS = [
  [Truck, 'Envío a todo el país', '24 a 72 horas con Inter Rapidísimo'],
  [HandCoins, 'Pago contra entrega', 'Paga cuando recibes'],
  [CreditCard, 'Addi y Sistecrédito', 'Compra ahora, paga después'],
  [Tag, 'Calidad 100% colombiana', 'Zapatos y accesorios en cuero'],
] as const

export default function BenefitsBar() {
  return (
    <section aria-label="Beneficios" className="bg-ink text-white">
      <ul className="mx-auto grid max-w-[1152px] gap-8 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-0 lg:py-[70px]">
        {ITEMS.map(([Icon, t, d]) => (
          <li key={t} className="flex gap-3">
            <Icon size={32} strokeWidth={1.5} className="shrink-0 text-gold" />
            <div>
              <p className="font-serif text-lg font-bold uppercase leading-5">{t}</p>
              <p className="mt-2 font-light">{d}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
