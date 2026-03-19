import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Search, FileDown, MoreVertical, Edit2, 
  Trash2, Filter, Package, ArrowLeft, ChevronRight,
  LayoutGrid, List as ListIcon, Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface ProductManagementProps {
  storeId: string;
  onGeneratePDF: (products: Product[]) => void;
}

export const ProductManagement: React.FC<ProductManagementProps> = ({ storeId, onGeneratePDF }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const products = MOCK_PRODUCTS.filter(p => p.storeId === storeId);
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 pb-32 space-y-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard/store')}
            className="p-3 bg-white border border-slate-100 rounded-lg text-slate-600 active:scale-90 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Seus Produtos</h1>
        </div>
        <button 
          onClick={() => navigate('/store/products/new')}
          className="p-4 bg-slate-900 text-accent rounded-lg shadow-xl shadow-slate-900/10 active:scale-90 transition-all"
        >
          <Plus size={20} />
        </button>
      </section>

      {/* Toolbar */}
      <section className="space-y-4">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Buscar nos seus produtos..."
            className="w-full bg-white border border-slate-100 rounded-lg py-5 pl-14 pr-5 text-sm font-medium outline-none focus:ring-2 focus:ring-accent/20 transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2 p-1.5 bg-white border border-slate-100 rounded-lg shadow-sm">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <ListIcon size={18} />
            </button>
          </div>

          <button 
            onClick={() => onGeneratePDF(filteredProducts)}
            className="flex items-center gap-2 px-6 py-3 bg-accent text-slate-900 rounded-lg text-xs font-black uppercase tracking-widest shadow-lg shadow-accent/10 active:scale-95 transition-all"
          >
            <FileDown size={18} />
            Gerar Encarte
          </button>
        </div>
      </section>

      {/* Grid/List View */}
      <section>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-xl border border-slate-100 shadow-sm">
            <div className="h-24 w-24 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-6 text-slate-200">
              <Package size={48} />
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Nenhum produto encontrado</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? "grid grid-cols-2 gap-4" : "space-y-4"}>
            <AnimatePresence>
              {filteredProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  layout
                  className={`bg-white border border-slate-100 group active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:border-accent/30 ${
                    viewMode === 'grid' ? 'rounded-xl p-4 flex flex-col' : 'rounded-xl p-5 flex items-center gap-5'
                  }`}
                >
                  <div className={`relative overflow-hidden rounded-lg bg-slate-50 ${viewMode === 'grid' ? 'aspect-square mb-4' : 'h-20 w-20 flex-shrink-0'}`}>
                    <img 
                      src={p.image} 
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={p.name} 
                    />
                    {p.rating && viewMode === 'grid' && (
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
                        <Star size={10} className="fill-amber-400 text-amber-400" />
                        <span className="text-[10px] font-black text-slate-900">{p.rating}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className={`font-black text-slate-900 leading-tight mb-3 tracking-tight ${viewMode === 'grid' ? 'text-sm' : 'text-lg'}`}>{p.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-black text-slate-900">R$ {p.price.toFixed(2)}</p>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-all">
                          <Edit2 size={18} />
                        </button>
                        <button className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Stats Summary */}
      <section className="bg-slate-900 rounded-xl p-8 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
        <div className="flex items-center gap-4 mb-4">
          <div className="h-10 w-10 bg-accent text-slate-900 rounded-lg flex items-center justify-center">
            <Package size={20} />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-accent">Resumo do Estoque</h3>
        </div>
        <p className="text-sm font-medium text-slate-400 leading-relaxed">
          Você tem <span className="text-white font-black">{products.length} produtos</span> ativos. O encarte PDF incluirá os filtros atuais para facilitar sua divulgação no WhatsApp.
        </p>
      </section>
    </div>
  );
};
