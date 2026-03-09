import React, { useState, useRef, useEffect } from 'react';
import { Bookmark, Share2, User, ShoppingBag, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VideoPost, Product } from '../types';

interface VideoCardProps {
  post: VideoPost;
  isActive: boolean;
  onProductClick?: (product: Product) => void;
  key?: React.Key;
}

export function VideoCard({ post, isActive, onProductClick }: VideoCardProps) {
  const [showProducts, setShowProducts] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  return (
    <div 
      className="relative h-full w-full snap-start snap-always overflow-hidden bg-black"
    >
      <video
        ref={videoRef}
        src={post.videoUrl}
        loop
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        className="h-full w-full object-cover"
        playsInline
      />

      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-6 pt-10">
        <div className="flex gap-6 text-sm font-bold text-white/40">
          <button className="text-white border-b border-white pb-1 tracking-widest uppercase text-[10px]">Para você</button>
          <button className="hover:text-white transition-colors tracking-widest uppercase text-[10px]">Seguindo</button>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsMuted(!isMuted);
          }}
          className="rounded-full bg-black/10 p-2 backdrop-blur-sm border border-white/10"
        >
          {isMuted ? <VolumeX size={18} className="text-white/80" /> : <Volume2 size={18} className="text-white/80" />}
        </button>
      </div>
      
      {/* Overlay Information */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 pb-20 text-white">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-white/20 p-0.5">
            <img 
              src={post.user.avatar} 
              alt={post.user.name} 
              className="h-full w-full rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="font-bold text-base tracking-tight">@{post.user.handle || post.user.name}</span>
          </div>
        </div>
        <p className="mt-3 text-sm font-light leading-relaxed max-w-[80%] line-clamp-2 text-white/90">
          {post.description}
        </p>
        
        {/* Products Tag */}
        {post.products && post.products.length > 0 && (
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              setShowProducts(true);
            }}
            className="mt-6 flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-[11px] font-bold backdrop-blur-xl border border-white/20 transition-all hover:bg-white/20 uppercase tracking-[0.1em]"
          >
            <ShoppingBag size={16} className="text-emerald-400" />
            {post.products.length} Produtos na Obra
          </motion.button>
        )}
      </div>

      {/* Sidebar Actions */}
      <div className="absolute bottom-28 right-6 z-10 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-1.5">
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/10 active:bg-white/20 transition-all">
            <Bookmark size={24} className="text-white/90" />
          </button>
          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Salvar</span>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/10 active:bg-white/20 transition-all">
            <Share2 size={24} className="text-white/90" />
          </button>
          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Enviar</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-[2px] bg-white/10">
        <motion.div 
          className="h-full bg-white/60"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Products Modal */}
      <AnimatePresence>
        {showProducts && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProducts(false)}
              className="absolute inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 z-50 rounded-t-[2rem] bg-white shadow-2xl overflow-hidden"
            >
              <div className="px-8 pt-4 pb-8">
                <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-slate-200" />
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">Produtos Utilizados</h3>
                    <p className="text-xs text-slate-400 mt-1">Toque para ver detalhes e comprar</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    {post.products?.length} itens
                  </span>
                </div>
                
                <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto no-scrollbar">
                  {post.products?.map((product) => (
                    <div 
                      key={product.id} 
                      onClick={() => {
                        onProductClick?.(product);
                        setShowProducts(false);
                      }}
                      className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-100 p-3 transition-all hover:bg-slate-50 active:scale-[0.98]"
                    >
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-50">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest truncate">{product.storeName}</p>
                        <h4 className="font-bold text-slate-900 text-sm truncate mt-0.5">{product.name}</h4>
                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-base font-black text-slate-900">R$ {product.price.toFixed(2)}</p>
                          <div className="rounded-lg bg-slate-900 p-2 text-white shadow-lg shadow-slate-900/10">
                            <ShoppingBag size={14} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={() => setShowProducts(false)}
                  className="mt-8 w-full rounded-2xl bg-slate-900 py-4 text-xs font-bold text-white uppercase tracking-[0.2em] transition-all hover:bg-slate-800 active:scale-95 shadow-xl shadow-slate-900/20"
                >
                  Continuar Assistindo
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
