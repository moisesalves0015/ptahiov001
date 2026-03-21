import React from 'react';
import { 
  Instagram, Linkedin, Youtube, Mail, MapPin, Phone, 
  ChevronRight, Shield, HelpCircle, FileText, ExternalLink 
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-background pt-16 pb-8 px-6 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white shadow-lg">
                <span className="text-xl font-black italic">P</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-primary">ptah.io</span>
            </div>
            <p className="text-primary/50 text-sm leading-relaxed font-medium">
              A plataforma definitiva para conectar você aos especialistas verificados e materiais de alto padrão. Construa com excelência.
            </p>
            <div className="flex items-center gap-4">
              <button className="h-10 w-10 rounded-lg bg-background flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-all">
                <Instagram size={20} />
              </button>
              <button className="h-10 w-10 rounded-lg bg-background flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-all">
                <Linkedin size={20} />
              </button>
              <button className="h-10 w-10 rounded-lg bg-background flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-all">
                <Youtube size={20} />
              </button>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-primary font-black uppercase tracking-widest text-[10px] mb-6">Navegação</h4>
            <ul className="space-y-4">
              {['Home', 'Profissionais', 'Lojas', 'Marketplace', 'Feed'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-primary/50 hover:text-primary text-sm font-bold flex items-center gap-2 transition-colors">
                    <ChevronRight size={14} className="text-accent" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-primary font-black uppercase tracking-widest text-[10px] mb-6">Suporte</h4>
            <ul className="space-y-4">
              {[
                { name: 'FAQ', icon: <HelpCircle size={14} /> },
                { name: 'Segurança', icon: <Shield size={14} /> },
                { name: 'Termos de Uso', icon: <FileText size={14} /> },
                { name: 'Privacidade', icon: <Shield size={14} /> }
              ].map((item) => (
                <li key={item.name}>
                  <a href="#" className="text-primary/50 hover:text-primary text-sm font-bold flex items-center gap-2 transition-colors">
                    <span className="text-slate-400">{item.icon}</span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-primary font-black uppercase tracking-widest text-[10px] mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="text-accent mt-1" size={18} />
                <div>
                  <p className="text-primary text-sm font-black">E-mail</p>
                  <p className="text-primary/50 text-sm font-medium">contato@ptah.io</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-accent mt-1" size={18} />
                <div>
                  <p className="text-primary text-sm font-black">Localização</p>
                  <p className="text-primary/50 text-sm font-medium">São Paulo, Brasil</p>
                </div>
              </li>
              <li className="mt-6">
                <button className="w-full rounded-lg bg-primary py-4 px-6 text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                  Falar com Consultor
                  <ExternalLink size={14} />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            © {currentYear} ptah.io - Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-slate-300 text-[10px] font-black uppercase italic">Feito com excelência para a sua obra</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
