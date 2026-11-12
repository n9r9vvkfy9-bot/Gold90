import AnnouncementBar from './components/AnnouncementBar'
import CartDrawer from './components/CartDrawer'
import Fabrica from './components/Fabrica'
import TiendaFisica from './components/TiendaFisica'
import Destacados from './components/Destacados'
import PromoBanner from './components/PromoBanner'
import SocialStrip from './components/SocialStrip'
import BenefitsBar from './components/BenefitsBar'
import ProductCarousel from './components/ProductCarousel'
import CategoryPage from './components/CategoryPage'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductDetail from './components/ProductDetail'
import ProductGrid from './components/ProductGrid'
import WhatsAppFloat from './components/WhatsAppFloat'
import { categories, estilos, products, type Category, type Estilo } from './data/products'
import Estilos from './components/Estilos'
import Clientas from './components/Clientas'
import { useStore, useRoute } from './store'


function Page({ route }: { route: string }) {
  const { favs } = useStore()
  const [, kind, a, b] = route.split('/')
  if (kind === 'c' && a in categories) return <CategoryPage cat={a as Category} sub={b} />
  if (kind === 'p') return <ProductDetail id={a} />
  if (kind === 'buscar') {
    const q = a.toLowerCase()
    return <ProductGrid title={`Resultados para “${a}”`} items={products.filter((p) => `${p.nombre} ${p.subcategoria} ${p.categoria}`.toLowerCase().includes(q))} />
  }
  if (kind === 'tienda') return <ProductGrid title="Toda la tienda" items={products} />
  if (kind === 'estilo' && a in estilos) return <ProductGrid title={estilos[a as Estilo].titulo} items={products.filter((p) => p.estilos?.includes(a as Estilo))} />
  if (kind === 'favoritos') return <ProductGrid title="Tus favoritos" items={products.filter((p) => favs.includes(p.id))} />
  const byCat = (c: Category) => products.filter((p) => p.categoria === c)
  const zapatos = products.filter((p) => p.categoria !== 'Bolsos' && p.categoria !== 'Correas')
  const nuevos = zapatos.slice(0, 12)
  const popular = [...zapatos.slice(12), ...zapatos.slice(0, 12)].slice(0, 12)
  return (
    <>
      <Hero />
      <Fabrica />
      <TiendaFisica />
      <Destacados />
      <Estilos />
      <ProductCarousel kicker="Lo más nuevo" title="Nuevos diseños" items={nuevos} />
      <PromoBanner />
      <ProductCarousel kicker="Las favoritas" title="Más vendidos" items={popular} outline />
      <ProductCarousel kicker="Complementa tu look" title="Bolsos y accesorios" items={[...byCat('Bolsos'), ...byCat('Correas')].slice(0, 10)} outline to="#/c/Bolsos" />
      <SocialStrip />
      <Clientas />
      <BenefitsBar />
    </>
  )
}

export default function App() {
  const route = useRoute()
  return (
    <>
      <div className="clouds" aria-hidden>
        <i /><i /><i />
        {Array.from({ length: 16 }, (_, n) => (
          <span key={n} className="star text-sm" style={{ left: `${(n * 37) % 100}%`, top: `${(n * 53) % 100}%`, animationDelay: `${n * 0.5}s` }}>✦</span>
        ))}
        {Array.from({ length: 8 }, (_, n) => (
          <span key={n} className="petal" style={{ left: `${(n * 13 + 5) % 100}%`, animationDelay: `${-n * 2.5}s`, animationDuration: `${16 + n * 2}s` }} />
        ))}
      </div>
      <AnnouncementBar />
      <Header />
      <main><Page route={route} /></main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
    </>
  )
}
