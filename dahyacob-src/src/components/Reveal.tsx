import { useEffect, useRef, type ReactNode } from 'react'

export default function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } }, { threshold: 0.1 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

export const Branch = ({ className = '' }: { className?: string }) => (
  <svg aria-hidden className={`pointer-events-none absolute h-24 w-24 text-gold opacity-60 ${className}`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
    <path d="M5 95 C 30 70, 60 40, 95 5" />
    {[20, 35, 50, 65, 80].map((t) => (
      <g key={t}>
        <path d={`M${5 + t * 0.9} ${95 - t * 0.9} q 8 -10 16 -4 q -8 10 -16 4`} />
        <path d={`M${5 + t * 0.9} ${95 - t * 0.9} q -10 -8 -4 -16 q 10 8 4 16`} />
      </g>
    ))}
  </svg>
)

export const Sparkle = ({ className = '' }: { className?: string }) => (
  <span aria-hidden className={`spark absolute text-lg ${className}`}>✦</span>
)
