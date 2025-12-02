import Image from 'next/image'

export default function Footer() {
  return (
    <footer
      className="
      fixed bottom-0 left-0 w-full 
      h-[350px] 
      bg-red text-white 
      px-16 
      flex items-center justify-between
      z-10
    "
    >
      <section className="flex gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl mb-3">Find Us</h3>
          <p>Lorem ipsum dolor sit amet.</p>
          <p>Lorem ipsum dolor sit amet.</p>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl mb-3">Our Teams</h3>
          <p>Lorem ipsum dolor sit amet.</p>
          <p>Lorem ipsum dolor sit amet.</p>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl mb-3">Contact</h3>
          <p>Lorem ipsum dolor sit amet.</p>
          <p>Lorem ipsum dolor sit amet.</p>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </section>
      <section>
        <Image src="/logo.png" alt="Ørvur Logo" width={150} height={50} className="mx-auto mt-4" />
      </section>
    </footer>
  )
}
