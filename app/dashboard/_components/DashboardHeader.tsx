'use client'
import React from 'react'
import Image from "next/image"
import { ArrowLeft, ArrowUpRight, ChevronDown, Download, LineChart as LineIcon, PieChart, TrendingUp, Users } from "lucide-react"
// import { Button, Link } from "@/components/ui"
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const DashboardHeader = ( {user}: {user: any} ) => {
  return (
         <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
           <div className="container flex h-16 items-center justify-between">
             <div className="flex items-center gap-2">
               <Link href="/" className="flex items-center gap-2">
                 <ArrowLeft className="h-4 w-4" />
                 <span className="text-sm font-medium">Back to Home</span>
               </Link>
             </div>
             <div className="flex items-center gap-4">
               <Button variant="outline" size="sm">
                 <Download className="mr-2 h-4 w-4" />
                 Export Data
               </Button>
               <div className="relative">
                 <Button variant="ghost" size="sm" className="flex items-center gap-2">
                   <Image
                     src={user?.image || "/placeholder.svg?height=32&width=32"}
                     width={32}
                     height={32}
                     alt="User avatar"
                     className="rounded-full"
                   />
                   <span>{user?.name || "User"}</span>
                   <ChevronDown className="h-4 w-4" />
                 </Button>
               </div>
             </div>
           </div>
         </header>
  )
}

export default DashboardHeader