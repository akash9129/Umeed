import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, ArrowRight, Trash2, Sparkles } from 'lucide-react';
import { useDonations } from '../context/DonationContext';

export default function StickyBasketBar() {
  const { getBasketItems, getBasketTotal, getBasketCount, openDonateModalForBasket, clearBasket } = useDonations();

  const total = getBasketTotal();
  const count = getBasketCount();
  const items = getBasketItems();

  if (total <= 0 || count <= 0) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-3 sm:p-4 bg-gradient-to-t from-slate-900/90 via-slate-900/80 to-transparent pointer-events-none">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-2xl sm:rounded-full p-3 sm:px-6 sm:py-3.5 shadow-2xl border border-amber-400/40 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Left: Summary */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-umeed-gold-500 text-umeed-blue-900 flex items-center justify-center font-extrabold shadow">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 shadow">
                {count}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-wider text-umeed-gold-400">
                  Your Umeed Seva Basket
                </span>
                <span className="text-slate-400 text-xs hidden md:inline">• {items.length} causes selected</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-extrabold text-white">
                  ₹{total.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-slate-300 truncate max-w-[200px] sm:max-w-xs">
                  ({items.map(i => `${i.quantity}x ${i.unitTitle}`).join(', ')})
                </span>
              </div>
            </div>

            <button
              onClick={clearBasket}
              className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg sm:hidden"
              title="Clear Basket"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={clearBasket}
              className="text-xs text-slate-400 hover:text-rose-400 px-3 py-2 hidden sm:inline-flex items-center gap-1 font-medium transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>

            <Link
              to="/checkout"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <Heart className="w-4 h-4 fill-white animate-pulse" />
              <span>Donate Seva Basket (₹{total.toLocaleString('en-IN')})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
