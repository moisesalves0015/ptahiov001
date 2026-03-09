import React from 'react';
import { Calendar, Camera, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { QuoteRequest } from '../types';

interface QuoteCardProps {
  quote: QuoteRequest;
  onRespond?: (id: string) => void;
  key?: React.Key;
}

export function QuoteCard({ quote, onRespond }: QuoteCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex p-4 gap-4">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-50">
          {quote.photos.length > 0 ? (
            <img src={quote.photos[0]} alt="Obra" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-300">
              <Camera size={24} />
            </div>
          )}
          <div className="absolute bottom-1 right-1 rounded-md bg-slate-900/80 px-1.5 py-0.5 text-[9px] font-bold text-white backdrop-blur">
            {quote.photos.length} fotos
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-slate-900 truncate">{quote.clientName}</h3>
              <p className="text-[10px] font-medium text-emerald-600 uppercase tracking-wider truncate">{quote.category}</p>
            </div>
            <span className="rounded-full bg-amber-50 border border-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-600 uppercase whitespace-nowrap ml-2">
              Pendente
            </span>
          </div>
          
          <p className="mt-2 text-xs text-slate-500 truncate leading-relaxed">
            {quote.description}
          </p>

          <div className="mt-3 flex items-center gap-3 text-[10px] font-medium text-slate-400 whitespace-nowrap">
            <div className="flex items-center gap-1">
              <Calendar size={12} className="flex-shrink-0" />
              <span>{quote.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={12} className="flex-shrink-0" />
              <span>5km</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-50 bg-slate-50/50 p-3">
        <button 
          onClick={() => onRespond?.(quote.id)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-900 hover:text-white active:scale-95 whitespace-nowrap truncate"
        >
          Responder Proposta <ArrowRight size={14} className="flex-shrink-0" />
        </button>
      </div>
    </motion.div>
  );
}
