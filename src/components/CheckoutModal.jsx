import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Lock,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Download,
  ShoppingBag,
  Sparkles,
  CreditCard,
  Building,
  Check
} from 'lucide-react';

export default function CheckoutModal() {
  const {
    checkoutProduct,
    selectedVariant,
    selectedColor,
    selectedEmiPlan,
    isCheckoutModalOpen,
    closeCheckout,
    completeOrder,
    user,
    showToast
  } = useApp();

  const [step, setStep] = useState(1); // 1: Review & Plan, 2: Pledge Collateral, 3: Address, 4: OTP Authorization, 5: Success
  const [selectedAddress, setSelectedAddress] = useState(user?.savedAddresses?.[0] || null);
  const [selectedFunds, setSelectedFunds] = useState(['10928374/82', '88273619/01']);
  const [otp, setOtp] = useState(['5', '8', '2', '1']);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  if (!isCheckoutModalOpen || !checkoutProduct || !selectedEmiPlan) return null;

  const totalAmount = checkoutProduct.basePrice + (selectedVariant?.priceDelta || 0);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  // Submit final authorization
  const handleAuthorize = async () => {
    setIsProcessing(true);
    try {
      const result = await api.processOrder({
        product: checkoutProduct,
        variant: selectedVariant,
        color: selectedColor,
        emiPlan: selectedEmiPlan,
        address: selectedAddress,
        pledgedFunds: selectedFunds
      });

      setOrderConfirmation(result);
      completeOrder(result);
      setStep(5);
      triggerConfetti();
      showToast('🎉 Order confirmed successfully with 1Fi!', 'success');
    } catch (err) {
      showToast('Failed to process authorization. Try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadSchedule = () => {
    showToast('Repayment schedule PDF downloaded to your device', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Step Indicator */}
        <div className="px-5 py-4 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {step > 1 && step < 5 && (
              <button
                onClick={() => setStep(step - 1)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#4338CA]">
                {step === 5 ? 'Order Completed' : `Step ${step} of 4 • 1Fi Checkout`}
              </span>
              <h2 className="text-base font-bold text-slate-900">
                {step === 1 && 'Review Order & Repayment Schedule'}
                {step === 2 && 'Pledge Mutual Fund Holdings'}
                {step === 3 && 'Select Delivery Address'}
                {step === 4 && 'Authorize Auto-Debit via OTP'}
                {step === 5 && 'Order & Loan Confirmed!'}
              </h2>
            </div>
          </div>
          <button
            onClick={closeCheckout}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* STEP 1: REVIEW ORDER */}
          {step === 1 && (
            <div className="space-y-4">
              {/* Product Preview Card */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <img
                  src={checkoutProduct.thumbnail}
                  alt={checkoutProduct.name}
                  className="w-16 h-16 object-contain rounded-xl bg-white border border-slate-200 p-1 flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold text-[#4338CA] uppercase">
                    {checkoutProduct.brand}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 truncate">
                    {checkoutProduct.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                    <span>{selectedVariant?.name || 'Standard'}</span>
                    <span>•</span>
                    <span>{selectedColor?.name || 'Default'}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-base font-extrabold text-slate-900 block">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    0% No-Cost
                  </span>
                </div>
              </div>

              {/* EMI Payment Structure Breakdown */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
                  <span className="text-xs font-bold text-slate-800">Repayment Plan</span>
                  <span className="text-xs font-black text-[#4338CA]">
                    {selectedEmiPlan.tenureMonths} Months @ ₹{selectedEmiPlan.monthlyEmi.toLocaleString('en-IN')}/mo
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Total Product Cost:</span>
                    <span className="font-semibold text-slate-900">₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Down Payment Required:</span>
                    <span className="font-bold text-emerald-700">₹0 (Zero)</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Processing & Platform Fees:</span>
                    <span className="font-bold text-emerald-700">₹0 (Waived)</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Interest Rate:</span>
                    <span className="font-bold text-emerald-700">0.00% (Subsidized)</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-indigo-100 text-slate-900 font-bold">
                    <span>Total Repayable:</span>
                    <span className="text-sm font-black text-[#4338CA]">₹{selectedEmiPlan.totalPayable.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Mutual Fund Growth Preview */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-900 text-xs">
                <TrendingUp className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-emerald-900">Your Mutual Funds Keep Growing</span>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    By choosing 1Fi 0% EMI instead of upfront cash purchase, your pledged portfolio (~₹{selectedEmiPlan.mfCollateralRequired.toLocaleString('en-IN')}) continues compounding at historical ~14% CAGR, earning you an estimated <strong>+₹{selectedEmiPlan.estimatedPortfolioGrowth.toLocaleString('en-IN')}</strong>!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: MF COLLATERAL ALLOCATION */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600">
                Select from your verified Mutual Fund portfolio to pledge as collateral. No units are redeemed or sold.
              </div>

              <div className="space-y-2.5">
                {user?.mutualFundHoldings?.map((fund) => {
                  const isChecked = selectedFunds.includes(fund.folioNumber);

                  return (
                    <div
                      key={fund.folioNumber}
                      onClick={() => {
                        setSelectedFunds((prev) =>
                          prev.includes(fund.folioNumber)
                            ? prev.filter((f) => f !== fund.folioNumber)
                            : [...prev, fund.folioNumber]
                        );
                      }}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-indigo-50/70 border-[#4338CA] shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border mt-0.5 ${
                              isChecked
                                ? 'bg-[#4338CA] border-[#4338CA] text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-[#4338CA] uppercase">
                              {fund.amc} • {fund.category}
                            </span>
                            <h4 className="text-xs font-bold text-slate-900">{fund.schemeName}</h4>
                            <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
                              Folio: {fund.folioNumber}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-slate-900 block">
                            ₹{fund.currentValue.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700">
                            Pledgeable: ₹{fund.eligiblePledgeValue.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Pledge is digitally recorded with CAMS/KFintech under RBI & SEBI guidelines.</span>
              </div>
            </div>
          )}

          {/* STEP 3: DELIVERY ADDRESS */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600">
                Confirm your verified delivery address for doorstep express fulfillment.
              </div>

              <div className="space-y-3">
                {user?.savedAddresses?.map((addr) => {
                  const isSelected = selectedAddress?.id === addr.id;

                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddress(addr)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-indigo-50/70 border-[#4338CA] shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase">
                            {addr.type}
                          </span>
                          <span className="text-xs font-bold text-slate-900">{addr.name}</span>
                          <span className="text-xs text-slate-500">• {addr.phone}</span>
                        </div>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-[#4338CA] text-white flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {addr.line1}, {addr.city}, {addr.state} - <strong className="text-slate-900">{addr.pincode}</strong>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: OTP AUTHORIZATION */}
          {step === 4 && (
            <div className="space-y-5 text-center py-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto text-[#4338CA]">
                <Lock className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">Authorize E-Mandate & Pledge</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Enter the 4-digit security code sent to your registered mobile number <strong className="text-slate-800">+91 98765-XXXXX</strong> to activate your 0% EMI schedule.
                </p>
              </div>

              {/* OTP Input Boxes */}
              <div className="flex items-center justify-center gap-3">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[idx] = e.target.value;
                      setOtp(newOtp);
                    }}
                    className="w-12 h-14 rounded-2xl bg-slate-50 border border-slate-300 text-center text-xl font-bold text-slate-900 focus:outline-none focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-500/20"
                  />
                ))}
              </div>

              <p className="text-[11px] text-slate-400">
                Demo Auto-fill OTP: <strong className="text-[#4338CA]">5821</strong>
              </p>
            </div>
          )}

          {/* STEP 5: ORDER SUCCESS */}
          {step === 5 && orderConfirmation && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Loan Against Mutual Funds Activated
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-2">
                  Order Successfully Placed!
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Order ID: <strong className="text-slate-800 font-mono">{orderConfirmation.orderId}</strong> • Agreement: <strong className="text-slate-800 font-mono">{orderConfirmation.loanAgreementId}</strong>
                </p>
              </div>

              {/* Details Summary Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Product:</span>
                  <span className="font-bold text-slate-900">{checkoutProduct.name} ({selectedVariant?.name})</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Monthly EMI:</span>
                  <span className="font-bold text-[#4338CA]">₹{orderConfirmation.emiSchedule.monthlyAmount.toLocaleString('en-IN')} / month</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>First Auto-Debit Date:</span>
                  <span className="font-semibold text-slate-800">{orderConfirmation.emiSchedule.firstEmiDate}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Delivery:</span>
                  <span className="font-bold text-emerald-700">{orderConfirmation.estimatedDelivery}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={handleDownloadSchedule}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Download className="w-4 h-4 text-slate-500" />
                  <span>Download Schedule</span>
                </button>
                <button
                  onClick={closeCheckout}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#4338CA] hover:bg-[#3730A3] text-white text-xs font-bold shadow-sm transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Stepper Controls */}
        {step < 5 && (
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Monthly Payment</span>
              <span className="text-base font-extrabold text-[#4338CA]">
                ₹{selectedEmiPlan.monthlyEmi.toLocaleString('en-IN')}<span className="text-xs text-slate-500 font-normal">/mo</span>
              </span>
            </div>

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-3 rounded-xl bg-[#4338CA] hover:bg-[#3730A3] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                disabled={isProcessing}
                onClick={handleAuthorize}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Authorizing via CAMS...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm & Authorize 0% EMI</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
