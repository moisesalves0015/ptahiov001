import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Camera, Upload, Tag, DollarSign, 
  AlignLeft, Save, X, Trash2, Check, Package,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';

interface ProductFormProps {
  product?: Product; // If provided, we are editing
  onSave: (product: Partial<Product>) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onSave }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: '',
      price: 0,
      description: '',
      image: '',
      images: []
    }
  );
  const [previews, setPreviews] = useState<string[]>(product?.images || (product?.image ? [product.image] : []));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    navigate('/store/products');
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(/[^0-9.]/g, ''));
    setFormData({ ...formData, price: isNaN(value) ? 0 : value });
  };

  return (
    <div className="p-6 pb-24 space-y-8 max-w-lg mx-auto bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-600 active:scale-90 transition-all shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          {product ? 'Editar Produto' : 'Novo Produto'}
        </h1>
      </section>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Photo Upload Section */}
        <section className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Fotos do Produto</label>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            <button 
              type="button"
              className="h-32 w-32 flex-shrink-0 bg-white border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-accent hover:text-accent transition-all active:scale-95 shadow-sm"
            >
              <Camera size={24} />
              <span className="text-[10px] font-black uppercase tracking-widest">Adicionar</span>
            </button>
            
            {previews.map((src, i) => (
              <div key={i} className="relative h-32 w-32 flex-shrink-0 rounded-[2rem] overflow-hidden group shadow-md">
                <img src={src} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Preview ${i}`} />
                <button 
                  type="button"
                  onClick={() => setPreviews(prev => prev.filter((_, idx) => idx !== i))}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm text-red-500 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Basic Info */}
        <section className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Nome do Produto</label>
            <div className="relative">
              <Package className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              <input 
                type="text"
                required
                placeholder="Ex: Porcelanato Retificado 60x60"
                className="w-full bg-white border border-slate-100 rounded-2xl py-5 pl-14 pr-5 text-slate-900 outline-none focus:ring-2 focus:ring-accent/20 transition-all font-semibold shadow-sm placeholder:text-slate-300"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Preço (R$)</label>
              <div className="relative">
                <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input 
                  type="number"
                  required
                  step="0.01"
                  placeholder="0,00"
                  className="w-full bg-white border border-slate-100 rounded-2xl py-5 pl-14 pr-5 text-slate-900 outline-none focus:ring-2 focus:ring-accent/20 transition-all font-black shadow-sm"
                  value={formData.price || ''}
                  onChange={handlePriceChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Unidade</label>
              <div className="relative">
                <select className="w-full bg-white border border-slate-100 rounded-2xl py-5 px-5 text-slate-900 outline-none focus:ring-2 focus:ring-accent/20 transition-all font-semibold shadow-sm appearance-none">
                  <option>Unidade (un)</option>
                  <option>Metro (m)</option>
                  <option>Metro Quadrado (m²)</option>
                  <option>Caixa (cx)</option>
                  <option>Saco (sc)</option>
                </select>
                <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 rotate-90" size={18} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Descrição Detalhada</label>
            <div className="relative">
              <AlignLeft className="absolute left-5 top-5 text-slate-300" size={20} />
              <textarea 
                placeholder="Descreva as especificações técnicas, marca, cores disponíveis..."
                className="w-full bg-white border border-slate-100 rounded-[2rem] py-5 pl-14 pr-5 text-slate-900 outline-none focus:ring-2 focus:ring-accent/20 transition-all font-medium h-40 resize-none shadow-sm placeholder:text-slate-300"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Categoria</label>
            <div className="flex flex-wrap gap-2">
              {['Materiais Brutos', 'Hidráulica', 'Elétrica', 'Pisos', 'Ferramentas', 'Pintura'].map(cat => (
                <button 
                  key={cat}
                  type="button"
                  className="rounded-xl px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.1em] transition-all bg-white border border-slate-100 text-slate-400 hover:border-slate-900 hover:text-slate-900 active:scale-95 shadow-sm"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="flex gap-4">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 py-5 rounded-2xl bg-white border border-slate-100 text-slate-400 font-black uppercase tracking-widest text-xs active:scale-95 transition-all shadow-sm"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            className="flex-[2] py-5 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-slate-900/20 active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <Save size={18} className="group-hover:scale-110 transition-transform" />
            {product ? 'Salvar Alterações' : 'Cadastrar Produto'}
          </button>
        </section>
      </form>

      {/* Security Tip */}
      <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
        <div className="flex items-center gap-4 mb-4">
          <div className="h-10 w-10 bg-accent/10 text-accent rounded-full flex items-center justify-center">
            <Check size={20} strokeWidth={3} />
          </div>
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Dica de Vendas</h3>
        </div>
        <p className="text-sm font-semibold text-slate-400 leading-relaxed">
          Produtos com <span className="text-slate-900">descrição detalhada</span> e <span className="text-slate-900">fotos reais</span> têm 3x mais chances de serem escolhidos em cotações.
        </p>
      </section>
    </div>
  );
};
