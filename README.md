# ✨ Smart Lead - Modern E-commerce Platform

![App Preview](https://imgix.cosmicjs.com/808bc900-c1a3-11f0-9757-a1b2350abfc3-photo-1505740420928-5e560c06d30e-1763156842032.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A stunning, fully animated e-commerce platform built with Next.js 16 and powered by Cosmic CMS. This modern storefront features smooth animations, an intuitive shopping experience, and a powerful admin dashboard for product management.

## ✨ Features

- 🛍️ **Dynamic Product Catalog** - Browse products with filtering and sorting
- 🏷️ **Category Navigation** - Organized product categories with custom imagery
- 🔍 **Product Details** - Rich product pages with galleries and descriptions
- 💰 **Sale Indicators** - Highlight discounted products with sale badges
- 📊 **Stock Management** - Display real-time stock availability
- 🖼️ **Image Gallery** - Multiple product images with zoom capabilities
- 📱 **Responsive Design** - Perfect experience across all devices
- ✨ **Smooth Animations** - Engaging micro-interactions powered by Framer Motion
- 🎯 **SEO Optimized** - Built-in metadata and structured data
- 🔒 **Type-Safe** - Full TypeScript implementation with strict typing
- 👨‍💼 **Admin Dashboard** - Full product management capabilities
- 📞 **Contact Information** - Easy access to phone and email

## 📞 Contact Information

- **Phone**: +971 52 580 8102
- **Email**: enochdop@gmail.com

## 🚀 Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Cosmic CMS** - Headless CMS for content management
- **Imgix** - Advanced image optimization

## 📋 Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account with your e-commerce content

## 🛠️ Installation

1. Clone this repository
2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file in the root directory:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 👨‍💼 Admin Dashboard

Access the admin dashboard at `/admin` to:
- View all products
- Add new products
- Edit existing products
- Delete products
- Manage inventory

## 📚 Cosmic SDK Examples

### Fetching Products

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all products with category relationships
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get featured products only
const { objects: featured } = await cosmic.objects
  .find({ 
    type: 'products',
    'metadata.featured_product': true 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Creating Products

```typescript
// Create a new product
await cosmic.objects.insertOne({
  title: 'New Product',
  type: 'products',
  metadata: {
    product_name: 'New Product',
    description: 'Product description',
    price: 99.99,
    stock_quantity: 50
  }
})
```

## 🎨 Cosmic CMS Integration

This application leverages your Cosmic content structure:

### Content Types

**Products**
- Product Name (text, required)
- Description (html-textarea, required)
- Price (number, required)
- Sale Price (number, optional)
- Stock Quantity (number, required)
- Product Images (files, required)
- Category (object relationship, required)
- Featured Product (switch)

**Categories**
- Category Name (text, required)
- Description (textarea)
- Category Image (file)
- Display Order (number)

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

## 📝 Environment Variables

Required environment variables for deployment:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

Get these values from your Cosmic dashboard under Bucket Settings > API Access.

## 📖 Learn More

- [Cosmic Documentation](https://www.cosmicjs.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)

<!-- README_END -->