import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";

export function Header() {
  return (
    <header className="container mx-auto px-4 py-6 body">
      <nav className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Purple credit card"
            width={140}
            height={140}
            className=""
          />
        </Link>
        <Link
          href="/about"
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Contact Us
        </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/log-in">
            <Button variant="default" size="sm">
              Login
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
