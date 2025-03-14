import React from 'react'
import { FlaskConical } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'

const PublicNavigation = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container mx-auto flex h-16 items-center justify-between">
      <div className="flex items-center gap-2">
        <FlaskConical className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
          Chemcider
        </span>
      </div>
      <nav className="hidden md:flex gap-6">
        <Link href="#services" className="text-sm font-medium hover:text-primary">
          Services
        </Link>
        <Link href="#about" className="text-sm font-medium hover:text-primary">
          About Us
        </Link>
        <Link href="#invest" className="text-sm font-medium hover:text-primary">
          Invest
        </Link>
        <Link href="#contact" className="text-sm font-medium hover:text-primary">
          Contact
        </Link>
        <Link href="#contact" className="text-sm font-medium hover:text-primary">
          Products
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="hidden md:block">
          <Button variant="outline">Investor Dashboard</Button>
        </Link>
        <Link href="#contact">
          <Button>Get Started</Button>
        </Link>
      </div>
    </div>
  </header>
  )
}

export default PublicNavigation