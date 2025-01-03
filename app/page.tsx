"use client"
import { HeroSection } from '@/components/hero-section'
import { ServicesSection } from '@/components/services-section'
import { FaqSection } from '@/components/faq-section'
import { PartnersSection } from '@/components/partners-section'
import { FooterSection } from '@/components/footer-section'
import { Header } from '@/components/header'



export default function Home() {
  return (
    
    <div className="min-h-screen body">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <FaqSection />
        <PartnersSection />
      </main>
      <FooterSection />
    </div>
   
  )
}

