import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import { 
  Search, Bell, Menu, ArrowLeft, Filter, Map as MapIcon, List, User as UserIcon,
  Camera, Upload, X, Check, ShoppingBag, Store as StoreIcon, Tag, Zap, Film,
  ChevronRight, Search as SearchIcon, Heart, MapPin, CheckCircle2, Star 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppView, Professional, User, UserRole, Store, Product } from './types';
import { BottomNav } from './components/BottomNav';
import { VideoCard } from './components/VideoCard';
import { ProfessionalCard } from './components/ProfessionalCard';
import { ProductCard } from './components/ProductCard';
import { QuoteCard } from './components/QuoteCard';
import { MaterialQuoteCard } from './components/MaterialQuoteCard';
import { BannerCarousel } from './components/BannerCarousel';
import { StoreCard } from './components/StoreCard';
import { ReviewList } from './components/ReviewList';
import { AlbumCarousel } from './components/AlbumCarousel';
import { ScrollToTop } from './components/ScrollToTop';
import { StoreLogin } from './components/StoreLogin';
import { StoreDashboard } from './components/StoreDashboard';
import { ProductManagement } from './components/ProductManagement';
import { ProductForm } from './components/ProductForm';
import { generateEncartePDF } from './components/EncarteGenerator';
import { MOCK_VIDEOS, MOCK_PROFESSIONALS, MOCK_QUOTES, MOCK_MATERIAL_QUOTES, MOCK_BANNERS, MOCK_STORES, MOCK_PRODUCTS } from './constants';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('ptah_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Erro ao carregar usuário do localStorage', e);
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('ptah_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ptah_user');
    }
  }, [user]);
  
  // Derive currentView from pathname
  const currentView = ((): AppView => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/feed') return 'feed';
    if (path === '/search') return 'search';
    if (path === '/notifications') return 'notifications';
    if (path === '/profile') return 'profile';
    if (path.startsWith('/professional/')) return 'professional-detail';
    if (path === '/dashboard') return 'dashboard';
    if (path === '/photo-request') return 'photo-request';
    if (path === '/marketplace') return 'marketplace';
    if (path.startsWith('/store/')) return 'store-detail';
    if (path.startsWith('/product/')) return 'product-detail';
    if (path === '/all-professionals') return 'all-professionals';
    if (path === '/all-stores') return 'all-stores';
    if (path === '/all-categories') return 'all-categories';
    if (path === '/login/store') return 'login-store';
    if (path === '/dashboard/store') return 'dashboard-store';
    if (path === '/store/products') return 'store-products';
    if (path === '/store/products/new') return 'store-products-new';
    return 'home';
  })();

  const [searchTab, setSearchTab] = useState<'profissionais' | 'produtos'>('profissionais');
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [photoRequestData, setPhotoRequestData] = useState({ description: '', photos: [] as string[] });
  const feedContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentView === 'feed' && feedContainerRef.current) {
      const container = feedContainerRef.current;
      const targetScroll = activeVideoIndex * container.clientHeight;
      container.scrollTo({ top: targetScroll, behavior: 'auto' });
    }
  }, [currentView, activeVideoIndex]);

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  const handleLogin = (role: UserRole, isExplicit = false, redirectTo?: string) => {
    if (role === 'store' && !isExplicit) {
      navigate('/login/store');
      return;
    }

    const mockUser: User = {
      id: role === 'store' ? 's1' : (role === 'professional' ? 'p1' : 'u1'),
      name: role === 'client' ? 'Carlos Cliente' : role === 'professional' ? 'João Silva' : 'Loja Construir',
      avatar: `https://i.pravatar.cc/150?u=${role}`,
      role: role,
      handle: role === 'client' ? 'carlos_c' : role === 'professional' ? 'joao_obras' : 'loja_construir'
    };
    setUser(mockUser);
    navigate(redirectTo || '/');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleVideoClick = (index: number) => {
    setActiveVideoIndex(index);
    navigate('/feed');
  };

  const handleViewChange = (view: AppView) => {
    const viewToPath: Record<AppView, string> = {
      'home': '/',
      'feed': '/feed',
      'search': '/search',
      'notifications': '/notifications',
      'profile': '/profile',
      'professional-detail': '/professional/p1', // Default or handled by ID
      'dashboard': '/dashboard',
      'photo-request': '/photo-request',
      'marketplace': '/marketplace',
      'store-detail': '/store/s1',
      'product-detail': '/product/pr1',
      'all-professionals': '/all-professionals',
      'all-stores': '/all-stores',
      'all-categories': '/all-categories',
      'login-store': '/login/store',
      'dashboard-store': '/dashboard/store',
      'store-products': '/store/products',
      'store-products-new': '/store/products/new'
    };
    navigate(viewToPath[view]);
  };

  const handleProfessionalClick = (id: string) => {
    navigate(`/professional/${id}`);
  };

  const handleStoreClick = (id: string) => {
    navigate(`/store/${id}`);
  };

  // Feed Scroll Logic
  const handleFeedScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const height = e.currentTarget.clientHeight;
    const index = Math.round(scrollTop / height);
    if (index !== activeVideoIndex) {
      setActiveVideoIndex(index);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background font-sans">
      <ScrollToTop />
      {/* Header - Hidden on Feed View */}
      {currentView !== 'feed' && (
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-100 bg-white/90 px-6 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            {['professional-detail', 'store-detail', 'photo-request', 'all-professionals', 'all-stores', 'all-categories', 'product-detail', 'store-products', 'store-products-new'].includes(currentView) || location.pathname.startsWith('/store/') || location.pathname.startsWith('/product/') ? (
              <button 
                onClick={() => navigate(-1)}
                className="rounded-full p-2 hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft size={24} className="text-slate-900" />
              </button>
            ) : (
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-slate-900 text-white shadow-lg transition-transform group-active:scale-95">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/40 to-transparent opacity-50" />
                  <span className="relative text-xl font-black italic">P</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tight text-slate-900 leading-none">ptah.io</span>
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-accent leading-none mt-1">Materiais e profissionais</span>
                </div>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2.5 text-slate-600 hover:bg-slate-100 transition-colors">
              <Bell size={22} />
              <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-black text-slate-900 ring-2 ring-white">
                3
              </span>
            </button>
            
            {user ? (
              <button 
                onClick={() => handleViewChange('profile')}
                className="h-10 w-10 overflow-hidden rounded-xl border-2 border-slate-100 shadow-sm transition-transform active:scale-95"
              >
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              </button>
            ) : (
              <button 
                onClick={() => handleViewChange('profile')}
                className="rounded-xl bg-slate-900 px-6 py-2.5 text-xs font-black text-white shadow-lg shadow-slate-900/20 transition-all active:scale-95 hover:bg-slate-800"
              >
                Entrar
              </button>
            )}
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className={`h-full w-full ${currentView === 'feed' ? 'no-scrollbar overflow-hidden' : 'overflow-y-auto pb-20'}`}>
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route path="/" element={
              <motion.div
                key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 space-y-10 pb-24"
            >
              {(!user || user.role === 'client') && (
                <>
                  {/* Hero Section for Clients */}
                  <section className="overflow-hidden rounded-3xl bg-primary p-8 text-white shadow-xl relative">
                    <div className="relative z-10">
                      <h1 className="text-4xl font-black leading-[1.1] tracking-tight">
                        Construa com <br />
                        <span className="text-accent">excelência.</span>
                      </h1>
                      <p className="mt-4 text-sm font-medium text-slate-300 max-w-[240px]">
                        A plataforma definitiva para conectar você aos melhores especialistas.
                      </p>
                      <div className="mt-8 flex flex-col gap-3">
                        <button 
                          onClick={() => handleViewChange('search')}
                          className="w-full rounded-2xl bg-white py-4 font-black text-primary shadow-lg transition-all active:scale-95 hover:bg-slate-100"
                        >
                          Encontrar Especialista
                        </button>
                        <button 
                          onClick={() => handleViewChange('photo-request')}
                          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-white/10 py-4 font-black text-white backdrop-blur-md transition-all active:scale-95 hover:bg-white/20 border border-white/10"
                        >
                          <Camera size={20} className="text-accent" />
                          Orçamento por Foto
                        </button>
                      </div>
                    </div>
                    {/* Abstract background elements */}
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
                    <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />
                  </section>

                  {/* Direct Communication Incentives */}
                  <section className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl">
                    <h2 className="text-lg font-black leading-tight">Sua obra sem estresse começa aqui.</h2>
                    <div className="mt-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-slate-900">
                          <Check size={12} strokeWidth={4} />
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-accent">Contratação 100% Segura</p>
                          <p className="mt-0.5 text-[10px] font-medium text-slate-400">Você só libera o pagamento após a conclusão do serviço.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-slate-900">
                          <Check size={12} strokeWidth={4} />
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-accent">Especialistas Verificados</p>
                          <p className="mt-0.5 text-[10px] font-medium text-slate-400">Analisamos documentos e referências de cada profissional para você.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-slate-900">
                          <Check size={12} strokeWidth={4} />
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-accent">Materiais com Garantia</p>
                          <p className="mt-0.5 text-[10px] font-medium text-slate-400">Compre tudo o que precisa com a segurança e entrega do ptah.io.</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Banners */}
                  <section>
                    <BannerCarousel banners={MOCK_BANNERS} onBannerClick={(link) => handleViewChange(link as any)} />
                  </section>

                    {/* Categories */}
                    <section>
                      <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-xl font-black text-slate-900">Categorias</h2>
                        <button 
                          onClick={() => handleViewChange('all-categories')}
                          className="text-xs font-black text-accent uppercase tracking-widest flex items-center gap-1"
                        >
                          Ver todas <ChevronRight size={14} />
                        </button>
                      </div>
                      <div className="flex gap-5 overflow-x-auto no-scrollbar pb-2">
                        {[
                          { name: 'Pedreiro', icon: '🏗️' },
                          { name: 'Pintor', icon: '🎨' },
                          { name: 'Elétrica', icon: '⚡' },
                          { name: 'Hidráulica', icon: '🚰' },
                          { name: 'Marceneiro', icon: '🪚' },
                          { name: 'Gesso', icon: '🧱' },
                          { name: 'Telhado', icon: '🏠' }
                        ].map((cat) => (
                          <button key={cat.name} className="flex flex-col items-center gap-3 flex-shrink-0 group">
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-100 bg-white text-2xl shadow-sm transition-all active:scale-95 hover:shadow-md">
                              {cat.icon}
                            </div>
                            <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">{cat.name}</span>
                          </button>
                        ))}
                      </div>
                    </section>

                    {/* Video Inspirations */}
                    <section>
                      <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-xl font-black text-slate-900">Inspirações</h2>
                        <button 
                          onClick={() => handleViewChange('feed')}
                          className="text-xs font-black text-accent uppercase tracking-widest flex items-center gap-1"
                        >
                          Ver feed <ChevronRight size={14} />
                        </button>
                      </div>
                      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                        {MOCK_VIDEOS.map((video, index) => (
                          <button 
                            key={video.id}
                            onClick={() => handleVideoClick(index)}
                            className="relative h-64 w-44 flex-shrink-0 overflow-hidden rounded-3xl bg-slate-100 shadow-md transition-all active:scale-95"
                          >
                            <img 
                              src={video.thumbnail || "https://picsum.photos/seed/video/400/600"} 
                              className="h-full w-full object-cover" 
                              alt={video.description}
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4 text-left">
                              <p className="text-[10px] font-black text-white/80 uppercase tracking-widest">@{video.user.handle}</p>
                              <p className="mt-1 text-xs font-bold text-white line-clamp-1">{video.description}</p>
                            </div>
                            <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/20">
                              <Film size={14} className="text-white" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </section>

                  {/* Flash Deals / Offers */}
                  <section className="bg-emerald-50/50 -mx-4 p-6 rounded-3xl border border-emerald-100">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap size={20} className="text-accent fill-accent" />
                        <h2 className="text-xl font-black text-slate-900">Ofertas Relâmpago</h2>
                      </div>
                      <div className="flex items-center gap-2 bg-accent text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                        02:45:12
                      </div>
                    </div>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                      {MOCK_PRODUCTS.slice(0, 4).map((product) => (
                        <div key={product.id} className="w-40 flex-shrink-0">
                          <ProductCard product={product} onClick={handleProductClick} />
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Featured Professionals */}
                  <section>
                    <div className="mb-5 flex items-center justify-between">
                      <h2 className="text-xl font-black text-slate-900">Especialistas Top</h2>
                      <button 
                        onClick={() => handleViewChange('all-professionals')}
                        className="text-xs font-black text-accent uppercase tracking-widest flex items-center gap-1"
                      >
                        Ver todos <ChevronRight size={14} />
                      </button>
                    </div>
                    <div className="flex flex-col gap-5">
                      {MOCK_PROFESSIONALS.map((prof) => (
                        <ProfessionalCard 
                          key={prof.id} 
                          professional={prof} 
                          onClick={handleProfessionalClick} 
                        />
                      ))}
                    </div>
                  </section>

                  {/* Ad Banner 1 */}
                  <section className="relative h-32 overflow-hidden rounded-[2rem] bg-slate-900">
                    <img src="https://picsum.photos/seed/ad1/800/200" className="h-full w-full object-cover opacity-60" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                      <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">Patrocinado</span>
                      <h3 className="text-lg font-black text-white">Reforme sua cozinha com 20% OFF</h3>
                      <button className="mt-2 rounded-full bg-white px-4 py-1 text-[10px] font-black uppercase text-slate-900">Saiba mais</button>
                    </div>
                  </section>

                  {/* Featured Stores */}
                  <section>
                    <div className="mb-5 flex items-center justify-between">
                      <h2 className="text-xl font-black text-slate-900">Lojas Parceiras</h2>
                      <button 
                        onClick={() => handleViewChange('all-stores')}
                        className="text-xs font-black text-accent uppercase tracking-widest flex items-center gap-1"
                      >
                        Ver todas <ChevronRight size={14} />
                      </button>
                    </div>
                    <div className="flex flex-col gap-4">
                      {MOCK_STORES.map((store) => (
                        <StoreCard 
                          key={store.id} 
                          store={store} 
                          onClick={(id) => {
                          handleStoreClick(id);
                        }} 
                        />
                      ))}
                    </div>
                  </section>

                  {/* Marketplace Feed */}
                  <section>
                    <div className="mb-5 flex items-center justify-between">
                      <h2 className="text-xl font-black text-slate-900">Marketplace</h2>
                      <div className="flex gap-2">
                        <button className="p-2 bg-slate-100 rounded-xl text-slate-600"><Tag size={18} /></button>
                        <button className="p-2 bg-slate-100 rounded-xl text-slate-600"><Filter size={18} /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {MOCK_PRODUCTS.map((product) => (
                        <ProductCard key={product.id} product={product} onClick={handleProductClick} />
                      ))}
                    </div>
                    <button 
                      onClick={() => handleViewChange('marketplace')}
                      className="mt-8 w-full rounded-2xl bg-slate-900 py-4 font-black text-white shadow-xl transition-all active:scale-95"
                    >
                      Ver Mais Produtos
                    </button>
                  </section>
                </>
              )}

              {user?.role === 'professional' && (
                <>
                  <section className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900">Olá, {user.name.split(' ')[0]}!</h1>
                    <p className="text-slate-500 font-medium">Você tem novas propostas para responder.</p>
                  </section>

                  <section className="mb-10">
                    <div className="mb-5 flex items-center justify-between">
                      <h2 className="text-xl font-black text-slate-900">Propostas Pendentes</h2>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">
                        {MOCK_QUOTES.length} novas
                      </span>
                    </div>
                    <div className="flex flex-col gap-4">
                      {MOCK_QUOTES.map((quote) => (
                        <QuoteCard key={quote.id} quote={quote} />
                      ))}
                    </div>
                  </section>

                  <section className="mb-10">
                    <div className="mb-5 flex items-center justify-between">
                      <h2 className="text-xl font-black text-slate-900">Equipamentos em Oferta</h2>
                      <button 
                        onClick={() => handleViewChange('marketplace')}
                        className="text-xs font-black text-accent uppercase tracking-widest"
                      >
                        Ver todos
                      </button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                      {MOCK_PRODUCTS.filter(p => p.storeId === 's1').map((product) => (
                        <div key={product.id} className="w-40 flex-shrink-0">
                          <ProductCard product={product} onClick={handleProductClick} />
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="mb-10">
                    <h2 className="mb-5 text-xl font-black text-slate-900">Suas Obras Ativas</h2>
                    <div className="rounded-3xl border-2 border-dashed border-slate-200 p-8 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                        <Check size={32} />
                      </div>
                      <p className="text-sm font-bold text-slate-500">Nenhuma obra em andamento no momento.</p>
                      <button className="mt-4 text-xs font-black text-primary uppercase tracking-widest">Ver histórico</button>
                    </div>
                  </section>
                </>
              )}

              {user?.role === 'store' && (
                <>
                  <section className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900">Painel da Loja</h1>
                    <p className="text-slate-500 font-medium">Gerencie suas cotações e vendas.</p>
                  </section>

                  <section className="mb-10">
                    <div className="mb-5 flex items-center justify-between">
                      <h2 className="text-xl font-black text-slate-900">Cotações de Materiais</h2>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">
                        {MOCK_MATERIAL_QUOTES.length} pendentes
                      </span>
                    </div>
                    <div className="flex flex-col gap-4">
                      {MOCK_MATERIAL_QUOTES.map((quote) => (
                        <MaterialQuoteCard key={quote.id} quote={quote} />
                      ))}
                    </div>
                  </section>

                  <section className="mb-10">
                    <div className="mb-5 flex items-center justify-between">
                      <h2 className="text-xl font-black text-slate-900">Parceiros Recomendados</h2>
                      <button 
                        onClick={() => handleViewChange('all-professionals')}
                        className="text-xs font-black text-accent uppercase tracking-widest"
                      >
                        Ver todos
                      </button>
                    </div>
                    <div className="flex flex-col gap-4">
                      {MOCK_PROFESSIONALS.slice(0, 2).map((prof) => (
                        <ProfessionalCard key={prof.id} professional={prof} onClick={handleProfessionalClick} />
                      ))}
                    </div>
                  </section>

                  <section className="mb-10">
                    <h2 className="mb-5 text-xl font-black text-slate-900">Produtos em Destaque</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {MOCK_VIDEOS.flatMap(v => v.products || []).slice(0, 2).map((product) => (
                        <ProductCard key={product.id} product={product} onClick={handleProductClick} />
                      ))}
                    </div>
                  </section>
                </>
              )}
            </motion.div>
            } />

            <Route path="/photo-request" element={
              <motion.div
                key="photo-request"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-6 pb-24"
            >
              <div className="mb-8 flex items-center gap-4">
                <button 
                  onClick={() => handleViewChange('home')}
                  className="rounded-full bg-slate-100 p-3 text-slate-600 transition-all active:scale-90"
                >
                  <ArrowLeft size={24} />
                </button>
                <h1 className="text-2xl font-black text-slate-900">Orçamento por Foto</h1>
              </div>

              <div className="space-y-8">
                <div className="rounded-2xl bg-blue-50 p-4 border border-blue-100 flex items-start gap-3">
                  <div className="mt-1 text-blue-600">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-blue-900">Economize Tempo</h4>
                    <p className="text-xs font-medium text-blue-700/80">Ao enviar fotos, nossos especialistas conseguem dar orçamentos muito mais precisos e rápidos sem precisar de visita técnica imediata.</p>
                  </div>
                </div>

                <div className="rounded-[2rem] bg-primary/5 p-8 text-center border-2 border-dashed border-primary/20">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/20">
                    <Upload size={32} />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">Tire ou envie fotos</h3>
                  <p className="mt-2 text-sm font-medium text-slate-500">Mostre o que precisa ser feito para receber orçamentos precisos.</p>
                  <button className="mt-6 rounded-2xl bg-primary px-8 py-4 font-black text-white shadow-lg shadow-primary/20 transition-all active:scale-95">
                    Selecionar Fotos
                  </button>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-black text-slate-900 uppercase tracking-widest">Descrição do Serviço</label>
                  <textarea 
                    placeholder="Ex: Preciso trocar o piso da sala e pintar as paredes..."
                    className="w-full h-40 rounded-3xl bg-slate-100 p-6 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    value={photoRequestData.description}
                    onChange={(e) => setPhotoRequestData({ ...photoRequestData, description: e.target.value })}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-black text-slate-900 uppercase tracking-widest">Categoria</label>
                  <div className="flex flex-wrap gap-2">
                    {['Pedreiro', 'Pintor', 'Eletricista', 'Encanador', 'Outros'].map((cat) => (
                      <button 
                        key={cat}
                        className="rounded-full bg-slate-100 px-6 py-3 text-xs font-black text-slate-600 transition-all hover:bg-primary hover:text-white active:scale-95"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="w-full rounded-3xl bg-slate-900 py-5 font-black text-white shadow-xl transition-all active:scale-95 hover:bg-slate-800">
                  Enviar Solicitação
                </button>
              </div>
            </motion.div>
            } />

            <Route path="/feed" element={
              <motion.div
                key="feed"
              ref={feedContainerRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full w-full snap-y snap-mandatory overflow-y-auto no-scrollbar scroll-smooth"
              onScroll={handleFeedScroll}
            >
              {MOCK_VIDEOS.map((post, index) => (
                <VideoCard 
                  key={post.id} 
                  post={post} 
                  isActive={index === activeVideoIndex} 
                  onProductClick={handleProductClick}
                />
              ))}
            </motion.div>
            } />

            <Route path="/search" element={
              <motion.div
                key="search"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 pb-24"
            >
              <div className="mb-8 flex items-center justify-between">
                <h1 className="text-2xl font-black text-slate-900">Buscar</h1>
                <button className="p-3 bg-slate-100 rounded-2xl text-slate-600"><Filter size={20} /></button>
              </div>

              <div className="relative mb-8">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="O que você precisa hoje?"
                  className="w-full rounded-2xl bg-slate-100 py-4 pl-12 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="mb-8 rounded-2xl bg-emerald-50 p-4 border border-emerald-100">
                <p className="text-xs font-bold text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 size={14} /> 
                  Você está seguro: Procure pelo selo de verificação para garantir um serviço de excelência.
                </p>
              </div>

              <div className="mb-8 flex items-center gap-3">
                <button 
                  onClick={() => setSearchTab('profissionais')}
                  className={`flex-1 rounded-2xl py-3 text-xs font-black uppercase tracking-widest transition-all ${
                    searchTab === 'profissionais' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  Profissionais
                </button>
                <button 
                  onClick={() => setSearchTab('produtos')}
                  className={`flex-1 rounded-2xl py-3 text-xs font-black uppercase tracking-widest transition-all ${
                    searchTab === 'produtos' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  Produtos
                </button>
              </div>

              <div className="space-y-10">
                {searchQuery === '' && (
                  <section>
                    <h2 className="mb-5 text-sm font-black text-slate-900 uppercase tracking-widest">Sugestões</h2>
                    <div className="flex flex-wrap gap-2">
                      {['Reforma', 'Pintura', 'Cimento', 'Furadeira', 'Marcenaria', 'Gesso'].map(tag => (
                        <button 
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="rounded-full bg-slate-100 px-5 py-2 text-xs font-black text-slate-600 hover:bg-accent hover:text-white transition-all"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                <section>
                  <h2 className="mb-5 text-sm font-black text-slate-900 uppercase tracking-widest">
                    {searchQuery === '' ? 'Populares' : 'Resultados'}
                  </h2>
                  <div className="space-y-6">
                    {searchTab === 'profissionais' ? (
                      MOCK_PROFESSIONALS
                        .filter(p => searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(prof => (
                          <ProfessionalCard key={prof.id} professional={prof} onClick={handleProfessionalClick} />
                        ))
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        {MOCK_PRODUCTS
                          .filter(p => searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map(product => (
                            <ProductCard key={product.id} product={product} onClick={handleProductClick} />
                          ))}
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </motion.div>
            } />

            <Route path="/professional/:id" element={<ProfessionalDetailView />} />

            <Route path="/notifications" element={
              <motion.div
                key="notifications"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4"
            >
              <h2 className="mb-6 text-2xl font-black text-slate-900">Notificações</h2>
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Bell size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Novo orçamento respondido!</p>
                      <p className="mt-1 text-xs text-slate-500">João Silva enviou uma proposta para sua reforma no Centro.</p>
                      <span className="mt-2 block text-[10px] font-medium text-slate-400">Há 2 horas</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            } />

            <Route path="/profile" element={
              <motion.div
                key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4"
            >
              {!user ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <UserIcon size={40} />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">Bem-vindo ao ptah.io</h2>
                  <p className="mt-2 text-slate-500">Escolha como deseja entrar na plataforma</p>
                  
                  <div className="mt-6 w-full rounded-2xl bg-primary/5 p-4 border border-primary/10">
                    <p className="text-xs font-bold text-primary text-center">
                      Sua conta é sua segurança: salve favoritos, analise avaliações reais e tenha suporte total em suas obras.
                    </p>
                  </div>
                  
                  <div className="mt-8 flex w-full flex-col gap-3">
                    <button 
                      onClick={() => handleLogin('client')}
                      className="flex w-full items-center justify-between rounded-2xl border border-border bg-white p-5 text-left transition-all hover:border-primary/50 hover:shadow-md"
                    >
                      <div>
                        <p className="font-black text-slate-900">Sou Cliente</p>
                        <p className="text-xs text-slate-500">Quero reformar ou construir</p>
                      </div>
                      <div className="rounded-full bg-slate-100 p-2 text-slate-400">
                        <ArrowLeft size={20} className="rotate-180" />
                      </div>
                    </button>

                    <button 
                      onClick={() => handleLogin('professional')}
                      className="flex w-full items-center justify-between rounded-2xl border border-border bg-white p-5 text-left transition-all hover:border-primary/50 hover:shadow-md"
                    >
                      <div>
                        <p className="font-black text-slate-900">Sou Profissional</p>
                        <p className="text-xs text-slate-500">Quero oferecer meus serviços</p>
                      </div>
                      <div className="rounded-full bg-slate-100 p-2 text-slate-400">
                        <ArrowLeft size={20} className="rotate-180" />
                      </div>
                    </button>

                    <button 
                      onClick={() => handleLogin('store')}
                      className="flex w-full items-center justify-between rounded-2xl border border-border bg-white p-5 text-left transition-all hover:border-primary/50 hover:shadow-md"
                    >
                      <div>
                        <p className="font-black text-slate-900">Sou Loja</p>
                        <p className="text-xs text-slate-500">Quero vender meus produtos</p>
                      </div>
                      <div className="rounded-full bg-slate-100 p-2 text-slate-400">
                        <ArrowLeft size={20} className="rotate-180" />
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-8 flex flex-col items-center">
                    <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-xl">
                      <img src={user.avatar} className="h-full w-full object-cover" alt="Profile" />
                    </div>
                    <h2 className="text-xl font-black text-slate-900">{user.name}</h2>
                    <p className="text-sm font-medium text-slate-500">
                      {user.role === 'client' ? 'Cliente' : user.role === 'professional' ? 'Profissional' : 'Loja'}
                    </p>
                    
                    {user.rating && (
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="fill-amber-400 text-amber-400" />
                          <span className="text-sm font-black text-slate-700">{user.rating}</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">({user.reviewCount} avaliações)</span>
                      </div>
                    )}

                    <button 
                      onClick={handleLogout}
                      className="mt-6 rounded-full bg-red-50 px-6 py-2 text-xs font-black text-red-500 transition-all active:scale-95"
                    >
                      Sair da conta
                    </button>
                  </div>

                  {user.reviews && user.reviews.length > 0 && (
                    <div className="mb-10">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Suas Avaliações</h3>
                      <ReviewList reviews={user.reviews} />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Meus Pedidos', icon: <ShoppingBag size={20} /> },
                      { label: 'Favoritos', icon: <Heart size={20} /> },
                      { label: 'Endereços', icon: <MapPin size={20} /> },
                      { label: 'Pagamentos', icon: <Tag size={20} /> },
                      { label: 'Configurações', icon: <Menu size={20} /> },
                      { label: 'Ajuda', icon: <Bell size={20} /> }
                    ].map((item) => (
                      <button key={item.label} className="flex flex-col items-center gap-3 rounded-3xl border border-border bg-white p-6 transition-all hover:border-primary/50 hover:shadow-md">
                        <div className="text-primary">{item.icon}</div>
                        <span className="text-xs font-black text-slate-700">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
            } />

            <Route path="/store/:id" element={<StoreDetailView />} />

            <Route path="/all-professionals" element={
              <motion.div
                key="all-professionals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 pb-24"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handleViewChange('home')}
                    className="rounded-full bg-slate-100 p-3 text-slate-600 transition-all active:scale-90"
                  >
                    <ArrowLeft size={24} />
                  </button>
                  <h1 className="text-2xl font-black text-slate-900">Especialistas</h1>
                </div>
                <button className="p-3 bg-slate-100 rounded-2xl text-slate-600"><Filter size={20} /></button>
              </div>

              <div className="relative mb-8">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Buscar por nome ou especialidade..."
                  className="w-full rounded-2xl bg-slate-100 py-4 pl-12 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>

              <div className="flex flex-col gap-6">
                {MOCK_PROFESSIONALS.map(prof => (
                  <ProfessionalCard key={prof.id} professional={prof} onClick={handleProfessionalClick} />
                ))}
              </div>
            </motion.div>
            } />

            <Route path="/all-stores" element={
              <motion.div
                key="all-stores"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 pb-24"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handleViewChange('home')}
                    className="rounded-full bg-slate-100 p-3 text-slate-600 transition-all active:scale-90"
                  >
                    <ArrowLeft size={24} />
                  </button>
                  <h1 className="text-2xl font-black text-slate-900">Lojas Parceiras</h1>
                </div>
                <button className="p-3 bg-slate-100 rounded-2xl text-slate-600"><Filter size={20} /></button>
              </div>

              <div className="flex flex-col gap-6">
                {MOCK_STORES.map(store => (
                  <StoreCard 
                    key={store.id} 
                    store={store} 
                    onClick={(id) => {
                      const s = MOCK_STORES.find(st => st.id === id);
                      if (s) {
                        handleStoreClick(s.id);
                      }
                    }} 
                  />
                ))}
              </div>
            </motion.div>
            } />

            <Route path="/marketplace" element={
              <motion.div
                key="marketplace"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 pb-24"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handleViewChange('home')}
                    className="rounded-full bg-slate-100 p-3 text-slate-600 transition-all active:scale-90"
                  >
                    <ArrowLeft size={24} />
                  </button>
                  <h1 className="text-2xl font-black text-slate-900">Marketplace</h1>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 bg-slate-100 rounded-2xl text-slate-600"><SearchIcon size={20} /></button>
                  <button className="p-3 bg-slate-100 rounded-2xl text-slate-600"><Filter size={20} /></button>
                </div>
              </div>

              {/* Marketplace Categories */}
              <div className="mb-8 flex gap-3 overflow-x-auto no-scrollbar">
                {['Todos', 'Ferramentas', 'Materiais', 'Pintura', 'Elétrica', 'Hidráulica'].map((cat, i) => (
                  <button 
                    key={cat}
                    className={`flex-shrink-0 rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-widest transition-all ${
                      i === 0 ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="mb-8 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white shadow-xl shadow-orange-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                    <ShoppingBag size={20} className="text-white" />
                  </div>
                  <h4 className="text-lg font-black">Garantia ptah.io</h4>
                </div>
                <p className="text-xs font-bold leading-relaxed opacity-90">
                  Tudo o que você precisa para sua obra com entrega rápida e segura. Se não chegar como esperado, nós resolvemos para você.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {MOCK_PRODUCTS.map(product => (
                  <ProductCard key={product.id} product={product} onClick={handleProductClick} />
                ))}
                {/* Duplicate for density */}
                {MOCK_PRODUCTS.map(product => (
                  <ProductCard key={product.id + '-den'} product={product} onClick={handleProductClick} />
                ))}
              </div>
            </motion.div>
            } />

            <Route path="/product/:id" element={<ProductDetailView />} />

            <Route path="/all-categories" element={
              <motion.div
                key="all-categories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 pb-24"
            >
              <div className="mb-8 flex items-center gap-4">
                <button 
                  onClick={() => handleViewChange('home')}
                  className="rounded-full bg-slate-100 p-3 text-slate-600 transition-all active:scale-90"
                >
                  <ArrowLeft size={24} />
                </button>
                <h1 className="text-2xl font-black text-slate-900">Categorias</h1>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Pedreiro', icon: '🏗️' },
                  { name: 'Pintor', icon: '🎨' },
                  { name: 'Elétrica', icon: '⚡' },
                  { name: 'Hidráulica', icon: '🚰' },
                  { name: 'Marceneiro', icon: '🪚' },
                  { name: 'Gesso', icon: '🧱' },
                  { name: 'Telhado', icon: '🏠' },
                  { name: 'Piso', icon: '📐' },
                  { name: 'Vidraceiro', icon: '🪟' },
                  { name: 'Jardinagem', icon: '🌿' }
                ].map((cat) => (
                  <button key={cat.name} className="flex flex-col items-center gap-4 p-6 rounded-3xl border border-slate-100 bg-white shadow-sm transition-all active:scale-95 hover:shadow-md">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-4xl">
                      {cat.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">{cat.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
            } />
            
            <Route path="/login/store" element={<StoreLogin onLogin={() => handleLogin('store', true, '/dashboard/store')} />} />
            
            <Route path="/dashboard/store" element={
              user?.role === 'store' ? (
                <StoreDashboard 
                  user={user} 
                  onLogout={handleLogout} 
                />
              ) : (
                <div className="p-10 text-center">Acesso restrito a lojas.</div>
              )
            } />

            <Route path="/store/products" element={
              user?.role === 'store' ? (
                <ProductManagement 
                  storeId={user.id} 
                  onGeneratePDF={(products) => generateEncartePDF(products, user?.name || 'Sua Loja')}
                />
              ) : (
                <div className="p-10 text-center">Acesso restrito a lojas.</div>
              )
            } />

            <Route path="/store/products/new" element={
              user?.role === 'store' ? (
                <ProductForm 
                  onSave={(product) => {
                    console.log('Novo produto:', product);
                    // In a real app, update state/API
                  }}
                />
              ) : (
                <div className="p-10 text-center">Acesso restrito a lojas.</div>
              )
            } />

            <Route path="*" element={<div className="p-10 text-center">Página não encontrada</div>} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <BottomNav currentView={currentView} onViewChange={handleViewChange} />
    </div>
  );
}

// Detail View Components
function ProfessionalDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const professional = MOCK_PROFESSIONALS.find(p => p.id === id);

  if (!professional) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-slate-500">Profissional não encontrado.</p>
      </div>
    );
  }

  return (
    <motion.div
      key="prof-detail"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="pb-24"
    >
      <div className="relative h-48 w-full bg-slate-200">
        <img 
          src={professional.portfolio[0]} 
          className="h-full w-full object-cover" 
          alt="Capa"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      
      <div className="relative -mt-12 px-4">
        <div className="flex items-end gap-4">
          <div className="h-24 w-24 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-lg">
            <img src={professional.avatar} className="h-full w-full object-cover" alt={professional.name} />
          </div>
          <div className="mb-2">
            <h1 className="text-2xl font-black text-slate-900">{professional.name}</h1>
            <p className="text-sm font-bold text-primary">{professional.specialty}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-around rounded-2xl border border-border bg-white p-4 shadow-sm">
          <div className="text-center">
            <p className="text-lg font-black text-slate-900">{professional.rating}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Rating</p>
          </div>
          <div className="h-8 w-px bg-slate-100" />
          <div className="text-center">
            <p className="text-lg font-black text-slate-900">{professional.projectsCount}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Obras</p>
          </div>
          <div className="h-8 w-px bg-slate-100" />
          <div className="text-center">
            <p className="text-lg font-black text-slate-900">{professional.reviewCount}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Reviews</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold text-slate-900">Sobre</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {professional.bio}
          </p>
        </div>

        <div className="mt-8 rounded-2xl bg-emerald-50 p-5 border border-emerald-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">
              <CheckCircle2 size={16} />
            </div>
            <h4 className="text-sm font-black text-emerald-900">Sua Contratação Segura</h4>
          </div>
          <p className="text-xs font-bold text-emerald-800/70 leading-relaxed">
            Este profissional é verificado pelo ptah.io. Você tem a garantia de que o serviço será entregue com a qualidade que você merece.
          </p>
        </div>

        {professional.albums && professional.albums.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-6 text-xl font-black text-slate-900">Álbuns de Trabalho</h2>
            <AlbumCarousel albums={professional.albums} />
          </div>
        )}

        <div className="mt-10">
          <h2 className="mb-2 text-xl font-black text-slate-900">Avaliações</h2>
          <p className="mb-6 text-xs font-medium text-slate-500 italic">Analise o que outros clientes dizem para garantir uma contratação segura e de qualidade.</p>
          <ReviewList reviews={professional.reviews || []} />
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold text-slate-900">Portfólio Completo</h2>
          <div className="grid grid-cols-2 gap-3">
            {professional.portfolio.map((img, i) => (
              <img 
                key={i} 
                src={img} 
                className="aspect-square rounded-xl object-cover" 
                alt={`Obra ${i}`} 
              />
            ))}
          </div>
        </div>

        <div className="fixed bottom-20 left-0 right-0 z-40 border-t border-border bg-white/80 p-4 backdrop-blur-md md:bottom-0">
          <div className="mx-auto flex max-w-md gap-3">
            <button className="flex-1 rounded-2xl bg-primary py-4 font-black text-white shadow-lg shadow-primary/20 transition-transform active:scale-95">
              Solicitar Orçamento
            </button>
            <button className="rounded-2xl bg-slate-900 px-6 py-4 font-black text-white transition-transform active:scale-95">
              Chat
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StoreDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const store = MOCK_STORES.find(s => s.id === id);

  if (!store) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-slate-500">Loja não encontrada.</p>
      </div>
    );
  }

  return (
    <motion.div
      key="store-detail"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-6 pb-24"
    >
      <div className="mb-8 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="rounded-full bg-slate-100 p-3 text-slate-600 transition-all active:scale-90"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-black text-slate-900">Detalhes da Loja</h1>
      </div>

      <div className="flex flex-col items-center text-center mb-10">
        <div className="relative h-32 w-32 mb-4">
          <img src={store.avatar} className="h-full w-full rounded-[2.5rem] object-cover shadow-xl" />
          {store.isVerified && (
            <div className="absolute -bottom-2 -right-2 rounded-full bg-white p-2 shadow-lg">
              <CheckCircle2 size={24} className="fill-accent text-white" />
            </div>
          )}
        </div>
        <h2 className="text-3xl font-black text-slate-900">{store.name}</h2>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star size={18} className="fill-amber-400 text-amber-400" />
            <span className="text-lg font-black text-slate-700">{store.rating}</span>
          </div>
          <span className="text-slate-400 font-bold">({store.reviewCount} avaliações)</span>
        </div>
        <div className="mt-4 flex items-center gap-2 text-slate-500 font-medium">
          <MapPin size={18} />
          <span>{store.location}</span>
        </div>
        {store.description && (
          <p className="mt-6 text-sm font-medium text-slate-500 leading-relaxed max-w-xs">
            {store.description}
          </p>
        )}

        <div className="mt-8 w-full rounded-2xl bg-blue-50 p-5 border border-blue-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
              <StoreIcon size={16} />
            </div>
            <h4 className="text-sm font-black text-blue-900">Sua Loja de Confiança</h4>
          </div>
          <p className="text-xs font-bold text-blue-800/70 leading-relaxed">
            Compre com total tranquilidade. Analisamos o histórico desta loja para garantir que seus materiais cheguem no prazo.
          </p>
        </div>
      </div>

      <div className="space-y-12">
        <section>
          <h3 className="text-xl font-black text-slate-900 mb-5">Produtos em Destaque</h3>
          <div className="grid grid-cols-2 gap-4">
            {MOCK_PRODUCTS.filter(p => p.storeId === store.id).map(product => (
              <ProductCard key={product.id} product={product} onClick={(p) => navigate(`/product/${p.id}`)} />
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-black text-slate-900 mb-2">Avaliações da Loja</h3>
          <p className="mb-6 text-xs font-medium text-slate-500 italic">Sua compra facilitada começa aqui: veja a experiência de outros compradores.</p>
          <ReviewList reviews={store.reviews || []} />
        </section>

        <section>
          <h3 className="text-xl font-black text-slate-900 mb-5">Categorias da Loja</h3>
          <div className="flex flex-wrap gap-2">
            {store.categories.map(cat => (
              <span key={cat} className="rounded-full bg-slate-100 px-6 py-3 text-sm font-black text-slate-600">
                {cat}
              </span>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}

function ProductDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = MOCK_PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-slate-500">Produto não encontrado.</p>
      </div>
    );
  }

  return (
    <motion.div
      key="product-detail"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pb-32"
    >
      <div className="relative w-full bg-slate-100 overflow-hidden">
        <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar aspect-square">
          {(product.images || [product.image]).map((img, i) => (
            <img key={i} src={img} className="h-full w-full object-cover flex-shrink-0 snap-center" />
          ))}
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 rounded-full bg-white/80 p-3 text-slate-600 backdrop-blur-md shadow-lg z-10"
        >
          <ArrowLeft size={24} />
        </button>
        {product.images && product.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {product.images.map((_, i) => (
              <div key={i} className="h-1.5 w-1.5 rounded-full bg-white/50" />
            ))}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(`/store/${product.storeId}`)}
            className="text-xs font-black text-accent uppercase tracking-widest hover:underline"
          >
            {product.storeName}
          </button>
          <div className="flex items-center gap-1 text-amber-400">
            <Star size={14} className="fill-amber-400" />
            <span className="text-xs font-black text-slate-700">{product.rating || '4.8'}</span>
          </div>
        </div>
        <h1 className="mt-2 text-2xl font-black text-slate-900">{product.name}</h1>
        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-3xl font-black text-slate-900">R$ {product.price.toFixed(2)}</span>
          <span className="text-sm font-bold text-slate-400 line-through">R$ {(product.price * 1.15).toFixed(2)}</span>
        </div>

        <div className="mt-10 space-y-10">
          <div className="rounded-2xl bg-amber-50 p-5 border border-amber-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-white">
                <Zap size={16} />
              </div>
              <h4 className="text-sm font-black text-amber-900">Sua Compra Protegida</h4>
            </div>
            <p className="text-xs font-bold text-amber-800/70 leading-relaxed">
              Adicione ao carrinho e receba em casa. O ptah.io garante sua satisfação ou seu dinheiro de volta.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">Descrição</h3>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">
              {product.description || 'Produto de alta qualidade para sua obra. Garantia de 1 ano e entrega rápida em toda região de São Paulo.'}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">Avaliações do Produto</h3>
            <p className="mb-6 text-[10px] font-bold text-accent uppercase tracking-tighter">⭐ Feedback real de quem já comprou e aprovou</p>
            <ReviewList reviews={product.reviews || []} />
          </div>

          <div 
            onClick={() => navigate(`/store/${product.storeId}`)}
            className="rounded-3xl bg-slate-50 p-6 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                <StoreIcon size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900">{product.storeName}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ver Perfil da Loja</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-slate-300" />
          </div>
        </div>

        <div className="fixed bottom-20 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-border flex gap-4 z-40 md:bottom-0">
          <button className="flex-1 rounded-2xl bg-slate-100 py-4 font-black text-slate-900 transition-all active:scale-95">
            Carrinho
          </button>
          <button className="flex-1 rounded-2xl bg-primary py-4 font-black text-white shadow-xl shadow-primary/20 transition-all active:scale-95">
            Comprar Agora
          </button>
        </div>
      </div>
    </motion.div>
  );
}
