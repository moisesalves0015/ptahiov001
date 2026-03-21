import React, { useEffect, useRef } from 'react';
import { Star, MapPin, CheckCircle2, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { Professional } from '../types';

interface ProfessionalCardProps {
  professional: Professional;
  onClick: (id: string) => void;
  key?: React.Key;
}

export function ProfessionalCard({ professional, onClick }: ProfessionalCardProps) {
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
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(professional.id)}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
    >
      {/* Dynamic Portfolio Cover - 3 per view */}
      <div className="relative h-32 w-full overflow-hidden bg-slate-100 border-b border-slate-50">
        <div 
          ref={scrollRef}
          className="flex h-full w-full overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
        >
          {(professional.portfolio && professional.portfolio.length > 0 ? professional.portfolio : [professional.avatar]).map((img, idx) => (
            <div key={idx} className="h-full w-1/3 flex-shrink-0 snap-start border-r border-white/20 last:border-none">
              <img
                src={img}
                alt={`Portfolio ${idx}`}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
        
        {/* Gallery Indicator Overlay */}
        <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-md px-1.5 py-0.5 rounded text-[7px] font-black text-white uppercase tracking-tighter">
          {professional.portfolio?.length || 1} Obras
        </div>
      </div>
      <div className="flex p-4 gap-4">
        <div className="relative h-20 w-20 flex-shrink-0">
          <img
            src={professional.avatar}
            alt={professional.name}
            className="h-full w-full rounded-md object-cover"
            referrerPolicy="no-referrer"
          />
          {professional.isVerified && (
            <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-0.5 shadow-sm">
              <CheckCircle2 size={16} className="fill-emerald-500 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="truncate text-base font-semibold text-slate-900">{professional.name}</h3>
              <p className="text-xs font-medium text-emerald-600 truncate">{professional.specialty}</p>
            </div>
            {professional.isPremium && (
              <Award size={16} className="text-amber-500 flex-shrink-0 ml-2" />
            )}
          </div>
          
          <div className="mt-2 flex items-center gap-3 whitespace-nowrap">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold text-slate-700">{professional.rating}</span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium truncate">{professional.projectsCount} obras</span>
          </div>

          <div className="mt-2 flex items-center gap-1 text-slate-400 whitespace-nowrap">
            <MapPin size={12} className="flex-shrink-0" />
            <span className="text-[10px] font-medium truncate">{professional.location}</span>
          </div>
        </div>
      </div>

      <div className="flex border-t border-slate-100 whitespace-nowrap">
        <button className="flex-1 px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors border-r border-slate-100 truncate">
          Ver Perfil
        </button>
        <button className="flex-1 px-4 py-3 text-xs font-bold text-emerald-600 hover:bg-emerald-50 transition-colors truncate">
          Orçamento
        </button>
      </div>
    </motion.div>
  );
}
