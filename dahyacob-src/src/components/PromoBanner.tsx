export default function PromoBanner() {
  return (
    <section className="mx-auto max-w-[1152px] px-5 py-6 lg:px-0" aria-label="Promoción">
      <div className="flex flex-col justify-center gap-4 rounded-[20px] bg-rose p-[35px] lg:min-h-[190px]">
        <p className="max-w-xl font-serif text-[28px] font-bold uppercase leading-8">Compra con Addi o Sistecrédito y paga a cuotas</p>
        <a href="#/tienda" className="btn w-fit">Ver la tienda</a>
      </div>
    </section>
  )
}
