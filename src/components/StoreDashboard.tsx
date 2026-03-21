import React from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingBag, MessageSquare, TrendingUp, Package, 
  ArrowUpRight, Plus, FileText, Settings, LogOut,
  BarChart3, Users, Clock, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { User, QuoteRequest, MaterialQuote, Product } from '../types';
import { MOCK_MATERIAL_QUOTES, MOCK_PRODUCTS } from '../constants';

interface StoreDashboardProps {
  user: User;
  onLogout: () => void;
}

export const StoreDashboard: React.FC<StoreDashboardProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Cotações Ativas', value: MOCK_MATERIAL_QUOTES.length, icon: <MessageSquare size={20} />, color: 'bg-blue-500', lightColor: 'bg-blue-50', textColor: 'text-blue-600' },
    { label: 'Total Produtos', value: MOCK_PRODUCTS.filter(p => p.storeId === user.id).length, icon: <Package size={20} />, color: 'bg-accent', lightColor: 'bg-accent/10', textColor: 'text-accent' },
    { label: 'Vendas (Mes)', value: 'R$ 12.450', icon: <TrendingUp size={20} />, color: 'bg-amber-500', lightColor: 'bg-amber-50', textColor: 'text-amber-600' },
    { label: 'Visitantes', value: '1.240', icon: <Users size={20} />, color: 'bg-violet-500', lightColor: 'bg-violet-50', textColor: 'text-violet-600' },
  ];

  return (
    <div className="p-6 pb-32 space-y-8 max-w-lg mx-auto bg-background min-h-screen">
      {/* Welcome Header */}
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-primary tracking-tight">Painel do Parceiro</h1>
          <p className="text-sm font-medium text-slate-500">Olá, {user.name.split(' ')[0]} 👋</p>
        </div>
        <button 
          onClick={onLogout}
          className="p-4 bg-white border border-background text-red-500 rounded-lg shadow-sm transition-all active:scale-90"
          title="Sair"
        >
          <LogOut size={20} />
        </button>
      </section>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-5 rounded-xl border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)]"
          >
            <div className={`h-10 w-10 ${stat.lightColor} ${stat.textColor} rounded-lg flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
            <p className="text-xl font-black text-primary">{stat.value}</p>
          </motion.div>
        ))}
      </section>

      {/* Main Actions */}
      <section className="space-y-4">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Gerenciamento</h2>
        
        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={() => navigate('/store/products')}
            className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-xl text-primary shadow-xl shadow-slate-200/20 group transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 bg-accent rounded-lg flex items-center justify-center text-primary shadow-lg shadow-accent/20">
                <ShoppingBag size={28} />
              </div>
              <div className="text-left">
                <p className="font-black text-lg">Produtos</p>
                <p className="text-xs font-semibold text-slate-400">Ver e editar catálogo</p>
              </div>
            </div>
            <div className="h-10 w-10 bg-background rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ChevronRight size={20} />
            </div>
          </button>

          <button className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-xl text-primary shadow-xl shadow-slate-200/20 group transition-all active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                <MessageSquare size={28} />
              </div>
              <div className="text-left">
                <p className="font-black text-lg">Cotações</p>
                <p className="text-xs font-semibold text-slate-400">Responder orçamentos</p>
              </div>
            </div>
            <div className="h-10 w-10 bg-background rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ChevronRight size={20} />
            </div>
          </button>
        </div>
      </section>

      {/* Secondary Actions */}
      <section className="grid grid-cols-2 gap-3">
        <button className="flex flex-col items-start p-6 bg-white border border-slate-100 rounded-xl text-primary shadow-sm transition-all active:scale-95 hover:border-slate-300">
          <FileText size={20} className="mb-3 text-slate-400" />
          <p className="font-black text-sm uppercase tracking-wider">Relatórios</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PDF e CSV</p>
        </button>
        <button className="flex flex-col items-start p-6 bg-white border border-slate-100 rounded-xl text-primary shadow-sm transition-all active:scale-95 hover:border-slate-300">
          <Settings size={20} className="mb-3 text-slate-400" />
          <p className="font-black text-sm uppercase tracking-wider">Perfil</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Configuração</p>
        </button>
      </section>

      {/* Recent Activity Placeholder */}
      <section className="bg-white p-8 rounded-xl border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">Atividade Recente</h2>
          <Clock size={16} className="text-slate-300" />
        </div>
        <div className="space-y-8">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="h-2 w-2 rounded-full bg-accent mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-primary leading-tight">Nova resposta à cotação #MQ{123+i}</p>
                <p className="text-xs font-medium text-slate-400 mt-1">Gere o encarte da semana para divulgar!</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
