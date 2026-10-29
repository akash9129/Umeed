import React, { useState, useEffect } from 'react';
import { X, Heart, ShieldCheck, QrCode, CheckCircle2, Copy, Download, Share2, Sparkles, CreditCard, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useDonations } from '../context/DonationContext';
import { useAuth } from '../context/AuthContext';
import { SITE_CONFIG } from '../lib/config';

export default function DonateModal() {
  const { 
    isDonateModalOpen, 
    closeDonateModal, 
    selectedCampaign, 
    modalPresetAmount, 
    basketCheckoutMode,
    getBasketItems,
    getBasketTotal,
    updateBasketQty,
    submitDonation 
  } = useDonations();

  const { user } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(null);
  const [amount, setAmount] = useState(1500);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pan, setPan] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' or 'Card'
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const basketItems = getBasketItems();
  const basketTotal = getBasketTotal();

  useEffect(() => {
    if (basketCheckoutMode) {
      setAmount(basketTotal);
    } else if (selectedCampaign?.unit_price || selectedCampaign?.unitPrice) {
      const price = selectedCampaign.unit_price || selectedCampaign.unitPrice;
      const initialQ = selectedCampaign.defaultQty || (modalPresetAmount ? Math.max(1, Math.round(modalPresetAmount / price)) : 1);
      setUnitPrice(price);
      setQuantity(initialQ);
      setAmount(price * initialQ);
    } else if (modalPresetAmount) {
      setUnitPrice(null);
      setAmount(modalPresetAmount);
      setQuantity(1);
    } else {
      setUnitPrice(null);
      setAmount(1500);
      setQuantity(1);
    }

    if (user) {
      if (user.name) setName(user.name);
      if (user.email) setEmail(user.email);
    }
  }, [modalPresetAmount, selectedCampaign, basketCheckoutMode, basketTotal, user]);

  if (!isDonateModalOpen) return null;

  const handleQtyChange = (newQty) => {
    const q = Math.max(1, newQty);
    setQuantity(q);
    if (unitPrice) {
      setAmount(q * unitPrice);
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(SITE_CONFIG.org.bankDetails.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !amount) {
      alert("Please provide Name, Phone and Amount");
      return;
    }

    setIsSubmitting(true);
    try {
      let campaignTitleText = 'General Foundation Fund';
      if (basketCheckoutMode) {
        campaignTitleText = `Seva Basket: ${basketItems.map(i => `${i.quantity}x ${i.unitTitle}`).join(' + ')}`;
      } else if (selectedCampaign) {
        campaignTitleText = unitPrice 
          ? `${quantity}x ${selectedCampaign.unitTitle || selectedCampaign.title} (₹${amount})` 
          : selectedCampaign.title;
      }

      const res = await submitDonation({
        name,
        email: email || `${phone}@donor.umeedkikiran.org`,
        phone,
        pan,
        amount: Number(amount),
        campaignTitle: campaignTitleText,
        campaignId: selectedCampaign ? selectedCampaign.id : null,
        paymentMethod: paymentMethod === 'UPI' ? 'Instant UPI QR' : 'Online Payment (Razorpay)'
      });
      setReceiptData(res);
    } catch (err) {
      alert("Failed to record donation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setReceiptData(null);
    closeDonateModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-umeed-blue-900 via-blue-900 to-umeed-blue-800 text-white p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 text-slate-300 hover:text-white p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-umeed-gold-400 bg-white p-0.5 flex-shrink-0">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <span className="text-[11px] uppercase font-extrabold tracking-wider text-umeed-gold-400 block">
                Umeed Ki Kiran Foundation • PAN: {SITE_CONFIG.org.pan}
              </span>
              <h2 className="text-base sm:text-lg font-bold leading-snug">
                {basketCheckoutMode 
                  ? "Sponsoring Your Umeed Seva Basket" 
                  : (selectedCampaign ? selectedCampaign.title : "Spreading Joy & Hope in Varanasi")}
              </h2>
            </div>
          </div>
        </div>

        {/* If Donation Successful -> Show Printable Receipt */}
        {receiptData ? (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Donation Successful!
              </span>
              <h3 className="text-2xl font-bold text-slate-800">
                Thank You, {receiptData.donor_name}!
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                Your kind contribution brings immediate nourishment and supplies to innocent lives in Varanasi.
              </p>
            </div>

            {/* Official Tax Exemption Receipt Card */}
            <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-5 text-left text-xs space-y-2.5">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <div>
                  <p className="font-bold text-umeed-blue-900 text-sm">Umeed Ki Kiran Foundation (Trust)</p>
                  <p className="text-[11px] text-slate-500">Trust PAN: {SITE_CONFIG.org.pan}</p>
                </div>
                <div className="text-right">
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                    Receipt #{receiptData.id}
                  </span>
                  <p className="text-[10px] text-slate-400">{receiptData.created_at}</p>
                </div>
              </div>

              <div className="space-y-1.5 py-1 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Donor Name:</span>
                  <span className="font-semibold text-slate-900">{receiptData.donor_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount Donated:</span>
                  <span className="font-bold text-emerald-700 text-sm">₹{receiptData.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Cause / Seva Details:</span>
                  <span className="font-medium text-slate-900 text-right max-w-xs">{receiptData.campaign_title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Donor PAN:</span>
                  <span className="font-mono">{receiptData.donor_pan || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Mode:</span>
                  <span>{receiptData.payment_method}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-500 flex items-center justify-between">
                <span>Verified Non-Profit Trust • Varanasi, India</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Tax Compliant
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 text-white font-semibold py-3 px-4 rounded-xl text-xs hover:bg-slate-800 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Print / Save Receipt</span>
              </button>
              <a
                href={`https://wa.me/?text=I%20just%20supported%20Umeed%20Ki%20Kiran%20Foundation%20with%20%E2%82%B9${receiptData.amount}!%20Join%20me%20in%20spreading%20hope%20at%20${encodeURIComponent(window.location.origin)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-3 px-4 rounded-xl text-xs hover:bg-emerald-500 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share on WhatsApp</span>
              </a>
            </div>

            <button
              onClick={handleClose}
              className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
            >
              Done & Return to Website
            </button>
          </div>
        ) : (
          /* Donation Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Basket Mode: List all items in basket */}
            {basketCheckoutMode ? (
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                  <span className="text-xs font-bold text-umeed-blue-900 uppercase flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-umeed-gold-600" /> Selected Seva Items
                  </span>
                  <span className="text-xs font-bold text-emerald-800">
                    Total: ₹{basketTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {basketItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs bg-white p-2 rounded-xl border border-amber-100">
                      <div>
                        <span className="font-bold text-slate-800">{item.unitTitle}</span>
                        <span className="text-slate-500 text-[11px] block">₹{item.unitPrice} each</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-slate-200 rounded-lg">
                          <button
                            type="button"
                            onClick={() => updateBasketQty(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-slate-500 hover:bg-slate-100"
                          >
                            -
                          </button>
                          <span className="w-7 text-center font-bold text-[11px]">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateBasketQty(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-slate-500 hover:bg-slate-100"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-bold text-emerald-700 w-16 text-right">
                          ₹{item.totalCost.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : unitPrice ? (
              /* Single unit package */
              <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide">
                      Unit Price: ₹{unitPrice} {selectedCampaign?.unitLabel || 'each'}
                    </span>
                    <p className="text-sm font-bold text-umeed-blue-900">
                      Select Quantity of {selectedCampaign?.unitTitle || 'Units'}:
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Total Contribution</span>
                    <p className="text-xl font-extrabold text-emerald-700">₹{amount.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                {/* Counter Control */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-amber-300 rounded-xl bg-white overflow-hidden shadow-sm">
                    <button
                      type="button"
                      onClick={() => handleQtyChange(quantity - 1)}
                      className="px-3.5 py-2 text-slate-600 hover:bg-amber-100 font-bold transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => handleQtyChange(Number(e.target.value))}
                      className="w-16 text-center font-extrabold text-base text-slate-900 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleQtyChange(quantity + 1)}
                      className="px-3.5 py-2 text-slate-600 hover:bg-amber-100 font-bold transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Multipliers */}
                  <div className="flex flex-wrap gap-1.5 flex-1">
                    {[5, 10, 20, 50].map((presetQty) => (
                      <button
                        key={presetQty}
                        type="button"
                        onClick={() => handleQtyChange(presetQty)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          quantity === presetQty
                            ? 'bg-umeed-blue-900 text-white'
                            : 'bg-white border border-amber-300 text-amber-900 hover:bg-amber-100'
                        }`}
                      >
                        {presetQty} {selectedCampaign?.unitTitle ? `${presetQty}x` : ''}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Custom or preset amounts */
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Choose Donation Amount (INR)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                  {[
                    { val: 500, label: "₹500", desc: "10 Edu Kits" },
                    { val: 1000, label: "₹1,000", desc: "1 Mo. Tuition" },
                    { val: 2500, label: "₹2,500", desc: "School Bags" },
                    { val: 10000, label: "₹10,000", desc: "25 Kids Feast" },
                  ].map((p) => (
                    <button
                      key={p.val}
                      type="button"
                      onClick={() => setAmount(p.val)}
                      className={`py-3 px-2 rounded-xl text-center border-2 transition-all ${
                        amount === p.val
                          ? 'border-umeed-gold-500 bg-amber-50 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <span className="block text-base font-extrabold text-umeed-blue-900">{p.label}</span>
                      <span className="block text-[10px] text-slate-500">{p.desc}</span>
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center font-bold text-slate-500 text-base">₹</span>
                  <input
                    type="number"
                    min="10"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Enter custom amount"
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-umeed-gold-500 font-bold text-slate-800 text-sm"
                    required
                  />
                </div>
              </div>
            )}

            {/* Donor Personal Information */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Donor Details (For 80G Tax Exemption Receipt)
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name *"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-umeed-gold-500 text-xs text-slate-800"
                  required
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="WhatsApp Mobile Number *"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-umeed-gold-500 text-xs text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address (for receipt)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-umeed-gold-500 text-xs text-slate-800"
                />
                <input
                  type="text"
                  value={pan}
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                  placeholder="PAN Number (optional, for 80G)"
                  maxLength="10"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-umeed-gold-500 text-xs font-mono uppercase text-slate-800"
                />
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div>
              <div className="flex rounded-xl bg-slate-100 p-1 mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                    paymentMethod === 'UPI' ? 'bg-white shadow text-emerald-700' : 'text-slate-600'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-emerald-600" />
                  <span>Instant UPI QR (GPay / PhonePe)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                    paymentMethod === 'Card' ? 'bg-white shadow text-umeed-blue-900' : 'text-slate-600'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-umeed-blue-700" />
                  <span>Card / NetBanking</span>
                </button>
              </div>

              {/* UPI Tab Display */}
              {paymentMethod === 'UPI' && (
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className="w-28 h-28 bg-white p-2 rounded-xl shadow-sm border border-emerald-100 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=${SITE_CONFIG.org.bankDetails.upiId}%26pn=${encodeURIComponent(SITE_CONFIG.org.name)}%26am=${amount}%26cu=INR`} 
                      alt="UPI QR Code" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
                      Scan with any UPI App
                    </span>
                    <p className="text-xs text-slate-600">
                      GPay, PhonePe, Paytm, or BHIM. Amount: <span className="font-bold text-emerald-700">₹{amount}</span>
                    </p>
                    <div className="flex items-center gap-2 pt-1 justify-center sm:justify-start">
                      <span className="font-mono text-xs font-bold bg-white px-2.5 py-1 rounded border border-emerald-200 text-emerald-900">
                        {SITE_CONFIG.org.bankDetails.upiId}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 bg-emerald-100/80 px-2 py-1 rounded transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedUpi ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Card Tab Display */}
              {paymentMethod === 'Card' && (
                <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 text-xs text-slate-600 flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">Secure 256-bit Encrypted Checkout</p>
                    <p className="text-[11px] text-slate-500">Supports all major Credit/Debit Cards, NetBanking, and Wallets with 80G tax receipt.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-umeed-gold-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-base shadow-lg hover:shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>{isSubmitting ? 'Processing Contribution...' : `Confirm & Donate ₹${Number(amount || 0).toLocaleString('en-IN')}`}</span>
            </button>

            <div className="text-center flex items-center justify-center gap-4 text-[11px] text-slate-500">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Secure & Verified
              </span>
              <span>•</span>
              <span>Instant Tax Receipt</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
