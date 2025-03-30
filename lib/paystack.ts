import axios from "axios"

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY
const PAYSTACK_BASE_URL = "https://api.paystack.co"

interface InitializePaymentParams {
  email: string
  amount: number // in kobo (100 kobo = 1 Naira)
  reference?: string
  callbackUrl: string
  metadata?: Record<string, any>
}

export async function initializePayment({ email, amount, reference, callbackUrl, metadata }: InitializePaymentParams) {
  try {
    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email,
        amount: Math.round(amount * 100), // Convert to kobo
        reference,
        callback_url: callbackUrl,
        metadata,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    )

    return response.data
  } catch (error: any) {
    console.error("Paystack initialize payment error:", error.response?.data || error.message)
    throw new Error(error.response?.data?.message || "Failed to initialize payment")
  }
}

export async function verifyPayment(reference: string) {
  try {
    const response = await axios.get(`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    })

    return response.data
  } catch (error: any) {
    console.error("Paystack verify payment error:", error.response?.data || error.message)
    throw new Error(error.response?.data?.message || "Failed to verify payment")
  }
}

