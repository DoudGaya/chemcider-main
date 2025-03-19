'use client'
import React from 'react'
import Image from "next/image"
import { ArrowLeft, ArrowUpRight, ChevronDown, Download, LineChart, LogOut } from "lucide-react"
// import { Button, Link } from "@/components/ui"
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const DashboardHeader = ( {user}: {user: any} ) => {
  return (
         <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
           <div className="container px-8 mx-auto flex h-16 items-center justify-between">
             <div className="flex items-center gap-2">
               <Link href="/" className="flex items-center gap-2">
                 {/* <ArrowLeft className="h-4 w-4" /> */}
                 <span className="text-sm font-medium">ACMEGRID</span>
               </Link>
             </div>
             <div className="flex items-center gap-4">
               <div className="relative">
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


