import React from 'react'
import { FlaskConical, MenuIcon } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


const navItems = [
  { name: "Products", href: "/products" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "partnerships", href: "/products" },
  { name: "about", href: "/about" },
]


const PublicNavigation = ({ session }: {session: any}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container px-8 mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent">
              ACMEGRID
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            {
              navItems.map((item) => (
                <Link key={item.name} href={item.href} className="text-sm font-medium hover:text-primary">
                  {item.name}
                </Link>
              ))
            }
          
          </nav>
          <div className =" md:hidden">
          <Sheet >
            <SheetTrigger>
                   <MenuIcon className="h-8 w-8 text-primary" />
            </SheetTrigger>
            <SheetContent className=' h-full' side='left'>
              <SheetHeader>
                <SheetTitle className=' py-2 border-green-500 border-b'> 
                 <div className="">
                  <Link href="/" className="text-lg font-medium hover:text-primary"
                  >
                     ACMEGRID
                  </Link>
                  
                 </div>
                </SheetTitle>
                <div className=" flex flex-col h-full py-4 gap-4">
                  {
                    navItems.map((item) => (
                      <Link key={item.name} href={item.href} className="text-sm font-medium hover:text-primary">
                        <SheetTrigger className=' font-medium hover:text-primary py-1'>
                          {item.name}
                        </SheetTrigger>
                      </Link>
                    ))
                  }
                    <div className=" md:hidden py-3 border-t-2 flex flex-col  gap-4">
                        {session ? (
                          <Link href="/dashboard">
                            <Button variant="outline">Dashboard</Button>
                          </Link>
                        ) : (
                          <>
                            <Link href="/login" className="text-sm font-medium hover:text-primary">
                              Login
                            </Link>
                            <Link href="/register">
                              <Button>Sign Up</Button>
                            </Link>
                          </>
                        )}
                      </div>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          </div>

          <div className=" hidden md:flex items-center gap-4">
            {session ? (
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium hover:text-primary">
                  Login
                </Link>
                <Link href="/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
  //   <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  //   <div className="container mx-auto flex h-16 items-center justify-between">
  //     <div className="flex items-center gap-2">
  //       <FlaskConical className="h-8 w-8 text-primary" />
  //       <span className="text-xl font-bold bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
  //         Chemcider
  //       </span>
  //     </div>
  //     <nav className="hidden md:flex gap-6">
  //       <Link href="#services" className="text-sm font-medium hover:text-primary">
  //         Services
  //       </Link>
  //       <Link href="#about" className="text-sm font-medium hover:text-primary">
  //         About Us
  //       </Link>
  //       <Link href="#invest" className="text-sm font-medium hover:text-primary">
  //         Invest
  //       </Link>
  //       <Link href="#contact" className="text-sm font-medium hover:text-primary">
  //         Contact
  //       </Link>
  //       <Link href="#contact" className="text-sm font-medium hover:text-primary">
  //         Products
  //       </Link>
  //     </nav>
  //     <div className="flex items-center gap-4">
  //       <Link href="/dashboard" className="hidden md:block">
  //         <Button variant="outline">Investor Dashboard</Button>
  //       </Link>
  //       <Link href="#contact">
  //         <Button>Get Started</Button>
  //       </Link>
  //     </div>
  //   </div>

  // </header>
  )
}

export default PublicNavigation