import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Info,
  Layers,
  ChevronRight,
  Cpu,
  Tv,
  Camera,
  Battery,
  Box,
  Heart,
  Share2,
  Lock
} from 'lucide-react';

export default function ProductDetailModal() {
  const {
    selectedProductId,
    isDetailModalOpen,
    closeProductDetail,
    startCheckout,
    wishlist,
    toggleWishlist,
    showToast
  } = useApp();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [emiPlans, setEmiPlans] = useState([]);
  const [selectedEmiPlan, setSelectedEmiPlan] = useState(null);
  const [pincode, setPincode] = useState('560038');
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [isCheckingPincode, setIsCheckingPincode] = useState(false);
  const [activeTab, setActiveTab] = useState('plans'); // 'plans' | 'specs' | 'mf-benefit'

  // Load product data when selectedProductId changes
  useEffect(() => {
    if (!selectedProductId) return;

    let isMounted = true;
    setLoading(true);

    async function loadData() {
      try {
        const prodData = await api.getProductById(selectedProductId);
        if (!isMounted) return;

        setProduct(prodData);
        setActiveImageIdx(0);

        // Default variant & color
        const defaultVar = prodData.variants?.find((v) => v.default && v.inStock) || prodData.variants?.[0];
        const defaultCol = prodData.colors?.[0];
        setSelectedVariant(defaultVar);
        setSelectedColor(defaultCol);

        // Calculate initial price
        const initialPrice = prodData.basePrice + (defaultVar?.priceDelta || 0);
        const plans = await api.getEMIPlans(initialPrice);
        if (!isMounted) return;
        setEmiPlans(plans);

        // Select 12-month or 6-month plan by default
        const defaultPlan = plans.find((p) => p.tenureMonths === 12) || plans[0];
        setSelectedEmiPlan(defaultPlan);

        // Check default pincode
        checkPincode('560038');
      } catch (err) {
        console.error('Failed to load product detail:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [selectedProductId]);

  // Recalculate EMI plans when variant changes
  const handleVariantChange = async (variant) => {
    if (!variant.inStock) return;
    setSelectedVariant(variant);
    if (!product) return;

    const newPrice = product.basePrice + variant.priceDelta;
    try {
      const newPlans = await api.getEMIPlans(newPrice);
      setEmiPlans(newPlans);
      // Retain previous tenure if available
      const currentTenure = selectedEmiPlan?.tenureMonths || 12;
      const matchingPlan = newPlans.find((p) => p.tenureMonths === currentTenure) || newPlans[0];
      setSelectedEmiPlan(matchingPlan);
    } catch (err) {
      console.error('Error recalculating EMI:', err);
    }
  };

  const checkPincode = async (code) => {
    if (!code || code.length !== 6) {
      showToast('Please enter a valid 6-digit PIN code', 'error');
      return;
    }
    setIsCheckingPincode(true);
    try {
      const res = await api.checkPincodeServiceability(code);
      setPincodeStatus(res);
      showToast(res.message, 'success');
    } catch (err) {
      setPincodeStatus({ serviceable: false, message: 'Service not available' });
    } finally {
      setIsCheckingPincode(false);
    }
  };

  if (!isDetailModalOpen) return null;

  const currentPrice = product ? product.basePrice + (selectedVariant?.priceDelta || 0) : 0;
  const currentOriginalPrice = product ? product.originalPrice + (selectedVariant?.priceDelta || 0) : 0;
  const isWishlisted = product ? wishlist.includes(product.id) : false;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-hidden">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-white/95 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-[#4338CA] border border-indigo-100 uppercase tracking-wider">
              1Fi Verified
            </span>
            <span className="text-xs text-slate-500 font-medium">0% Loan Against Mutual Funds</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast('Product link copied to clipboard!', 'info');
              }}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => product && toggleWishlist(product.id)}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
              title={isWishlisted ? 'Remove Wishlist' : 'Add Wishlist'}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={closeProductDetail}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
          {loading || !product ? (
            <div className="py-24 text-center">
              <div className="inline-block w-8 h-8 border-3 border-[#4338CA] border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-sm text-slate-500">Loading product details and dynamic EMI rates...</p>
            </div>
          ) : (
            <>
              {/* Top Hero Section: Gallery + Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Left: Image Gallery */}
                <div className="md:col-span-6 flex flex-col gap-3">
                  <div className="relative aspect-square w-full rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={product.images?.[activeImageIdx] || product.thumbnail}
                      alt={product.name}
                      className="w-full h-full object-contain object-center transition-all duration-300"
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full bg-[#4338CA] text-white shadow-sm">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {product.images && product.images.length > 1 && (
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                      {product.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImageIdx(i)}
                          className={`relative w-16 h-16 rounded-xl border-2 overflow-hidden flex-shrink-0 transition-all ${
                            activeImageIdx === i
                              ? 'border-[#4338CA] scale-95 shadow-sm'
                              : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Product Info & Pricing */}
                <div className="md:col-span-6 flex flex-col gap-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-[#4338CA] uppercase tracking-wider">
                        {product.brand}
                      </span>
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-xs font-bold text-amber-700 border border-amber-200/60">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{product.rating}</span>
                        <span className="text-slate-400 text-[10px]">({product.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                      {product.name}
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Pricing Box */}
                  <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 uppercase font-bold">1Fi Offer Price</span>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-2xl font-black text-slate-900">
                          ₹{currentPrice.toLocaleString('en-IN')}
                        </span>
                        {currentOriginalPrice > currentPrice && (
                          <span className="text-sm text-slate-400 line-through">
                            ₹{currentOriginalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                    {product.discountPercentage > 0 && (
                      <div className="px-3 py-1.5 rounded-xl bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-right">
                        <span className="text-xs font-extrabold block">Save {product.discountPercentage}%</span>
                        <span className="text-[10px] text-emerald-700">₹{(currentOriginalPrice - currentPrice).toLocaleString('en-IN')} Off</span>
                      </div>
                    )}
                  </div>

                  {/* Color Selector */}
                  {product.colors && product.colors.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-semibold text-slate-700">
                          Color: <span className="text-[#4338CA] font-bold">{selectedColor?.name}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        {product.colors.map((color, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedColor(color);
                              if (color.imageIndex !== undefined && product.images?.[color.imageIndex]) {
                                setActiveImageIdx(color.imageIndex);
                              }
                            }}
                            className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
                              selectedColor?.name === color.name
                                ? 'bg-indigo-50 border-[#4338CA] shadow-xs'
                                : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-inner"
                              style={{ backgroundColor: color.hex }}
                            />
                            <span className="text-xs font-semibold text-slate-700">{color.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Storage / Spec Variants */}
                  {product.variants && product.variants.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-semibold text-slate-700">
                          Variant / Storage: <span className="text-[#4338CA] font-bold">{selectedVariant?.name}</span>
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {product.variants.map((v) => (
                          <button
                            key={v.id}
                            disabled={!v.inStock}
                            onClick={() => handleVariantChange(v)}
                            className={`relative p-2.5 rounded-xl border text-left transition-all ${
                              !v.inStock
                                ? 'opacity-40 bg-slate-100 border-slate-200 cursor-not-allowed'
                                : selectedVariant?.id === v.id
                                ? 'bg-indigo-50 border-[#4338CA] text-[#4338CA]'
                                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                            }`}
                          >
                            <span className="text-xs font-bold block">{v.name}</span>
                            <span className="text-[10px] text-slate-500 mt-0.5 block">
                              {v.priceDelta === 0 ? 'Standard' : `+₹${v.priceDelta.toLocaleString('en-IN')}`}
                            </span>
                            {!v.inStock && (
                              <span className="absolute top-1 right-1 text-[9px] text-rose-500 font-semibold uppercase">
                                Sold Out
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pincode Check & Delivery ETA */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#4338CA]" />
                        <span className="text-xs font-semibold text-slate-700">Express Delivery Check</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          maxLength={6}
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                          placeholder="Pincode"
                          className="w-24 px-2.5 py-1 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 font-mono text-center focus:outline-none focus:border-indigo-500"
                        />
                        <button
                          onClick={() => checkPincode(pincode)}
                          disabled={isCheckingPincode}
                          className="px-3 py-1 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                        >
                          {isCheckingPincode ? '...' : 'Check'}
                        </button>
                      </div>
                    </div>
                    {pincodeStatus && (
                      <p className="text-[11px] text-emerald-700 mt-2 flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{pincodeStatus.message}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Tabs: EMI Plans Selector vs Technical Specs vs MF Collateral Math */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4 overflow-x-auto no-scrollbar">
                  <button
                    onClick={() => setActiveTab('plans')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      activeTab === 'plans'
                        ? 'bg-[#4338CA] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Select EMI Plan ({emiPlans.length} Available)</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('mf-benefit')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      activeTab === 'mf-benefit'
                        ? 'bg-[#4338CA] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                    }`}
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>How 1Fi MF Collateral Works</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      activeTab === 'specs'
                        ? 'bg-[#4338CA] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Specifications & Box Details</span>
                  </button>
                </div>

                {/* Tab 1: EMI Plans Selector */}
                {activeTab === 'plans' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                          <span>Choose Your Preferred Repayment Tenure</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            0% Down Payment
                          </span>
                        </h3>
                        <p className="text-xs text-slate-500">
                          Auto-debited from your linked bank account. Your mutual funds remain untouched & earning returns!
                        </p>
                      </div>
                    </div>

                    {/* EMI Tenure Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {emiPlans.map((plan) => {
                        const isSelected = selectedEmiPlan?.tenureMonths === plan.tenureMonths;

                        return (
                          <div
                            key={plan.tenureMonths}
                            onClick={() => setSelectedEmiPlan(plan)}
                            className={`relative p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                              isSelected
                                ? 'bg-indigo-50/70 border-[#4338CA] ring-2 ring-indigo-500/20 shadow-md'
                                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                            }`}
                          >
                            {/* Plan Tag badge */}
                            {plan.tag && (
                              <span className="absolute -top-2.5 right-3 text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-[#4338CA] text-white shadow-xs uppercase tracking-wider">
                                {plan.tag}
                              </span>
                            )}

                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold text-slate-900">
                                {plan.tenureMonths} Months
                              </span>
                              {plan.isNoCost ? (
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                  0% No Cost EMI
                                </span>
                              ) : (
                                <span className="text-[10px] text-slate-500 font-medium">
                                  9.99% p.a.
                                </span>
                              )}
                            </div>

                            <div className="mb-2.5">
                              <span className="text-lg font-black text-[#4338CA]">
                                ₹{plan.monthlyEmi.toLocaleString('en-IN')}
                              </span>
                              <span className="text-xs text-slate-500 font-medium"> /month</span>
                            </div>

                            <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500 space-y-0.5">
                              <div className="flex justify-between">
                                <span>Total Repayable:</span>
                                <span className="font-semibold text-slate-800">₹{plan.totalPayable.toLocaleString('en-IN')}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>MF Pledge Required:</span>
                                <span className="font-semibold text-indigo-700">~₹{plan.mfCollateralRequired.toLocaleString('en-IN')}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Selected Plan Real-Time Breakdown Banner */}
                    {selectedEmiPlan && (
                      <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#4338CA] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                            <TrendingUp className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">
                              Selected: {selectedEmiPlan.tenureMonths} Months @ ₹{selectedEmiPlan.monthlyEmi.toLocaleString('en-IN')}/mo
                            </span>
                            <span className="text-[11px] text-slate-600">
                              Estimated Mutual Fund growth during this tenure: <strong className="text-emerald-700">+₹{selectedEmiPlan.estimatedPortfolioGrowth.toLocaleString('en-IN')}</strong>
                            </span>
                          </div>
                        </div>
                        <div className="text-xs font-bold text-[#4338CA]">
                          ₹0 Processing Fee • No Paperwork
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 2: Mutual Fund Collateral Explanation */}
                {activeTab === 'mf-benefit' && (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#4338CA]" />
                      <span>Why Shop on 1Fi with Mutual Funds?</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {product.mutualFundPerk}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mb-1.5" />
                        <span className="text-xs font-bold text-slate-900 block">Zero MF Redemption</span>
                        <span className="text-[11px] text-slate-500">Never interrupt compounding or incur capital gains tax.</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <ShieldCheck className="w-4 h-4 text-indigo-600 mb-1.5" />
                        <span className="text-xs font-bold text-slate-900 block">100% Secure Collateral</span>
                        <span className="text-[11px] text-slate-500">Pledged via CAMS / KFintech with full SEBI compliance.</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <Lock className="w-4 h-4 text-amber-600 mb-1.5" />
                        <span className="text-xs font-bold text-slate-900 block">Instant Auto-Release</span>
                        <span className="text-[11px] text-slate-500">Units unfreeze automatically upon final monthly EMI payment.</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Detailed Tech Specs */}
                {activeTab === 'specs' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.specs &&
                        Object.entries(product.specs).map(([key, val]) => (
                          <div key={key} className="p-3 rounded-xl bg-white border border-slate-200">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                              {key}
                            </span>
                            <span className="text-xs font-semibold text-slate-800">{val}</span>
                          </div>
                        ))}
                    </div>

                    {product.inTheBox && (
                      <div className="p-4 rounded-xl bg-white border border-slate-200">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                          <Box className="w-3.5 h-3.5 text-[#4338CA]" />
                          <span>In The Box</span>
                        </span>
                        <ul className="text-xs text-slate-600 list-disc list-inside space-y-1">
                          {product.inTheBox.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Modal Sticky Bottom Action Bar */}
        {product && !loading && (
          <div className="sticky bottom-0 z-20 px-5 py-3.5 bg-white/95 backdrop-blur-md border-t border-slate-200 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-bold">Selected Plan</span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg sm:text-xl font-extrabold text-[#4338CA]">
                  ₹{selectedEmiPlan?.monthlyEmi.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  /mo ({selectedEmiPlan?.tenureMonths}m)
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                startCheckout({
                  product,
                  variant: selectedVariant,
                  color: selectedColor,
                  emiPlan: selectedEmiPlan
                })
              }
              className="flex-1 max-w-xs flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#4338CA] hover:bg-[#3730A3] text-white font-extrabold text-sm sm:text-base shadow-md shadow-indigo-500/25 transition-all transform active:scale-98"
            >
              <span>Proceed with Selected Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
