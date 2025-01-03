import Image from 'next/image'

export function PartnersSection() {
  return (
    <section className="container mx-auto px-4 py-16 border-t">
      <div className="text-center">
        <p className="text-[#252525] mb-8 font-bold">Supported by various finance services</p>
        <div className="flex flex-wrap items-center justify-between px-32 ">
          <Image
            src="/Mastercard_2019_logo 2.png"
            alt="Mastercard"
            width={100}
            height={40}
            className=""
          />
          <Image
            src="/visa.png"
            alt="Visa"
            width={100}
            height={40}
            className=""
          />
          <Image
            src="/PayPal-Logo 1.png"
            alt="PayPal"
            width={150}
            height={40}
            className=""
          />
          <Image
            src="/Payoneer_logo 1.png"
            alt="Payoneer"
            width={130}
            height={40}
            className=""
          />
        </div>
      </div>
    </section>
  )
}

