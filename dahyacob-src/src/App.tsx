import AnnouncementBar from './components/AnnouncementBar'
import CartDrawer from './components/CartDrawer'
import CategoryGrid from './components/CategoryGrid'
import Fabrica from './components/Fabrica'
import TiendaFisica from './components/TiendaFisica'
import Destacados from './components/Destacados'
import PromoBanner from './components/PromoBanner'
import BenefitsBar from './components/BenefitsBar'
import CategoryPage from './components/CategoryPage'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductDetail from './components/ProductDetail'
import ProductGrid from './components/ProductGrid'
import WhatsAppFloat from './components/WhatsAppFloat'
import { categories, products, type Category } from './data/products'
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
  if (kind === 'favoritos') return <ProductGrid title="Tus favoritos" items={products.filter((p) => favs.includes(p.id))} />
  return (
    <>
      <Hero />
      <Fabrica />
      <TiendaFisica />
      <Destacados />
      <CategoryGrid />
      <PromoBanner />
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
