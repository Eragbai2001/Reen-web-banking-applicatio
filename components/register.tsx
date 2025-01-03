
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image"

const register = () => {
  return (
   
     
    <div className="   text-center max-w-lg w-full flex flex-col items-start gap-2 ">
      <div className="flex items-center justify-center gap-2 mb-12
      ">
        
        <Image  src="/logo.png"
              alt="Purple credit card"
              width={140}
              height={140}
              className="" />
        
      </div>
      <h1 className="text-[#252525] text-lg font-semibold">Reen Bank</h1>
      <h2 className="text-[#252525] text-4xl font-bold mb-4 text-left">
        Experience hassle-free banking
      </h2>
      <p className="text-[#6B7280] text-sm text-left mb-12 ">
        Experience simple, secure, and stress-free banking. Say goodbye to long
        queues and complex procedures and hello to hassle-free banking with
        Reen Bank.
      </p>
      <div className="flex items-center justify-center gap-1 mt-6 ">
        <Facebook className="text-[#33B786] w-6 h-6 cursor-pointer " />
        <Instagram className="text-[#33B786] w-6 h-6 cursor-pointer" />
        <Twitter className="text-[#33B786] w-6 h-6 cursor-pointer" />
      </div>
    </div>


  )
}

export default register