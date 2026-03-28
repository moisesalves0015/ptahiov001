import React, { useState, useRef, useEffect } from 'react';
import { Bookmark, Share2, ShoppingBag, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { VideoPost, Product } from '../types';

interface VideoCardProps {
  post: VideoPost;
  isActive: boolean;
  onProductClick?: (product: Product) => void;
  key?: React.Key;
}

const isYouTubeUrl = (url: string) =>
  url.includes('youtube.com/embed') || url.includes('youtu.be');

// Small professional success chime (base64)
const CHIME_SOUND = 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YTdvT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19v';

export function VideoCard({ post, isActive, onProductClick }: VideoCardProps) {
  const [showProducts, setShowProducts] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showNotification, setShowNotification] = useState(true);
  const [activeEvent, setActiveEvent] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isYT = isYouTubeUrl(post.videoUrl);

  const events = [
    { user: 'Carlos', action: 'economizou R$ 540 no Kit Elétrico!' },
    { user: 'Ricardo', action: 'contratou Pedreiro em 3 min!' },
    { user: 'SUL Materiais', action: 'com 15 pessoas comprando agora!' },
    { user: 'Ana', action: 'recebeu 5 orçamentos p/ Pintura!' },
    { user: 'Marcos', action: 'acabou de fechar Obra em SP!' }
  ];

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEvent((prev) => (prev + 1) % events.length);
    }, 30000);
    return () => clearInterval(interval);
  }, [events.length]);

  useEffect(() => {
    setShowNotification(true);
    const timer = setTimeout(() => setShowNotification(false), 8000);
    return () => clearTimeout(timer);
  }, [activeEvent]);

  useEffect(() => {
    if (showNotification && isActive) {
      // Sound - ONLY if NOT muted
      if (!isMuted) {
        const audio = new Audio(CHIME_SOUND);
        audio.volume = 0.15;
        audio.play().catch(() => {});
      }
      
      // Confetti - ALWAYS on new notification
      const colors = ['#F8D613', '#0248C1', '#111835', '#FFFFFF'];
      const defaults = { 
        origin: { y: 0.1 }, 
        colors, 
        spread: 60, 
        ticks: 120, 
        gravity: 1.2, 
        scalar: 0.9,
        zIndex: 10000
      };
      
      confetti({ ...defaults, particleCount: 40, origin: { x: 0.2, y: 0.1 } });
      confetti({ ...defaults, particleCount: 40, origin: { x: 0.5, y: 0.1 } });
      confetti({ ...defaults, particleCount: 40, origin: { x: 0.8, y: 0.1 } });
    }
  }, [showNotification, isActive, isMuted]);

  useEffect(() => {
    if (isYT && iframeRef.current) {
      const command = isMuted ? 'mute' : 'unMute';
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: command, args: [] }),
        '*'
      );
    }
  }, [isMuted, isYT, isActive]);

  useEffect(() => {
    if (!isYT && videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive, isYT]);

  const hasProducts = post.products && post.products.length > 0;

  return (
    <div className="relative h-full w-full snap-start snap-always overflow-hidden bg-black">

      {/* ── Mídia ── */}
      {isYT ? (
        <div className="absolute inset-x-0 -top-[8%] -bottom-[8%] overflow-hidden pointer-events-none">
          <iframe
            ref={iframeRef}
            src={`${post.videoUrl}?autoplay=${isActive ? 1 : 0}&mute=1&loop=1&controls=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1`}
            className="h-full w-full scale-[1.16]"
            allow="autoplay; fullscreen"
            allowFullScreen
            title={post.description}
          />
        </div>
      ) : (
        <video
          ref={videoRef}
          src={post.videoUrl}
          loop
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          className="h-full w-full object-cover"
          playsInline
        />
      )}

      {/* ── Topo Premium (Live Notification) ── */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-start justify-between p-6 pt-12 pointer-events-none">
        <div className="flex flex-col gap-2">
          <AnimatePresence mode="wait">
            {showNotification && (
              <motion.div
                key={activeEvent}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                className="flex items-center gap-3 rounded-xl bg-zinc-950/80 border border-white/10 pl-2 pr-4 py-2 backdrop-blur-2xl shadow-2xl"
              >
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
                  <div className="absolute inset-0 rounded-lg bg-accent/20 animate-ping" />
                  <div className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_#F8D613]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-tighter leading-none mb-0.5">Live agora</span>
                  <p className="text-[11px] font-bold text-white leading-tight">
                    <span className="text-accent">{events[activeEvent].user}</span> {events[activeEvent].action}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <button
          onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-950/60 p-2 backdrop-blur-xl border border-white/10 active:scale-95 transition-all shadow-lg hover:bg-zinc-900/80"
        >
          {isMuted
            ? <VolumeX size={20} className="text-white/70" />
            : <Volume2 size={20} className="text-accent" />}
        </button>
      </div>

      {/* ── Overlay inferior (autor + descrição) ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black via-black/60 to-transparent px-6 pb-[100px] lg:pb-12 pt-40 text-white pointer-events-none transition-all">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 overflow-hidden rounded-full border-2 border-accent/30 p-0.5 flex-shrink-0 shadow-2xl shadow-accent/10 bg-zinc-900">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="h-full w-full rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-bold text-base tracking-tight drop-shadow-md">
            @{post.user.handle || post.user.name}
          </span>
        </div>
        <p className="mt-3 text-sm font-medium leading-relaxed max-w-[85%] line-clamp-2 text-white drop-shadow-md">
          {post.description}
        </p>
      </div>

      {/* ── Sidebar de ações (Salvar / Compartilhar / Produtos) ── */}
      <div className="absolute bottom-[120px] lg:bottom-16 right-4 z-20 flex flex-col items-center gap-5 transition-all pointer-events-auto">
        {/* Salvar */}
        <div className="flex flex-col items-center gap-1.5">
          <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-2xl border border-white/10 ring-1 ring-white/5 active:scale-90 transition-all shadow-xl hover:bg-white/20">
            <Bookmark size={22} className="text-white/90" />
          </button>
          <span className="text-[10px] font-black text-white/60 uppercase tracking-tighter drop-shadow-lg">Salvar</span>
        </div>

        {/* Compartilhar */}
        <div className="flex flex-col items-center gap-1.5">
          <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-2xl border border-white/10 ring-1 ring-white/5 active:scale-90 transition-all shadow-xl hover:bg-white/20">
            <Share2 size={22} className="text-white/90" />
          </button>
          <span className="text-[10px] font-black text-white/60 uppercase tracking-tighter drop-shadow-lg">Enviar</span>
        </div>

        {/* Ver Produtos */}
        <div className="flex flex-col items-center gap-1.5">
          <button
            onClick={(e) => { e.stopPropagation(); setShowProducts(true); }}
            className={`flex h-12 w-12 items-center justify-center rounded-xl backdrop-blur-2xl border ring-1 transition-all shadow-xl active:scale-90 hover:scale-105 ${
              hasProducts
                ? 'bg-accent text-primary border-accent ring-accent/20'
                : 'bg-white/10 text-white/40 border-white/10 ring-white/5'
            }`}
          >
            <ShoppingBag size={22} />
          </button>
          <span className="text-[10px] font-black text-white/60 uppercase tracking-tighter drop-shadow-lg">Itens</span>
        </div>
      </div>

      {/* ── Barra de progresso (só mp4) ── */}
      {!isYT && (
        <div className="absolute bottom-0 left-0 right-0 z-30 h-[2px] bg-white/10">
          <motion.div className="h-full bg-white/60" style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* ── Modal de Produtos ── */}
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
              className="absolute bottom-20 lg:bottom-0 left-0 right-0 z-50 rounded-2xl lg:rounded-b-none bg-white shadow-2xl overflow-hidden"
            >
              <div className="px-8 pt-4 pb-8">
                <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-border" />
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-primary tracking-tight">Produtos Utilizados</h3>
                    <p className="text-xs text-primary/60 mt-1">Toque para ver detalhes e comprar</p>
                  </div>
                  <span className="rounded-md bg-background px-3 py-1 text-[10px] font-bold text-primary/60 uppercase tracking-widest">
                    {post.products?.length} {post.products?.length === 1 ? 'item' : 'itens'}
                  </span>
                </div>

                <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto no-scrollbar">
                  {post.products?.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => { onProductClick?.(product); setShowProducts(false); }}
                      className="group flex cursor-pointer items-center gap-4 rounded-lg border border-border p-3 transition-all hover:bg-background active:scale-[0.98]"
                    >
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-background">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="text-[9px] font-bold text-secondary uppercase tracking-widest truncate">{product.storeName}</p>
                        <h4 className="font-bold text-primary text-sm truncate mt-0.5">{product.name}</h4>
                        <div className="mt-2 flex items-center justify-between">
                           <p className="text-base font-black text-primary">R$ {product.price.toFixed(2)}</p>
                          <div className="rounded-lg bg-primary p-2 text-white shadow-lg shadow-primary/10">
                            <ShoppingBag size={14} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowProducts(false)}
                   className="mt-6 w-full rounded-lg bg-primary py-4 text-xs font-bold text-white uppercase tracking-[0.2em] transition-all hover:bg-primary/90 active:scale-95 shadow-xl shadow-primary/20"
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
