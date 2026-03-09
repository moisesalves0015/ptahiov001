import React from 'react';
import { Album } from '../types';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface AlbumCarouselProps {
  albums: Album[];
}

export function AlbumCarousel({ albums }: AlbumCarouselProps) {
  if (!albums || albums.length === 0) return null;

  return (
    <div className="space-y-10">
      {albums.map((album) => (
        <div key={album.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-black text-slate-900">{album.title}</h4>
              <p className="text-xs font-medium text-slate-500">{album.description}</p>
            </div>
            <div className="flex gap-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400 active:scale-95">
                <ChevronLeft size={18} />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-900 active:scale-95">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">
            {album.images.map((image, idx) => (
              <motion.div 
                key={idx}
                whileTap={{ scale: 0.98 }}
                className="relative h-64 w-80 flex-shrink-0 snap-center overflow-hidden rounded-3xl bg-slate-100 shadow-sm"
              >
                <img 
                  src={image} 
                  alt={`${album.title} ${idx + 1}`} 
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 right-4 rounded-full bg-black/40 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                  {idx + 1} / {album.images.length}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
