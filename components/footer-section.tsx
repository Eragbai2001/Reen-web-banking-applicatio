import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from 'lucide-react'

export function FooterSection() {
  return (
    <footer className="bg-[#e6f7f1]">
      <div className="container mx-auto grid md:grid-cols-2">
        {/* Left Section */}
        <div className="p-8 flex flex-col h-full">
          <div className="grid grid-cols-2 gap-16">
            <div>
              <h3 className="text-primary font-medium mb-4">HELP</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    How to Use
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-primary font-medium mb-4">ABOUT</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    About Bean Bank
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-auto pt-16">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="rounded bg-primary/10 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                  <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                </svg>
              </div>
              <span className="font-semibold">Bean Bank</span>
            </Link>
            
            <p className="text-sm text-gray-600 mb-4">
              2024 Bean Bank. All rights reserved!
            </p>

            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0 rounded-tl-[50px]  overflow-hidden">
            <Image
              src="/Rectangle 159.png"
              alt="City skyline"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end ">
              <h3 className="text-2xl font-bold text-white mb-2">
                New to Bean Bank?
              </h3>
              <p className="text-xl text-white mb-8">
                Enter your Email<br />and Get Started Now
              </p>
              <div className="flex gap-2 max-w-md">
                <Input 
                  type="email" 
                  placeholder="Enter your Email" 
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button 
                  type="submit" 
                  className="h-12 px-6 bg-[#00ba88] hover:bg-[#00ba88]/90"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

