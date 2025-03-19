import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  BarChart3,
  ChevronRight,
  DollarSign,
  Globe,
  LineChart,
  PieChart,
  Search,
  TrendingUp,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getLatestProducts } from "@/lib/products"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import banner from '@/public/banner-rem.png'
import ContactForm from "@/components/contact-form"
import PublicNavigation from "@/components/PublicNavigation"

export const metadata = {
  title: "Chemcider | Modern Commodity Investment Platform",
  description:
    "Chemcider is a cutting-edge platform connecting investors with high-yield commodity opportunities across global markets. Start investing today.",
  keywords: "commodity investment, high yield investments, global commodities, investment platform, passive income",
  openGraph: {
    title: "Chemcider | Modern Commodity Investment Platform",
    description: "Connect with high-yield commodity opportunities across global markets. Start investing today.",
    images: [{ url: "/og-image.jpg" }],
  },
}

export default async function Home() {
  const session = await getServerSession(authOptions)
  const latestProducts = await getLatestProducts()

  return (
    <div className="flex min-h-screen flex-col">
      {/* <DashboardHeader user={session?.user} /> */}
      <PublicNavigation session={session} />
      <main className="flex-1">
        <section className="w-full py-16 bg-gradient-to-br from-green-50 via-lime-50 to-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-5xl/none bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent">
                    The Future of Commodity Investment
                  </h1>
                  <p className="max-w-[600px] text-gray-800 md:text-xl">
                    Chemcider connects investors with high-yield commodity opportunities across global markets. Start
                    building your portfolio today.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="bg-gradient-to-r from-green-600 to-lime-600">
                      Start Investing
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button size="lg" variant="outline">
                      Explore Opportunities
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <TrendingUp className="mr-1 h-4 w-4 text-primary" />
                    <span>15-25% Annual Returns</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4 text-primary" />
                    <span>10,000+ Investors</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-4 -left-4 h-72 w-72 rounded-full bg-green-100 blur-3xl opacity-70"></div>
                <div className="absolute -bottom-4 -right-4 h-72 w-72 rounded-full bg-emerald-100 blur-3xl opacity-70"></div>
                <Image
                  src={banner}
                  width={550}
                  height={550}
                  alt="Digital investment dashboard with commodity charts and analytics"
                  className="mx-auto relative z-10 aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white" id="how-it-works">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-blue-100 to-violet-100 px-3 py-1 text-sm">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simplified Commodity Investment</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform makes investing in global commodities accessible, transparent, and profitable.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3">
              <Card className="transform transition-all duration-200 hover:scale-105 hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-violet-100">
                    <Search className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Discover Opportunities</CardTitle>
                  <CardDescription>Browse vetted commodity investments with transparent terms</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our marketplace features carefully selected commodity opportunities across agriculture, energy,
                    metals, and more, each with detailed analytics and risk assessments.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/products" className="text-sm text-primary flex items-center mx-auto">
                    Browse marketplace <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="transform transition-all duration-200 hover:scale-105 hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-violet-100">
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Invest Securely</CardTitle>
                  <CardDescription>Fund your investments with flexible unit options</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Invest with as little as $1,000 per unit. Our secure platform handles all transactions, contracts,
                    and documentation with bank-level security and compliance.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/register" className="text-sm text-primary flex items-center mx-auto">
                    Create account <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="transform transition-all duration-200 hover:scale-105 hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-violet-100">
                    <LineChart className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Track & Earn</CardTitle>
                  <CardDescription>Monitor performance and receive returns</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Track your investments in real-time through our advanced dashboard. Receive regular updates and
                    automated returns directly to your account when cycles complete.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard" className="text-sm text-primary flex items-center mx-auto">
                    View dashboard <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-gradient-to-br from-blue-50 via-violet-50 to-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center">
              <div>
                <div className="space-y-4">
                  <div className="inline-block rounded-lg bg-gradient-to-r from-blue-100 to-violet-100 px-3 py-1 text-sm">
                    For Business Owners
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Raise Capital for Your Commodity Business
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    Partner with Chemcider to access our network of qualified investors looking for opportunities in the
                    commodity sector.
                  </p>
                </div>
                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-1">
                      <ChevronRight className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Streamlined Fundraising</h3>
                      <p className="text-sm text-muted-foreground">
                        Our platform handles investor acquisition, documentation, and fund management.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-1">
                      <ChevronRight className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Flexible Structures</h3>
                      <p className="text-sm text-muted-foreground">
                        Choose from various investment models that suit your business needs.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-1">
                      <ChevronRight className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Growth Support</h3>
                      <p className="text-sm text-muted-foreground">
                        Access our network of industry experts, logistics partners, and market connections.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Link href="#contact">
                    <Button className="bg-gradient-to-r from-blue-600 to-violet-600">
                      Partner With Us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-4 -right-4 h-72 w-72 rounded-full bg-blue-100 blur-3xl opacity-70"></div>
                <Image
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Business owners reviewing commodity investment opportunities"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="opportunities" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-blue-100 to-violet-100 px-3 py-1 text-sm">
                  Investment Opportunities
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Commodities</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Invest in high-yield commodity opportunities with transparent terms and managed risk
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 lg:grid-cols-3">
              { latestProducts &&  latestProducts.map((product) => (

              
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
                      <p className="text-sm text-muted-foreground line-clamp-3">{product.description}</p>
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
                          ${product.currentAmount.toLocaleString()} raised of ${product.targetAmount.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Unit Investment</span>
                        <span>${product.unitAmount.toLocaleString()}</span>
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
            </div>
            <div className="flex justify-center">
              <Link href="/products">
                <Button variant="outline" size="lg">
                  View All Investment Opportunities
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-gradient-to-br from-blue-50 via-violet-50 to-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-blue-100 to-violet-100 px-3 py-1 text-sm">
                  Why Choose Chemcider
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">The Chemcider Advantage</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers unique benefits for commodity investors
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-violet-100">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Global Access</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Invest in commodities from markets worldwide, previously only accessible to large institutions.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-violet-100">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Advanced Analytics</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Detailed market analysis and performance tracking for informed investment decisions.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-violet-100">
                  <PieChart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Diversification</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Spread risk across multiple commodity types, markets, and investment cycles.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-violet-100">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Expert Support</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Access to commodity specialists and investment advisors for personalized guidance.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative rounded-xl overflow-hidden max-w-4xl w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-violet-600/20 backdrop-blur-sm"></div>
                <div className="relative p-8 md:p-12 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to start your investment journey?</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Join thousands of investors already building wealth through commodity investments on our platform.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/register">
                      <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600">
                        Create Account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="#contact">
                      <Button size="lg" variant="outline">
                        Contact Our Team
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <div className="space-y-4">
                  <div className="inline-block rounded-lg bg-gradient-to-r from-blue-100 to-violet-100 px-3 py-1 text-sm">
                    Get in Touch
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Let's Discuss Your Investment Goals
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    Whether you're an investor looking for opportunities or a business seeking capital, our team is
                    ready to assist you.
                  </p>
                </div>
                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-1">
                      <ChevronRight className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-sm text-muted-foreground">
                        15 Financial District, Lagos Business Hub, Lagos, Nigeria
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-1">
                      <ChevronRight className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-sm text-muted-foreground">info@Chemcider.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-1">
                      <ChevronRight className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-sm text-muted-foreground">+234 (0) 800 Chemcider</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2 rounded-lg border bg-background p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Investor Support</h4>
                      <p className="text-xs text-muted-foreground">investors@Chemcider.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border bg-background p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Business Partnerships</h4>
                      <p className="text-xs text-muted-foreground">partners@Chemcider.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Chemcider
            </span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Chemcider. All rights reserved.
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
