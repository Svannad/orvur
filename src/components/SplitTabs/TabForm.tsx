export default function TabForm() {
  return (
    <>
      <h2>Contact Us</h2>
      <form className="flex flex-col gap-4 max-w-md">
        <input type="text" placeholder="Your Name" className="border p-2" />
        <input type="email" placeholder="Your Email" className="border p-2" />
        <textarea placeholder="Message" className="border p-2" rows={4}></textarea>
        <button type="submit" className="bg-black text-white py-2">
          Send
        </button>
      </form>
    </>
  )
}
