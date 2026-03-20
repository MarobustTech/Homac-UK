import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/components/auth/auth-context"
import { FloatingButtons } from "@/components/floating-buttons"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const metadata: Metadata = {
  title: "Homac UK - Premium Abacus & Mental Arithmetic Education",
  description:
    "Discover the future of math education with Homac UK. Expert abacus and mental arithmetic training for children of all ages. Join thousands of students worldwide.",
  keywords: "abacus, mental arithmetic, education, kids learning, math tuition, franchise",
  authors: [{ name: "Homac UK" }],
  creator: "Homac UK",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://homacuk.com",
    siteName: "Homac UK",
    title: "Homac UK - Premium Abacus & Mental Arithmetic Education",
    description: "The future of math education is here",
    images: [
      {
        url: "https://homacuk.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Homac UK - Premium Abacus & Mental Arithmetic",
    description: "The future of math education",
    creator: "@HomacUK",
  },
  generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F9FF" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1729" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
          <FloatingButtons />
          <Toaster />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
