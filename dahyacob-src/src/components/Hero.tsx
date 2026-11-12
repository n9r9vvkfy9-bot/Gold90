import { useEffect, useRef } from 'react'

const base = import.meta.env.BASE_URL

export default function Hero() {
  const video = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    // respeta "reducir movimiento": solo se muestra la foto de portada
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.current?.pause()
  }, [])
  return (
    <section aria-label="Bienvenida" className="relative min-h-[600px] overflow-hidden bg-gradient-to-br from-[#3b2a31] via-[#6d3f52] to-[#c98aa1] lg:min-h-[840px]">
      <div className="mx-auto grid h-full min-h-[600px] max-w-7xl items-center lg:min-h-[840px] lg:grid-cols-2 lg:px-[108px]">
        {/* video: fondo a pantalla completa en celular, marco en arco en escritorio */}
        <div className="absolute inset-0 lg:relative lg:order-2 lg:mx-auto lg:h-[660px] lg:w-[400px] lg:overflow-hidden lg:rounded-t-full lg:border lg:border-white/60 lg:shadow-2xl">
          <video
            ref={video} src={`${base}img/taller.mp4`} poster={`${base}img/taller-poster.jpg`}
            autoPlay muted loop playsInline preload="metadata" aria-label="Así hacemos tus zapatos en nuestro taller"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45 lg:bg-black/10" />
        </div>
        <div className="relative z-10 px-6 text-white lg:order-1 lg:px-0">
          <p className="rise font-script text-3xl text-[#f2d98a]">Hecho a mano en Colombia</p>
          <h1 className="rise mt-2 max-w-2xl font-serif text-4xl font-bold uppercase leading-tight lg:text-[46px]" style={{ animationDelay: '150ms' }}>Te damos la bienvenida a Dahyacob</h1>
          <p className="rise mt-3 text-xl font-light lg:text-[22px]" style={{ animationDelay: '300ms' }}>Calidad y comodidad 100% en cuero</p>
          <a href="#/tienda" className="btn rise mt-6 inline-block" style={{ animationDelay: '450ms' }}>Ver colección</a>
        </div>
      </div>
    </section>
  )
}
