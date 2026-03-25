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
      className="overflow-hidden rounded-lg border border-border bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex p-4 gap-4">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-background">
          {quote.photos.length > 0 ? (
            <img src={quote.photos[0]} alt="Obra" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-primary/20">
              <Camera size={24} />
            </div>
          )}
          <div className="absolute bottom-1 right-1 rounded-md bg-primary/80 px-1.5 py-0.5 text-[9px] font-bold text-white backdrop-blur">
            {quote.photos.length} fotos
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-primary truncate">{quote.clientName}</h3>
              <p className="text-[10px] font-medium text-secondary uppercase tracking-wider truncate">{quote.category}</p>
            </div>
            <span className="rounded-md bg-accent/10 border border-accent/20 px-2 py-0.5 text-[9px] font-bold text-primary uppercase whitespace-nowrap ml-2">
              Pendente
            </span>
          </div>
          
          <p className="mt-2 text-xs text-primary/60 truncate leading-relaxed">
            {quote.description}
          </p>

          <div className="mt-3 flex items-center gap-3 text-[10px] font-medium text-primary/40 whitespace-nowrap">
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

      <div className="border-t border-border bg-background p-3">
        <button 
          onClick={() => onRespond?.(quote.id)}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-white py-2 text-xs font-bold text-primary shadow-sm transition-all hover:bg-primary hover:text-white active:scale-95 whitespace-nowrap truncate"
        >
          Responder Proposta <ArrowRight size={14} className="flex-shrink-0" />
        </button>
      </div>
    </motion.div>
  );
}
