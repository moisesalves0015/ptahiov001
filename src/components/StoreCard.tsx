import React, { useEffect, useRef } from 'react';
import { Star, MapPin, CheckCircle2, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { Store, Product } from '../types';

interface StoreCardProps {
  store: Store;
  products?: Product[];
  onClick?: (id: string) => void;
}

export const StoreCard: React.FC<StoreCardProps> = ({ store, products = [], onClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollInterval = setInterval(() => {
      if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10) {
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainer.scrollBy({ left: scrollContainer.clientWidth / 3, behavior: 'smooth' });
      }
    }, 3500); // Slightly different timing for visual variety

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick?.(store.id)}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
    >
      {/* Product Feed Cover - 3 per view */}
      <div className="relative h-32 w-full overflow-hidden bg-slate-50 border-b border-slate-50">
        <div 
          ref={scrollRef}
          className="flex h-full w-full overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
        >
          {(products.length > 0 ? products : [{ image: store.avatar, name: store.name, price: 0 }]).map((item, idx) => (
            <div key={idx} className="h-full w-1/3 flex-shrink-0 snap-start relative group/item border-r border-white/20 last:border-none">
              <img
                src={'image' in item ? (item as any).image : store.avatar}
                alt={store.name}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Product Info Overlays */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-1.5 opacity-0 group-hover/item:opacity-100 transition-opacity">
                <p className="text-[8px] font-black text-white truncate">{(item as any).name}</p>
                {'price' in item && (item as any).price > 0 && (
                  <p className="text-[10px] font-black text-emerald-400">R${(item as any).price.toFixed(0)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Indicators */}
        <div className="absolute top-2 right-2 bg-emerald-500/90 backdrop-blur-md px-1.5 py-0.5 rounded text-[7px] font-black text-white uppercase tracking-tighter shadow-sm">
          {products.length || 0} Itens
        </div>
      </div>
      <div className="flex p-4 gap-4">
        <div className="relative h-16 w-16 flex-shrink-0">
          <img
            src={store.avatar}
            alt={store.name}
            className="h-full w-full rounded-md object-cover"
            referrerPolicy="no-referrer"
          />
          {store.isVerified && (
            <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-0.5 shadow-sm">
              <CheckCircle2 size={14} className="fill-emerald-500 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-semibold text-slate-900">{store.name}</h3>
              <div className="flex flex-wrap gap-1 mt-1 whitespace-nowrap overflow-hidden">
                {store.categories.slice(0, 2).map((cat) => (
                  <span key={cat} className="text-[9px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded truncate">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-2 flex items-center gap-3 whitespace-nowrap">
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold text-slate-700">{store.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400 truncate">
              <MapPin size={10} className="flex-shrink-0" />
              <span className="text-[10px] font-medium truncate">{store.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <button className="w-full flex items-center justify-center gap-2 rounded-md bg-slate-100 py-2.5 text-xs font-bold text-slate-700 transition-all hover:bg-slate-900 hover:text-white active:scale-95 whitespace-nowrap truncate">
          <ShoppingBag size={14} className="flex-shrink-0" />
          Ver Catálogo
        </button>
      </div>
    </motion.div>
  );
}
