import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"

export const metadata = {
  title: "Investment Opportunities | Commodex",
  description: "Explore high-yield commodity investment opportunities on the Commodex platform",
}

async function getProducts() {
  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return products
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-violet-50 to-white">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Commodex
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/#opportunities" className="text-sm font-medium hover:text-primary">
              Opportunities
            </Link>
            <Link href="/#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="/products" className="text-sm font-medium text-primary">
              Marketplace
            </Link>
            <Link href="/#contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary">
              Login
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">Investment Opportunities</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our curated selection of high-yield commodity investment opportunities with transparent terms and
            managed risk.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card
              key={product.id}
              className="flex flex-col transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>
                  {product.cycle} month cycle • {product.returnPerCycle}% return per cycle
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-4">
                  <div className="line-clamp-3" dangerouslySetInnerHTML={{ __html: product.description }} />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Funding Progress</span>
                      <span className="font-medium">
                        {Math.round((product.currentAmount / product.targetAmount) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-600"
                        style={{ width: `${Math.round((product.currentAmount / product.targetAmount) * 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ₦{product.currentAmount.toLocaleString()} raised of ₦{product.targetAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Unit Investment</span>
                    <span>₦{product.unitAmount.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/products/${product.id}`} className="w-full">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}

          {products.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground mb-4">No active investment opportunities available at the moment.</p>
              <p className="text-muted-foreground">Please check back soon or contact us for more information.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Commodex. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

