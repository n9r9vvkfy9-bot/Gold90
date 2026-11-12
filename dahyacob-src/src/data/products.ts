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
  {
    id: 'sandalias-punta-fina',
    nombre: 'Sandalias punta fina',
    categoria: 'Sandalias',
    subcategoria: 'Sandalias punta fina',
    precio: 155000,
    fotos: [1, 2, 3, 4, 5].map((i) => `img/sandalias-punta-fina-nuevo/sandalias-punta-fina-nuevo-${i}.jpg`),
    colores: ['Dorado y crema', 'Negro con animal print', 'Rojo', 'Azul marino', 'Nude con nudo'],
    tallas: SIZES,
  },
  {
    id: 'mocasines-140',
    nombre: 'Mocasines',
    categoria: 'Mocasines',
    subcategoria: 'Mocasines',
    precio: 140000,
    fotos: [1, 2, 3, 4, 5, 6, 7].map((i) => `img/mocasines-140/mocasines-140-${i}.jpg`),
    colores: ['Negro con herraje (lado)', 'Negro con herraje (par)', 'Negro con animal print', 'Azul marino (lado)', 'Azul marino (par)', 'Negro panal', 'Negro sin cordones'],
    tallas: SIZES,
  },
  {
    id: 'zapatos-espuma-eva',
    nombre: 'Zapatos espuma livianos suela Eva',
    categoria: 'Mocasines',
    subcategoria: 'Zapatos livianos',
    precio: 160000,
    fotos: ['img/zapatos-espuma-eva/zapatos-espuma-eva-1.jpg'],
    colores: ['Negro'],
    tallas: SIZES,
  },
  {
    id: 'mocasines-150',
    nombre: 'Mocasines',
    categoria: 'Mocasines',
    subcategoria: 'Mocasines',
    precio: 150000,
    fotos: Array.from({ length: 8 }, (_, i) => `img/mocasines-150/mocasines-150-${i + 1}.jpg`),
    colores: ['Negro con puntos dorados', 'Verde militar', 'Azul marino charol', 'Animal print', 'Negro charol suela dentada', 'Peltre con borlas', 'Azul marino con borlas', 'Plata con animal print'],
    tallas: SIZES,
  },
  {
    id: 'mocasines-145a',
    nombre: 'Mocasines',
    categoria: 'Mocasines',
    subcategoria: 'Mocasines',
    precio: 145000,
    fotos: Array.from({ length: 9 }, (_, i) => `img/mocasines-145a/mocasines-145a-${i + 1}.jpg`),
    colores: ['Beige con herraje', 'Rosa dorado', 'Dorado con borlas', 'Blanco', 'Crema con borlas rojas', 'Beige tejido', 'Dorado y beige', 'Dorado suela gruesa', 'Vino metalizado'],
    tallas: SIZES,
  },
  {
    id: 'tenis-deportivos-160',
    nombre: 'Tenis deportivos',
    categoria: 'Tenis',
    subcategoria: 'Tenis',
    precio: 160000,
    fotos: [1, 2].map((i) => `img/tenis-deportivos-160/tenis-deportivos-160-${i}.jpg`),
    colores: ['Beige (lado)', 'Beige (desde arriba)'],
    tallas: SIZES,
  },
  {
    id: 'mocasines-145b',
    nombre: 'Mocasines',
    categoria: 'Mocasines',
    subcategoria: 'Mocasines',
    precio: 145000,
    fotos: Array.from({ length: 6 }, (_, i) => `img/mocasines-145b/mocasines-145b-${i + 1}.jpg`),
    colores: ['Azul rey', 'Negro panal', 'Negro charol suela gruesa', 'Negro con herraje de bolas', 'Azul marino animal print', 'Negro charol con plata'],
    tallas: SIZES,
  },
  {
    id: 'tenis-rayas-160',
    nombre: 'Tenis deportivos',
    categoria: 'Tenis',
    subcategoria: 'Tenis',
    precio: 160000,
    fotos: Array.from({ length: 6 }, (_, i) => `img/tenis-rayas-160/tenis-rayas-160-${i + 1}.jpg`),
    colores: ['Crema y dorado', 'Café con plata', 'Blanco y plata', 'Beige con animal print', 'Crema con azul', 'Blanco'],
    tallas: SIZES,
  },
  {
    id: 'tenis-plataforma-160',
    nombre: 'Tenis deportivos',
    categoria: 'Tenis',
    subcategoria: 'Tenis',
    precio: 160000,
    fotos: Array.from({ length: 6 }, (_, i) => `img/tenis-plataforma-160/tenis-plataforma-160-${i + 1}.jpg`),
    colores: ['Crema con paja', 'Beige tejido', 'Blanco perforado', 'Blanco con paja dorada', 'Beige animal print', 'Dorado y plata'],
    tallas: SIZES,
  },
  {
    id: 'sandalias-deportivas-155b',
    nombre: 'Sandalias deportivas',
    categoria: 'Sandalias',
    subcategoria: 'Sandalias deportivas',
    precio: 155000,
    fotos: Array.from({ length: 8 }, (_, i) => `img/sandalias-deportivas-155b/sandalias-deportivas-155b-${i + 1}.jpg`),
    colores: ['Crema con paja', 'Beige con hebilla', 'Crema ondulada', 'Negro doble hebilla', 'Negro cruzada con textura', 'Beige cruzada tejida', 'Negro con tejido', 'Negro con animal print'],
    tallas: SIZES,
  },
  {
    id: 'mocasines-isabella',
    nombre: 'Mocasines Isabella',
    categoria: 'Mocasines',
    subcategoria: 'Mocasines',
    precio: 145000,
    fotos: [1, 2].map((i) => `img/mocasines-isabella/mocasines-isabella-${i}.jpg`),
    colores: ['Crema con borlas rojas', 'Azul marino con borlas blancas'],
    tallas: SIZES,
  },
  {
    id: 'tenis-deportivos-160b',
    nombre: 'Tenis deportivos',
    categoria: 'Tenis',
    subcategoria: 'Tenis',
    precio: 160000,
    fotos: Array.from({ length: 9 }, (_, i) => `img/tenis-deportivos-160b/tenis-deportivos-160b-${i + 1}.jpg`),
    colores: ['Negro panal', 'Negro perforado', 'Negro panal con plataforma', 'Negro con tejido', 'Negro con textura', 'Azul marino con rayas', 'Azul marino con plata', 'Negro tejido', 'Verde con velcro'],
    tallas: SIZES,
  },
  {
    id: 'mocasines-130',
    nombre: 'Mocasines',
    categoria: 'Mocasines',
    subcategoria: 'Mocasines',
    precio: 130000,
    fotos: Array.from({ length: 5 }, (_, i) => `img/mocasines-130/mocasines-130-${i + 1}.jpg`),
    colores: ['Azul marino con textura', 'Negro panal', 'Blanco con textura', 'Camel con herraje', 'Animal print con borlas'],
    tallas: SIZES,
  },
  {
    id: 'mocasines-aurelia',
    nombre: 'Mocasines Aurelia',
    categoria: 'Mocasines',
    subcategoria: 'Mocasines',
    precio: 145000,
    fotos: Array.from({ length: 4 }, (_, i) => `img/mocasines-aurelia/mocasines-aurelia-${i + 1}.jpg`),
    colores: ['Blanco con negro', 'Camel', 'Negro charol', 'Crema con dorado'],
    tallas: SIZES,
  },
  {
    id: 'mocasines-atenea',
    nombre: 'Mocasines Atenea',
    categoria: 'Mocasines',
    subcategoria: 'Mocasines',
    precio: 155000,
    fotos: Array.from({ length: 3 }, (_, i) => `img/mocasines-atenea/mocasines-atenea-${i + 1}.jpg`),
    colores: ['Dorado', 'Verde', 'Vino metalizado'],
    tallas: SIZES,
  },
  {
    id: 'tenis-lumina-160',
    nombre: 'Tenis Lumina',
    categoria: 'Tenis',
    subcategoria: 'Tenis Lumina',
    precio: 160000,
    fotos: ['img/tenis-lumina-160/tenis-lumina-160-1.jpg'],
    colores: ['Blanco con plata'],
    tallas: SIZES,
  },
  {
    id: 'tenis-ref-lumina',
    nombre: 'Tenis ref Lumina',
    categoria: 'Tenis',
    subcategoria: 'Tenis Lumina',
    precio: 160000,
    fotos: Array.from({ length: 6 }, (_, i) => `img/tenis-ref-lumina/tenis-ref-lumina-${i + 1}.jpg`),
    colores: ['Verde militar estampado', 'Negro y naranja estampado', 'Azul marino estampado', 'Café y mostaza estampado', 'Negro con textura', 'Blanco con plata'],
    tallas: SIZES,
  },
  {
    id: 'mocasines-gaby',
    nombre: 'Mocasines Gaby',
    categoria: 'Mocasines',
    subcategoria: 'Mocasines planos',
    precio: 125000,
    fotos: Array.from({ length: 3 }, (_, i) => `img/mocasines-gaby/mocasines-gaby-${i + 1}.jpg`),
    colores: ['Beige', 'Plata', 'Verde'],
    tallas: SIZES,
  },
  {
    id: 'morrales',
    nombre: 'Morrales',
    categoria: 'Bolsos',
    subcategoria: 'Morrales',
    precio: 350000,
    fotos: Array.from({ length: 3 }, (_, i) => `img/morrales/morrales-${i + 1}.jpg`),
    colores: ['Blanco con dorado', 'Rosa', 'Negro'],
    tallas: [],
  },
  {
    id: 'bolsos-candy-mix',
    nombre: 'Bolsos Candy Mix',
    categoria: 'Bolsos',
    subcategoria: 'Bolsos pequeños',
    precio: 210000,
    fotos: Array.from({ length: 5 }, (_, i) => `img/bolsos-candy-mix/bolsos-candy-mix-${i + 1}.jpg`),
    colores: ['Colección completa', 'Crema y verde', 'Negro', 'Azul', 'Café'],
    tallas: [],
  },
  {
    id: 'correas-70',
    nombre: 'Correas',
    categoria: 'Correas',
    subcategoria: 'Correas',
    precio: 70000,
    fotos: Array.from({ length: 3 }, (_, i) => `img/correas-70/correas-70-${i + 1}.jpg`),
    colores: ['Dorado', 'Blanco', 'Café'],
    tallas: [],
  },
  {
    id: 'bolsos-300',
    nombre: 'Bolsos',
    categoria: 'Bolsos',
    subcategoria: 'Bolsos grandes',
    precio: 300000,
    fotos: Array.from({ length: 7 }, (_, i) => `img/bolsos-300/bolsos-300-${i + 1}.jpg`),
    colores: ['Negro tejido', 'Café con cordón', 'Animal print', 'Dorado', 'Beige estampado con borlas', 'Blanco con correa beige', 'Verde y beige estampado con borlas'],
    tallas: [],
  },
  {
    id: 'bolsos-180',
    nombre: 'Bolsos',
    categoria: 'Bolsos',
    subcategoria: 'Bolsos pequeños',
    precio: 180000,
    fotos: Array.from({ length: 4 }, (_, i) => `img/bolsos-180/bolsos-180-${i + 1}.jpg`),
    colores: ['Blanco tejido', 'Rojo', 'Beige', 'Tejido café y crema'],
    tallas: [],
  },
  {
    id: 'sandalias-deportivas',
    nombre: 'Sandalias deportivas',
    categoria: 'Sandalias',
    subcategoria: 'Sandalias deportivas',
    precio: 155000,
    fotos: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `img/sandalias-deportivas-nuevo/sandalias-deportivas-nuevo-${i}.jpg`),
    colores: ['Rojo (lado)', 'Rojo (par)', 'Negro (lado)', 'Negro (par)', 'Beige (lado)', 'Beige (par)', 'Crema (lado)', 'Crema (par)', 'Negro con velcro'],
    tallas: SIZES,
  },
]

export const products: Product[] = [...CON_FOTOS, ...GENERADOS]

export const categories: Record<Category, string[]> = {
  Tenis: ['Tenis', 'Tenis Samba', 'Tenis Lumina'],
  Sandalias: ['Sandalias', 'Plataformas', 'Sandalias deportivas', 'Sandalias punta fina'],
  Mocasines: ['Mocasines', 'Mocasines planos', 'Mocasines charol', 'Zapatos livianos'],
  Bolsos: ['Bolsos grandes', 'Bolsos pequeños', 'Morrales'],
  Correas: ['Correas'],
}

export const money = (n: number) => '$' + n.toLocaleString('es-CO')
export const WHATSAPP = '573150950719'
export const INSTAGRAM = 'https://www.instagram.com/calzadocuerodahyacob_'
