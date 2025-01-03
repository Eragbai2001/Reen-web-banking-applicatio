import { Button } from '../components/ui/button'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24 bg-[#D4F3E7] ">
      <div className="relative grid gap-8 lg:grid-cols-2 items-center">
        <div className="flex flex-col justify-center space-y-4 ">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            Experience<br />hassle-free banking
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl">
            Take control of your finances with our innovative online banking solution and complete everything you need to secure your future with Bean Bank.
          </p>
          <div className="flex flex-col gap-3 min-[400px]:flex-row">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
        <div className="relative h-[300px] lg:h-[400px] flex flex-col justify-center items-center">
          
            <Image
              src="/Reen_Bank_Credit_Card_Mockup_v01 1.png"
              alt="Purple credit card"
              width={620}
              height={320}
              className=" body "
            />
          
          
        </div>
      </div>
    </section>
  )
}

