import React from 'react';
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import Link from "next/link"
import { Facebook, Twitter, Instagram } from 'lucide-react'

export function Header() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold">New to Bean Bank?</h3>
            <p className="mt-2 text-gray-500">Enter your Email and Get Started Now</p>
            <form className="mt-4 flex max-w-sm gap-2">
              <Input type="email" placeholder="Enter your email" />
              <Button type="submit">Submit</Button>
            </form>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h4 className="font-semibold">HELP</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li><Link href="#">Help Center</Link></li>
                <li><Link href="#">Contact Us</Link></li>
                <li><Link href="#">How to use</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">ABOUT</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li><Link href="#">About Bean Bank</Link></li>
                <li><Link href="#">Terms & Conditions</Link></li>
                <li><Link href="#">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">FOLLOW US</h4>
              <div className="mt-4 flex space-x-4">
                <Link href="#" className="text-gray-500 hover:text-gray-900">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-500 hover:text-gray-900">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-500 hover:text-gray-900">
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
          <p>© 2024 Bean Bank. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

