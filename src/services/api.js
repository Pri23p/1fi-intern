import { MOCK_PRODUCTS, CATEGORIES } from '../data/mockProducts';
import { MOCK_USER } from '../data/mockUserData';

// Simulated network delay helper
const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  /**
   * Fetch categories list
   */
  async getCategories() {
    await delay(200);
    return CATEGORIES;
  },

  /**
   * Fetch products with dynamic filtering, searching, and sorting
   */
  async getProducts({ category = 'all', search = '', sortBy = 'popular', minPrice = 0, maxPrice = 500000 } = {}) {
    await delay(350);

    let filtered = [...MOCK_PRODUCTS];

    // Category filter
    if (category && category !== 'all') {
      filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    // Search query filter
    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Price range filter
    filtered = filtered.filter((p) => p.basePrice >= minPrice && p.basePrice <= maxPrice);

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
        break;
    }

    return filtered;
  },

  /**
   * Fetch single product by ID with full details
   */
  async getProductById(id) {
    await delay(250);
    const product = MOCK_PRODUCTS.find((p) => p.id === id);
    if (!product) {
      throw new Error(`Product with ID "${id}" not found`);
    }
    return product;
  },

  /**
   * Generate comprehensive EMI options dynamically based on amount and tenure
   */
  async getEMIPlans(principalAmount, downPayment = 0) {
    await delay(150);
    const netFinanced = Math.max(0, principalAmount - downPayment);
    const tenures = [3, 6, 9, 12, 18, 24];

    return tenures.map((months) => {
      // 3, 6, 12 months qualify for 0% No Cost EMI on 1Fi
      const isNoCost = months <= 12;
      const annualRate = isNoCost ? 0 : 0.0999; // 9.99% for extended 18/24m
      const monthlyRate = annualRate / 12;

      let monthlyEmi = 0;
      let totalPayable = 0;
      let interestAmount = 0;

      if (isNoCost || annualRate === 0) {
        monthlyEmi = Math.ceil(netFinanced / months);
        totalPayable = monthlyEmi * months;
        interestAmount = 0;
      } else {
        // Standard Equated Monthly Installment formula: P * r * (1+r)^n / ((1+r)^n - 1)
        const factor = Math.pow(1 + monthlyRate, months);
        monthlyEmi = Math.ceil((netFinanced * monthlyRate * factor) / (factor - 1));
        totalPayable = monthlyEmi * months;
        interestAmount = totalPayable - netFinanced;
      }

      // Required Mutual Fund pledge collateral value (~80% LTV, so 1.25x collateral)
      const mfCollateralRequired = Math.round(netFinanced * 1.15);

      // Estimated investment return while holding MF (assumed 13.5% CAGR)
      const estimatedPortfolioGrowth = Math.round(
        mfCollateralRequired * (Math.pow(1 + 0.135, months / 12) - 1)
      );

      return {
        tenureMonths: months,
        monthlyEmi,
        totalPayable,
        principal: netFinanced,
        interestAmount,
        processingFee: 0, // 1Fi offers ₹0 processing fee
        isNoCost,
        discountSubsidized: isNoCost ? Math.round(netFinanced * (0.12 * (months / 12))) : 0,
        mfCollateralRequired,
        estimatedPortfolioGrowth,
        tag: months === 12 ? 'Most Popular' : months === 6 ? 'Zero Interest' : months === 24 ? 'Lowest Monthly EMI' : null
      };
    });
  },

  /**
   * Fetch current user profile & credit limits
   */
  async getUserProfile() {
    await delay(200);
    return MOCK_USER;
  },

  /**
   * Pincode serviceability check
   */
  async checkPincodeDelivery(pincode) {
    await delay(300);
    const valid = /^[1-9][0-9]{5}$/.test(pincode);
    if (!valid) {
      return { serviceable: false, message: 'Invalid 6-digit Indian PIN code' };
    }
    const days = Math.floor(Math.random() * 2) + 2;
    const date = new Date();
    date.setDate(date.getDate() + days);

    return {
      serviceable: true,
      deliveryDate: date.toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }),
      message: `Delivery by ${date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })} (Express)`
    };
  },

  /**
   * Simulate order creation & mutual fund pledge sanction
   */
  async processOrder({ product, variant, color, emiPlan, address, pledgedFunds }) {
    await delay(800);
    const orderId = `1FI-${Math.floor(100000 + Math.random() * 900000)}`;
    const loanAgreementId = `LAMF-${Math.floor(10000000 + Math.random() * 90000000)}`;

    return {
      success: true,
      orderId,
      loanAgreementId,
      productName: product.name,
      variantName: variant.name,
      colorName: color.name,
      finalAmount: variant.priceDelta + product.basePrice,
      monthlyEmi: emiPlan.monthlyEmi,
      tenureMonths: emiPlan.tenureMonths,
      firstEmiDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      address,
      createdAt: new Date().toISOString()
    };
  }
};
