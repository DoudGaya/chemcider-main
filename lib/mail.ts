import nodemailer from "nodemailer"

const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/verify-email?token=${token}`

  await sendMail({
    to: email,
    subject: "Confirm your email address",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0ea5e9;">Verify your email address</h2>
        <p>Thank you for registering with Chemcider. Please click the button below to verify your email address:</p>
        <a href="${confirmLink}" style="display: inline-block; background-color: #0ea5e9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Verify Email</a>
        <p>If you didn't request this email, please ignore it.</p>
        <p>This link will expire in 24 hours.</p>
      </div>
    `,
  })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/reset-password?token=${token}`

  await sendMail({
    to: email,
    subject: "Reset your password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0ea5e9;">Reset your password</h2>
        <p>You requested to reset your password. Click the button below to set a new password:</p>
        <a href="${resetLink}" style="display: inline-block; background-color: #0ea5e9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Reset Password</a>
        <p>If you didn't request this email, please ignore it.</p>
        <p>This link will expire in 24 hours.</p>
      </div>
    `,
  })
}

export const sendTwoFactorEmail = async (email: string, token: string) => {
  await sendMail({
    to: email,
    subject: "Your 2FA Code",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0ea5e9;">Your 2FA Code</h2>
        <p>Your two-factor authentication code is:</p>
        <div style="font-size: 24px; font-weight: bold; background-color: #f3f4f6; padding: 10px; text-align: center; letter-spacing: 5px; margin: 20px 0;">${token}</div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this code, please secure your account immediately.</p>
      </div>
    `,
  })
}

interface ContactData {
  firstName: string
  lastName: string
  email: string
  company: string | null
  interest: string
  message: string
}

export const sendContactNotificationEmail = async (contactData: ContactData) => {
  const { firstName, lastName, email, company, interest, message } = contactData
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_EMAIL

  if (!adminEmail) {
    console.error("ADMIN_EMAIL or SMTP_EMAIL is not set")
    throw new Error("Failed to send email")
  }

  await sendMail({
    to: adminEmail,
    subject: "New Contact Form Submission",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0ea5e9;">New Contact Form Submission</h2>
        <p>You have received a new contact form submission from the Chemcider website:</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || "Not provided"}</p>
          <p><strong>Interest:</strong> ${interest}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-line;">${message}</p>
        </div>
        
        <p>You can view and manage all contact submissions in the admin dashboard.</p>
        <a href="${domain}/admin/contacts" style="display: inline-block; background-color: #0ea5e9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">View in Dashboard</a>
      </div>
    `,
  })
}

interface SendMailProps {
  to: string
  subject: string
  html: string
}

const sendMail = async ({ to, subject, html }: SendMailProps) => {
  const { SMTP_EMAIL, SMTP_PASSWORD, SMTP_HOST, SMTP_PORT } = process.env

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  })

  try {
    await transport.sendMail({
      from: `Chemcider <${SMTP_EMAIL}>`,
      to,
      subject,
      html,
    })
  } catch (error) {
    console.error("Failed to send email:", error)
    throw new Error("Failed to send email")
  }
}


// import nodemailer from "nodemailer"

// const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

// export const sendVerificationEmail = async (email: string, token: string) => {
//   const confirmLink = `${domain}/verify-email?token=${token}`

//   await sendMail({
//     to: email,
//     subject: "Confirm your email address",
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//         <h2 style="color: #0ea5e9;">Verify your email address</h2>
//         <p>Thank you for registering with Chemcider. Please click the button below to verify your email address:</p>
//         <a href="${confirmLink}" style="display: inline-block; background-color: #0ea5e9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Verify Email</a>
//         <p>If you didn't request this email, please ignore it.</p>
//         <p>This link will expire in 24 hours.</p>
//       </div>
//     `,
//   })
// }

// export const sendPasswordResetEmail = async (email: string, token: string) => {
//   const resetLink = `${domain}/reset-password?token=${token}`

//   await sendMail({
//     to: email,
//     subject: "Reset your password",
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//         <h2 style="color: #0ea5e9;">Reset your password</h2>
//         <p>You requested to reset your password. Click the button below to set a new password:</p>
//         <a href="${resetLink}" style="display: inline-block; background-color: #0ea5e9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Reset Password</a>
//         <p>If you didn't request this email, please ignore it.</p>
//         <p>This link will expire in 24 hours.</p>
//       </div>
//     `,
//   })
// }

// export const sendTwoFactorEmail = async (email: string, token: string) => {
//   await sendMail({
//     to: email,
//     subject: "Your 2FA Code",
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//         <h2 style="color: #0ea5e9;">Your 2FA Code</h2>
//         <p>Your two-factor authentication code is:</p>
//         <div style="font-size: 24px; font-weight: bold; background-color: #f3f4f6; padding: 10px; text-align: center; letter-spacing: 5px; margin: 20px 0;">${token}</div>
//         <p>This code will expire in 10 minutes.</p>
//         <p>If you didn't request this code, please secure your account immediately.</p>
//       </div>
//     `,
//   })
// }

// interface SendMailProps {
//   to: string
//   subject: string
//   html: string
// }

// const sendMail = async ({ to, subject, html }: SendMailProps) => {
//   const { SMTP_EMAIL, SMTP_PASSWORD, SMTP_HOST, SMTP_PORT } = process.env

//   const transport = nodemailer.createTransport({
//     host: SMTP_HOST,
//     port: Number(SMTP_PORT),
//     secure: Number(SMTP_PORT) === 465,
//     auth: {
//       user: SMTP_EMAIL,
//       pass: SMTP_PASSWORD,
//     },
//   })

//   try {
//     await transport.sendMail({
//       from: `Chemcider <${SMTP_EMAIL}>`,
//       to,
//       subject,
//       html,
//     })
//   } catch (error) {
//     console.error("Failed to send email:", error)
//     throw new Error("Failed to send email")
//   }
// }

