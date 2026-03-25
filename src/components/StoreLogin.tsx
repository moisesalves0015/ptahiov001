import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Mail, Lock, Store as StoreIcon, ArrowRight, UserPlus, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StoreLoginProps {
  onLogin: () => void;
}

export const StoreLogin: React.FC<StoreLoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeName, setStoreName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Botão Acessar Painel clicado no formulário!');
    onLogin();
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col relative overflow-hidden font-sans">
      {/* Background Decorations */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 p-6 flex items-center justify-between">
        <button 
          onClick={() => navigate('/profile')}
          className="p-3 bg-white border border-border rounded-lg text-primary/60 hover:bg-background transition-all active:scale-90 shadow-sm"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-primary rounded-md flex items-center justify-center text-accent shadow-lg shadow-primary/10">
            <StoreIcon size={22} />
          </div>
          <span className="text-xl font-black text-primary italic uppercase">ObraBase <span className="text-secondary not-italic">Lojas</span></span>
        </div>
        <div className="w-12" />
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-32">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl font-black text-primary leading-tight mb-4 tracking-tight">
              Impulsione suas <br />
              <span className="text-accent">vendas na obra.</span>
            </h1>
            <p className="text-primary/60 font-medium">
              Venda materiais, responda cotações e gere encartes profissionais para o WhatsApp da sua loja.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-border rounded-lg p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)]"
          >
            {/* Tabs */}
            <div className="flex p-1 bg-background rounded-lg mb-8">
              <button 
                onClick={() => setIsRegistering(false)}
                className={`flex-1 py-3 rounded-md text-xs font-black uppercase tracking-widest transition-all ${!isRegistering ? 'bg-white text-primary shadow-md' : 'text-primary/40'}`}
              >
                Entrar
              </button>
              <button 
                onClick={() => setIsRegistering(true)}
                className={`flex-1 py-3 rounded-md text-xs font-black uppercase tracking-widest transition-all ${isRegistering ? 'bg-white text-primary shadow-md' : 'text-primary/40'}`}
              >
                Cadastrar
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {isRegistering && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em] ml-2">Nome da Loja</label>
                  <div className="relative">
                    <StoreIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                    <input 
                      type="text"
                      required
                      placeholder="Ex: Madeireira Silva"
                      className="w-full bg-muted border border-border rounded-lg py-4 pl-12 pr-4 text-primary outline-none focus:ring-2 focus:ring-secondary/20 transition-all font-medium"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em] ml-2">Email Empresarial</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                  <input 
                    type="email"
                    required
                    placeholder="contato@sualoja.com"
                    className="w-full bg-background border border-border rounded-lg py-4 pl-12 pr-4 text-primary outline-none focus:ring-2 focus:ring-secondary/20 transition-all font-medium"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-2">
                  <label className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">Senha</label>
                  {!isRegistering && <button type="button" className="text-[10px] font-bold text-accent uppercase tracking-widest">Esqueceu?</button>}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                  <input 
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full bg-background border border-border rounded-lg py-4 pl-12 pr-4 text-primary outline-none focus:ring-2 focus:ring-secondary/20 transition-all font-medium"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-black py-5 rounded-lg flex items-center justify-center gap-2 shadow-xl shadow-primary/10 transition-all active:scale-95 group"
              >
                {isRegistering ? 'Criar Conta da Loja' : 'Acessar Painel'}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-border">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <CheckCircle2 size={18} className="text-accent" />
                  </div>
                  <span className="text-[9px] font-black text-primary/40 uppercase tracking-widest leading-tight">Cotações On</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <UserPlus size={18} />
                  </div>
                  <span className="text-[9px] font-black text-primary/40 uppercase tracking-widest leading-tight">Catalogo Pro</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <p className="mt-8 text-center text-[10px] font-bold text-primary/40 uppercase tracking-widest">
            Ao continuar, você concorda com nossos <br />
            <a href="#" className="text-primary/60 underline">Termos</a> e <a href="#" className="text-primary/60 underline">Política de Privacidade</a>
          </p>
        </div>
      </main>
    </div>
  );
};
