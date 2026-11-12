import type { Product } from '../data/products'

// Ilustración vectorial que se usa mientras no haya foto real del producto.
const TONES: [RegExp, [string, string]][] = [
  [/negro|noir|charol negro/, ['#2b2326', '#4a3b40']],
  [/rojo|ruby|rouge|red|vino/, ['#b3213a', '#d9506a']],
  [/fucsia/, ['#d6338a', '#f06bb3']],
  [/verde/, ['#3f7a5a', '#6fae8a']],
  [/azul|blue|cielo/, ['#3a63a8', '#7a9fd6']],
  [/blanco|white|perla|luz|crema/, ['#f4ece8', '#ffffff']],
  [/plata/, ['#b8bcc4', '#e4e7ec']],
  [/oro|dorad|gold|elite|suprem|luxe/, ['#c9a24a', '#ecd28a']],
  [/champ|arena|beige|nude|natural|capuchino|cappuch/, ['#d8bfa0', '#efdcc3']],
  [/miel|caf|cocoa|chocolate|ambar|ámbar|yute|moca/, ['#9b6a3f', '#c99865']],
  [/animal/, ['#a8772f', '#e0b774']],
]
const tone = (name: string): [string, string] => TONES.find(([r]) => r.test(name.toLowerCase()))?.[1] ?? ['#d98fa8', '#f2b8c9']

export type ArtKind = 'tenis' | 'mocasin' | 'sandalia' | 'bolso' | 'correa'
export const kindOf = (p: Pick<Product, 'categoria' | 'subcategoria'>): ArtKind =>
  p.categoria === 'Tenis' ? 'tenis' : p.categoria === 'Mocasines' ? 'mocasin' : p.categoria === 'Sandalias' ? 'sandalia' : p.categoria === 'Bolsos' ? 'bolso' : 'correa'

export default function Art({ kind, name, className = '' }: { kind: ArtKind; name: string; className?: string }) {
  const [c1, c2] = tone(name)
  const id = `g${kind}${c1.slice(1)}${c2.slice(1)}`
  return (
    <svg role="img" aria-label={name} viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice" className={className}>
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff8f9" /><stop offset="1" stopColor="#f6c9d8" /></linearGradient>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={c2} /><stop offset="1" stopColor={c1} /></linearGradient>
      </defs>
      <rect width="200" height="250" fill="url(#bg)" />
      <g fill="none" stroke="#c9a24a" strokeWidth=".6" opacity=".45">
        <path d="M-10 60 C 50 30, 90 120, 210 80" /><path d="M-10 190 C 70 150, 120 230, 210 170" />
      </g>
      <ellipse cx="100" cy="212" rx="62" ry="7" fill="#2b2326" opacity=".12" />
      <g className="art-float">
        {kind === 'bolso' && (
          <g>
            <path d="M70 100 C 70 50, 130 50, 130 100" fill="none" stroke="#c9a24a" strokeWidth="5" strokeLinecap="round" />
            <path d="M45 98 H155 L168 205 H32 Z" fill={`url(#${id})`} />
            <path d="M45 98 H155 L158 120 H42 Z" fill="#000" opacity=".1" />
            <circle cx="100" cy="128" r="7" fill="#c9a24a" /><circle cx="100" cy="128" r="3" fill="#fff8f9" />
            <path d="M52 112 H148" stroke="#fff" strokeOpacity=".5" strokeDasharray="3 4" />
          </g>
        )}
        {kind === 'correa' && (
          <g>
            <path d="M22 150 C 60 90, 140 90, 178 150" fill="none" stroke={`url(#${id})`} strokeWidth="20" strokeLinecap="round" />
            <path d="M22 150 C 60 90, 140 90, 178 150" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1" strokeDasharray="3 5" transform="translate(0 -3)" />
            <rect x="84" y="86" width="32" height="26" rx="5" fill="none" stroke="#c9a24a" strokeWidth="5" />
            <rect x="97" y="86" width="5" height="26" fill="#c9a24a" />
          </g>
        )}
        {(kind === 'tenis' || kind === 'mocasin') && (
          <g>
            <path d="M28 168 Q28 196 56 196 H166 Q190 196 190 172 Z" fill={kind === 'tenis' ? '#fffaf6' : '#2b2326'} opacity={kind === 'tenis' ? 1 : .85} />
            <path d={kind === 'tenis' ? 'M32 170 L38 104 Q40 88 58 90 L84 96 Q100 124 132 130 Q184 138 190 170 Z' : 'M32 170 L36 128 Q38 112 58 114 L84 120 Q104 134 134 138 Q184 142 190 170 Z'} fill={`url(#${id})`} />
            {kind === 'tenis' ? (
              <g stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity=".9"><path d="M92 106 l14 -7" /><path d="M104 115 l14 -7" /><path d="M116 123 l14 -6" /></g>
            ) : (
              <g><path d="M96 134 q16 -6 30 4" stroke="#c9a24a" strokeWidth="4" fill="none" strokeLinecap="round" /><circle cx="112" cy="134" r="3" fill="#c9a24a" /></g>
            )}
            <path d="M36 150 Q100 160 188 160" stroke="#c9a24a" strokeWidth="2" fill="none" opacity=".8" />
            <path d="M44 112 Q46 100 56 98" stroke="#fff" strokeOpacity=".6" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        )}
        {kind === 'sandalia' && (
          <g>
            <path d="M26 176 Q26 198 56 198 H160 Q192 198 192 178 Q150 168 100 172 Q60 160 26 176 Z" fill="#fffaf6" />
            <path d="M40 170 Q50 128 82 134 Q104 142 128 160 L120 174 Q100 156 78 150 Q60 150 52 172 Z" fill={`url(#${id})`} />
            <path d="M130 158 Q160 140 180 168" stroke={c1} strokeWidth="9" fill="none" strokeLinecap="round" />
            <circle cx="84" cy="144" r="5" fill="#c9a24a" />
          </g>
        )}
      </g>
      <text x="100" y="236" textAnchor="middle" fontFamily="Great Vibes, cursive" fontSize="17" fill="#c9a24a">{name.length > 22 ? name.slice(0, 21) + '…' : name}</text>
    </svg>
  )
}
