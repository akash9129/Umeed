import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Heart, 
  Calendar, 
  Upload, 
  Video, 
  Music, 
  Gift, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  QrCode,
  Copy,
  Check,
  Sparkles,
  Info,
  Clock,
  Download,
  Printer
} from 'lucide-react';
import { useDonations } from '../context/DonationContext';
import { SITE_CONFIG } from '../lib/config';
import confetti from 'canvas-confetti';

export default function Checkout() {
  const navigate = useNavigate();
  const { 
    basket, 
    updateBasketQty, 
    removeFromBasket, 
    getBasketItems, 
    getBasketTotal, 
    clearBasket,
    addDonation 
  } = useDonations();

  // Step 1: Cart & Customization | Step 2: Personal Details & Payment | Step 3: Success Receipt
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [printedName, setPrintedName] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [videoMessage, setVideoMessage] = useState('');
  
  // Platform Support Tip
  const [platformFeePercent, setPlatformFeePercent] = useState(10); // 0, 5, 10, 15, 20

  // Special Add-ons
  const [addonVideo, setAddonVideo] = useState(true); // 50-sec edited video (₹200)
  const [addonSong, setAddonSong] = useState(false);  // Custom song in your language (₹500)

  // Special Requests
  const [isGift, setIsGift] = useState(false);
  const [otherRequest, setOtherRequest] = useState(false);
  const [otherRequestNote, setOtherRequestNote] = useState('');

  // Step 2: Donor Personal Details
  const [donorDetails, setDonorDetails] = useState({
    fullName: '',
    phone: '',
    email: '',
    panNumber: '',
    address: '',
    city: 'Varanasi',
    state: 'Uttar Pradesh'
  });

  const [paymentDone, setPaymentDone] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const cartItems = getBasketItems();
  const rawSubtotal = getBasketTotal();

  // Calculations
  const platformFee = Math.round((rawSubtotal * platformFeePercent) / 100);
  const addonsTotal = (addonVideo ? 200 : 0) + (addonSong ? 500 : 0);
  const totalAmount = rawSubtotal + platformFee + addonsTotal;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(SITE_CONFIG.org.bankDetails.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedPhoto(file.name);
    }
  };

  const handleProceedToStep2 = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your Seva Basket is empty. Please select at least one cause kit.");
      return;
    }
    if (!isAnonymous && !printedName.trim()) {
      alert("Please enter the name to be printed on the banner, or select 'Make donation anonymous'.");
      return;
    }
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalPaymentComplete = () => {
    // Generate Receipt
    const receiptNo = `UKK-${Date.now().toString().slice(-6)}`;
    const newDonation = {
      receiptNo,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      amount: totalAmount,
      items: cartItems,
      donor: isAnonymous ? { fullName: 'Anonymous Donor' } : donorDetails,
      printedName: isAnonymous ? 'Anonymous' : printedName,
      deliveryDate,
      videoMessage,
      platformFee,
      addonsTotal
    };

    setReceiptData(newDonation);
    setCurrentStep(3);
    clearBasket();

    // Trigger celebratory confetti
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-emerald-500 selection:text-white pb-24">
      
      {/* =========================================================================
          TOP STEPPER INDICATOR (01 Cart & customization -> 02 Personal Details)
          ========================================================================= */}
      <div className="bg-rose-50/70 border-b border-rose-100/80 py-4 px-4 sticky top-20 z-30 backdrop-blur-md">
        <div className="max-w-xl mx-auto flex items-center justify-center gap-4 sm:gap-8 text-xs font-bold">
          
          {/* Step 1 */}
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shadow-xs ${
              currentStep === 1 
                ? 'bg-amber-500 text-white' 
                : currentStep > 1 
                ? 'bg-emerald-500 text-white' 
                : 'bg-slate-200 text-slate-600'
            }`}>
              {currentStep > 1 ? '✓' : '01'}
            </span>
            <span className={currentStep === 1 ? 'text-slate-900 font-extrabold' : 'text-slate-600'}>
              Cart & customization
            </span>
          </div>

          {/* Dotted Divider */}
          <div className="w-12 sm:w-16 border-t-2 border-dotted border-amber-300"></div>

          {/* Step 2 */}
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shadow-xs ${
              currentStep === 2 
                ? 'bg-amber-500 text-white' 
                : currentStep === 3 
                ? 'bg-emerald-500 text-white' 
                : 'bg-slate-200 text-slate-500'
            }`}>
              {currentStep === 3 ? '✓' : '02'}
            </span>
            <span className={currentStep === 2 ? 'text-slate-900 font-extrabold' : 'text-slate-500'}>
              Personal Details & Payment
            </span>
          </div>

        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 space-y-8">

        {/* =========================================================================
            STEP 1: CART & CUSTOMIZATION (EXACT IHSKAS / GIDEA STYLE)
            ========================================================================= */}
        {currentStep === 1 && (
          <form onSubmit={handleProceedToStep2} className="space-y-6">

            {/* 1. YOUR CART SECTION */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-4">
              <div>
                <h2 className="text-lg font-black text-slate-900">Your Cart</h2>
                <p className="text-xs text-slate-500">Review your donations and add-ons</p>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-sm font-bold text-slate-600">Your Seva Basket is currently empty.</p>
                  <Link
                    to="/causes"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 underline"
                  >
                    <span>Browse 10 Verified Seva Kits</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3 divide-y divide-slate-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                      
                      <div className="flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-14 h-14 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                        />
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                            {item.unitTitle}
                          </h4>
                          <span className="text-xs font-extrabold text-rose-600 block mt-0.5">
                            ₹{item.unitPrice}
                          </span>

                          {/* Stepper */}
                          <div className="inline-flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5 gap-1.5 mt-1.5">
                            <button
                              type="button"
                              onClick={() => updateBasketQty(item.id, Math.max(1, item.quantity - 1))}
                              className="w-5 h-5 rounded bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-5 text-center text-xs font-black text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateBasketQty(item.id, item.quantity + 1)}
                              className="w-5 h-5 rounded bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right: Subtotal & Delete */}
                      <div className="text-right flex items-center gap-3">
                        <span className="text-sm font-black text-slate-900">
                          ₹{item.totalCost.toLocaleString('en-IN')}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromBasket(item.id)}
                          className="text-slate-300 hover:text-rose-500 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}

                  {/* Subtotal Pill Box */}
                  <div className="pt-4">
                    <div className="bg-rose-50/70 border border-rose-100 rounded-2xl p-3 flex items-center justify-between text-xs sm:text-sm font-black text-slate-900">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center text-xs">
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </span>
                        <span>Subtotal ({cartItems.length} items)</span>
                      </div>
                      <span className="text-base text-rose-700">₹{rawSubtotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* 2. MAKE IT ANONYMOUS TOGGLE */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-black">Make it Anonymous?</h3>
              </div>
              <p className="text-xs text-slate-500">
                Donate anonymously and keep your personal details completely private.
              </p>

              <label className="flex items-start justify-between gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer hover:bg-slate-100/60 transition-colors">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Make my donation anonymous
                    </span>
                    <span className="text-[11px] text-slate-500 leading-tight block">
                      Skip all customisations. We will process your donation on-ground without name, wishes, or special requests.
                    </span>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 mt-1 cursor-pointer"
                />
              </label>
            </div>

            {/* 3. CUSTOMIZE YOUR DONATION (VISIBLE IF NOT ANONYMOUS) */}
            {!isAnonymous && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-amber-700">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <h3 className="text-sm font-black text-slate-900">Customize Your Donation</h3>
                </div>
                <p className="text-xs text-slate-500">
                  Add your details to make your donation personal and printed on ground banner.
                </p>

                {/* Name to be printed */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <span>Name to be printed</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required={!isAnonymous}
                    value={printedName}
                    onChange={(e) => setPrintedName(e.target.value)}
                    placeholder="Enter name to be printed on banner / parcel"
                    className="w-full text-xs p-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Delivery Date */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <span>Delivery Date</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full text-xs p-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Attach picture on parcel (Optional) */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Attach picture on parcel (Optional)
                  </label>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center space-y-2 bg-slate-50">
                    <Upload className="w-5 h-5 text-rose-500 mx-auto" />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">
                        {uploadedPhoto ? `Selected: ${uploadedPhoto}` : "Upload a photo for the banner"}
                      </span>
                      <span className="text-[11px] text-slate-400">JPG, PNG, HEIC up to 5MB</span>
                    </div>
                    <div>
                      <label className="inline-block cursor-pointer bg-rose-50 text-rose-600 border border-rose-200 font-bold text-xs px-4 py-1.5 rounded-full hover:bg-rose-100 transition-colors">
                        <span>Choose File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Video Wishes */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Need a video wishes? (Optional)
                  </label>
                  <div className="relative">
                    <textarea
                      maxLength={80}
                      rows={2}
                      value={videoMessage}
                      onChange={(e) => setVideoMessage(e.target.value)}
                      placeholder="Enter video message / blessings for the kids..."
                      className="w-full text-xs p-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    ></textarea>
                    <span className="absolute bottom-2.5 right-3 text-[10px] text-slate-400 font-medium">
                      {videoMessage.length}/80
                    </span>
                  </div>
                </div>

                {/* Note Callout */}
                <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
                  <Clock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>
                    The updates and WhatsApp video will be available by <strong>8:00 PM</strong> on the scheduled distribution date.
                  </span>
                </div>

              </div>
            )}

            {/* 4. DEAR DONOR (OPTIONAL PLATFORM TIP / SUPPORT) */}
            <div className="bg-amber-50/50 rounded-3xl p-5 sm:p-6 border border-amber-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-amber-800">
                <Heart className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-black">Dear Donor,</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                To cover essential costs like transaction fees, website upkeep, and local volunteer wages, we invite a small optional contribution (5%, 10%, or 20%). We make zero profit from your donation. Even 5% helps immensely.
              </p>

              <div className="flex items-center justify-between pt-1">
                <select
                  value={platformFeePercent}
                  onChange={(e) => setPlatformFeePercent(Number(e.target.value))}
                  className="bg-white border border-amber-300 text-xs font-bold rounded-xl px-3 py-2 text-slate-800 focus:outline-none"
                >
                  <option value={0}>0% (No tip)</option>
                  <option value={5}>5% (Modest support)</option>
                  <option value={10}>10% (Most donors choose this)</option>
                  <option value={15}>15% (Generous support)</option>
                  <option value={20}>20% (Champion support)</option>
                </select>

                <span className="text-xs font-bold text-slate-700">
                  Platform Fee: <strong className="text-slate-900 font-black">₹{platformFee}</strong>
                </span>
              </div>
            </div>

            {/* 5. SPECIAL ADD-ONS */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Special Add-ons</span>
                </h3>
                <p className="text-xs text-slate-500">Enhance your donation experience</p>
              </div>

              <div className="space-y-2.5">
                {/* 50-sec Edited Video */}
                <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-slate-100/60 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">50-sec Edited Video</span>
                      <span className="text-[11px] text-slate-500 block">Get a 50-sec edited video of your donation</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-rose-600">₹200</span>
                    <input
                      type="checkbox"
                      checked={addonVideo}
                      onChange={(e) => setAddonVideo(e.target.checked)}
                      className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                    />
                  </div>
                </label>

                {/* Custom Song */}
                <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-slate-100/60 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                      <Music className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Custom Song in Your Language</span>
                      <span className="text-[11px] text-slate-500 block">Custom prayer song crafted from your story</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-purple-600">₹500</span>
                    <input
                      type="checkbox"
                      checked={addonSong}
                      onChange={(e) => setAddonSong(e.target.checked)}
                      className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* 6. ANY SPECIAL REQUEST? */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-orange-500" />
                  <span>Any Special Request?</span>
                </h3>
                <p className="text-xs text-slate-500">We will try our best to consider them on ground</p>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isGift}
                    onChange={(e) => setIsGift(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600"
                  />
                  <span>Is this a gift or on behalf of someone else?</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={otherRequest}
                    onChange={(e) => setOtherRequest(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600"
                  />
                  <span>Any Other Request?</span>
                </label>

                {otherRequest && (
                  <textarea
                    rows={2}
                    value={otherRequestNote}
                    onChange={(e) => setOtherRequestNote(e.target.value)}
                    placeholder="Enter your special dietary or distribution note..."
                    className="w-full text-xs p-3 rounded-2xl border border-slate-200 mt-2"
                  ></textarea>
                )}
              </div>
            </div>

            {/* 7. FIXED BOTTOM / NEXT CTA BAR */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-lg flex items-center justify-between gap-4 sticky bottom-4 z-20">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Total Donation Amount
                </span>
                <span className="text-xl sm:text-2xl font-black text-slate-900">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="submit"
                disabled={cartItems.length === 0}
                className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-black text-sm px-8 py-3.5 rounded-2xl shadow-md transition-all active:scale-95 disabled:opacity-50"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

        {/* =========================================================================
            STEP 2: PERSONAL DETAILS & PAYMENT (DIRECT UPI QR)
            ========================================================================= */}
        {currentStep === 2 && (
          <div className="space-y-6">
            
            <button
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Cart & Customization</span>
            </button>

            {/* Personal Details Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-slate-900">
                Personal Details for 80G Tax Receipt
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={donorDetails.fullName}
                    onChange={(e) => setDonorDetails({ ...donorDetails, fullName: e.target.value })}
                    placeholder="Your legal name"
                    className="w-full text-xs p-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">WhatsApp Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={donorDetails.phone}
                    onChange={(e) => setDonorDetails({ ...donorDetails, phone: e.target.value })}
                    placeholder="+91 Mobile for video proof"
                    className="w-full text-xs p-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={donorDetails.email}
                    onChange={(e) => setDonorDetails({ ...donorDetails, email: e.target.value })}
                    placeholder="For receipt & updates"
                    className="w-full text-xs p-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">PAN Number (For 80G Tax Exemption)</label>
                  <input
                    type="text"
                    value={donorDetails.panNumber}
                    onChange={(e) => setDonorDetails({ ...donorDetails, panNumber: e.target.value.toUpperCase() })}
                    placeholder="e.g. ABCDE1234F"
                    className="w-full text-xs p-3 rounded-2xl border border-slate-200 uppercase font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Instant Payment via UPI QR */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-black uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Instant Direct UPI Payment • Zero Gateway Fee
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Scan & Pay ₹{totalAmount.toLocaleString('en-IN')}
                </h3>
                <p className="text-xs text-slate-500">
                  Open GPay, PhonePe, Paytm, or BHIM and scan the QR code below
                </p>
              </div>

              {/* QR Code Container */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-56 h-56 bg-white p-3 rounded-3xl shadow-md border-2 border-slate-200 flex items-center justify-center">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${SITE_CONFIG.org.bankDetails.upiId}%26pn=Umeed%20Ki%20Kiran%20Foundation%26am=${totalAmount}%26cu=INR`}
                    alt="UPI QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <code className="text-xs font-mono font-black bg-slate-100 px-3 py-2 rounded-xl text-slate-900">
                    {SITE_CONFIG.org.bankDetails.upiId}
                  </code>
                  <button
                    onClick={handleCopyUpi}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    {copiedUpi ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Complete Payment Button */}
              <div className="pt-4 text-center">
                <button
                  onClick={handleFinalPaymentComplete}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm px-10 py-4 rounded-2xl shadow-xl shadow-emerald-600/30 transition-all active:scale-95"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>I Have Completed Payment of ₹{totalAmount.toLocaleString('en-IN')}</span>
                </button>
                <p className="text-[11px] text-slate-400 mt-2">
                  Click after paying to immediately generate your 80G Tax Exemption Receipt.
                </p>
              </div>

            </div>

          </div>
        )}

        {/* =========================================================================
            STEP 3: SUCCESS & 80G RECEIPT
            ========================================================================= */}
        {currentStep === 3 && receiptData && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6 text-center">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Thank You for Sponsoring Smiles in Varanasi!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Your contribution has been successfully confirmed. Receipt #{receiptData.receiptNo}
              </p>
            </div>

            {/* Summary Box */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs space-y-2 max-w-lg mx-auto">
              <div className="flex justify-between border-b border-slate-200 pb-2 font-bold">
                <span className="text-slate-500">Scheduled Date:</span>
                <span className="text-slate-900">{receiptData.deliveryDate}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2 font-bold">
                <span className="text-slate-500">Name on Banner:</span>
                <span className="text-slate-900">{receiptData.printedName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2 font-bold">
                <span className="text-slate-500">Total Contribution:</span>
                <span className="text-emerald-700 font-black text-sm">₹{receiptData.amount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-bold pt-1">
                <span className="text-slate-500">Video Proof Delivery:</span>
                <span className="text-slate-900">WhatsApp by 8:00 PM</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Receipt</span>
              </button>

              <Link
                to="/"
                className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
              >
                <span>Return to Home</span>
              </Link>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
