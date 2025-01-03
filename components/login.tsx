import React from 'react'
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image"

const login = () => {
  return (
  //   <div> <div className="flex items-center justify-center min-h-screen bg-[#E6F8EF]">
  //   <div className="bg-white p-10 rounded-lg shadow-md text-center max-w-md w-full">
  //     <div className="flex items-center justify-center gap-2 mb-6">
  //       <div className="h-8 w-8 bg-[#33B786] text-white font-bold flex items-center justify-center rounded">rb</div>
  //       <h1 className="text-[#252525] text-lg font-semibold">Reen Bank</h1>
  //     </div>
  //     <h2 className="text-[#252525] text-2xl font-bold mb-4">Welcome Back</h2>
  //     <p className="text-[#6B7280] text-sm mb-8">
  //       Enter Your Details to login to your Banking Dashboard again!
  //     </p>
  //     <div className="flex items-center justify-center gap-4">
  //       <Facebook className="text-[#33B786] w-6 h-6 cursor-pointer" />
  //       <Instagram className="text-[#33B786] w-6 h-6 cursor-pointer" />
  //       <Twitter className="text-[#33B786] w-6 h-6 cursor-pointer" />
  //     </div>
  //   </div>
  // </div></div>
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
      Welcome Back
      </h2>
      <p className="text-[#6B7280] text-sm text-left mb-12 ">
      Enter Your Details to login to your Banking Dashboard again!
      </p>
      <div className="flex items-center justify-center gap-1 mt-6 ">
        <Facebook className="text-[#33B786] w-6 h-6 cursor-pointer " />
        <Instagram className="text-[#33B786] w-6 h-6 cursor-pointer" />
        <Twitter className="text-[#33B786] w-6 h-6 cursor-pointer" />
      </div>
    </div>

  )
}

export default login