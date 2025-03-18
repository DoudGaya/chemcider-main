import Link from "next/link"
import Image from "next/image"
import banner from '@/public/chem-banner.jpg'
import {
  ArrowRight,
  Beaker,
  ChevronRight,
  FlaskRoundIcon as Flask,
  Microscope,
  Pipette,
  Search,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { getLatestProducts } from "@/lib/products"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/lib/auth"
import ContactForm from "@/components/contact-form"

export default async function Home() {
  // const session = await getServerSession(authOptions)
  // const latestProducts = await getLatestProducts()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Flask className="h-8 w-8 text-primary" />
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
            <Link href="/products" className="text-sm font-medium hover:text-primary">
              Products
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {/* {session ? (
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
            )} */}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-blue-50 via-teal-50 to-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                    Pioneering Chemical Research in Africa
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Chemcider is Nigeria's leading chemical research company, providing innovative solutions for
                    industries, laboratories, and product development.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="#contact">
                    <Button size="lg" className="bg-gradient-to-r from-teal-500 to-blue-600">
                      Partner With Us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button size="lg" variant="outline">
                      Investment Opportunities
                    </Button>
                  </Link>
                </div>
              </div>
              <Image
                src={banner}
                width={550}
                height={550}
                alt="Laboratory equipment and researchers"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>

        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-teal-100 to-blue-100 px-3 py-1 text-sm">
                  Our Services
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Comprehensive Chemical Solutions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From laboratory setup to product formulation, we provide end-to-end services for all your chemical
                  research needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Flask className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Chemical Consumables</CardTitle>
                  <CardDescription>High-quality chemical supplies for factories and laboratories</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We provide a wide range of chemical consumables for industrial and research applications, ensuring
                    quality and reliability.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#contact" className="text-sm text-primary flex items-center">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <Microscope className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Laboratory Setup</CardTitle>
                  <CardDescription>Complete laboratory design and implementation</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    From concept to completion, we design and set up state-of-the-art laboratories tailored to your
                    specific research needs.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#contact" className="text-sm text-primary flex items-center">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <Beaker className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Factory Implementation</CardTitle>
                  <CardDescription>Industrial-scale chemical production facilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We help establish efficient and safe chemical production facilities, optimized for your
                    manufacturing requirements.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#contact" className="text-sm text-primary flex items-center">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <Pipette className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Product Formulation</CardTitle>
                  <CardDescription>Custom chemical product development</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our expert team develops innovative chemical formulations for various applications, from industrial
                    to consumer products.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#contact" className="text-sm text-primary flex items-center">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <Search className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Quality Analysis</CardTitle>
                  <CardDescription>Comprehensive testing and quality assurance</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We provide thorough quality analysis services to ensure your products meet the highest standards and
                    regulatory requirements.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#contact" className="text-sm text-primary flex items-center">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Investment Partnerships</CardTitle>
                  <CardDescription>Collaborative product development and market placement</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Partner with us to invest in innovative chemical products with market potential, backed by our
                    research expertise.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/products" className="text-sm text-primary flex items-center">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-teal-50 to-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-teal-100 to-blue-100 px-3 py-1 text-sm">
                  Investment Opportunities
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Products</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Invest in cutting-edge chemical products with significant market potential
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 lg:grid-cols-3">
              {/* {
              latestProducts.map((product) => (
                <Card key={product.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{product.title}</CardTitle>
                    <CardDescription>
                      {product.cycle} cycle • {product.returnPerCycle}% return per cycle
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
                            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-blue-600"
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
                      <Button className="w-full bg-gradient-to-r from-teal-500 to-blue-600">View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))} */}
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

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <div className="space-y-4">
                  <div className="inline-block rounded-lg bg-gradient-to-r from-teal-100 to-blue-100 px-3 py-1 text-sm">
                    Get in Touch
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Let's Discuss Your Needs
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    Whether you're looking for chemical supplies, laboratory setup, or investment opportunities, our
                    team is ready to assist you.
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
                        15 Innovation Drive, Lagos Science Park, Lagos, Nigeria
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-1">
                      <ChevronRight className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-sm text-muted-foreground">info@chemcider.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-1">
                      <ChevronRight className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-sm text-muted-foreground">+234 (0) 800 CHEMCIDER</p>
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
            <Flask className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
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



// import Link from "next/link"
// import banner from '@/public/chem-banner.jpg'
// import Image from "next/image"
// import {
//   ArrowRight,
//   Beaker,
//   ChevronRight,
//   FlaskRoundIcon as Flask,
//   Microscope,
//   Pipette,
//   Search,
//   FlaskConical,
//   Users,
//   FileStackIcon
// } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import PublicNavigation from "@/components/PublicNavigation"

// export default function Home() {
//   return (
//     <div className="flex min-h-screen flex-col">
//      <PublicNavigation />
//       <main className="flex-1 bg-red-400">
//         <section className="w-full py-12 md:py-20 lg:py-20 bg-gradient-to-br from-blue-50 via-teal-50 to-white">
//           <div className="container mx-auto px-4 md:px-6">
//             <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
//               <div className="flex flex-col justify-center space-y-4">
//                 <div className="space-y-2">
//                   <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
//                     Pioneering Chemical Research in Africa
//                   </h1>
//                   <p className="max-w-[600px] text-muted-foreground md:text-xl">
//                     Chemcider is Nigeria's leading chemical research company, providing innovative solutions for
//                     industries, laboratories, and product development.
//                   </p>
//                 </div>
//                 <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                   <Link href="#contact">
//                     <Button size="lg" className="bg-gradient-to-r from-teal-500 to-blue-600">
//                       Partner With Us
//                       <ArrowRight className="ml-2 h-4 w-4" />
//                     </Button>
//                   </Link>
//                   <Link href="#invest">
//                     <Button size="lg" variant="outline">
//                       Investment Opportunities
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//               <Image
//                 src={banner}
//                 width={550}
//                 height={550}
//                 alt="Laboratory equipment and researchers"
//                 className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
//               />
//             </div>
//           </div>
//         </section>

//         <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-white">
//           <div className="container mx-auto px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <div className="inline-block rounded-lg bg-gradient-to-r from-teal-100 to-blue-100 px-3 py-1 text-sm">
//                   Our Services
//                 </div>
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Comprehensive Chemical Solutions</h2>
//                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                   From laboratory setup to product formulation, we provide end-to-end services for all your chemical
//                   research needs.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
//               <Card>
//                 <CardHeader>
//                   <Flask className="h-10 w-10 text-primary mb-2" />
//                   <CardTitle>Chemical Consumables</CardTitle>
//                   <CardDescription>High-quality chemical supplies for factories and laboratories</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-muted-foreground">
//                     We provide a wide range of chemical consumables for industrial and research applications, ensuring
//                     quality and reliability.
//                   </p>
//                 </CardContent>
//                 <CardFooter>
//                   <Link href="#contact" className="text-sm text-primary flex items-center">
//                     Learn more <ChevronRight className="h-4 w-4 ml-1" />
//                   </Link>
//                 </CardFooter>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <Microscope className="h-10 w-10 text-primary mb-2" />
//                   <CardTitle>Laboratory Setup</CardTitle>
//                   <CardDescription>Complete laboratory design and implementation</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-muted-foreground">
//                     From concept to completion, we design and set up state-of-the-art laboratories tailored to your
//                     specific research needs.
//                   </p>
//                 </CardContent>
//                 <CardFooter>
//                   <Link href="#contact" className="text-sm text-primary flex items-center">
//                     Learn more <ChevronRight className="h-4 w-4 ml-1" />
//                   </Link>
//                 </CardFooter>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <Beaker className="h-10 w-10 text-primary mb-2" />
//                   <CardTitle>Factory Implementation</CardTitle>
//                   <CardDescription>Industrial-scale chemical production facilities</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-muted-foreground">
//                     We help establish efficient and safe chemical production facilities, optimized for your
//                     manufacturing requirements.
//                   </p>
//                 </CardContent>
//                 <CardFooter>
//                   <Link href="#contact" className="text-sm text-primary flex items-center">
//                     Learn more <ChevronRight className="h-4 w-4 ml-1" />
//                   </Link>
//                 </CardFooter>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <Pipette className="h-10 w-10 text-primary mb-2" />
//                   <CardTitle>Product Formulation</CardTitle>
//                   <CardDescription>Custom chemical product development</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-muted-foreground">
//                     Our expert team develops innovative chemical formulations for various applications, from industrial
//                     to consumer products.
//                   </p>
//                 </CardContent>
//                 <CardFooter>
//                   <Link href="#contact" className="text-sm text-primary flex items-center">
//                     Learn more <ChevronRight className="h-4 w-4 ml-1" />
//                   </Link>
//                 </CardFooter>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <Search className="h-10 w-10 text-primary mb-2" />
//                   <CardTitle>Quality Analysis</CardTitle>
//                   <CardDescription>Comprehensive testing and quality assurance</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-muted-foreground">
//                     We provide thorough quality analysis services to ensure your products meet the highest standards and
//                     regulatory requirements.
//                   </p>
//                 </CardContent>
//                 <CardFooter>
//                   <Link href="#contact" className="text-sm text-primary flex items-center">
//                     Learn more <ChevronRight className="h-4 w-4 ml-1" />
//                   </Link>
//                 </CardFooter>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <Users className="h-10 w-10 text-primary mb-2" />
//                   <CardTitle>Investment Partnerships</CardTitle>
//                   <CardDescription>Collaborative product development and market placement</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-muted-foreground">
//                     Partner with us to invest in innovative chemical products with market potential, backed by our
//                     research expertise.
//                   </p>
//                 </CardContent>
//                 <CardFooter>
//                   <Link href="#invest" className="text-sm text-primary flex items-center">
//                     Learn more <ChevronRight className="h-4 w-4 ml-1" />
//                   </Link>
//                 </CardFooter>
//               </Card>
//             </div>
//           </div>
//         </section>

//         <section
//           id="about"
//           className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-teal-50 to-white"
//         >
//           <div className="container mx-auto px-4 md:px-6">
//             <div className="grid gap-10 md:grid-cols-2 md:gap-16">
//               <div>
//                 <div className="space-y-4">
//                   <div className="inline-block rounded-lg bg-gradient-to-r from-teal-100 to-blue-100 px-3 py-1 text-sm">
//                     About Chemcider
//                   </div>
//                   <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//                     Nigeria's Premier Chemical Research Company
//                   </h2>
//                   <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
//                     Founded with a vision to revolutionize chemical research in Africa, Chemcider has grown to become a
//                     leading provider of chemical solutions across industries.
//                   </p>
//                 </div>
//                 <div className="mt-8 space-y-4">
//                   <div className="flex items-start gap-4">
//                     <div className="rounded-full bg-primary/10 p-1">
//                       <ChevronRight className="h-5 w-5 text-primary" />
//                     </div>
//                     <div>
//                       <h3 className="font-medium">State-of-the-art Facilities</h3>
//                       <p className="text-sm text-muted-foreground">
//                         Our laboratories are equipped with the latest technology to ensure accurate research and
//                         development.
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <div className="rounded-full bg-primary/10 p-1">
//                       <ChevronRight className="h-5 w-5 text-primary" />
//                     </div>
//                     <div>
//                       <h3 className="font-medium">Expert Team</h3>
//                       <p className="text-sm text-muted-foreground">
//                         Our team consists of highly qualified chemists, engineers, and researchers with extensive
//                         industry experience.
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <div className="rounded-full bg-primary/10 p-1">
//                       <ChevronRight className="h-5 w-5 text-primary" />
//                     </div>
//                     <div>
//                       <h3 className="font-medium">Innovation-Driven</h3>
//                       <p className="text-sm text-muted-foreground">
//                         We continuously invest in research to develop innovative solutions that address market needs.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <Image
//                 src="/chem-banner.jpg"
//                 width={600}
//                 height={600}
//                 alt="Chemcider laboratory"
//                 className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
//               />
//             </div>
//           </div>
//         </section>

//         <section id="invest" className="w-full py-12 md:py-24 lg:py-32 bg-white">
//           <div className="container mx-auto px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <div className="inline-block rounded-lg bg-gradient-to-r from-teal-100 to-blue-100 px-3 py-1 text-sm">
//                   Investment Opportunities
//                 </div>
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Partner in Innovation</h2>
//                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                   Invest in cutting-edge chemical products with significant market potential and track your investments
//                   through our dedicated dashboard.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl gap-8 py-12 lg:grid-cols-2">
//               <Card className="border-2 border-primary/20">
//                 <CardHeader>
//                   <CardTitle className="text-2xl">Why Invest With Chemcider</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex items-start gap-4">
//                     <div className="rounded-full bg-primary/10 p-1">
//                       <ChevronRight className="h-5 w-5 text-primary" />
//                     </div>
//                     <div>
//                       <h3 className="font-medium">Market-Driven Research</h3>
//                       <p className="text-sm text-muted-foreground">
//                         We focus on developing products with identified market needs and growth potential.
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <div className="rounded-full bg-primary/10 p-1">
//                       <ChevronRight className="h-5 w-5 text-primary" />
//                     </div>
//                     <div>
//                       <h3 className="font-medium">Transparent Tracking</h3>
//                       <p className="text-sm text-muted-foreground">
//                         Access our investor dashboard to monitor your investments and product development progress in
//                         real-time.
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <div className="rounded-full bg-primary/10 p-1">
//                       <ChevronRight className="h-5 w-5 text-primary" />
//                     </div>
//                     <div>
//                       <h3 className="font-medium">Diverse Portfolio</h3>
//                       <p className="text-sm text-muted-foreground">
//                         Invest in a range of chemical products across different industries to diversify your investment.
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <div className="rounded-full bg-primary/10 p-1">
//                       <ChevronRight className="h-5 w-5 text-primary" />
//                     </div>
//                     <div>
//                       <h3 className="font-medium">Expert Management</h3>
//                       <p className="text-sm text-muted-foreground">
//                         Our experienced team handles all aspects of product development, manufacturing, and market
//                         placement.
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Link href="/dashboard">
//                     <Button className="w-full bg-gradient-to-r from-teal-500 to-blue-600">
//                       Investor Dashboard
//                       <ArrowRight className="ml-2 h-4 w-4" />
//                     </Button>
//                   </Link>
//                 </CardFooter>
//               </Card>
//               <div className="space-y-8">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Current Investment Opportunities</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="space-y-2">
//                       <h3 className="font-medium">Eco-Friendly Industrial Solvents</h3>
//                       <div className="h-2 w-full rounded-full bg-muted">
//                         <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-teal-500 to-blue-600"></div>
//                       </div>
//                       <p className="text-xs text-muted-foreground">75% funded • $750,000 raised</p>
//                     </div>
//                     <div className="space-y-2">
//                       <h3 className="font-medium">Advanced Agricultural Fertilizers</h3>
//                       <div className="h-2 w-full rounded-full bg-muted">
//                         <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-teal-500 to-blue-600"></div>
//                       </div>
//                       <p className="text-xs text-muted-foreground">50% funded • $500,000 raised</p>
//                     </div>
//                     <div className="space-y-2">
//                       <h3 className="font-medium">Pharmaceutical Intermediates</h3>
//                       <div className="h-2 w-full rounded-full bg-muted">
//                         <div className="h-full w-1/4 rounded-full bg-gradient-to-r from-teal-500 to-blue-600"></div>
//                       </div>
//                       <p className="text-xs text-muted-foreground">25% funded • $250,000 raised</p>
//                     </div>
//                   </CardContent>
//                   <CardFooter>
//                     <Link href="#contact">
//                       <Button variant="outline" className="w-full">
//                         Request Investment Details
//                       </Button>
//                     </Link>
//                   </CardFooter>
//                 </Card>
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Success Stories</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="space-y-2">
//                       <h3 className="font-medium">Bio-degradable Packaging Materials</h3>
//                       <p className="text-sm text-muted-foreground">
//                         Launched in 2022 • 215% ROI • Now used by major Nigerian manufacturers
//                       </p>
//                     </div>
//                     <div className="space-y-2">
//                       <h3 className="font-medium">Water Treatment Chemicals</h3>
//                       <p className="text-sm text-muted-foreground">
//                         Launched in 2021 • 180% ROI • Exported to 5 African countries
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-teal-50 to-white">
//           <div className="container mx-auto px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by Industry Leaders</h2>
//                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                   Our solutions are used by leading companies across various industries in Nigeria and beyond.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 py-12 md:grid-cols-3 lg:grid-cols-6">
//               {Array.from({ length: 6 }).map((_, i) => (
//                 <div key={i} className="flex items-center justify-center">
//                   <Image
//                     src="/placeholder-logo.svg"
//                     width={120}
//                     height={60}
//                     alt={`Partner logo ${i + 1}`}
//                     className="opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
//                   />
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-center">
//               <div className="max-w-3xl space-y-8">
//                 <div className="rounded-lg bg-background p-6 shadow-lg">
//                   <div className="flex items-start gap-4">
//                     <Image
//                       src="/placeholder.svg?height=60&width=60"
//                       width={60}
//                       height={60}
//                       alt="Testimonial avatar"
//                       className="rounded-full"
//                     />
//                     <div className="space-y-2">
//                       <p className="text-muted-foreground italic">
//                         "Chemcider's expertise in chemical formulation helped us develop a revolutionary product that
//                         has significantly increased our market share. Their attention to detail and commitment to
//                         quality is unmatched."
//                       </p>
//                       <div>
//                         <p className="font-medium">Dr. Oluwaseun Adeyemi</p>
//                         <p className="text-sm text-muted-foreground">CEO, PharmaNigeria Ltd</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-white">
//           <div className="container mx-auto px-4 md:px-6">
//             <div className="grid gap-10 md:grid-cols-2 md:gap-16">
//               <div>
//                 <div className="space-y-4">
//                   <div className="inline-block rounded-lg bg-gradient-to-r from-teal-100 to-blue-100 px-3 py-1 text-sm">
//                     Get in Touch
//                   </div>
//                   <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//                     Let's Discuss Your Needs
//                   </h2>
//                   <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
//                     Whether you're looking for chemical supplies, laboratory setup, or investment opportunities, our
//                     team is ready to assist you.
//                   </p>
//                 </div>
//                 <div className="mt-8 space-y-4">
//                   <div className="flex items-start gap-4">
//                     <div className="rounded-full bg-primary/10 p-1">
//                       <ChevronRight className="h-5 w-5 text-primary" />
//                     </div>
//                     <div>
//                       <h3 className="font-medium">Address</h3>
//                       <p className="text-sm text-muted-foreground">
//                         15 Innovation Drive, Lagos Science Park, Lagos, Nigeria
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <div className="rounded-full bg-primary/10 p-1">
//                       <ChevronRight className="h-5 w-5 text-primary" />
//                     </div>
//                     <div>
//                       <h3 className="font-medium">Email</h3>
//                       <p className="text-sm text-muted-foreground">info@chemcider.com</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <div className="rounded-full bg-primary/10 p-1">
//                       <ChevronRight className="h-5 w-5 text-primary" />
//                     </div>
//                     <div>
//                       <h3 className="font-medium">Phone</h3>
//                       <p className="text-sm text-muted-foreground">+234 (0) 800 CHEMCIDER</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Contact Us</CardTitle>
//                   <CardDescription>
//                     Fill out the form below and our team will get back to you within 24 hours.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <form className="space-y-4">
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <label htmlFor="first-name" className="text-sm font-medium">
//                           First name
//                         </label>
//                         <Input id="first-name" placeholder="John" />
//                       </div>
//                       <div className="space-y-2">
//                         <label htmlFor="last-name" className="text-sm font-medium">
//                           Last name
//                         </label>
//                         <Input id="last-name" placeholder="Doe" />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <label htmlFor="email" className="text-sm font-medium">
//                         Email
//                       </label>
//                       <Input id="email" placeholder="john.doe@example.com" type="email" />
//                     </div>
//                     <div className="space-y-2">
//                       <label htmlFor="company" className="text-sm font-medium">
//                         Company
//                       </label>
//                       <Input id="company" placeholder="Acme Inc." />
//                     </div>
//                     <div className="space-y-2">
//                       <label htmlFor="interest" className="text-sm font-medium">
//                         I'm interested in
//                       </label>
//                       <select
//                         id="interest"
//                         className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                       >
//                         <option value="">Select an option</option>
//                         <option value="chemical-supplies">Chemical Supplies</option>
//                         <option value="laboratory-setup">Laboratory Setup</option>
//                         <option value="factory-implementation">Factory Implementation</option>
//                         <option value="product-formulation">Product Formulation</option>
//                         <option value="quality-analysis">Quality Analysis</option>
//                         <option value="investment">Investment Opportunities</option>
//                       </select>
//                     </div>
//                     <div className="space-y-2">
//                       <label htmlFor="message" className="text-sm font-medium">
//                         Message
//                       </label>
//                       <textarea
//                         id="message"
//                         className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                         placeholder="Tell us about your project or inquiry"
//                       />
//                     </div>
//                   </form>
//                 </CardContent>
//                 <CardFooter>
//                   <Button className="w-full bg-gradient-to-r from-teal-500 to-blue-600">Submit Inquiry</Button>
//                 </CardFooter>
//               </Card>
//             </div>
//           </div>
//         </section>

//         <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-teal-50 to-white">
//           <div className="container mx-auto px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
//                   Ready to Transform Your Chemical Research?
//                 </h2>
//                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                   Join the leading companies that trust Chemcider for their chemical research and development needs.
//                 </p>
//               </div>
//               <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                 <Link href="#contact">
//                   <Button size="lg" className="bg-gradient-to-r from-teal-500 to-blue-600">
//                     Contact Us Today
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </Link>
//                 <Link href="/dashboard">
//                   <Button size="lg" variant="outline">
//                     Investor Dashboard
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <footer className="w-full border-t bg-background">
//         <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
//           <div className="flex items-center gap-2">
//             <FlaskConical className="h-6 w-6 text-primary" />
//             <span className="text-lg font-bold bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
//               Chemcider
//             </span>
//           </div>
//           <p className="text-center text-sm text-muted-foreground md:text-left">
//             &copy; {new Date().getFullYear()} Chemcider. All rights reserved.
//           </p>
//           <div className="flex gap-4">
//             <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
//               Privacy Policy
//             </Link>
//             <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
//               Terms of Service
//             </Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

