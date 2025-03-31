'use client'
import React from 'react'
import Image from "next/image"
import { ArrowLeft, ArrowUpRight, ChevronDown, Download, LineChart, LogOut, MenuIcon } from "lucide-react"
// import { Button, Link } from "@/components/ui"
import logo from '@/public/logo.png'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const navLinks = [
  {
    name: "Dashboard",
    href: "/user/dashboard",
    icon: <LineChart className="h-4 w-4" />,
  },
  {
    name: "Wallet",
    href: "/user/wallet",
    icon: <Download className="h-4 w-4" />,
  },
  {
    name: "opportunities",
    href: "/user/opportunities",
    icon: <Download className="h-4 w-4" />,
  },
  {
    name: "Investments",
    href: "/user/investments",
    icon: <ArrowUpRight className="h-4 w-4" />,
  },
]


const DashboardHeader = ( {user}: {user: any} ) => {
  return (
         <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
           <div className="container px-8 mx-auto flex h-16 items-center justify-between">
             <div className="flex items-center gap-2">
               {/* <Link href="/" className="flex items-center gap-2">
                 <Image src={logo} alt="logo" width={40} className=' h-10 object-contain w-full' height={40} />
               </Link> */}
             </div>
             <div className="flex items-center gap-4">
               <div className="relative h-full items-center flex">
                <div className=" flex items-center h-full my-auto">
                    <Sheet >
            <SheetTrigger className=' flex md:hidden'>
                   <MenuIcon className="h-8 w-8 text-primary" />
            </SheetTrigger>
            <SheetContent className=' h-full' side='left'>
              <SheetHeader>
                <SheetTitle className=' py-2 border-green-500 border-b'> 
                 <div className="">
                  <Link href="/" className="text-lg flex items-start font-medium hover:text-primary"
                  >
                     <Image src={logo} alt="logo" width={40} className=' h-10 object-left object-contain w-full' height={40} />
                  </Link>
                 </div>
                </SheetTitle>
                <div className=" flex flex-col h-full py-4 gap-4">
                       <form action="/api/auth/signout" method="POST">
                      <Button
                        type="submit"
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                      </form>

                      <div className="">
                        {
                          navLinks.map(item => <Link href={ item.href } key={item.href} className=' flex flex-row space-x-2' > 
                          {item.icon}
                          <p>{item.name}</p>
                          </Link>)
                        }
                      </div>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
                </div>
                 <Popover>
                  <PopoverTrigger>
                      <div className="md:flex hidden items-center gap-2">
                      <Image
                        src={user?.image || "/placeholder.svg?height=32&width=32"}
                        width={32}
                        height={32}
                        alt="User avatar"
                        className="rounded-full"
                      />
                      {/* <span>{user?.name || "User"}</span> */}
                      <div className="flex items-start text-start flex-col">
                        <span className="text-sm font-medium">{user?.name || "User"}</span>
                        <span className="text-xs text-muted-foreground">{user?.email}</span>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                  <form action="/api/auth/signout" method="POST">
                      <Button
                        type="submit"
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                      </form>
                  </PopoverContent>
                </Popover>
               </div>
             </div>
           </div>
         </header>
  )
}

export default DashboardHeader


