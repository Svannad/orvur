import { AiFillFacebook } from 'react-icons/ai'
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
      <section className="flex gap-16">
        <div className="flex flex-col gap-4 w-32">
          <h3 className="font-bold text-xl mb-3">Find Us</h3>
          <p>Mýravegur 12</p>
          <p>Runavík 620</p>
          <p>Faroe Islands</p>
        </div>
        <div className="flex flex-col gap-4 w-32">
          <h3 className="font-bold text-xl mb-3">Contact</h3>
          <p className="hover:italic cursor-pointer transition duration-300">info@orvur.fo</p>
          <p className="hover:italic cursor-pointer transition duration-300">+298 12 34 56</p>
          <a
            href="https://www.facebook.com/p/%C3%98rvur-Bogaskj%C3%B3ting-100008643550271/"
            target="_blank"
            className="hover:text-yellow transition duration-300"
          >
            <AiFillFacebook size={30} />
          </a>
        </div>
        <div className="flex flex-col gap-4 w-32">
          <h3 className="font-bold text-xl mb-3">Our Teams</h3>
          <a
            href="/teams/690c7b5545ec8c60fe7e3533"
            className="hover:italic transition duration-300"
          >
            Adult
          </a>
          <a
            href="/teams/690c7b8345ec8c60fe7e355f"
            className="hover:italic transition duration-300"
          >
            Child
          </a>
          <a
            href="/teams/690c89d545ec8c60fe7e398c"
            className="hover:italic transition duration-300"
          >
            Kadet
          </a>
        </div>
      </section>
      <section>
        <Image src="/logo.png" alt="Ørvur Logo" width={150} height={50} className="mx-auto mt-4" />
      </section>
    </footer>
  )
}
