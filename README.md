# ✨ Cosmic Store - Modern E-commerce Platform

![App Preview](https://imgix.cosmicjs.com/808bc900-c1a3-11f0-9757-a1b2350abfc3-photo-1505740420928-5e560c06d30e-1763156842032.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A stunning, fully animated e-commerce platform built with Next.js 16 and powered by Cosmic CMS. This modern storefront features smooth animations, an intuitive shopping experience, and a beautiful product showcase.

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

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6917a2cae7349beda291cfb7&clone_repository=6917a468e7349beda291d00e)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "create a nice creative and animated ecommece store"

### Code Generation Prompt

> "Based on the content model I created for "create a nice creative and animated ecommece store", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

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

// Get products by category
const { objects: categoryProducts } = await cosmic.objects
  .find({ 
    type: 'products',
    'metadata.category': categoryId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Categories

```typescript
// Get all categories sorted by display order
const { objects: categories } = await cosmic.objects
  .find({ type: 'categories' })
  .props(['id', 'title', 'slug', 'metadata'])

const sortedCategories = categories.sort((a, b) => {
  const orderA = a.metadata?.display_order || 999
  const orderB = b.metadata?.display_order || 999
  return orderA - orderB
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

### Key Features

- **Object Relationships**: Products are linked to categories using depth parameter
- **File Management**: Multiple product images with imgix optimization
- **Featured Products**: Special showcase for highlighted items
- **Sale Pricing**: Automatic sale badge when sale_price is set
- **Stock Tracking**: Real-time stock availability display

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Import your repository in Netlify
3. Build settings:
   - Build command: `bun run build`
   - Publish directory: `.next`
4. Add environment variables in Netlify dashboard
5. Deploy!

## 📝 Environment Variables

Required environment variables for deployment:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

Get these values from your Cosmic dashboard under Bucket Settings > API Access.

## 🎯 Key Implementation Details

- Server-side data fetching for optimal performance
- Image optimization using imgix parameters (2x resolution for retina displays)
- TypeScript strict mode with comprehensive type definitions
- Responsive design with mobile-first approach
- Smooth animations using Framer Motion
- SEO-friendly with dynamic metadata
- Error handling for empty states

## 📖 Learn More

- [Cosmic Documentation](https://www.cosmicjs.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)

<!-- README_END -->