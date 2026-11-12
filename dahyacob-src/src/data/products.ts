export type Category = 'Tenis' | 'Sandalias' | 'Mocasines' | 'Bolsos' | 'Correas'

export interface Product {
  id: string
  nombre: string
  categoria: Category
  subcategoria: string
  precio: number
  fotos: string[]
  tallas: number[]
  nuevo?: boolean
  colores?: string[] // un color por foto, en el mismo orden
  agotado?: boolean
}

const slug = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const SIZES = [35, 36, 37, 38, 39, 40]

// [categoría, subcategoría, prefijo del nombre, [precio, modelos][]]
type Group = [number, string[]]
const RAW: [Category, string, string, Group[]][] = [
  ['Bolsos', 'Bolsos grandes', '', [[310000, ['Animal print']], [275000, ['Luxe lumina']], [300000, ['Perla elegance']], [290000, ['Chocolate leather']], [350000, ['Noir elite']], [280000, ['Oro suprem']]]],
  ['Bolsos', 'Bolsos pequeños', '', [[180000, ['Natural chic', 'Mini rouge', 'Natural black', 'Capuchino']], [200000, ['Brilla elite']], [280000, ['Oro suprem']]]],
  ['Correas', 'Correas', '', [[55000, ['Red strap', 'Beige strap', 'Animal print strap']], [70000, ['Chocolate strap', 'Luz white', 'Oro strap']]]],
  ['Sandalias', 'Sandalias', '', [[135000, ['Senda nude', 'Senda animal print', 'Fucsia glow', 'Senda ruby', 'Senda blue', 'Senda nude x oro', 'Senda cuadro luxe', 'Dama flat', 'Senda dúo rojo']]]],
  ['Sandalias', 'Sandalias deportivas', '', [[135000, ['Yute crema']]]],
  ['Sandalias', 'Sandalias punta fina', '', [[150000, ['Capuchino point']], [155000, ['Rojo intenso', 'Arena dorada', 'Luxe cocoa', 'Luxe animal print', 'Cielo fino']]]],
  ['Mocasines', 'Mocasines planos', '', [[125000, ['Gaby plata', 'Gaby x verde', 'Gaby capuchino', 'Moca Valeria café', 'Moca Valeria negro', 'Moca café', 'Valeria champán', 'Valeria beige']], [145000, ['Moca aurora', 'Isabella']]]],
  ['Mocasines', 'Mocasines charol', '', [[159000, ['Charol negro', 'Charol rojo', 'Charol beige']], [150000, ['Charol champán', 'Charol folia']]]],
  ['Mocasines', 'Mocasines', '', [[156000, ['Capuchino', 'Luxe oro rosa', 'Luxe oro', 'Ámbar verde', 'Ámbar champán', 'Ámbar vino']], [150000, ['Duna blanco', 'Duna negro', 'Valenza negro', 'Valenza azul', 'Aliste azul', 'Elite oro']]]],
  ['Tenis', 'Tenis Samba', 'Samba ', [[150000, ['Blanco 3 oros', 'Dorada rosa', 'Oro', 'Blanco x negro', 'Plata', '3 oros']]]],
  ['Tenis', 'Tenis Lumina', 'Lumina ', [[160000, ['Verde', 'Miel', 'Negro', 'Azul', 'Blanco x plata', 'Blanco x dorado']]]],
  ['Tenis', 'Tenis', '', [[160000, ['Aura beige', 'Aura negro', 'Aura azul', 'Versilia beige', 'Versilia miel', 'Versilia negro', 'Luxe verde', 'Luxe lumina', 'Lumina 3 colores', 'Lumina miel', 'Luxe animal print', 'Luxo 3 colores', 'Luxor blanco', 'Eva negro', 'Sincor capuchino', 'Yute miel']], [140000, ['Aurora blanco']]]],
]

const GENERADOS: Product[] = RAW.flatMap(([categoria, subcategoria, prefijo, groups]) =>
  groups.flatMap(([precio, names]) =>
    names.map((n): Product => {
      const nombre = prefijo + n
      return {
        id: `${slug(subcategoria)}-${slug(nombre)}`,
        nombre, categoria, subcategoria, precio,
        // Reemplaza estas fotos en /public/img/<subcategoria>/
        fotos: [1, 2].map((i) => `img/${slug(subcategoria)}/${slug(nombre)}-${i}.jpg`),
        tallas: categoria === 'Bolsos' || categoria === 'Correas' ? [] : SIZES,
      }
    }),
  ),
)

