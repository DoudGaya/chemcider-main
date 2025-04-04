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
      <main className="container mx-auto py-12">
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
                        className="h-full rounded-full bg-gradient-to-r bg-yellow-500"
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
                  <Button className="w-full bg-gradient-to-r bg-green-500">View Details</Button>
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

   
    </div>
  )
}

