import React from 'react';
import { Star, MapPin, CheckCircle2, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { Professional } from '../types';

interface ProfessionalCardProps {
  professional: Professional;
  onClick: (id: string) => void;
  key?: React.Key;
}

export function ProfessionalCard({ professional, onClick }: ProfessionalCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(professional.id)}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-background bg-white shadow-sm transition-all hover:shadow-md"
    >
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
              <CheckCircle2 size={16} className="fill-accent text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="truncate text-base font-semibold text-primary">{professional.name}</h3>
              <p className="text-xs font-medium text-accent truncate">{professional.specialty}</p>
            </div>
            {professional.isPremium && (
              <Award size={16} className="text-amber-500 flex-shrink-0 ml-2" />
            )}
          </div>
          
          <div className="mt-2 flex items-center gap-3 whitespace-nowrap">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold text-primary/70">{professional.rating}</span>
            </div>
            <span className="text-[10px] text-primary/40 font-medium truncate">{professional.projectsCount} obras</span>
          </div>

          <div className="mt-2 flex items-center gap-1 text-primary/40 whitespace-nowrap">
            <MapPin size={12} className="flex-shrink-0" />
            <span className="text-[10px] font-medium truncate">{professional.location}</span>
          </div>
        </div>
      </div>

      <div className="flex border-t border-background whitespace-nowrap">
        <button className="flex-1 px-4 py-3 text-xs font-bold text-primary/70 hover:bg-background transition-colors border-r border-background truncate">
          Ver Perfil
        </button>
        <button className="flex-1 px-4 py-3 text-xs font-bold text-accent hover:bg-accent/10 transition-colors truncate">
          Orçamento
        </button>
      </div>
    </motion.div>
  );
}
