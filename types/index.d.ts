// Define types for investment data with product detailschart 
export interface InvestmentWithProduct {
    id: string
    userId: string
    productId: string
    amount: number
    units: number
    status: string
    createdAt: Date
    updatedAt: Date
    product: {
      id: string
      title: string
      description: string
      targetAmount: number
      currentAmount: number
      unitAmount: number
      cycle: number
      returnPerCycle: number
      status: string
      createdAt: Date
      updatedAt: Date
    }
  }
  
  // Define types for wallet data
  export interface Wallet {
    id: string
    userId: string
    balance: number
    referralBalance: number
    createdAt: Date
    updatedAt: Date
  }
  
  // Define types for transaction data
  export interface Transaction {
    id: string
    walletId: string
    amount: number
    type: string
    status: string
    reference?: string | null
    description?: string | null
    createdAt: Date
    updatedAt: Date
  }
  
  // Define types for contact form data
  export interface ContactFormData {
    firstName: string
    lastName: string
    email: string
    company?: string
    interest: string
    message: string
  }
  
  // Define types for product data
  export interface Product {
    id: string
    title: string
    description: string
    targetAmount: number
    currentAmount: number
    unitAmount: number
    cycle: number
    returnPerCycle: number
    status: string
    createdAt: Date
    updatedAt: Date
  }
  
  // Define types for chart data
  export interface ChartDataPoint {
    name: string
    value: number
  }
  
  