import React from 'react';
import { ShoppingBag, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
  key?: React.Key;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick?.(product)}
      className="group cursor-pointer overflow-hidden rounded-lg border border-background bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-background">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          <span className="rounded-md bg-red-500 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-sm">
            -15%
          </span>
        </div>
      </div>
      
      <div className="p-3">
        <p className="text-[10px] font-medium text-primary/40 truncate">{product.storeName}</p>
        <h3 className="mt-0.5 truncate text-sm font-semibold text-primary">{product.name}</h3>
        
        <div className="mt-2 flex items-baseline gap-1.5 whitespace-nowrap">
          <span className="text-base font-bold text-primary">R$ {product.price.toFixed(2)}</span>
          <span className="text-[10px] text-primary/40 line-through">R$ {(product.price * 1.15).toFixed(2)}</span>
        </div>

        <button className="mt-3 w-full rounded-md bg-primary py-2 text-[10px] font-bold text-white transition-all active:scale-95 whitespace-nowrap truncate">
          Comprar
        </button>
      </div>
    </motion.div>
  );
}
