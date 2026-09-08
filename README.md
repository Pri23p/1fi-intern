# 1Fi SDE Intern Assignment - 1Fi Marketplace

A full-fledged, production-ready implementation of the **1Fi Marketplace** section within the 1Fi Fintech App ecosystem, built with React, Vite, Tailwind CSS, Lucide Icons, and an asynchronous Mock API Service.

---

## 🎯 Overview & Assignment Alignment

As specified in the **1Fi SDE Intern Assignment**:
1. **Explore the 1Fi App**: Replicates 1Fi's fintech aesthetic with a mobile-first design, authentic color scheme (Electric Emerald `#00D09C`, Navy `#0B132B`, Slate `#1E293B`), typography, glassmorphism, and bottom navigation.
2. **Shop Page Architecture**:
   - **A. Top Brands**: Clean placeholder view with navigation back to the Marketplace.
   - **B. Nearby Stores**: Clean placeholder view with navigation back to the Marketplace.
   - **C. 1Fi Marketplace**: Fully designed, engineered, and interactive section.

---

## 🌟 Key Features

### 1. 1Fi Marketplace Section
- **Fintech Promotional Hero**: Interactive banner explaining 1Fi's Loan Against Mutual Funds (LAMF) value proposition (0% interest, no equity liquidations, zero capital gains tax).
- **Search & Auto-filter**: Real-time searching across brands, product names, and categories.
- **Dynamic Category Navigation**: Filter products by *Smartphones*, *Laptops*, *Audio & Sound*, *Smartwatches*, *Tablets*, and *All Products*.
- **Multi-criteria Sorting**: Sort by *Most Popular*, *Price: Low to High*, *Price: High to Low*, *Highest Discount*, and *Highest Rated*.

### 2. Product Detail & Dynamic EMI Engine
- **Image Gallery**: High-resolution product images with thumbnail navigation and color-linked previews.
- **Dynamic Storage & Color Variants**: Real-time price calculation based on selected storage tiers and color swatches.
- **Comprehensive EMI Calculator**:
  - Live calculations for **3, 6, 9, 12, 18, and 24-month tenures**.
  - Highlights **0% No-Cost EMI** subsidies, ₹0 processing fees, and zero down-payment.
  - Computes exact **Mutual Fund Collateral Pledge required** and **Projected Compound Growth** during repayment.
- **Live Pincode Serviceability**: Validates 6-digit Indian PIN codes with estimated express delivery dates.
- **Technical Specs & In-the-Box**: Comprehensive hardware breakdown.

### 3. End-to-End Fintech Checkout Flow
- **Step 1 - Order & EMI Review**: Summary of device price, EMI tenure, and payment breakdown.
- **Step 2 - MF Collateral Allocation**: Interactive selector allowing users to choose which mutual fund holdings (e.g. Parag Parikh Flexi Cap, Nippon India Small Cap) to pledge safely.
- **Step 3 - Delivery Address**: Switch between saved Home and Office addresses or add new ones.
- **Step 4 - OTP & E-Mandate Authorization**: Security verification for auto-debit setup.
- **Step 5 - Order Confirmed**: Animated celebration with confetti, generated **Order ID**, **Loan Agreement ID**, dynamic credit balance deduction, and downloadable repayment schedule simulator.

### 4. Evaluator & Reviewer Convenience
- **Mobile Frame vs. Desktop Layout Switcher**: Easily switch between an iPhone 16 Pro device mockup and a fluid desktop viewport in 1 click via the top header.
- **Global Toast Notification System**: Instant feedback for wishlist additions, clipboard copies, and state changes.

---

## 🏗️ Architecture & Code Structure

```
1fi/
├── src/
│   ├── api/
│   ├── components/
│   │   ├── BottomNav.jsx            # Authentic 1Fi bottom navigation
│   │   ├── CheckoutModal.jsx        # 4-Step checkout & MF pledge flow
│   │   ├── DeviceFrameWrapper.jsx   # Mobile frame simulator & viewport wrapper
│   │   ├── Header.jsx               # Header with credit limit status & controls
│   │   ├── MarketplaceView.jsx      # Main Marketplace catalog & hero
│   │   ├── NearbyStoresView.jsx     # Nearby stores placeholder
│   │   ├── OtherTabsView.jsx        # Home, Invest, Credit, Profile views
│   │   ├── ProductCard.jsx          # Product card with dynamic EMI preview
│   │   ├── ProductDetailModal.jsx   # Product page, variant switcher & EMI calculator
│   │   ├── ShopSubNav.jsx           # Top Brands | Nearby Stores | 1Fi Marketplace
│   │   └── Toast.jsx                # Global notification toast container
│   ├── context/
│   │   └── AppContext.jsx           # Global state management (user, cart, filters)
│   ├── data/
│   │   ├── mockProducts.js          # Realistic product catalog & variant specs
│   │   └── mockUserData.js          # User profile, MF portfolio & credit limits
│   ├── services/
│   │   └── api.js                   # Asynchronous Mock API service layer
│   ├── App.jsx                      # App root component
│   ├── index.css                    # Tailwind + Glassmorphism design tokens
│   └── main.jsx                     # Vite entry point
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js (v18 or higher)
- npm

### Steps
```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

The application will be accessible at `http://localhost:5173/`.
