export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Sparkles', count: 18 },
  { id: 'smartphones', name: 'Smartphones', icon: 'Smartphone', count: 5 },
  { id: 'laptops', name: 'Laptops', icon: 'Laptop', count: 4 },
  { id: 'audio', name: 'Audio & Sound', icon: 'Headphones', count: 3 },
  { id: 'wearables', name: 'Smartwatches', icon: 'Watch', count: 3 },
  { id: 'tablets', name: 'Tablets', icon: 'Tablet', count: 3 }
];

export const MOCK_PRODUCTS = [
  {
    id: 'prod-iphone-16-pro',
    name: 'Apple iPhone 16 Pro',
    brand: 'Apple',
    tagline: 'Titanium. So strong. So light. So Pro.',
    category: 'smartphones',
    badge: '0% No Cost EMI',
    rating: 4.9,
    reviewCount: 1420,
    basePrice: 119900,
    originalPrice: 129900,
    discountPercentage: 8,
    isTrending: true,
    isPopular: true,
    thumbnail: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Desert Titanium', hex: '#C5B5A5', imageIndex: 0 },
      { name: 'Natural Titanium', hex: '#9E9A95', imageIndex: 1 },
      { name: 'Black Titanium', hex: '#3B3B3D', imageIndex: 2 },
      { name: 'White Titanium', hex: '#F2F2F2', imageIndex: 0 }
    ],
    variants: [
      { id: 'var-128gb', name: '128 GB', priceDelta: 0, inStock: true },
      { id: 'var-256gb', name: '256 GB', priceDelta: 10000, inStock: true, default: true },
      { id: 'var-512gb', name: '512 GB', priceDelta: 30000, inStock: true },
      { id: 'var-1tb', name: '1 TB', priceDelta: 50000, inStock: false }
    ],
    specs: {
      processor: 'A18 Pro Chip with 6-core GPU',
      display: '6.3" Super Retina XDR OLED ProMotion 120Hz',
      camera: '48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto',
      battery: 'Up to 27 hours video playback, MagSafe wireless',
      os: 'iOS 18 with Apple Intelligence ready',
      warranty: '1 Year Apple Official Warranty with 1Fi Assure'
    },
    inTheBox: ['iPhone 16 Pro', 'USB-C Charge Cable (1m)', 'Documentation'],
    mutualFundPerk: 'Pledge ₹1.2L Mutual Funds and pay ₹5,412/mo while your portfolio continues to compound at ~14% p.a.!'
  },
  {
    id: 'prod-macbook-pro-m4',
    name: 'MacBook Pro 14" (M4 Pro)',
    brand: 'Apple',
    tagline: 'Mind-blowing. Head-turning.',
    category: 'laptops',
    badge: 'Fintech Special',
    rating: 4.9,
    reviewCount: 890,
    basePrice: 199900,
    originalPrice: 209900,
    discountPercentage: 5,
    isTrending: true,
    isPopular: true,
    thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Space Black', hex: '#242527', imageIndex: 0 },
      { name: 'Silver', hex: '#E3E4E5', imageIndex: 1 }
    ],
    variants: [
      { id: 'var-24gb-512gb', name: '24GB / 512GB SSD', priceDelta: 0, inStock: true, default: true },
      { id: 'var-48gb-1tb', name: '48GB / 1TB SSD', priceDelta: 40000, inStock: true }
    ],
    specs: {
      processor: 'Apple M4 Pro chip (12-core CPU, 18-core GPU)',
      display: '14.2" Liquid Retina XDR, 1600 nits peak, 120Hz ProMotion',
      memory: '24GB Unified Memory with 273GB/s bandwidth',
      battery: 'Up to 24 hours battery life, 70W USB-C Fast Charger',
      ports: '3x Thunderbolt 5, HDMI 2.1, SDXC slot, MagSafe 3',
      warranty: '1 Year Limited Apple Warranty'
    },
    inTheBox: ['14-inch MacBook Pro', '70W USB-C Power Adapter', 'USB-C to MagSafe 3 Cable (2m)'],
    mutualFundPerk: 'Zero portfolio liquidation needed. Enjoy 100% asset backing with zero prepayment penalties.'
  },
  {
    id: 'prod-samsung-s25-ultra',
    name: 'Samsung Galaxy S25 Ultra 5G',
    brand: 'Samsung',
    tagline: 'Galaxy AI is here. Epic in every way.',
    category: 'smartphones',
    badge: '0% No Cost EMI',
    rating: 4.8,
    reviewCount: 960,
    basePrice: 129999,
    originalPrice: 139999,
    discountPercentage: 7,
    isTrending: true,
    isPopular: true,
    thumbnail: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Titanium Gray', hex: '#686B73', imageIndex: 0 },
      { name: 'Titanium Black', hex: '#2A2B2E', imageIndex: 1 },
      { name: 'Titanium Violet', hex: '#584B68', imageIndex: 0 }
    ],
    variants: [
      { id: 'var-256gb-s25', name: '12GB / 256 GB', priceDelta: 0, inStock: true, default: true },
      { id: 'var-512gb-s25', name: '12GB / 512 GB', priceDelta: 12000, inStock: true },
      { id: 'var-1tb-s25', name: '12GB / 1 TB', priceDelta: 30000, inStock: true }
    ],
    specs: {
      processor: 'Snapdragon 8 Elite for Galaxy (3nm)',
      display: '6.8" Dynamic AMOLED 2X, 3120x1440, Gorilla Armor Glass',
      camera: '200MP Main + 50MP 5x Periscope + 50MP Ultra Wide + 10MP 3x',
      battery: '5000mAh with 45W Super Fast Charging 2.0',
      sPen: 'Embedded S-Pen with Bluetooth LE controls',
      warranty: '1 Year Brand Warranty'
    },
    inTheBox: ['Handset', 'S-Pen', 'Type-C to Type-C Cable', 'SIM Ejector Pin'],
    mutualFundPerk: 'Pay just ₹5,416/mo across 24 months. Keep your SIPs untouched.'
  },
  {
    id: 'prod-sony-wh1000xm5',
    name: 'Sony WH-1000XM5 Wireless ANC',
    brand: 'Sony',
    tagline: 'Industry-leading noise cancellation with Auto NC Optimizer',
    category: 'audio',
    badge: 'Popular Choice',
    rating: 4.8,
    reviewCount: 3100,
    basePrice: 28990,
    originalPrice: 34990,
    discountPercentage: 17,
    isTrending: false,
    isPopular: true,
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Midnight Blue', hex: '#1C2833', imageIndex: 0 },
      { name: 'Silver Platinum', hex: '#D5D8DC', imageIndex: 1 },
      { name: 'Matte Black', hex: '#17202A', imageIndex: 0 }
    ],
    variants: [
      { id: 'var-standard', name: 'Standard Edition', priceDelta: 0, inStock: true, default: true }
    ],
    specs: {
      driver: '30mm specially engineered driver unit',
      anc: 'Dual Processor V1 & QN1 with 8 microphones',
      battery: 'Up to 30 hours battery life with quick charge (3 mins = 3 hrs)',
      connectivity: 'Bluetooth 5.2 with LDAC & Multi-point connection',
      warranty: '1 Year Sony India Official Warranty'
    },
    inTheBox: ['Headphones', 'Carrying Case', 'Connection Cable (1.2m)', 'USB Cable'],
    mutualFundPerk: 'Instant approval against MF units. EMI starts at ₹2,415/month.'
  },
  {
    id: 'prod-apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2 (GPS + Cellular)',
    brand: 'Apple',
    tagline: 'Adventure awaits. Rugged titanium 49mm case.',
    category: 'wearables',
    badge: '0% No Cost EMI',
    rating: 4.9,
    reviewCount: 650,
    basePrice: 89900,
    originalPrice: 89900,
    discountPercentage: 0,
    isTrending: true,
    isPopular: false,
    thumbnail: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Black Titanium / Ocean Band', hex: '#212F3D', imageIndex: 0 },
      { name: 'Natural Titanium / Alpine Loop', hex: '#BFC9CA', imageIndex: 1 }
    ],
    variants: [
      { id: 'var-49mm-ocean', name: '49mm Titanium - Ocean Band', priceDelta: 0, inStock: true, default: true },
      { id: 'var-49mm-trail', name: '49mm Titanium - Trail Loop', priceDelta: 0, inStock: true }
    ],
    specs: {
      case: '49mm aerospace-grade titanium case',
      display: 'Always-On Retina display, up to 3000 nits',
      sensors: 'ECG, Blood Oxygen, Depth gauge to 40m, Dual-frequency GPS',
      battery: 'Up to 36 hours normal use / 72 hours low power mode',
      waterResistance: '100m water resistant, EN13319 dive certified'
    },
    inTheBox: ['Apple Watch Ultra 2', 'Band', 'Apple Watch Magnetic Fast Charger to USB-C Cable (1m)'],
    mutualFundPerk: 'Pay ₹7,491/mo for 12 months with 0% interest and ₹0 processing fee.'
  },
  {
    id: 'prod-ipad-pro-m4',
    name: 'Apple iPad Pro 13" (M4 OLED)',
    brand: 'Apple',
    tagline: 'Impossibly thin. Incredibly powerful.',
    category: 'tablets',
    badge: '0% No Cost EMI',
    rating: 4.9,
    reviewCount: 420,
    basePrice: 129900,
    originalPrice: 139900,
    discountPercentage: 7,
    isTrending: false,
    isPopular: true,
    thumbnail: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Space Black', hex: '#212F3D', imageIndex: 0 },
      { name: 'Silver', hex: '#E5E7E9', imageIndex: 1 }
    ],
    variants: [
      { id: 'var-256gb-ipad', name: '256 GB (Wi-Fi)', priceDelta: 0, inStock: true, default: true },
      { id: 'var-512gb-ipad', name: '512 GB (Wi-Fi)', priceDelta: 20000, inStock: true },
      { id: 'var-1tb-ipad-nano', name: '1 TB (Nano-texture Glass)', priceDelta: 60000, inStock: true }
    ],
    specs: {
      display: '13" Ultra Retina XDR Tandem OLED, 1600 nits HDR, ProMotion 120Hz',
      processor: 'Apple M4 chip with Next-Gen Neural Engine',
      thickness: '5.1mm ultra-thin enclosure',
      camera: '12MP Wide back camera with LiDAR, Landscape 12MP Ultra Wide front'
    },
    inTheBox: ['iPad Pro 13"', 'USB-C Charge Cable (1m)', '20W USB-C Power Adapter'],
    mutualFundPerk: 'Keep earning mutual fund returns while paying easy monthly installments.'
  },
  {
    id: 'prod-oneplus-13',
    name: 'OnePlus 13 5G Flagship',
    brand: 'OnePlus',
    tagline: 'Extreme Performance with 6000mAh Glacier Battery',
    category: 'smartphones',
    badge: 'Best Value Flagship',
    rating: 4.7,
    reviewCount: 780,
    basePrice: 69999,
    originalPrice: 74999,
    discountPercentage: 6,
    isTrending: true,
    isPopular: true,
    thumbnail: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Arctic Dawn', hex: '#EDF2F7', imageIndex: 0 },
      { name: 'Midnight Shadow', hex: '#1A202C', imageIndex: 0 },
      { name: 'Emerald Green', hex: '#2F855A', imageIndex: 0 }
    ],
    variants: [
      { id: 'var-12gb-256gb', name: '12GB + 256GB', priceDelta: 0, inStock: true, default: true },
      { id: 'var-16gb-512gb', name: '16GB + 512GB', priceDelta: 7000, inStock: true },
      { id: 'var-24gb-1tb', name: '24GB + 1TB', priceDelta: 16000, inStock: true }
    ],
    specs: {
      processor: 'Snapdragon 8 Elite (3nm)',
      display: '6.82" 2K Oriental Screen, 4500 nits, Dolby Vision',
      battery: '6,000mAh Glacier Battery with 100W SUPERVOOC + 50W AIRVOOC',
      camera: '50MP Hasselblad Triple Camera System with Sony LYT-808'
    },
    inTheBox: ['OnePlus 13', '100W SUPERVOOC Adapter', 'Type-A to Type-C Cable', 'Case'],
    mutualFundPerk: 'Pay just ₹2,916/mo on 24 months tenure. Zero down payment.'
  },
  {
    id: 'prod-bose-qc-ultra',
    name: 'Bose QuietComfort Ultra Headphones',
    brand: 'Bose',
    tagline: 'World-class noise cancellation with Spatial Audio immersion',
    category: 'audio',
    badge: 'Premium Sound',
    rating: 4.8,
    reviewCount: 512,
    basePrice: 35900,
    originalPrice: 38900,
    discountPercentage: 8,
    isTrending: false,
    isPopular: false,
    thumbnail: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Black', hex: '#1C1C1C', imageIndex: 0 },
      { name: 'White Smoke', hex: '#ECEFF1', imageIndex: 0 },
      { name: 'Sandstone', hex: '#D7CCC8', imageIndex: 0 }
    ],
    variants: [
      { id: 'var-bose-std', name: 'Standard Pack', priceDelta: 0, inStock: true, default: true }
    ],
    specs: {
      modes: 'Quiet Mode, Aware Mode, Immersion Mode',
      battery: 'Up to 24 hours of listening time (up to 18 hrs with Immersive Audio)',
      customTune: 'CustomTune technology personalizes audio to user ear shape',
      connectivity: 'Bluetooth 5.3 with SimpleSync'
    },
    inTheBox: ['Bose QC Ultra Headphones', 'Carry Case', 'Audio Cable', 'USB-C Cable'],
    mutualFundPerk: 'Pledge collateral in 60 seconds. ₹2,991/mo for 12 months.'
  }
];
