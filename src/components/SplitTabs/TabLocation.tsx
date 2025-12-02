export default function TabLoctaion() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold mb-2">Find Us</h2>
        <address className="not-italic">
          <p>Basement of the Bylgjan building</p>
          <p>Mýravegur 12</p>
          <p>Runavík 620</p>
          <p>Faroe Islands</p>
        </address>
      </div>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1866.5447176893251!2d-6.726118521820478!3d62.10666567607656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48bc3a8421c08d1d%3A0x1152c2baa35a1f59!2sBylgjan!5e0!3m2!1sen!2sdk!4v1764677663490!5m2!1sen!2sdk"
        width={600}
        height={450}
        style={{ border: '0' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  )
}
