import React, { useState } from 'react';
import { 
  Heart, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  Minus, 
  Video, 
  ShoppingBag, 
  Gift, 
  Check, 
  ArrowRight,
  Phone
} from 'lucide-react';
import { useDonations } from '../context/DonationContext';
import { SITE_CONFIG } from '../lib/config';

export default function Causes() {
  const { 
    basket, 
    updateBasketQty, 
    addToBasket, 
    openDonateModal 
  } = useDonations();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  // Selected plan for restaurant feast (Normal or Grand)
  const [restaurantPlan, setRestaurantPlan] = useState('normal'); // 'normal' | 'grand'

  const categories = [
    { id: 'All', label: 'All 10 Seva Kits' },
    { id: 'Child Education', label: '🎒 Child Education' },
    { id: 'Hunger Relief', label: '🍲 Food & Feasts' },
    { id: 'Animal Welfare', label: '🐾 Animals & Cows' },
    { id: 'Healthcare', label: '🏥 Healthcare & Hygiene' },
  ];

  const filteredPackages = SITE_CONFIG.causePackages.filter((pkg) => {
    const matchesCategory = 
      selectedCategory === 'All' || 
      pkg.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'Healthcare' && pkg.category === 'Women Health') ||
      (selectedCategory === 'Hunger Relief' && pkg.category === 'Celebration Special');

    const matchesSearch = 
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.inclusions.some(inc => inc.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleInstantSponsor = (pkg) => {
    if (pkg.id === 'pkg-restaurant-feast') {
      const price = restaurantPlan === 'normal' ? 10000 : 20000;
      const title = restaurantPlan === 'normal' 
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* =========================================================================
            HEADER: ULTRA-CLEAN, HIGH-IMPACT HEADLINE & TRUST TAG
            ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>100% Direct Ground Delivery in Varanasi • Video Proof Guaranteed</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Our 10 Verified Seva Kits & Causes
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            From a ₹20 stray dog meal to a ₹50 child study kit or full celebratory restaurant feasts — choose the exact items you wish to fund. 100% direct impact with official 80G tax receipt.
          </p>
        </div>

        {/* =========================================================================
            FILTER & SEARCH CONTROLS
            ========================================================================= */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-150 ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search kits, food, notebooks, medicine..."
              className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
            />
          </div>

        </div>

        {/* =========================================================================
            THE 10 CARDS GRID (CLEAN, MODERN E-COMMERCE CARDS)
            ========================================================================= */}
        {filteredPackages.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center text-slate-500 border border-slate-200 space-y-3">
            <p className="text-base font-bold text-slate-800">No cause matches your selected search.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 underline"
            >
              Clear filters and show all 10 causes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPackages.map((pkg) => {
              const isFeast = pkg.id === 'pkg-restaurant-feast';
              const currentQty = isFeast ? 1 : (basket[pkg.id] || pkg.defaultQty || 1);
              const unitPrice = isFeast 
                ? (restaurantPlan === 'normal' ? 10000 : 20000) 
                : pkg.unitPrice;
              const subtotal = unitPrice * currentQty;

              return (
                <div 
                  key={pkg.id} 
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Image Window */}
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
                        
                        <span className="bg-emerald-600 text-white text-xs font-black px-3.5 py-1 rounded-full shadow-md">
                          {isFeast ? (restaurantPlan === 'normal' ? '₹10,000 (25 Kids)' : '₹20,000 (60 Kids)') : `₹${pkg.unitPrice} / ${pkg.unitLabel ? pkg.unitLabel.replace('per ', '') : 'unit'}`}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 space-y-4">
                      
                      <div>
                        <span className="text-xs font-black text-slate-400 block mb-0.5 uppercase tracking-wider">
                          Cause #{pkg.number}
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {pkg.unitTitle}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                          {pkg.headline}
                        </p>
                      </div>

                      {/* If Restaurant Feast: Plan Switcher */}
                      {isFeast && (
                        <div className="bg-orange-50/80 rounded-2xl p-3 border border-orange-200/80 space-y-2">
                          <span className="text-[11px] font-black uppercase text-orange-900 block">
                            Choose Celebration Plan:
                          </span>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setRestaurantPlan('normal')}
                              className={`py-2 px-2.5 rounded-xl text-xs font-bold text-center transition-all ${
                                restaurantPlan === 'normal'
                                  ? 'bg-orange-600 text-white shadow-sm'
                                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-orange-100'
                              }`}
                            >
                              25 Kids (₹10,000)
                            </button>
                            <button
                              type="button"
                              onClick={() => setRestaurantPlan('grand')}
                              className={`py-2 px-2.5 rounded-xl text-xs font-bold text-center transition-all ${
                                restaurantPlan === 'grand'
                                  ? 'bg-orange-600 text-white shadow-sm'
                                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-orange-100'
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
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{inc}</span>
                            </li>
                          ))}
                          {pkg.inclusions.length > 4 && (
                            <li className="text-[11px] font-bold text-emerald-700 pl-5">
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

                    {/* Action Buttons */}
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
                        className="w-full inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-md shadow-emerald-600/20 transition-all active:scale-95"
                      >
                        <Heart className="w-3.5 h-3.5 fill-white" />
                        <span>Sponsor ₹{subtotal.toLocaleString('en-IN')}</span>
                      </button>
                    </div>

                    {/* WhatsApp Guarantee tag */}
                    <div className="text-center pt-1">
                      <span className="text-[11px] font-semibold text-slate-500 inline-flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" />
                        WhatsApp Video & Photo Proof Guaranteed
                      </span>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* =========================================================================
            BOTTOM TRUST BANNER
            ========================================================================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-black text-slate-900">
              Want to organize a custom seva drive or bulk distribution in Varanasi?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              We arrange special memorial feasts, school stationery distribution drives, and gaushala seva with complete personalized video coverage.
            </p>
          </div>

          <a
            href={`https://wa.me/${SITE_CONFIG.org.whatsapp}?text=Namaste%2C%20I%20want%20to%20discuss%20a%20custom%20seva%20distribution`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all flex-shrink-0"
          >
            <Phone className="w-4 h-4" />
            <span>Chat with Ground Coordinator</span>
          </a>
        </div>

      </div>
    </div>
  );
}
