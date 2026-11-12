import { useState } from 'react'
import Art, { type ArtKind } from './Art'

// Muestra la foto; si todavía no existe, muestra una ilustración del producto.
export default function Img({ src, alt, className = '', eager = false, kind }: { src: string; alt: string; className?: string; eager?: boolean; kind?: ArtKind }) {
  const [bad, setBad] = useState(false)
  if (bad) return <Art kind={kind ?? 'tenis'} name={alt} className={className} />
  return <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} onError={() => setBad(true)} className={`object-cover ${className}`} />
}
