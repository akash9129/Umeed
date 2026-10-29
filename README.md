# Umeed Ki Kiran Foundation (Trust) — Official Website

> **Tagline:** Spreading Joy & Hope  
> **Hindi Tagline:** खुशियाँ बाँटिए, उम्मीद जगाइए  
> **Trust Deed Date:** 29 October 2025  
> **PAN:** `AABTU5801C`  
> **Registered Location:** Varanasi, Uttar Pradesh, India  
> **Official WhatsApp / Phone:** +91 91616 43671  

A production-ready, mobile-first 5-page website (+ 3 policy pages) crafted with a warm Indian design system (Ganga Teal `#0F3D3E`, Saffron `#F28C28`, Sand `#F7EFE3`, Cream `#FFFDF8`, Marigold `#FFC94A`, and Green `#2E7D4F`).

---

## 📁 File Structure

```text
/d/Umeed/
├── index.html              # Page 1: Home (Hero, Trust Strip, Package Picker, Good-Deed Basket, Proof, FAQ)
├── about.html              # Page 2: About (Story, 5 Objectives, Trustees, Legal Transparency, 6-Photo Grid)
├── celebrate.html          # Page 3: Celebrate With Us (5 Packages, Comparison Table, Booking Form, Video Proof)
├── donate.html             # Page 4: Donate / Causes (Filter Chips, 10 Cause Cards, Sticky Total Bar, Quick Give)
├── contact.html            # Page 5: Contact & Gallery (Tabs + Lightbox, Bank/UPI details, Volunteer Form, Map)
├── privacy-policy.html     # Policy 1: Privacy Policy (Gateway required)
├── terms-conditions.html   # Policy 2: Terms & Conditions (Gateway required)
├── refund-policy.html      # Policy 3: Refund & Cancellation Policy (Gateway required)
├── sitemap.xml             # Search engine sitemap
├── robots.txt              # Crawler permissions
├── README.md               # Setup and deployment documentation
└── assets/
    ├── css/
    │   └── style.css       # Complete modular design system (Responsive, Accessible WCAG AA)
    ├── js/
    │   ├── config.js       # SINGLE SOURCE OF TRUTH: All prices, contacts, keys, and placeholders
    │   └── main.js         # Navigation, Package Picker, Basket calculator, Lightbox, Checkout flow
    └── images/
        └── logo.svg        # Bespoke rising sun logo (ray of light / Kiran)
```

---

## ⚙️ 1. Central Configuration (`assets/js/config.js`)

Edit all pricing, package inclusions, contact numbers, and payment keys in **one single place**:
`assets/js/config.js`

```javascript
const SITE_CONFIG = {
  org: {
    name: "Umeed Ki Kiran Foundation",
    phone: "+91 91616 43671",
    whatsapp: "919161643671",
    pan: "AABTU5801C",
    trustDeedDate: "29 October 2025",
    location: "Varanasi, Uttar Pradesh",
    // Replace with real client details:
    email: "contact@umeedkikiran.org",
    address: "Your Varanasi Office Address",
    registrationNo: "IV-XXXX/2025",
    ngoDarpanId: "UP/2025/XXXXXXX",
    bankDetails: {
      accountName: "Umeed Ki Kiran Foundation",
      accountNumber: "XXXXXXXXXXXX",
      ifscCode: "SBIN000XXXX",
      bankName: "State Bank of India, Varanasi",
      upiId: "umeedkikiran@upi"
    }
  },
  payment: {
    razorpayKeyId: "rzp_live_your_actual_key", // Add live Razorpay Key ID
    formEndpoint: "https://formspree.io/f/your_form_id"
  },
  features: {
    enable80G: false // Keep false until 80G certificate is issued
  }
};
```

---

## 🔒 2. Strict Rule on 80G Tax Exemption

As per instructions:
- **No mention of "tax-exempt", "80G", or "tax deduction" appears in the active UI.**
- A dormant block is built with CSS class `.tax-exemption-block-hidden`.
- When the 80G registration certificate is received from the Income Tax department, set `enable80G: true` and remove the `.tax-exemption-block-hidden` class in `style.css` to make the 80G notices live.

---

## 🖼️ 3. Replacing Image Slots with Real Photographs

All image slots are built as **fixed aspect-ratio boxes** (`ratio-4-3`, `ratio-16-9`, `ratio-1-1`) to avoid layout shifts (Cumulative Layout Shift = 0).

To replace a placeholder slot with a real photo:
Replace:
```html
<div class="photo-slot ratio-4-3">
  <!-- svg slot info -->
</div>
```
With:
```html
<img src="assets/images/drive-1.webp" alt="Children enjoying birthday cake in Varanasi" class="photo-slot ratio-4-3" style="object-fit: cover;">
```

---

## 💳 4. Razorpay & WhatsApp Checkout

1. **Online Payments:** In `assets/js/config.js`, update `razorpayKeyId` with your Razorpay Key ID. Once provided, the live Razorpay modal triggers automatically with the pre-filled amount.
2. **WhatsApp Deep Links:** Every booking and donation button also features a direct WhatsApp option linking to `https://wa.me/919161643671` with pre-filled event details, dates, and causes.

---

## 🚀 5. Deployment Guide

### Deploy to Netlify (Recommended - 2 Minutes)
1. Drag and drop the `Umeed` folder directly into [app.netlify.com/drop](https://app.netlify.com/drop).
2. Netlify will deploy it instantly with a free SSL certificate.
3. In Netlify domain settings, link your custom domain (e.g. `umeedkikiran.org`).

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project folder and follow the prompts.
3. Link your production domain in the Vercel dashboard.

### Deploy to GitHub Pages
1. Push the code to a GitHub repository.
2. Navigate to **Settings > Pages > Branch: main / root** and click Save.
