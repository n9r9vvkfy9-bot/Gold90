import { MessageCircle } from 'lucide-react'
import { WHATSAPP } from '../data/products'

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('¡Hola Dahyacob! Quiero más información.')}`}
      target="_blank" rel="noreferrer" aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-20 right-5 z-30 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gold text-white shadow-lg md:bottom-5"
    >
      <MessageCircle size={28} />
    </a>
  )
}