// Modelos con fotos reales: la primera foto es la principal y las demás se ven al deslizar.
const CON_FOTOS: Product[] = [
  {
    id: 'plataformas-yute-duna',
    nombre: 'Plataformas yute duna',
    categoria: 'Sandalias',
    subcategoria: 'Plataformas',
    precio: 150000,
    fotos: [1, 2, 3].map((i) => `img/plataformas/plataformas-yute-duna-${i}.jpg`),
    colores: ['Beige', 'Blanco', 'Negro'],
    tallas: SIZES,
  },
  {
    id: 'sandalias-senda',
    nombre: 'Sandalias senda',
    categoria: 'Sandalias',
    subcategoria: 'Sandalias',
    precio: 130000,
    fotos: Array.from({ length: 10 }, (_, i) => `img/sandalias-senda/sandalias-senda-${i + 1}.jpg`),
    colores: ['Negro texturizado', 'Animal print', 'Crema', 'Cuadros, rojo y negro', 'Rojo', 'Negro y blanco', 'Azul', 'Dorado y crema', 'Negro y blanco cruzada', 'Negro y rojo'],
    tallas: SIZES,
  },
  {
    id: 'mocasines-charol',
    nombre: 'Mocasines charol',
    categoria: 'Mocasines',
    subcategoria: 'Mocasines charol',
    precio: 154000,
    fotos: [1, 2, 3].map((i) => `img/mocasines-charol/mocasines-charol-${i}.jpg`),
    colores: ['Rojo', 'Blanco', 'Negro'],
    tallas: SIZES,
  },
  {
    id: 'mocasines-antonella',
    nombre: 'Mocasines Antonella',
    categoria: 'Mocasines',
    subcategoria: 'Mocasines',
    precio: 150000,
    fotos: [1, 2, 3].map((i) => `img/mocasines-antonella/mocasines-antonella-${i}.jpg`),
    colores: ['Plata y dorado', 'Verde azulado', 'Rosa y crema'],
    tallas: SIZES,
  },
  {
    id: 'tenis-deportivos',
    nombre: 'Tenis deportivos',
    categoria: 'Tenis',
    subcategoria: 'Tenis',
    precio: 150000,
    fotos: [1, 2, 3, 4, 5, 6].map((i) => `img/tenis-deportivos/tenis-deportivos-${i}.jpg`),
    colores: ['Crema y dorado', 'Camel', 'Camel', 'Negro', 'Crema', 'Blanco'],
    tallas: SIZES,
  },
  {
    id: 'tenis-lumina',
    nombre: 'Tenis Lumina',
    categoria: 'Tenis',
    subcategoria: 'Tenis Lumina',
    precio: 150000,
    fotos: [1, 2, 3, 4].map((i) => `img/tenis-lumina-nuevo/tenis-lumina-nuevo-${i}.jpg`),
    colores: ['Verde', 'Café y mostaza', 'Azul', 'Negro y café'],
    tallas: SIZES,
  },
  {
    id: 'mocasines-valeria',
    nombre: 'Mocasines Valeria',
    categoria: 'Mocasines',
    subcategoria: 'Mocasines',
    precio: 110000,
    fotos: [1, 2, 3, 4, 5, 6].map((i) => `img/mocasines-valeria/mocasines-valeria-${i}.jpg`),
    colores: ['Negro', 'Camel con borlas', 'Camel', 'Crema', 'Dorado', 'Dorado tejido'],
    tallas: SIZES,
  },
  {
    id: 'tenis-samba',
    nombre: 'Tenis Samba',
    categoria: 'Tenis',
    subcategoria: 'Tenis Samba',
    precio: 150000,
    fotos: [1, 2, 3, 4, 5].map((i) => `img/tenis-samba-nuevo/tenis-samba-nuevo-${i}.jpg`),
    colores: ['Blanco con franjas metálicas', 'Blanco y negro', 'Peltre', 'Bronce', 'Rosa dorado'],
    tallas: SIZES,
  },
]

export const products: Product[] = [...CON_FOTOS, ...GENERADOS]

export const categories: Record<Category, string[]> = {
  Tenis: ['Tenis', 'Tenis Samba', 'Tenis Lumina'],
  Sandalias: ['Sandalias', 'Plataformas', 'Sandalias deportivas', 'Sandalias punta fina'],
  Mocasines: ['Mocasines', 'Mocasines planos', 'Mocasines charol'],
  Bolsos: ['Bolsos grandes', 'Bolsos pequeños'],
  Correas: ['Correas'],
}

export const money = (n: number) => '$' + n.toLocaleString('es-CO')
export const WHATSAPP = '573150950719'
export const INSTAGRAM = 'https://www.instagram.com/calzadocuerodahyacob_'
