import React from 'react'
import Link from 'next/link'

const DashboardFooter = () => {
  return (
    <footer className="w-full border-t bg-background">
    <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
      <p className="text-center text-sm text-muted-foreground md:text-left">
        &copy; {new Date().getFullYear()} Chemcider. All rights reserved.
      </p>
      <div className="flex gap-4">
        <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
          Help & Support
        </Link>
        <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
          Privacy Policy
        </Link>
      </div>
    </div>
  </footer>
  )
}

export default DashboardFooter