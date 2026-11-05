# LOOT PERFUMES — Luxury Haute Parfumerie E-Commerce Platform

> **"Luxury is a Fragrance."**  
> Formulated with up to 35% pure concentrated fragrance oils for an extraordinary 18-hour sillage.

---

## 👑 Brand & Ownership Details
- **Brand Name:** LOOT PERFUMES
- **Founder & Master Perfumer:** Nasif Ali
- **Official Business WhatsApp / Contact:** +91 8113873726
- **Tagline:** *"Luxury is a Fragrance."*
- **Atelier Payment UPI:** `8113873726@upi`

---

## 💎 Features Included

### 1. Storefront & Visual Identity
- **Obsidian Black, Champagne Gold & Pure Ivory** luxury color palette.
- Custom **LP Monogram Crest** and Haute Parfumerie typography.
- Full-screen luxury Hero banner with 4 trust pillars.
- **Curated Collections Gallery** with live search, price sort, and category filters:
  - **Men's**
  - **Women's**
  - **Unisex**
  - **Oud**
  - **Attar**
- **Preserved & Authentic Products:**
  - `ROYAL OUD` (₹799)
  - `MIDNIGHT` (₹999)
  - `GOLDEN MUSK` (₹699)
  - `OUD ARABIA` (₹1,199)
  - `VELVET NOIR` (₹899)
  - `ROSE SUPREME` (₹749)
  - `AQUA IMPERIAL` (₹849)
  - `SANTAL MAJESTY` (₹1,099)
- **Flacon Size Selectors:** 50ml, 100ml, and 10ml travel pocket atomizers with dynamic price updates.
- **Product Detail / Quick View Modal:** Complete Olfactory Pyramid (Top, Heart, Base notes), longevity and sillage ratings.
- **Client Testimonials & Reviews:** Verified reviews praising longevity and projection.
- **The LOOT Atelier Brand Story:** Founder narrative of Nasif Ali.
- **Official Concierge:** Direct WhatsApp button and inquiry form.

### 2. Shopping & Ordering Experience
- **Slide-out Cart Drawer:** Real-time quantity adjuster (+ / -), item removal, free shipping progress bar (complimentary above ₹999).
- **VIP Coupon System:** Apply code `LOOT10` for an instant 10% privilege discount.
- **WhatsApp Order System:**
  - Collects customer name, mobile number, and full address.
  - Automatically generates an itemized luxury order message and opens WhatsApp directly to **+91 8113873726**.
- **Instant UPI / QR Code Payment:** Dynamic QR code generation for GPay / PhonePe / Paytm (`8113873726@upi`).
- **Cash on Delivery (COD)** with phone verification.
- **Order Tracking:** Lookup live order status (`LOOT-XXXX`) with 4-step progress bar (Order Placed ➔ Handcrafting ➔ Dispatched ➔ Delivered).

### 3. Atelier Admin Portal (`/admin.html`)
- **Secure Authentication:** Username: `admin` | Password: `loot@2026`.
- **Revenue & Order Metrics:** Live calculation of total revenue, order count, and low stock warnings.
- **Product Management (CRUD):**
  - Add new perfumes with name, category, price, size, notes, stock.
  - Image upload with instant file preview or custom URL.
  - Edit existing perfumes & stock levels.
  - Delete / archive perfumes.
- **Customer Order Management:**
  - View full client name, phone, delivery address, items, and payment method.
  - Update status (`New Order`, `Confirmed via WhatsApp`, `Dispatched`, `Delivered`).
  - Single-click **"Chat with Client on WhatsApp"** button.
- **Atelier Security:** Change password securely.

---

## 🚀 Running Locally

The platform runs on pure Node.js standard libraries without requiring complex native dependencies:

```bash
# Start the boutique server
npm start
# or
node server.js
```

- **Customer Boutique:** [http://localhost:5000](http://localhost:5000)
- **Atelier Admin Portal:** [http://localhost:5000/admin.html](http://localhost:5000/admin.html)
  - Default Username: `admin`
  - Default Password: `loot@2026`

*Note:* `index.html` also works directly in any web browser by opening it with double-click!

---

## ☁️ Vercel Deployment Guide

This project is pre-configured with `vercel.json` for one-click deployment:

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In [Vercel](https://vercel.com/), click **Add New Project** and import the repository.
3. Deploy! Vercel will automatically read `vercel.json` and serve both the storefront and the admin routes.

