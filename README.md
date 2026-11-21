# VELORA COMMERCE — The Art of Modern Luxury

A luxury fashion e-commerce platform and administrative suite designed with an editorial aesthetic, high-performance typography, and real-time synchronized state.

![Brand](https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1600)

---

## 🏛️ Brand Essence & Identity
- **House Name:** VELORA
- **Tagline:** THE ART OF MODERN LUXURY
- **Palette:**
  - Ivory (`#F8F6F1`) & Pure White (`#FFFFFF`)
  - Deep Black (`#111111`) & Charcoal (`#242424`)
  - Warm Beige (`#D8C9B5`) & Sand (`#E8DFD3`)
  - Muted Champagne Gold (`#B69A70`)
- **Typography:**
  - Headings: *Cormorant Garamond* & *Playfair Display*
  - Body & Admin Suite: *Inter*

---

## 💎 Features Overview

### 🛍️ Customer-Facing Storefront
1. **Cinematic Homepage (`/`)**
   - Dismissible global announcement bar with real-time CMS content sync
   - Full-screen editorial campaign hero with dual call-to-actions
   - Value propositions strip (White-glove delivery, noble fibers, 30-day returns)
   - Featured Universes (Women, Men, Handcrafted Leather & Bags)
   - Interactive New Arrivals & Iconic Best Sellers product carousels
   - Split Editorial campaign layout and Atelier Manifesto
   - Digital Salon (`#VELORAATELIER`) Instagram-inspired gallery
   - Complete luxury footer with newsletter subscription validation
2. **Catalog & Shop Experience (`/shop`)**
   - Multi-facet sidebar filters: Department, Curated Edit, Price Range ($200–$3000), Sizes, Color Swatches, and In-Stock availability
   - Sort by Newest, Price (Low/High), and Popularity
   - Instant in-catalog search with active filter chips & "Clear All"
   - Grid / List layout view toggle
   - Paginated dynamic loader
3. **Curated Collections (`/collections/:slug`)**
   - Dynamic routes for `/collections/women`, `/collections/men`, `/collections/accessories`, `/collections/new-arrivals`, and `/collections/sale`
   - Dedicated campaign headers, descriptions, and filtered catalog items
4. **Editorial Product Detail Page (`/product/:id`)**
   - Interactive multi-image gallery with mouse-follow zoom lens and thumbnail navigation
   - Size picker with bespoke Size Guide modal link
   - Interactive color swatch selector
   - Real-time stock counter and dynamic quantity controller
   - Add to Bag with instant drawer opening & "Buy Now with Express Concierge"
   - Tabbed specifications: Editorial Details, Noble Fibers & Care, White-Glove Shipping & Returns, and Client Reviews
   - Interactive review submission form that updates review store
   - Curated ensemble recommendations ("Complete the Ensemble")
5. **Interactive Slide Cart Drawer & Full Cart (`/cart`)**
   - Accessible from any page via the shopping bag icon
   - Free shipping progress bar ($300 threshold calculation)
   - Real-time coupon validator with instant discount deduction (try `VELORA10` or `LUXURY50`)
   - Quantity modifier and item removal
6. **Express Checkout (`/checkout`)**
   - Patron Information validation (name, email, phone)
   - Delivery destination fields (street, city, postal code, country)
   - Delivery service selection (Standard White-Glove vs Priority Air Courier)
   - Simulated payment options (Online Card Authorization demo vs Cash on Delivery)
   - Unique Order ID generator (`VEL-2026-XXXX`)
   - Automatic product inventory decrement upon order placement
7. **Order Confirmation (`/order-confirmation/:orderId`)**
   - Gold confetti celebration animation
   - Complete order dossier, timeline tracker, and receipt print action
8. **Client Account Portal (`/account`)**
   - Patron authentication with preloaded 1-click VIP profiles (Helena Vance, Julian Sterling)
   - Order history archives with visual timeline progression modal
   - Saved residence address book
9. **Informational & Legal Pages**
   - `/about`, `/contact`, `/size-guide`, `/faq`, `/shipping-returns`, `/privacy-policy`, `/terms`, and `/404`

---

### 🛡️ Administrative Executive Suite (`/admin`)
Separate dark-charcoal dashboard (`#111113`) with champagne-gold accents and real-time bidirectional synchronization with the storefront:

1. **Overview Dashboard (`/admin`)**
   - Total Revenue, Total Orders, Average Order Value (AOV), and Low Stock alerts
   - Revenue trajectory area chart (Recharts)
   - Department volume breakdown donut chart
   - Recent orders queue with inline status transitions
   - Iconic best-selling garments list
2. **Product Catalog Management (`/admin/products`)**
   - Full CRUD: Add creation, edit existing details, delete with confirmation
   - Multi-image URL support, SKU generator, sizes, and colors
   - Featured & Iconic Best Seller toggles (instantly updates storefront)
3. **Department Taxonomy (`/admin/categories`)**
   - Category creation, edit, image updates, and status management
4. **Collection Management (`/admin/collections`)**
   - Manage editorial campaigns, banner URLs, subtitles, and descriptions
5. **Order Dispatch Management (`/admin/orders`)**
   - Filter by status: `Pending`, `Confirmed`, `Processing`, `Shipped`, `Delivered`, `Cancelled`
   - Real-time status progression selector that updates the customer's order history
   - Dossier modal with customer address, purchased items, and financial settlement
   - One-click CSV export
6. **Patron Directory & CRM (`/admin/customers`)**
   - Client records, lifetime spend calculation, order history, and VIP tier badges
7. **Inventory & Stock Synchronization (`/admin/inventory`)**
   - Real-time physical inventory tracking
   - One-click `+` / `-` stock adjustments and `+10` quick replenish
   - Low-stock and out-of-stock warning filters
8. **Privilege Codes & Coupons (`/admin/coupons`)**
   - Create percentage or fixed-amount discounts, set minimum spend thresholds and expiration dates
   - Real-time usage limit counters
9. **Patron Review Moderation (`/admin/reviews`)**
   - Approve, reject, or delete customer reviews (only approved reviews display publicly)
10. **Financial & Atelier Analytics (`/admin/analytics`)**
    - Gross trajectory charts, monthly volume, and department contribution metrics
    - CSV download for financial reporting
11. **Storefront CMS Content Management (`/admin/content`)**
    - Live homepage hero copy, eyebrow, background image URL
    - Global announcement bar text and active toggle
    - Editorial campaign copy and imagery (updates storefront instantly)
12. **Store Governance & Settings (`/admin/settings`)**
    - Configure currency, shipping fee, free shipping threshold, and low-stock threshold
    - Factory demo database reset button

---

## 🔑 Administrative Demo Credentials
- **URL:** `http://localhost:5173/admin/login`
- **Email:** `admin@velora.demo`
- **Password:** `Velora123!`

---

## 🛠️ Tech Stack & Architecture
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS with custom luxury theme extensions
- **Routing:** React Router DOM v7 (Route-level code splitting with `Suspense` and `lazy()`)
- **State Management:** Zustand with LocalStorage persistence
- **Icons:** Lucide React
- **Visualizations:** Recharts
- **Dates:** date-fns
- **Effects:** Canvas Confetti

---

## 🚀 Running the Project Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 🌐 Deploying to Vercel
The repository includes a ready-to-deploy `vercel.json` with SPA routing configuration:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

1. Push your repository to GitHub / GitLab.
2. Import the repository in [Vercel](https://vercel.com).
3. The build command will automatically run `npm run build` with output directory `dist`.
4. Deploy! All internal routes (`/shop`, `/product/:id`, `/admin/*`) will resolve smoothly without 404 errors.
