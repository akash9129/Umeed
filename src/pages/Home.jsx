import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Gift, 
  Users, 
  Utensils, 
  GraduationCap, 
  Stethoscope, 
  CheckCircle, 
  Award,
  Plus,
  Minus,
  CheckCircle2,
  Package,
  ShoppingBag,
  QrCode,
  MapPin,
  ExternalLink,
  Star,
  ChevronLeft,
  ChevronRight,
  Clock,
  Video,
  Copy,
  Check,
  Calendar,
  Share2,
  TrendingUp,
  Zap,
  Smile,
  X,
  Bell
} from 'lucide-react';
import { useDonations } from '../context/DonationContext';
import { SITE_CONFIG } from '../lib/config';

export default function Home() {
  const { 
    basket, 
    updateBasketQty, 
    addToBasket, 
    openDonateModal, 
    getBasketTotal,
    getBasketCount 
  } = useDonations();

  // Multi-Slide Impact Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Impact Calculator / Seva Simulator State
  const [calcAmount, setCalcAmount] = useState(500);

  // Selected plan for restaurant feast in catalog (Normal or Grand)
  const [homeFeastPlan, setHomeFeastPlan] = useState('normal'); // 'normal' | 'grand'

  // Live Social Proof Notification Ticker (Givea style)
  const [toastIndex, setToastIndex] = useState(0);
  const [showToast, setShowToast] = useState(true);

  const socialProofList = [
    { name: "Rohit K.", city: "Varanasi", cause: "10 Education Kits", time: "2 mins ago", amount: "₹500" },
    { name: "Ananya S.", city: "Delhi", cause: "25 THALI Meals", time: "5 mins ago", amount: "₹2,000" },
    { name: "Vikram P.", city: "Mumbai", cause: "Birthday Restaurant Feast (25 Kids)", time: "11 mins ago", amount: "₹10,000" },
    { name: "Dr. Alok M.", city: "Lucknow", cause: "Gau Seva (Green Fodder)", time: "18 mins ago", amount: "₹1,000" },
    { name: "Meera D.", city: "Bengaluru", cause: "Stray Dog Feeding", time: "24 mins ago", amount: "₹200" }
  ];

  useEffect(() => {
    const toastInterval = setInterval(() => {
      setShowToast(false);
      setTimeout(() => {
        setToastIndex((prev) => (prev + 1) % socialProofList.length);
        setShowToast(true);
      }, 600);
    }, 7000);
    return () => clearInterval(toastInterval);
  }, [socialProofList.length]);

  // Full-Width Cinematic Hero Slides with Vibrant Photography
  const heroSlides = [
    {
      id: 1,
      badge: "शिक्षा का प्रकाश • CHILD EDUCATION",
      title: "शिक्षा ही उम्मीद की सबसे बड़ी किरण है",
      highlightTitle: "मात्र ₹50 में बदलें एक बच्चे की दुनिया",
      subtitle: "वाराणसी की कच्ची बस्तियों में हर बच्चे को कॉपी, पेंसिल, रबर और स्कूल स्टेशनरी किट मिले।",
      description: "Just ₹50 provides a complete educational stationery kit to a child who dreams of going to school.",
      image: "/images/child_education.jpg",
      tag: "₹50 / child",
      actionText: "Sponsor Education Kit (₹50)",
      actionPkg: SITE_CONFIG.causePackages[0],
      statText: "1,200+ Kits Distributed in Varanasi"
    },
    {
      id: 2,
      badge: "अन्नपूर्णा थाली • HUNGER RELIEF",
      title: "काशी की पावन धरती पर कोई भूखा न सोए",
      highlightTitle: "मात्र ₹80 में एक भरपेट पौष्टिक थाली",
      subtitle: "अस्पतालों, घाटों और बस्तियों में जरूरतमंद बुजुर्गों व बच्चों को सम्मानपूर्वक भरपेट गर्म भोजन।",
      description: "Steaming hot meal with rice, rotis, dal, and fresh seasonal sabzi delivered with dignity.",
      image: "/images/elderly_meal.jpg",
      tag: "₹80 / thali",
      actionText: "Sponsor THALI Meal (₹80)",
      actionPkg: SITE_CONFIG.causePackages[9],
      statText: "50,000+ Warm Meals Served"
    },
    {
      id: 3,
      badge: "विशेष उत्सव भोजन • RESTAURANT FEAST",
      title: "अपना जन्मदिन या सालगिरह मनाएं 25 से 60 बच्चों के साथ",
      highlightTitle: "रेस्टोरेंट में तैयार स्वादिष्ट भोजन व केक कटिंग",
      subtitle: "बच्चों के हाथ में आपके नाम का बैनर और वीडियो आशीर्वाद सीधा आपके व्हाट्सएप पर।",
      description: "Celebrate milestones with 25 kids (₹10,000) or 60 kids (₹20,000) with personalized video proof.",
      image: "/images/restaurant_feast.jpg",
      tag: "₹10,000 / ₹20,000",
      actionText: "Book Restaurant Feast",
      actionPkg: SITE_CONFIG.causePackages[7],
      statText: "100% Guaranteed WhatsApp Video"
    },
    {
      id: 4,
      badge: "जीव दया एवं गौ सेवा • ANIMAL WELFARE",
      title: "बेज़ुबानों की सेवा ही ईश्वर की सबसे पवित्र पूजा है",
      highlightTitle: "सड़क के श्वानों को भोजन व गौमाता को हरी घास",
      subtitle: "सड़क के भूखे कुत्तों को मात्र ₹20 में आहार और पवित्र गौमाता को ₹200 में पौष्टिक चारा।",
      description: "Daily feeding drive for street dogs and sacred cows across Varanasi with clean water and fresh fodder.",
      image: "/images/animal_gau_seva.jpg",
      tag: "₹20 / ₹200",
      actionText: "Sponsor Animal Feeding (₹20)",
      actionPkg: SITE_CONFIG.causePackages[2],
      statText: "Daily Feeding Rounds in Varanasi"
    }
  ];

  // Auto slide timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  // Category filter state for the 10 core features
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All 10 Seva Kits' },
    { id: 'education', label: '🎒 Child Education (₹50, ₹300, ₹1k)' },
    { id: 'meals', label: '🍲 Food & Feasts (₹25, ₹80, ₹10k, ₹20k)' },
    { id: 'animals', label: '🐾 Animals & Cows (₹20, ₹200)' },
    { id: 'healthcare', label: '🏥 Healthcare & Hygiene (₹80, ₹149)' },
  ];

  const getFilteredKits = () => {
    if (activeCategory === 'all') return SITE_CONFIG.causePackages;
    if (activeCategory === 'education') {
      return SITE_CONFIG.causePackages.filter(p => 
        p.id === 'pkg-edu-kit' || p.id === 'pkg-school-bag' || p.id === 'pkg-tuition'
      );
    }
    if (activeCategory === 'meals') {
      return SITE_CONFIG.causePackages.filter(p => 
        p.id === 'pkg-food-packet' || p.id === 'pkg-thali' || p.id === 'pkg-restaurant-feast'
      );
    }
    if (activeCategory === 'animals') {
      return SITE_CONFIG.causePackages.filter(p => 
        p.id === 'pkg-dog-food' || p.id === 'pkg-cow-food'
      );
    }
    if (activeCategory === 'healthcare') {
      return SITE_CONFIG.causePackages.filter(p => 
        p.id === 'pkg-sanitary-pad' || p.id === 'pkg-medicine-kit'
      );
    }
    return SITE_CONFIG.causePackages;
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(SITE_CONFIG.org.bankDetails.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleInstantSponsor = (pkg) => {
    if (pkg.id === 'pkg-restaurant-feast') {
      const price = homeFeastPlan === 'normal' ? 10000 : 20000;
      const title = homeFeastPlan === 'normal' 
        ? "Restaurant Feast — Normal Plan (25 Children)" 
        : "Restaurant Feast — Grand Plan (60 Children)";
      openDonateModal({
        ...pkg,
        unitTitle: title,
        unitPrice: price,
        defaultQty: 1
      }, price);
      return;
    }

    const qty = basket[pkg.id] || pkg.defaultQty || 1;
    openDonateModal({
      ...pkg,
      defaultQty: qty,
      unit_price: pkg.unitPrice,
      unitTitle: pkg.unitTitle
    }, pkg.unitPrice * qty);
  };

  const activeSlideData = heroSlides[currentSlide];
  const currentToast = socialProofList[toastIndex];

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-800 font-sans selection:bg-rose-500 selection:text-white relative">

      {/* =========================================================================
          GIVEA-STYLE REAL-TIME SOCIAL PROOF TOAST (BOTTOM-LEFT)
          ========================================================================= */}
      {showToast && (
        <aside 
          aria-label="Recent donation update"
          className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-rose-100 animate-slideUp max-w-sm"
        >
          <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <div className="text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <span>{currentToast.name} ({currentToast.city})</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <span className="text-rose-600 font-extrabold">{currentToast.amount}</span>
            </div>
            <p className="text-slate-500 text-[11px] font-medium truncate max-w-[200px]">
              Sponsored: {currentToast.cause}
            </p>
            <span className="text-[10px] text-slate-400 font-semibold">{currentToast.time}</span>
          </div>
          <button 
            onClick={() => setShowToast(false)} 
            className="text-slate-400 hover:text-slate-600 p-1 ml-auto"
            title="Dismiss notification"
            aria-label="Dismiss donation notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </aside>
      )}

      {/* =========================================================================
          CHAPTER 1: POWERFUL SPLIT HERO (HIGH-CONTRAST VIBRANT RED ACCENTS)
          100% visible bold headline, real-time video guarantee, and interactive showcase
          ========================================================================= */}
      <section className="relative pt-6 pb-16 lg:pt-12 lg:pb-20 bg-gradient-to-b from-red-50/70 via-rose-50/30 to-white border-b border-red-100 overflow-hidden">
        
        {/* Soft creative ambient red & warm light orbs */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-200/25 rounded-full blur-3xl pointer-events-none -z-0"></div>
        <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-rose-200/20 rounded-full blur-3xl pointer-events-none -z-0"></div>
        <div className="absolute -bottom-10 right-10 w-[300px] h-[300px] bg-amber-100/30 rounded-full blur-2xl pointer-events-none -z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Trust Notification Badge with Red Glow */}
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md border-2 border-red-200/90 text-red-950 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-md shadow-red-500/5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
              </span>
              <span className="font-extrabold text-red-600 tracking-wide uppercase text-[11px] sm:text-xs">Live On-Ground Seva</span>
              <span className="text-red-300">|</span>
              <span className="font-semibold text-slate-800">100% Guaranteed WhatsApp Video Proof by 8:00 PM</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: CRISP, COMPELLING HEADLINE & ACTIONS */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 bg-red-100/80 border border-red-200 text-red-800 text-xs uppercase tracking-widest font-black px-3.5 py-1 rounded-lg">
                  <Heart className="w-3.5 h-3.5 fill-red-600 text-red-600" />
                  <span>Varanasi's Verified Public Trust • PAN: {SITE_CONFIG.org.pan}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black text-slate-900 leading-[1.14] tracking-tight">
                  हर जरूरतमंद चेहरे पर लाएँ <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-red-700">
                    मुस्कान व उम्मीद की किरण
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Choose from <strong className="text-red-600 font-bold">10 verified on-ground causes</strong> starting at just ₹20. Personalize your donation with your name on the distribution banner and receive direct HD video proof on WhatsApp.
                </p>
              </div>

              {/* 4 Feature Highlights in Red Accent Chips */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 bg-white border border-red-200 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />
                  <span>₹20 Dog Food</span>
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white border border-red-200 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />
                  <span>₹50 Education Kit</span>
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white border border-red-200 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />
                  <span>₹80 Hot Thali Meal</span>
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white border border-red-200 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />
                  <span>50% 80G Tax Exemption</span>
                </span>
              </div>

              {/* 3 Trust Value Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left pt-1">
                <div className="bg-white p-3.5 rounded-2xl border-2 border-red-100 shadow-xs flex items-center gap-2.5 hover:border-red-300 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600 flex-shrink-0">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-black text-slate-900">Video Proof</span>
                    <span className="block text-[11px] text-red-600 font-bold">On WhatsApp</span>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border-2 border-red-100 shadow-xs flex items-center gap-2.5 hover:border-red-300 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600 flex-shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-black text-slate-900">80G Tax Benefit</span>
                    <span className="block text-[11px] text-slate-500 font-medium">50% Deduction</span>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 bg-white p-3.5 rounded-2xl border-2 border-red-100 shadow-xs flex items-center gap-2.5 hover:border-red-300 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600 flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-black text-slate-900">Varanasi, UP</span>
                    <span className="block text-[11px] text-slate-500 font-medium">Kamachha Trust</span>
                  </div>
                </div>
              </div>

              {/* Call to Actions in Vibrant Red */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <a
                  href="#seva-catalog"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-700 text-white font-black text-sm sm:text-base px-8 py-4 rounded-2xl shadow-xl shadow-red-600/30 hover:shadow-2xl hover:shadow-red-600/40 transition-all duration-200 active:scale-95"
                >
                  <Heart className="w-5 h-5 fill-white animate-pulse" />
                  <span>Sponsor A Seva Kit (From ₹20)</span>
                </a>

                <Link
                  to="/celebrate"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-red-50/60 text-slate-800 border-2 border-red-200 hover:border-red-400 font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-xs transition-all duration-200"
                >
                  <Gift className="w-5 h-5 text-red-600" />
                  <span>Celebrate Birthday with Kids</span>
                </Link>
              </div>

              {/* Live Donor Social Trust Ribbon */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 text-xs text-slate-500 font-medium">
                <div className="flex -space-x-2">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-600 text-white font-bold text-[10px] ring-2 ring-white">R</span>
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-rose-600 text-white font-bold text-[10px] ring-2 ring-white">A</span>
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-700 text-white font-bold text-[10px] ring-2 ring-white">V</span>
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-800 text-white font-bold text-[10px] ring-2 ring-white">+</span>
                </div>
                <span>
                  <strong className="text-slate-900 font-bold">1,480+ generous donors</strong> supported this month
                </span>
                <span className="flex text-amber-500 text-xs">★★★★★</span>
              </div>

            </div>

            {/* RIGHT COLUMN: MODERN INTERACTIVE SHOWCASE CARD (RED ACCENTED) */}
            <div className="lg:col-span-6">
              <div className="relative bg-white rounded-3xl p-3 sm:p-5 shadow-2xl border-2 border-red-100 overflow-hidden">
                
                {/* 4 Quick Category Tabs for Instant Showcase Switch */}
                <div className="grid grid-cols-4 gap-1.5 mb-3 bg-red-50/60 p-1 rounded-2xl border border-red-100">
                  {heroSlides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlide(idx)}
                      className={`py-1.5 px-2 rounded-xl text-[11px] font-black transition-all truncate text-center ${
                        currentSlide === idx
                          ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                          : 'text-slate-700 hover:text-red-700 hover:bg-white/70'
                      }`}
                    >
                      {idx === 0 ? '🎒 Study' : idx === 1 ? '🍲 Meals' : idx === 2 ? '🎂 Feast' : '🐾 Animal'}
                    </button>
                  ))}
                </div>

                {/* Photo Carousel Window */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                  <img
                    src={activeSlideData.image}
                    alt={activeSlideData.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>

                  {/* Top Floating Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="bg-white/95 backdrop-blur-md text-slate-900 text-xs font-black px-3 py-1 rounded-full shadow-md">
                      {activeSlideData.badge}
                    </span>
                    <span className="bg-red-600 text-white text-xs font-black px-3.5 py-1 rounded-full shadow-lg shadow-red-600/40">
                      {activeSlideData.tag}
                    </span>
                  </div>

                  {/* Slide Content Over Photo */}
                  <div className="absolute bottom-3 left-3 right-3 text-white space-y-1.5 p-2">
                    <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                      {activeSlideData.highlightTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium line-clamp-2">
                      {activeSlideData.subtitle}
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs text-red-200 font-bold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                        <CheckCircle className="w-3.5 h-3.5 text-red-400" />
                        {activeSlideData.statText}
                      </span>

                      <button
                        onClick={() => handleInstantSponsor(activeSlideData.actionPkg)}
                        className="bg-red-600 hover:bg-red-700 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-red-600/40 transition-all active:scale-95 flex items-center gap-1.5"
                      >
                        <Heart className="w-3.5 h-3.5 fill-white" />
                        <span>Sponsor Now</span>
                      </button>
                    </div>
                  </div>

                  {/* Prev / Next Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Thumbnails Navigation Row with Red Active Border */}
                <div className="grid grid-cols-4 gap-2 pt-3">
                  {heroSlides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlide(idx)}
                      className={`relative rounded-xl overflow-hidden aspect-[16/10] border-2 transition-all ${
                        currentSlide === idx 
                          ? 'border-red-600 ring-2 ring-red-500/40 scale-95 shadow-md' 
                          : 'border-transparent opacity-60 hover:opacity-90'
                      }`}
                    >
                      <img src={slide.image} alt={slide.badge} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30"></div>
                      <span className="absolute bottom-1 left-1 right-1 text-[9px] font-black text-white truncate text-center">
                        {slide.tag}
                      </span>
                    </button>
                  ))}
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          CHAPTER 2: VIBRANT RED SECTION 2 — 3-STEP TRANSPARENCY, 4 GATEWAYS & IMPACT CALCULATOR
          Completely transformed with rich red accents and high emotional conversion!
          ========================================================================= */}
      <section className="py-14 sm:py-20 bg-white border-b border-red-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* =====================================================================
              TIER 1: 3-STEP TRANSPARENCY PROCESS (IHSKAS STYLE)
              ===================================================================== */}
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-3.5 py-1 rounded-full shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-red-600" />
                <span>100% Transparent Seva Promise</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                From Your Heart to Their Smile in 3 Steps
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Experience full accountability — see your donation turn into smiles with guaranteed video proof on WhatsApp.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              
              {/* Step 1 */}
              <div className="relative bg-gradient-to-b from-red-50/40 to-white rounded-3xl p-6 sm:p-7 border-2 border-red-100 hover:border-red-400 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-red-600/30 group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 fill-white" />
                  </div>
                  <span className="text-2xl font-black text-red-600/30 group-hover:text-red-600/50 transition-colors">01</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-red-600 transition-colors">
                  1. Choose an On-Ground Cause
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2 leading-relaxed">
                  Select from 10 verified kits starting at just ₹20 — child education, hot thalis, hospital feeding, or stray animal care.
                </p>
                <div className="mt-4 pt-3 border-t border-red-100/60 flex items-center gap-1 text-[11px] font-bold text-red-600">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Kits starting from ₹20</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative bg-gradient-to-b from-red-50/40 to-white rounded-3xl p-6 sm:p-7 border-2 border-red-100 hover:border-red-400 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-red-600/30 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-red-600/30 group-hover:text-red-600/50 transition-colors">02</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-red-600 transition-colors">
                  2. Add Name & Video Message
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2 leading-relaxed">
                  Dedicate in honor of a birthday, anniversary, or in loving memory. We print your personalized banner held by the kids.
                </p>
                <div className="mt-4 pt-3 border-t border-red-100/60 flex items-center gap-1 text-[11px] font-bold text-red-600">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Custom banner included</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative bg-gradient-to-b from-red-50/40 to-white rounded-3xl p-6 sm:p-7 border-2 border-red-100 hover:border-red-400 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-red-600/30 group-hover:scale-110 transition-transform">
                    <Video className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-red-600/30 group-hover:text-red-600/50 transition-colors">03</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-red-600 transition-colors">
                  3. Receive Video on WhatsApp
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2 leading-relaxed">
                  By 8:00 PM on the distribution date, receive high-resolution photos and video proof showing real beneficiaries.
                </p>
                <div className="mt-4 pt-3 border-t border-red-100/60 flex items-center gap-1 text-[11px] font-bold text-red-600">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Guaranteed by 8:00 PM</span>
                </div>
              </div>

            </div>
          </div>

          {/* =====================================================================
              TIER 2: 4 INSTANT GIVING GATEWAY CARDS (RED ACCENTS & LIVE STEPPERS)
              ===================================================================== */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-extrabold text-red-700 bg-red-100 px-3 py-1 rounded-full">
                  Quick Giving Gateways
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  Most Urgent Needs in Varanasi Today
                </h3>
              </div>
              <a
                href="#seva-catalog"
                className="inline-flex items-center gap-1.5 text-xs font-black text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition-all"
              >
                <span>View All 10 Seva Kits</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Card 1: Education Kit */}
              <div className="bg-white rounded-3xl p-5 border-2 border-red-100 hover:border-red-500 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                    <img src="/images/child_education.jpg" alt="Child Education Kit" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2.5 right-2.5 bg-red-600 text-white text-xs font-black px-2.5 py-0.5 rounded-full shadow-md">
                      ₹50 / child
                    </span>
                    <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      Varanasi Slums
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-base text-slate-900 group-hover:text-red-600 transition-colors">
                      Child Education Study Kit
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                      3-in-1 notebook, pencils, sharpener, eraser and scale for underprivileged students.
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-red-50 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Sponsor 10 Kits</span>
                    <span className="text-red-600 font-black">₹500</span>
                  </div>
                  <button
                    onClick={() => openDonateModal(SITE_CONFIG.causePackages[0], 500)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs py-2.5 rounded-xl shadow-md shadow-red-600/30 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Sponsor Now (₹500)</span>
                  </button>
                </div>
              </div>

              {/* Card 2: Annapurna Thali */}
              <div className="bg-white rounded-3xl p-5 border-2 border-red-100 hover:border-red-500 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                    <img src="/images/elderly_meal.jpg" alt="Annapurna Thali" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2.5 right-2.5 bg-red-600 text-white text-xs font-black px-2.5 py-0.5 rounded-full shadow-md">
                      ₹80 / thali
                    </span>
                    <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      Hospitals & Ghats
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-base text-slate-900 group-hover:text-red-600 transition-colors">
                      Annapurna Warm Thali Meal
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                      Steaming rice, fresh rotis, nutritious dal, and seasonal sabzi for hospital patients and elders.
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-red-50 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Sponsor 10 Thalis</span>
                    <span className="text-red-600 font-black">₹800</span>
                  </div>
                  <button
                    onClick={() => openDonateModal(SITE_CONFIG.causePackages[9], 800)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs py-2.5 rounded-xl shadow-md shadow-red-600/30 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Sponsor Now (₹800)</span>
                  </button>
                </div>
              </div>

              {/* Card 3: Street Dog Feeding */}
              <div className="bg-white rounded-3xl p-5 border-2 border-red-100 hover:border-red-500 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                    <img src="/images/dog_food.jpg" alt="Street Dog Feeding" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2.5 right-2.5 bg-red-600 text-white text-xs font-black px-2.5 py-0.5 rounded-full shadow-md">
                      ₹20 / dog
                    </span>
                    <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      Assi & Dashashwamedh
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-base text-slate-900 group-hover:text-red-600 transition-colors">
                      Stray Dog Feeding Drive
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                      Nutritious meat/egg-curry rice and clean drinking water for stray dogs across Varanasi streets.
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-red-50 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Feed 25 Dogs</span>
                    <span className="text-red-600 font-black">₹500</span>
                  </div>
                  <button
                    onClick={() => openDonateModal(SITE_CONFIG.causePackages[2], 500)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs py-2.5 rounded-xl shadow-md shadow-red-600/30 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Feed 25 Dogs (₹500)</span>
                  </button>
                </div>
              </div>

              {/* Card 4: Restaurant Feast */}
              <div className="bg-white rounded-3xl p-5 border-2 border-red-200 hover:border-red-600 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between group bg-gradient-to-b from-white to-red-50/40">
                <div className="space-y-3">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                    <img src="/images/restaurant_feast.jpg" alt="Restaurant Feast" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2.5 right-2.5 bg-red-600 text-white text-xs font-black px-2.5 py-0.5 rounded-full shadow-md">
                      ₹10k / 25 Kids
                    </span>
                    <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      VIP Birthday Celebration
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-base text-slate-900 group-hover:text-red-600 transition-colors">
                      Birthday Feast with Kids
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                      Restaurant-prepared feast, personalized banner, cake cutting, and full celebration video.
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-red-100 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>25 Kids VIP Feast</span>
                    <span className="text-red-600 font-black">₹10,000</span>
                  </div>
                  <button
                    onClick={() => openDonateModal({
                      ...SITE_CONFIG.causePackages[7],
                      unitTitle: "Restaurant Feast — Normal Plan (25 Children)",
                      unitPrice: 10000
                    }, 10000)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs py-2.5 rounded-xl shadow-md shadow-red-600/30 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Gift className="w-3.5 h-3.5 text-white" />
                    <span>Book Feast (₹10,000)</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* =====================================================================
              TIER 3: INTERACTIVE SEVA IMPACT CALCULATOR (LUXURY RED THEME)
              ===================================================================== */}
          <div className="bg-gradient-to-br from-red-600 via-rose-600 to-red-700 rounded-3xl p-6 sm:p-10 shadow-2xl text-white relative overflow-hidden">
            
            {/* Ambient Background Circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/15 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10 space-y-8">
              
              <div className="max-w-3xl mx-auto text-center space-y-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-red-950 bg-white/95 px-3.5 py-1 rounded-full shadow-md">
                  <Zap className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                  <span>Real-Time Impact Simulator</span>
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  Calculate Your On-Ground Impact in Varanasi
                </h3>
                <p className="text-xs sm:text-sm text-red-100 font-medium">
                  Select or slide an amount below to see the exact relief delivered with your contribution.
                </p>
              </div>

              {/* Amount Quick-Pick Pills in White / Translucent */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {[100, 250, 500, 1000, 2500, 5000, 10000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setCalcAmount(amt)}
                    className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all ${
                      calcAmount === amt
                        ? 'bg-white text-red-600 shadow-xl scale-105'
                        : 'bg-black/20 text-white hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              {/* Calculated Impact Cards Grid (Crisp White Floating Cards) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
                
                <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-lg space-y-1 text-slate-800">
                  <span className="text-2xl sm:text-3xl font-black text-red-600 block">
                    {Math.floor(calcAmount / 50)} Kits
                  </span>
                  <span className="text-xs font-bold text-slate-900 block">🎒 Education Kits</span>
                  <span className="text-[11px] text-slate-500 block font-medium">Notebooks & stationery</span>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-lg space-y-1 text-slate-800">
                  <span className="text-2xl sm:text-3xl font-black text-red-600 block">
                    {Math.floor(calcAmount / 80)} Thalis
                  </span>
                  <span className="text-xs font-bold text-slate-900 block">🍲 Wholesome Meals</span>
                  <span className="text-[11px] text-slate-500 block font-medium">Hot food for hospital/elders</span>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-lg space-y-1 text-slate-800">
                  <span className="text-2xl sm:text-3xl font-black text-red-600 block">
                    {Math.floor(calcAmount / 20)} Dogs
                  </span>
                  <span className="text-xs font-bold text-slate-900 block">🐾 Street Dogs Fed</span>
                  <span className="text-[11px] text-slate-500 block font-medium">Nutritious dog food</span>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-lg space-y-1 text-slate-800">
                  <span className="text-2xl sm:text-3xl font-black text-red-600 block">
                    {(calcAmount / 200).toFixed(1)} Cows
                  </span>
                  <span className="text-xs font-bold text-slate-900 block">🌾 Gau Seva Fodder</span>
                  <span className="text-[11px] text-slate-500 block font-medium">Fresh green grass & feed</span>
                </div>

              </div>

              {/* Tax & Action Row */}
              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/20">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="block text-xs font-black text-white">50% Tax Exemption Under Section 80G</span>
                    <span className="block text-[11px] text-red-100">Eligible for instant digital receipt on PAN {SITE_CONFIG.org.pan}</span>
                  </div>
                </div>

                <button
                  onClick={() => openDonateModal(SITE_CONFIG.causePackages[0], calcAmount)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white hover:bg-red-50 text-red-600 font-black text-sm px-8 py-3.5 rounded-xl shadow-xl transition-all duration-200 active:scale-95"
                >
                  <Heart className="w-4 h-4 fill-red-600" />
                  <span>Sponsor ₹{calcAmount.toLocaleString('en-IN')} with Video Proof</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          KEY IMPACT METRICS BAR (CLEAN, MINIMALIST STATS)
          ========================================================================= */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            
            <div className="p-3">
              <span className="block text-3xl sm:text-4xl font-black text-slate-900">1,200+</span>
              <span className="text-xs sm:text-sm font-bold text-slate-600 mt-1 block">Children's Study Kits</span>
              <span className="text-[11px] text-rose-600 font-semibold">Notebooks & stationery</span>
            </div>

            <div className="p-3 border-l border-slate-100">
              <span className="block text-3xl sm:text-4xl font-black text-rose-600">50,000+</span>
              <span className="text-xs sm:text-sm font-bold text-slate-600 mt-1 block">Fresh Thali Meals</span>
              <span className="text-[11px] text-slate-500 font-semibold">Served at Ghats & Slums</span>
            </div>

            <div className="p-3 border-l border-slate-100">
              <span className="block text-3xl sm:text-4xl font-black text-slate-900">8,500+</span>
              <span className="text-xs sm:text-sm font-bold text-slate-600 mt-1 block">Street Dogs & Cows Fed</span>
              <span className="text-[11px] text-amber-600 font-semibold">Daily animal care drive</span>
            </div>

            <div className="p-3 border-l border-slate-100">
              <span className="block text-3xl sm:text-4xl font-black text-rose-600">100%</span>
              <span className="text-xs sm:text-sm font-bold text-slate-600 mt-1 block">Video Proof Guarantee</span>
              <span className="text-[11px] text-slate-500 font-semibold">Direct to WhatsApp by 8 PM</span>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 3: ALL 10 CORE SEVA KITS (E-COMMERCE PRODUCT STYLE CARDS)
          Exact Pricing, Exact Inclusions, Quantity Steppers, and Instant Sponsor
          ========================================================================= */}
      <section id="seva-catalog" className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="inline-block text-xs uppercase tracking-widest font-extrabold text-rose-700 bg-rose-100 px-3.5 py-1 rounded-full">
              Verified Seva Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              10 Ways to Make an Immediate Difference
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Every kit represents real, verified aid delivered by our team in Varanasi. Select a quantity, sponsor in 1-click, or add to your Seva Basket.
            </p>
          </div>

          {/* Category Filter Pills in Red Accent */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-150 ${
                  activeCategory === cat.id
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 10 Seva Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {getFilteredKits().map((pkg) => {
              const isFeast = pkg.id === 'pkg-restaurant-feast';
              const currentQty = isFeast ? 1 : (basket[pkg.id] || pkg.defaultQty || 1);
              const unitPrice = isFeast 
                ? (homeFeastPlan === 'normal' ? 10000 : 20000) 
                : pkg.unitPrice;
              const subtotal = unitPrice * currentQty;

              return (
                <div 
                  key={pkg.id} 
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Card Photo Window */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img 
                        src={pkg.imageUrl} 
                        alt={pkg.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                          {pkg.category}
                        </span>
                        <span className="bg-rose-600 text-white text-xs font-black px-3.5 py-1 rounded-full shadow-md">
                          {isFeast ? (homeFeastPlan === 'normal' ? '₹10,000 (25 Kids)' : '₹20,000 (60 Kids)') : `₹${pkg.unitPrice} ${pkg.unitLabel ? `/${pkg.unitLabel.replace('per ', '')}` : ''}`}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 space-y-4">
                      
                      {/* Title & Headline */}
                      <div>
                        <span className="text-xs font-bold text-slate-400 block mb-0.5 uppercase tracking-wider">
                          Cause #{pkg.number}
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-rose-600 transition-colors">
                          {pkg.unitTitle}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                          {pkg.headline}
                        </p>
                      </div>

                      {/* If Restaurant Feast: Plan Switcher */}
                      {isFeast && (
                        <div className="bg-rose-50/70 rounded-2xl p-3 border border-rose-200 space-y-2">
                          <span className="text-[11px] font-black uppercase text-rose-900 block">
                            Choose Celebration Plan:
                          </span>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setHomeFeastPlan('normal')}
                              className={`py-2 px-2.5 rounded-xl text-xs font-bold text-center transition-all ${
                                homeFeastPlan === 'normal'
                                  ? 'bg-rose-600 text-white shadow-sm'
                                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-rose-100'
                              }`}
                            >
                              25 Kids (₹10,000)
                            </button>
                            <button
                              type="button"
                              onClick={() => setHomeFeastPlan('grand')}
                              className={`py-2 px-2.5 rounded-xl text-xs font-bold text-center transition-all ${
                                homeFeastPlan === 'grand'
                                  ? 'bg-rose-600 text-white shadow-sm'
                                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-rose-100'
                              }`}
                            >
                              60 Kids (₹20,000)
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Inclusions Checklist */}
                      <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100 space-y-1.5">
                        <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                          What is Included in each kit:
                        </span>
                        <ul className="space-y-1">
                          {pkg.inclusions.slice(0, 4).map((inc, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{inc}</span>
                            </li>
                          ))}
                          {pkg.inclusions.length > 4 && (
                            <li className="text-[11px] font-bold text-rose-600 pl-5">
                              + {pkg.inclusions.length - 4} more items included
                            </li>
                          )}
                        </ul>
                      </div>

                    </div>
                  </div>

                  {/* Card Interactive Footer (Quantity & Actions) */}
                  <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 mt-2 space-y-3">
                    
                    {/* Quantity Stepper (for items 1 to 7, 9, 10) */}
                    {!isFeast && (
                      <div className="flex items-center justify-between pt-3">
                        <span className="text-xs font-bold text-slate-600">
                          Choose Quantity:
                        </span>

                        <div className="inline-flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1 gap-2">
                          <button
                            type="button"
                            onClick={() => updateBasketQty(pkg.id, Math.max(1, currentQty - 1))}
                            className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-700 font-black flex items-center justify-center transition-colors shadow-xs active:scale-95"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-black text-slate-900">
                            {currentQty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateBasketQty(pkg.id, currentQty + 1)}
                            className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-700 font-black flex items-center justify-center transition-colors shadow-xs active:scale-95"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons in Red */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => addToBasket(pkg.id, currentQty)}
                        className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-3 rounded-xl transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Basket</span>
                      </button>

                      <button
                        onClick={() => handleInstantSponsor(pkg)}
                        className="w-full inline-flex items-center justify-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-md shadow-rose-600/20 transition-all active:scale-95"
                      >
                        <Heart className="w-3.5 h-3.5 fill-white" />
                        <span>Sponsor ₹{subtotal.toLocaleString('en-IN')}</span>
                      </button>
                    </div>

                    {/* WhatsApp Guarantee tag */}
                    <div className="text-center pt-1">
                      <span className="text-[11px] font-semibold text-slate-500 inline-flex items-center gap-1">
                        <Check className="w-3 h-3 text-rose-600" />
                        WhatsApp Video & Photo Proof Guaranteed
                      </span>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          CHAPTER 4: SPECIAL MILESTONE CELEBRATION (RESTAURANT FEAST ₹10K / ₹20K)
          Givea-style feature section for Birthday / Anniversary Feasts
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-3xl sm:rounded-[36px] text-white p-6 sm:p-10 lg:p-14 overflow-hidden relative shadow-2xl">
            
            {/* Background lighting accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Content Column */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-400/40 text-rose-300 px-4 py-1.5 rounded-full text-xs font-bold">
                  <Gift className="w-3.5 h-3.5 text-rose-400" />
                  <span>Exclusive Milestone Sponsorship</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                  अपना जन्मदिन या सालगिरह <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-yellow-300">
                    25 से 60 बच्चों के साथ मनाएं
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                  Don't just celebrate—create unforgettable smiles. We organize a complete restaurant-prepared feast with cake cutting, personal name banner, and live celebration video directly from Varanasi to your WhatsApp.
                </p>

                {/* Inclusion points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span>Restaurant-prepared hot meals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span>Personalized Banner with Your Name</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span>Children's blessings & cake cutting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span>Full HD Video delivered on WhatsApp</span>
                  </div>
                </div>

                {/* Plan Selection Buttons in Red */}
                <div className="pt-4 flex flex-wrap gap-4">
                  <button
                    onClick={() => openDonateModal({
                      ...SITE_CONFIG.causePackages[7],
                      unitTitle: "Restaurant Feast — Normal Plan (25 Children)",
                      unitPrice: 10000
                    }, 10000)}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-black text-sm px-7 py-3.5 rounded-2xl shadow-lg transition-all active:scale-95"
                  >
                    <span>Sponsor Normal Plan (₹10,000 / 25 Kids)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => openDonateModal({
                      ...SITE_CONFIG.causePackages[7],
                      unitTitle: "Restaurant Feast — Grand Plan (60 Children)",
                      unitPrice: 20000
                    }, 20000)}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-black text-sm px-7 py-3.5 rounded-2xl backdrop-blur-md transition-all active:scale-95"
                  >
                    <span>Sponsor Grand Plan (₹20,000 / 60 Kids)</span>
                  </button>
                </div>

              </div>

              {/* Right Visual Image */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
                  <img
                    src="/images/restaurant_feast.jpg"
                    alt="Children eating feast meal"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                    <div className="text-white">
                      <span className="text-xs font-bold text-rose-300 uppercase tracking-widest block">
                        Live Proof Guarantee
                      </span>
                      <p className="text-sm font-bold mt-0.5">
                        Guaranteed video proof sent directly to your phone within 24 hours of meal distribution.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          CHAPTER 5: HOW IT WORKS (GIVEA 4-STEP TRANSPARENCY TIMELINE)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-rose-700 bg-rose-100 px-3 py-1 rounded-full">
              Frictionless & 100% Transparent
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              How Your Seva Reaches Ground in 4 Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              We make giving as simple, transparent, and joyful as ordering on your favorite app.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 relative hover:shadow-md transition-shadow">
              <span className="w-10 h-10 rounded-2xl bg-rose-600 text-white font-black text-lg flex items-center justify-center">
                1
              </span>
              <h3 className="text-base font-black text-slate-900">1. Choose Seva Kit</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Select any of our 10 verified causes starting from just ₹20. Adjust quantity or add multiple causes to your basket.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 relative hover:shadow-md transition-shadow">
              <span className="w-10 h-10 rounded-2xl bg-slate-900 text-white font-black text-lg flex items-center justify-center">
                2
              </span>
              <h3 className="text-base font-black text-slate-900">2. Add Name / Wishes</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Personalize your sponsorship with your name, family member's photo, or custom prayer message for the banner.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 relative hover:shadow-md transition-shadow">
              <span className="w-10 h-10 rounded-2xl bg-rose-600 text-white font-black text-lg flex items-center justify-center">
                3
              </span>
              <h3 className="text-base font-black text-slate-900">3. Quick UPI Payment</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Scan UPI QR or pay via GPay, PhonePe, Paytm with ₹0 platform fee. Instant 80G tax receipt is generated.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 relative hover:shadow-md transition-shadow">
              <span className="w-10 h-10 rounded-2xl bg-amber-500 text-white font-black text-lg flex items-center justify-center">
                4
              </span>
              <h3 className="text-base font-black text-slate-900">4. Video Proof by 8 PM</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Our local Varanasi team executes distribution on-ground and sends personalized video & photo proof directly to your WhatsApp!
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          CHAPTER 6: DIRECT UPI PAYMENT & 80G TAX EXEMPTION DETAILS
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Instant UPI QR Code */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 text-center shadow-xs">
                <div className="w-56 h-56 bg-white p-3 rounded-2xl shadow-sm border border-slate-200 mb-4 flex items-center justify-center">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${SITE_CONFIG.org.bankDetails.upiId}%26pn=Umeed%20Ki%20Kiran%20Foundation%26cu=INR`}
                    alt="UPI QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="space-y-2 w-full">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
                    <span>Scan with GPay, PhonePe, Paytm, BHIM</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-1">
                    <code className="text-xs sm:text-sm font-black bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-900">
                      {SITE_CONFIG.org.bankDetails.upiId}
                    </code>
                    <button
                      onClick={handleCopyUpi}
                      className="inline-flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition-colors"
                    >
                      {copiedUpi ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Verified Trust & Tax Credentials */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <span className="text-xs uppercase tracking-widest font-black text-rose-700 block mb-1">
                    Official Trust Credentials
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                    Umeed Ki Kiran Foundation (उम्मीद की किरण फाउंडेशन)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                    Registered Public Charitable Trust established under Indian Trusts Act, 1882 in Varanasi.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                    <span className="block text-slate-500 font-bold">Trust PAN Number:</span>
                    <span className="text-sm font-black text-slate-900">{SITE_CONFIG.org.pan}</span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                    <span className="block text-slate-500 font-bold">Registered Office:</span>
                    <span className="text-sm font-black text-slate-900">{SITE_CONFIG.org.address}</span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                    <span className="block text-slate-500 font-bold">80G Tax Exemption:</span>
                    <span className="text-sm font-black text-rose-700">Eligible for 50% Tax Rebate</span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                    <span className="block text-slate-500 font-bold">Helpline & WhatsApp:</span>
                    <span className="text-sm font-black text-slate-900">{SITE_CONFIG.org.phone}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => openDonateModal(SITE_CONFIG.causePackages[0], 500)}
                    className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Donate with Custom Amount</span>
                  </button>

                  <Link
                    to="/about"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 px-4 py-3"
                  >
                    <span>Read Trust Story & History</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
