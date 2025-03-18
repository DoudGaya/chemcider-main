"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
// import { submitContactForm } from "@/actions/contact"
import { submitContactForm } from "@/actions/contacts"

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().optional(),
  interest: z.string().min(1, {
    message: "Please select an area of interest.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactForm() {
  const [isPending, setIsPending] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      interest: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true)

    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value || "")
    })

    try {
      const result = await submitContactForm(formData)
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Success",
        description: result.success,
      })

      form.reset()
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Card className="border border-blue-100 shadow-lg">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
        <CardDescription>Fill out the form below and our team will get back to you within 24 hours.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>I'm interested in</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="">Select an option</option>
                      <option value="investing">Investing in Commodities</option>
                      <option value="raising-capital">Raising Capital</option>
                      <option value="partnership">Business Partnership</option>
                      <option value="consulting">Investment Consulting</option>
                      <option value="market-analysis">Market Analysis</option>
                      <option value="other">Other</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <textarea
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us about your investment goals or business needs"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-violet-600" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit Inquiry"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}



// "use client"

// import { useState } from "react"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { toast } from "@/components/ui/use-toast"
// // import { submitContactForm } from "@/actions/contact"
// import { submitContactForm } from "@/actions/contacts"

// const formSchema = z.object({
//   firstName: z.string().min(2, {
//     message: "First name must be at least 2 characters.",
//   }),
//   lastName: z.string().min(2, {
//     message: "Last name must be at least 2 characters.",
//   }),
//   email: z.string().email({
//     message: "Please enter a valid email address.",
//   }),
//   company: z.string().optional(),
//   interest: z.string().min(1, {
//     message: "Please select an area of interest.",
//   }),
//   message: z.string().min(10, {
//     message: "Message must be at least 10 characters.",
//   }),
// })

// export default function ContactForm() {
//   const [isPending, setIsPending] = useState(false)

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       company: "",
//       interest: "",
//       message: "",
//     },
//   })

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setIsPending(true)

//     const formData = new FormData()
//     Object.entries(values).forEach(([key, value]) => {
//     //   formData.append(key, value)
//     formData.append(key, value || "")
//     })

//     try {
//       const result = await submitContactForm(formData)

//       if (result.error) {
//         toast({
//           title: "Error",
//           description: result.error,
//           variant: "destructive",
//         })
//         return
//       }

//       toast({
//         title: "Success",
//         description: result.success,
//       })

//       form.reset()
//     } catch (error) {
//       toast({
//         title: "Something went wrong",
//         description: "Please try again later.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsPending(false)
//     }
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Contact Us</CardTitle>
//         <CardDescription>Fill out the form below and our team will get back to you within 24 hours.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <FormField
//                 control={form.control}
//                 name="firstName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>First name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="John" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="lastName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Last name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Doe" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input type="email" placeholder="john.doe@example.com" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="company"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Company</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Acme Inc." {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="interest"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>I'm interested in</FormLabel>
//                   <FormControl>
//                     <select
//                       className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                       {...field}
//                     >
//                       <option value="">Select an option</option>
//                       <option value="chemical-supplies">Chemical Supplies</option>
//                       <option value="laboratory-setup">Laboratory Setup</option>
//                       <option value="factory-implementation">Factory Implementation</option>
//                       <option value="product-formulation">Product Formulation</option>
//                       <option value="quality-analysis">Quality Analysis</option>
//                       <option value="investment">Investment Opportunities</option>
//                     </select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="message"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Message</FormLabel>
//                   <FormControl>
//                     <textarea
//                       className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                       placeholder="Tell us about your project or inquiry"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-blue-600" disabled={isPending}>
//               {isPending ? "Submitting..." : "Submit Inquiry"}
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   )
// }

