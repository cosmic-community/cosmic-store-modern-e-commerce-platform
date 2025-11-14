import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'
import { getAllCategories } from '@/lib/cosmic'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cosmic Store - Modern E-Commerce',
  description: 'Shop the latest products with our modern e-commerce platform',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getAllCategories()
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header categories={categories} />
        <main>{children}</main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}