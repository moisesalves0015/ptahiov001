import React from 'react';
import { Package, ShoppingCart, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { MaterialQuote } from '../types';

interface MaterialQuoteCardProps {
  quote: MaterialQuote;
  onRespond?: (id: string) => void;
  key?: React.Key;
}

export function MaterialQuoteCard({ quote, onRespond }: MaterialQuoteCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex p-4 gap-4">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md bg-slate-50 text-slate-400">
          <Package size={28} strokeWidth={1.5} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-slate-900 truncate">{quote.productName}</h3>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider truncate">Qtd: {quote.quantity}</p>
            </div>
            <span className="rounded-md bg-amber-50 border border-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-600 uppercase whitespace-nowrap ml-2">
              Pendente
            </span>
          </div>
          
          <div className="mt-3 flex items-center gap-3 text-[10px] font-medium text-slate-400 whitespace-nowrap">
            <div className="flex items-center gap-1">
              <Calendar size={12} className="flex-shrink-0" />
              <span>{quote.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <ShoppingCart size={12} className="flex-shrink-0" />
              <span>Cotação</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-50 bg-slate-50/50 p-3">
        <button 
          onClick={() => onRespond?.(quote.id)}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-white py-2 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-900 hover:text-white active:scale-95 whitespace-nowrap truncate"
        >
          Informar Preço <ArrowRight size={14} className="flex-shrink-0" />
        </button>
      </div>
    </motion.div>
  );
}
