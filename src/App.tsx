import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import {
  Search, Bell, Menu, ArrowLeft, Filter, Map as MapIcon, List, User as UserIcon,
  Camera, Upload, X, Check, ShoppingBag, Store as StoreIcon, Tag, Zap, Film,
  ChevronRight, Search as SearchIcon, Heart, MapPin, CheckCircle2, Star, ArrowRight,
  HardHat, Paintbrush, Droplets, Hammer, Layers, PencilRuler, Compass, Wind, Sprout, Sparkles, Home,
  Award, PlayCircle, MessageCircle, Info, ExternalLink, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppView, Professional, User, UserRole, Store, Product } from './types';
import { Footer } from './components/Footer';
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

const Typer = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 1500);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 30 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span>
      {`${words[index].substring(0, subIndex)}`}
      <span className="inline-block w-[2px] h-5 bg-secondary ml-1 animate-pulse align-middle" />
    </span>
  );
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('obrabase_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Erro ao carregar usuário do localStorage', e);
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('obrabase_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('obrabase_user');
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
        <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-border bg-white/80 px-6 backdrop-blur-md">
          {/* Logo & Navigation */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-1 group transition-all hover:scale-105 active:scale-95">
              <div className="flex flex-col">
                <div className="flex items-center leading-none">
                  <span className="text-2xl font-black tracking-tighter text-primary">Obra</span>
                  <span className="text-2xl font-black tracking-tighter text-accent">Base</span>
                </div>
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary/60 group-hover:text-primary transition-colors leading-none mt-1">Materiais e profissionais</span>
              </div>
            </Link>
          </div>

          {/* Navigation Menu - Desktop/Tablet */}
          <nav className="hidden md:flex items-center gap-1 bg-muted p-1.5 rounded-2xl border border-border/50">
            <button
              onClick={() => navigate('/')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${location.pathname === '/' ? 'bg-white text-secondary shadow-sm' : 'text-primary/60 hover:text-primary'
                }`}
            >
              <Home size={14} />
              Início
            </button>
            <button
              onClick={() => navigate('/all-professionals')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${location.pathname === '/all-professionals' ? 'bg-white text-secondary shadow-sm' : 'text-primary/60 hover:text-primary'
                }`}
            >
              <Award size={14} />
              Profissionais
            </button>
            <button
              onClick={() => navigate('/all-stores')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${location.pathname === '/all-stores' ? 'bg-white text-secondary shadow-sm' : 'text-primary/60 hover:text-primary'
                }`}
            >
              <ShoppingBag size={14} />
              Lojas
            </button>
            <button
              onClick={() => navigate('/marketplace')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${location.pathname === '/marketplace' ? 'bg-white text-secondary shadow-sm' : 'text-primary/60 hover:text-primary'
                }`}
            >
              <Tag size={14} />
              Produtos
            </button>
            <button
              onClick={() => navigate('/feed')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${location.pathname === '/feed' ? 'bg-white text-secondary shadow-sm' : 'text-primary/60 hover:text-primary'
                }`}
            >
              <PlayCircle size={14} />
              Feed
            </button>
          </nav>

          {/* Actions Column */}
          <div className="flex items-center gap-3">
            {user ? (
              <button
                onClick={() => handleViewChange('profile')}
                className="group relative flex items-center gap-2 p-1 pl-1 pr-3 rounded-xl border border-transparent hover:border-border hover:bg-background transition-all active:scale-95"
              >
                <div className="h-10 w-10 overflow-hidden rounded-lg shadow-sm border border-border">
                  <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                </div>
                <div className="hidden lg:flex flex-col items-start">
                  <p className="text-[10px] font-black text-primary leading-none">{user.name.split(' ')[0]}</p>
                  <p className="text-[8px] font-bold text-primary/60 uppercase tracking-widest mt-0.5">Perfil</p>
                </div>
              </button>
            ) : (
              <button
                onClick={() => handleViewChange('profile')}
                className="rounded-xl bg-primary px-6 py-3 text-xs font-black text-white shadow-xl shadow-primary/10 transition-all active:scale-95 hover:bg-primary-dark hover:-translate-y-0.5"
              >
                Entrar
              </button>
            )}
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className={`h-full w-full ${currentView === 'feed' ? 'no-scrollbar overflow-hidden' : 'overflow-y-auto pb-32'}`}>
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route path="/" element={
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full pb-24"
              >
                {(!user || user.role === 'client') && (
                  <>
                    {/* Hero Banner Section - Full Width & Ultra-Slim with Overflow Image */}
                    <section className="relative bg-primary w-full border-b border-primary-dark/30 min-h-[180px] lg:h-[320px] pt-4 pb-2 lg:py-0 flex items-center mb-24 lg:mb-12 overflow-visible">
                      {/* Decorations Container - Restricted */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-secondary/10 blur-[120px]" />
                        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/5 blur-[120px]" />
                      </div>

                      <div className="mx-auto max-w-[1600px] px-6 lg:px-20 flex flex-col items-center text-center lg:text-left lg:grid lg:grid-cols-3 lg:items-center justify-between gap-2 lg:gap-10 w-full h-full relative z-10 overflow-visible">
                        {/* Left: Content Area - order-1 */}
                        <div className="relative z-20 order-1">
                          <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                          >
                            <div className="mb-2 inline-flex items-center gap-2 rounded-xl bg-accent/10 px-4 py-1.5 border border-accent/20">
                              <Zap size={14} className="text-accent ring-accent/20 animate-pulse" />
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Plataforma nº1 do Brasil</span>
                            </div>
                            <h1 className="text-3xl font-black text-white leading-tight tracking-tight sm:text-4xl lg:text-5xl max-w-xl mx-auto lg:mx-0">
                              Construa com <span className="text-accent italic">excelência.</span>
                            </h1>
                            <p className="mt-2 text-sm font-medium text-white/50 max-w-sm leading-relaxed mx-auto lg:mx-0">
                              A plataforma definitiva para conectar você aos especialistas verificados.
                            </p>
                          </motion.div>
                        </div>

                        {/* Column 2: Image Area - order-3 on mobile, order-2 on desktop */}
                        <div className="relative flex items-start justify-center h-full overflow-visible order-3 lg:order-2 -mt-10 lg:mt-0">
                          <motion.img
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            src="/construction_team.png"
                            alt="Equipe ObraBase"
                            className="w-[110%] lg:w-auto h-auto lg:h-[139%] object-contain drop-shadow-[0_45px_100px_rgba(0,0,0,0.5)] z-30 pointer-events-none translate-y-12 lg:-translate-y-12 max-w-[125%]"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Right: Actions Area - order-2 on mobile, order-3 on desktop */}
                        <div className="flex flex-col gap-3 flex-shrink-0 lg:min-w-[320px] items-center lg:items-end z-20 order-2 lg:order-3">
                          <div className="space-y-3 w-full max-w-[300px]">
                            <button
                              onClick={() => handleViewChange('search')}
                              className="group w-full flex items-center justify-center gap-3 rounded-xl bg-accent px-8 py-4 font-black text-primary shadow-xl shadow-accent/20 transition-all hover:scale-105 active:scale-95 text-sm"
                            >
                              Encontrar Especialista
                              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </button>
                            <button
                              onClick={() => handleViewChange('photo-request')}
                              className="w-full flex items-center justify-center gap-3 rounded-xl bg-white/5 px-8 py-4 font-black text-white backdrop-blur-md border border-white/10 transition-all hover:bg-white/10 active:scale-95 whitespace-nowrap text-sm"
                            >
                              <Camera size={18} className="text-accent" />
                              Orçamento por Foto
                            </button>
                          </div>
                        </div>
                      </div>
                    </section>
                  </>
                )}

                {/* Wrapper for the rest of the contained content */}
                <div className="max-w-7xl mx-auto px-4 space-y-12 mt-12 w-full">
                  {/* Categories */}
                  <section>
                    <div className="mb-5 flex items-center justify-between">
                      <h2 className="text-xl font-black text-primary">Categorias</h2>
                      <button
                        onClick={() => handleViewChange('all-categories')}
                        className="text-xs font-black text-accent uppercase tracking-widest flex items-center gap-1"
                      >
                        Ver todas <ChevronRight size={14} />
                      </button>
                    </div>
                    <div className="grid grid-rows-2 lg:grid-rows-1 grid-flow-col gap-x-8 lg:gap-x-12 gap-y-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                      {[
                        { name: 'Pedreiro', icon: <HardHat size={28} /> },
                        { name: 'Pintor', icon: <Paintbrush size={28} /> },
                        { name: 'Elétrica', icon: <Zap size={28} /> },
                        { name: 'Hidráulica', icon: <Droplets size={28} /> },
                        { name: 'Marceneiro', icon: <Hammer size={28} /> },
                        { name: 'Gesso', icon: <Layers size={28} /> },
                        { name: 'Telhado', icon: <Home size={28} /> },
                        { name: 'Arquiteto', icon: <PencilRuler size={28} /> },
                        { name: 'Engenharia', icon: <Compass size={28} /> },
                        { name: 'Climatização', icon: <Wind size={28} /> },
                        { name: 'Jardinagem', icon: <Sprout size={28} /> },
                        { name: 'Limpeza', icon: <Sparkles size={28} /> }
                      ].map((cat) => (
                        <motion.button
                          key={cat.name}
                          whileHover={{ y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex flex-col items-center gap-3 flex-shrink-0 group outline-none"
                        >
                          <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-muted text-primary/60 shadow-sm transition-all group-hover:shadow-xl group-hover:scale-110 group-hover:bg-accent/10 group-hover:text-secondary border border-border">
                            {cat.icon}
                          </div>
                          <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest leading-none text-center max-w-[80px] group-hover:text-secondary transition-colors">{cat.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </section>

                  {/* Video Inspirations */}
                  <section>
                    <div className="mb-5 flex items-center justify-between">
                      <h2 className="text-xl font-black text-primary">Inspirações</h2>
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
                          className="relative h-80 w-44 flex-shrink-0 overflow-hidden rounded-xl bg-background shadow-md transition-all active:scale-95"
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
                          <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md border border-white/20">
                            <Film size={14} className="text-white" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>

                  {/* Flash Deals / Offers */}
                  <section className="bg-muted/50 -mx-4 p-6 rounded-xl border border-muted">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap size={20} className="text-accent fill-accent" />
                        <h2 className="text-xl font-black text-primary">Ofertas Relâmpago</h2>
                      </div>
                      <div className="flex items-center gap-2 bg-accent text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        02:45:12
                      </div>
                    </div>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                      {MOCK_PRODUCTS.slice(0, 4).map((product) => (
                        <div key={product.id} className="w-40 sm:w-48 md:w-56 flex-shrink-0">
                          <ProductCard product={product} onClick={handleProductClick} />
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Refined Simulated Search Section - Dark & Side-by-Side */}
                  <section className="relative overflow-hidden rounded-xl bg-primary border border-primary-dark/50 shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      {/* Left Side: Search Simulation */}
                      <div className="p-10 lg:p-16 relative z-10 flex flex-col justify-center">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8 }}
                        >
                          <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-8">
                            A tecnologia que <br /><span className="text-accent">facilita sua obra.</span>
                          </h2>

                          {/* Search Bar Simulation */}
                          <div className="relative flex items-center bg-white rounded-xl p-2 shadow-xl mb-6">
                            <div className="bg-secondary h-10 w-10 lg:h-12 lg:w-12 rounded-lg flex items-center justify-center text-white shadow-lg">
                              <Search size={22} />
                            </div>
                            <div className="flex-1 ml-4 flex items-center overflow-hidden">
                              <span className="text-primary font-bold text-sm lg:text-base whitespace-nowrap">Onde contratar</span>
                              <span className="ml-1.5 text-secondary font-black text-sm lg:text-base">
                                <Typer words={['um eletricista?', 'um pintor?', 'um pedreiro?', 'um arquiteto?']} />
                              </span>
                            </div>
                          </div>

                          {/* Suggestions Simulation */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5 }}
                            className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 space-y-4"
                          >
                            {[
                              { text: "ObraBase é a", highlight: "escolha perfeita!", icon: <CheckCircle2 size={16} /> },
                              { text: "ObraBase vai ser", highlight: "sua melhor escolha!", icon: <CheckCircle2 size={16} /> },
                              { text: "Você pesquisou", highlight: "por ObraBase!", icon: <CheckCircle2 size={16} /> }
                            ].map((item, idx) => (
                              <div key={idx} className="flex items-center gap-3 text-white">
                                <div className="text-accent">{item.icon}</div>
                                <p className="text-xs lg:text-sm font-medium">
                                  {item.text} <span className="text-accent font-bold">{item.highlight}</span>
                                </p>
                              </div>
                            ))}
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Right Side: Professional Image */}
                      <div className="relative h-64 lg:h-auto overflow-hidden">
                        <img
                          src="/professional_electrician.png"
                          className="h-full w-full object-cover"
                          alt="Profissional ObraBase"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/40 to-transparent lg:block hidden" />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent lg:hidden block" />

                        {/* Status Badge */}
                        <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 bg-secondary/90 backdrop-blur-md px-4 py-2 rounded-full border border-secondary/50 flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                          <span className="text-white text-[10px] font-black uppercase tracking-widest">Especialistas Disponíveis</span>
                        </div>
                      </div>
                    </div>

                    {/* Background decorations */}
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-secondary/10 blur-[100px]" />
                    <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
                  </section>

                  {/* Featured Professionals */}
                  <section>
                    <div className="mb-5 flex items-center justify-between">
                      <h2 className="text-xl font-black text-primary">Especialistas Top</h2>
                      <button
                        onClick={() => handleViewChange('all-professionals')}
                        className="text-xs font-black text-accent uppercase tracking-widest flex items-center gap-1"
                      >
                        Ver todos <ChevronRight size={14} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {MOCK_PROFESSIONALS.slice(0, 6).map((prof) => (
                        <ProfessionalCard
                          key={prof.id}
                          professional={prof}
                          onClick={handleProfessionalClick}
                        />
                      ))}
                    </div>
                  </section>

                  {/* Ad Banner 1 */}
                  <section className="relative h-32 overflow-hidden rounded-xl bg-primary">
                    <img src="https://picsum.photos/seed/ad1/800/200" className="h-full w-full object-cover opacity-60" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                      <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">Patrocinado</span>
                      <h3 className="text-lg font-black text-white">Reforme sua cozinha com 20% OFF</h3>
                      <button className="mt-2 rounded-lg bg-white px-4 py-1 text-[10px] font-black uppercase text-primary">Saiba mais</button>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {MOCK_STORES.slice(0, 6).map((store) => (
                        <StoreCard
                          key={store.id}
                          store={store}
                          products={MOCK_PRODUCTS.filter(p => p.storeId === store.id)}
                          onClick={(id) => {
                            handleStoreClick(id);
                          }}
                        />
                      ))}
                    </div>
                  </section>

                  {/* Banners - Reposicionados */}
                  <section>
                    <BannerCarousel banners={MOCK_BANNERS} onBannerClick={(link) => handleViewChange(link as any)} />
                  </section>

                  {/* Marketplace Feed */}
                  <section>
                    <div className="mb-5 flex items-center justify-between">
                      <h2 className="text-xl font-black text-primary">Marketplace</h2>
                      <div className="flex gap-2">
                        <button className="p-2 bg-background rounded-lg text-primary/60"><Tag size={18} /></button>
                        <button className="p-2 bg-background rounded-lg text-primary/60"><Filter size={18} /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {MOCK_PRODUCTS.map((product) => (
                        <ProductCard key={product.id} product={product} onClick={handleProductClick} />
                      ))}
                    </div>
                    <button
                      onClick={() => handleViewChange('marketplace')}
                      className="mt-8 w-full rounded-xl bg-slate-900 py-4 font-black text-white shadow-xl transition-all active:scale-95"
                    >
                      Ver Mais Produtos
                    </button>
                  </section>
                </div>

                {user?.role === 'professional' && (
                  <>
                    <section className="mb-8">
                      <h1 className="text-3xl font-black text-primary">Olá, {user.name.split(' ')[0]}!</h1>
                      <p className="text-primary/60 font-medium">Você tem novas propostas para responder.</p>
                    </section>

                    <section className="mb-10">
                      <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-xl font-black text-slate-900">Propostas Pendentes</h2>
                        <span className="rounded-md bg-primary/10 px-3 py-1 text-xs font-black text-primary">
                          {MOCK_QUOTES.length} novas
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                      <div className="rounded-xl border-2 border-dashed border-slate-200 p-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
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
                      <h1 className="text-3xl font-black text-primary">Painel da Loja</h1>
                      <p className="text-primary/60 font-medium">Gerencie suas cotações e vendas.</p>
                    </section>

                    <section className="mb-10">
                      <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-xl font-black text-slate-900">Cotações de Materiais</h2>
                        <span className="rounded-md bg-primary/10 px-3 py-1 text-xs font-black text-primary">
                          {MOCK_MATERIAL_QUOTES.length} pendentes
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                className="p-6 pb-24 max-w-7xl mx-auto w-full"
              >
                <div className="mb-10 flex items-center gap-4">
                  <button
                    onClick={() => handleViewChange('home')}
                    className="rounded-xl bg-slate-100 p-3 text-slate-600 hover:bg-slate-200 transition-all active:scale-95"
                  >
                    <ArrowLeft size={24} />
                  </button>
                  <h2 className="text-3xl font-black text-slate-900 leading-none">Orçamento por Foto</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Visual/Instruction Column */}
                  <div className="space-y-8">
                    <div className="rounded-3xl bg-background p-12 text-center border-2 border-dashed border-border hover:border-secondary/30 transition-all group flex flex-col items-center justify-center min-h-[400px]">
                      <div className="mb-6 rounded-3xl bg-white p-8 text-secondary shadow-2xl shadow-secondary/10 group-hover:scale-110 transition-transform">
                        <Upload size={48} />
                      </div>
                      <h3 className="text-2xl font-black text-primary">Tire ou envie fotos</h3>
                      <p className="mt-4 text-base font-medium text-primary/60 max-w-xs mx-auto leading-relaxed">Mostre o que precisa ser feito para receber orçamentos precisos de especialistas verificados.</p>
                      <button className="mt-8 rounded-2xl bg-secondary px-10 py-5 font-black text-white shadow-xl shadow-secondary/20 transition-all active:scale-95 hover:bg-secondary/90">
                        Selecionar dos Meus Arquivos
                      </button>
                    </div>

                    <div className="p-8 rounded-3xl bg-accent/10 border border-accent/20 flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-accent text-primary shadow-lg">
                        <Info size={24} />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-primary mb-1">Dica de Especialista</h4>
                        <p className="text-xs font-bold text-primary/70 leading-relaxed">
                          Ao enviar fotos, nossos especialistas conseguem dar orçamentos muito mais precisos e rápidos sem precisar de visita técnica imediata.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Form Column */}
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <label className="text-xs font-black text-primary/60 uppercase tracking-[0.2em]">O que você precisa?</label>
                      <textarea
                        placeholder="Descreva aqui o serviço em detalhes... exemplo: Instalação de porcelanato em sala de 20m²."
                        className="w-full h-48 rounded-2xl bg-background p-8 text-base font-medium outline-none border border-transparent focus:border-secondary/30 focus:bg-white focus:ring-4 focus:ring-secondary/5 transition-all resize-none shadow-inner"
                        value={photoRequestData.description}
                        onChange={(e) => setPhotoRequestData({ ...photoRequestData, description: e.target.value })}
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="text-xs font-black text-primary/60 uppercase tracking-[0.2em]">Qual a categoria?</label>
                      <div className="flex flex-wrap gap-3">
                        {['Pedreiro', 'Pintor', 'Eletricista', 'Encanador', 'Outros'].map((cat) => (
                          <button
                            key={cat}
                            className="rounded-xl bg-background px-6 py-4 text-sm font-black text-primary/60 transition-all border border-transparent hover:border-secondary/30 hover:bg-white active:scale-95"
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button className="w-full rounded-2xl bg-primary py-6 font-black text-white shadow-2xl transition-all active:scale-95 hover:bg-primary-dark flex items-center justify-center gap-3">
                      Enviar Solicitação Segura
                      <ChevronRight size={20} />
                    </button>
                  </div>
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
                className="h-full w-full snap-y snap-mandatory overflow-y-auto no-scrollbar scroll-smooth bg-black"
                onScroll={handleFeedScroll}
                style={{ scrollSnapType: 'y mandatory', height: '100%' }}
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
                className="p-6 pb-24 max-w-7xl mx-auto w-full"
              >
                <div className="mb-8 flex items-center justify-between">
                  <h1 className="text-2xl font-black text-primary">Buscar</h1>
                  <button className="p-3 bg-background rounded-lg text-primary/60"><Filter size={20} /></button>
                </div>

                <div className="relative mb-8">
                  <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={20} />
                  <input
                    type="text"
                    placeholder="O que você precisa hoje?"
                    className="w-full rounded-lg bg-background py-4 pl-12 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-accent/20 transition-all border border-border"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="mb-8 rounded-lg bg-secondary/10 p-4 border border-secondary/20">
                  <p className="text-xs font-bold text-secondary flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-accent" />
                    Você está seguro: Procure pelo selo de verificação para garantir um serviço de excelência.
                  </p>
                </div>

                <div className="mb-8 flex items-center gap-3">
                  <button
                    onClick={() => setSearchTab('profissionais')}
                    className={`flex-1 rounded-lg py-3 text-xs font-black uppercase tracking-widest transition-all ${searchTab === 'profissionais' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-background text-primary/60'
                      }`}
                  >
                    Profissionais
                  </button>
                  <button
                    onClick={() => setSearchTab('produtos')}
                    className={`flex-1 rounded-lg py-3 text-xs font-black uppercase tracking-widest transition-all ${searchTab === 'produtos' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-background text-primary/60'
                      }`}
                  >
                    Produtos
                  </button>
                </div>

                <div className="space-y-10">
                  {searchQuery === '' && (
                    <section>
                      <h2 className="mb-5 text-sm font-black text-primary uppercase tracking-widest">Sugestões</h2>
                      <div className="flex flex-wrap gap-2">
                        {['Reforma', 'Pintura', 'Cimento', 'Furadeira', 'Marcenaria', 'Gesso'].map(tag => (
                          <button
                            key={tag}
                            onClick={() => setSearchQuery(tag)}
                            className="rounded-md bg-background px-5 py-2 text-xs font-black text-primary/60 hover:bg-accent hover:text-white transition-all"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </section>
                  )}

                  <section>
                    <h2 className="mb-5 text-sm font-black text-primary uppercase tracking-widest">
                      {searchQuery === '' ? 'Populares' : 'Resultados'}
                    </h2>
                    <div className={searchTab === 'profissionais' ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6" : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"}>
                      {searchTab === 'profissionais' ? (
                        MOCK_PROFESSIONALS
                          .filter(p => searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map(prof => (
                            <ProfessionalCard key={prof.id} professional={prof} onClick={handleProfessionalClick} />
                          ))
                      ) : (
                        MOCK_PRODUCTS
                          .filter(p => searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map(product => (
                            <ProductCard key={product.id} product={product} onClick={handleProductClick} />
                          ))
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
                <h2 className="mb-6 text-2xl font-black text-primary">Notificações</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex gap-4 rounded-xl border border-border bg-white p-6 shadow-sm hover:shadow-md transition-all">
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                        <Bell size={28} />
                      </div>
                      <div>
                        <p className="text-base font-black text-primary leading-tight">Novo orçamento respondido!</p>
                        <p className="mt-2 text-sm font-medium text-primary/60">João Silva enviou uma proposta para sua reforma no Centro.</p>
                        <span className="mt-3 block text-[10px] font-black text-primary/60 uppercase tracking-widest">Há 2 horas</span>
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
                className="p-6 pb-24 max-w-7xl mx-auto w-full"
              >
                {!user ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <UserIcon size={40} />
                    </div>
                    <h2 className="text-2xl font-black text-primary">Bem-vindo ao ObraBase</h2>
                    <p className="mt-2 text-primary/60">Escolha como deseja entrar na plataforma</p>

                    <div className="mt-6 w-full rounded-lg bg-primary/5 p-4 border border-primary/10">
                      <p className="text-xs font-bold text-primary text-center">
                        Sua conta é sua segurança: salve favoritos, analise avaliações reais e tenha suporte total em suas obras.
                      </p>
                    </div>

                    <div className="mt-8 flex w-full flex-col gap-3">
                      <button
                        onClick={() => handleLogin('client')}
                        className="flex w-full items-center justify-between rounded-lg border border-border bg-white p-5 text-left transition-all hover:border-primary/50 hover:shadow-md"
                      >
                        <div>
                          <p className="font-black text-primary">Sou Cliente</p>
                          <p className="text-xs text-primary/60">Quero reformar ou construir</p>
                        </div>
                        <div className="rounded-lg bg-background p-2 text-primary/60">
                          <ArrowLeft size={20} className="rotate-180" />
                        </div>
                      </button>

                      <button
                        onClick={() => handleLogin('professional')}
                        className="flex w-full items-center justify-between rounded-lg border border-border bg-white p-5 text-left transition-all hover:border-primary/50 hover:shadow-md"
                      >
                        <div>
                          <p className="font-black text-primary">Sou Profissional</p>
                          <p className="text-xs text-primary/60">Quero oferecer meus serviços</p>
                        </div>
                        <div className="rounded-lg bg-background p-2 text-primary/60">
                          <ArrowLeft size={20} className="rotate-180" />
                        </div>
                      </button>

                      <button
                        onClick={() => handleLogin('store')}
                        className="flex w-full items-center justify-between rounded-lg border border-border bg-white p-5 text-left transition-all hover:border-primary/50 hover:shadow-md"
                      >
                        <div>
                          <p className="font-black text-primary">Sou Loja</p>
                          <p className="text-xs text-primary/60">Quero vender meus produtos</p>
                        </div>
                        <div className="rounded-lg bg-background p-2 text-primary/60">
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
                      <h2 className="text-xl font-black text-primary">{user.name}</h2>
                      <p className="text-sm font-medium text-primary/60">
                        {user.role === 'client' ? 'Cliente' : user.role === 'professional' ? 'Profissional' : 'Loja'}
                      </p>

                      {user.rating && (
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star size={14} className="fill-accent text-accent" />
                            <span className="text-sm font-black text-primary">{user.rating}</span>
                          </div>
                          <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">({user.reviewCount} avaliações)</span>
                        </div>
                      )}

                      <button
                        onClick={handleLogout}
                        className="mt-6 rounded-md bg-red-50 px-6 py-2 text-xs font-black text-red-500 transition-all active:scale-95"
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
                        <button key={item.label} className="flex flex-col items-center gap-3 rounded-xl border border-border bg-white p-6 transition-all hover:border-primary/50 hover:shadow-md">
                          <div className="text-primary">{item.icon}</div>
                          <span className="text-xs font-black text-primary">{item.label}</span>
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
                className="p-6 pb-24 max-w-7xl mx-auto w-full"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleViewChange('home')}
                      className="rounded-lg bg-background p-3 text-primary/60 transition-all active:scale-90"
                    >
                      <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-black text-primary">Especialistas</h1>
                  </div>
                  <button className="p-3 bg-background rounded-lg text-primary/60"><Filter size={20} /></button>
                </div>

                <div className="relative mb-8">
                  <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar por nome ou especialidade..."
                    className="w-full rounded-lg bg-background py-4 pl-12 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
                className="p-6 pb-24 max-w-7xl mx-auto w-full"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleViewChange('home')}
                      className="rounded-lg bg-background p-3 text-primary/60 transition-all active:scale-90"
                    >
                      <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-black text-primary">Lojas Parceiras</h1>
                  </div>
                  <button className="p-3 bg-background rounded-lg text-primary/60"><Filter size={20} /></button>
                </div>

                {/* Simplified Minimalist Ad Card */}
                <div className="relative mb-12 mt-4 overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary/90 to-secondary/30 p-6 md:p-10 text-white shadow-xl border border-white/5">
                  <div className="relative z-20 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="max-w-2xl">
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 inline-flex items-center gap-2 rounded-xl bg-secondary/10 px-4 py-1.5 border border-secondary/20 backdrop-blur-md"
                      >
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Do piso ao teto</span>
                      </motion.div>

                      <h2 className="text-3xl font-black leading-tight md:text-4xl tracking-tight">
                        Temos tudo para sua <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">casa dos sonhos</span>
                      </h2>
                    </div>

                    <div className="flex-shrink-0">
                      <button className="rounded-xl bg-secondary px-8 py-4 font-black text-white shadow-lg shadow-secondary/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
                        Ver Ofertas
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Subtle background glow for depth */}
                  <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-secondary/10 blur-[100px]" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {MOCK_STORES.map(store => (
                    <StoreCard
                      key={store.id}
                      store={store}
                      products={MOCK_PRODUCTS.filter(p => p.storeId === store.id)}
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
                className="p-6 pb-24 max-w-7xl mx-auto w-full"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleViewChange('home')}
                      className="rounded-lg bg-background p-3 text-primary/60 transition-all active:scale-90"
                    >
                      <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-black text-primary">Marketplace</h1>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 bg-background rounded-lg text-primary/60"><SearchIcon size={20} /></button>
                    <button className="p-3 bg-background rounded-lg text-primary/60"><Filter size={20} /></button>
                  </div>
                </div>

                {/* Marketplace Categories */}
                <div className="mb-8 flex gap-3 overflow-x-auto no-scrollbar">
                  {['Todos', 'Ferramentas', 'Materiais', 'Pintura', 'Elétrica', 'Hidráulica'].map((cat, i) => (
                    <button
                      key={cat}
                      className={`flex-shrink-0 rounded-lg px-6 py-2.5 text-xs font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-background text-primary/60'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 p-6 text-white shadow-xl shadow-secondary/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md">
                        <Zap size={20} className="text-white" />
                      </div>
                      <h4 className="text-lg font-black">Entrega Turbo</h4>
                    </div>
                    <p className="text-xs font-bold leading-relaxed opacity-90">
                      Sua obra não pode parar. Receba seus materiais com velocidade prioritária e rastreamento em tempo real.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-br from-accent to-accent/80 p-6 text-primary shadow-xl shadow-accent/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md">
                        <ShieldCheck size={20} className="text-white" />
                      </div>
                      <h4 className="text-lg font-black">Satisfação ObraBase</h4>
                    </div>
                    <p className="text-xs font-bold leading-relaxed opacity-90">
                      Segurança total para sua compra. Se o material não chegar exatamente como esperado, nós resolvemos.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
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
                className="p-6 pb-24 max-w-7xl mx-auto w-full"
              >
                <div className="mb-8 flex items-center gap-4">
                  <button
                    onClick={() => handleViewChange('home')}
                    className="rounded-full bg-background p-3 text-primary/60 transition-all active:scale-90"
                  >
                    <ArrowLeft size={24} />
                  </button>
                  <h1 className="text-2xl font-black text-primary">Categorias</h1>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {[
                    { name: 'Pedreiro', icon: <HardHat size={32} /> },
                    { name: 'Pintor', icon: <Paintbrush size={32} /> },
                    { name: 'Elétrica', icon: <Zap size={32} /> },
                    { name: 'Hidráulica', icon: <Droplets size={32} /> },
                    { name: 'Marceneiro', icon: <Hammer size={32} /> },
                    { name: 'Gesso', icon: <Layers size={32} /> },
                    { name: 'Telhado', icon: <Home size={32} /> },
                    { name: 'Arquiteto', icon: <PencilRuler size={32} /> },
                    { name: 'Engenharia', icon: <Compass size={32} /> },
                    { name: 'Climatização', icon: <Wind size={32} /> },
                    { name: 'Jardinagem', icon: <Sprout size={32} /> },
                    { name: 'Limpeza', icon: <Sparkles size={32} /> }
                  ].map((cat) => (
                    <motion.button
                      key={cat.name}
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex flex-col items-center justify-center gap-4 rounded-xl bg-background p-8 border border-white transition-all hover:bg-secondary/5 hover:border-secondary/20 hover:shadow-xl group outline-none"
                    >
                      <div className="text-primary/60 group-hover:text-secondary transition-colors">
                        {cat.icon}
                      </div>
                      <span className="text-xs font-black text-primary/60 uppercase tracking-widest group-hover:text-secondary transition-colors text-center">{cat.name}</span>
                    </motion.button>
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
          <Footer />
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
        <p className="text-primary/40">Profissional não encontrado.</p>
      </div>
    );
  }

  return (
    <motion.div
      key="prof-detail"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="pb-24 max-w-7xl mx-auto w-full"
    >
      <div className="relative h-64 w-full bg-muted overflow-hidden lg:rounded-2xl lg:mt-6">
        <img
          src={professional.portfolio[0]}
          className="h-full w-full object-cover"
          alt="Capa"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative -mt-16 px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            <div className="flex items-end gap-6 mb-10">
              <div className="h-32 w-32 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-2xl">
                <img src={professional.avatar} className="h-full w-full object-cover" alt={professional.name} />
              </div>
              <div className="mb-4">
                <h1 className="text-4xl font-black text-primary leading-none">{professional.name}</h1>
                <p className="mt-2 text-lg font-bold text-secondary">{professional.specialty}</p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-1 bg-accent/10 px-3 py-1 rounded-lg border border-accent/20">
                    <Star size={16} className="fill-accent text-accent" />
                    <span className="text-sm font-black text-primary">{professional.rating}</span>
                  </div>
                  <span className="text-primary/60 font-bold">({professional.reviewCount} avaliações)</span>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <section>
                <h2 className="text-xl font-black text-primary mb-4 flex items-center gap-2">
                  <Info size={20} className="text-secondary" />
                  Sobre
                </h2>
                <p className="text-base leading-relaxed text-primary/80 font-medium">
                  {professional.bio}
                </p>
              </section>

              {professional.albums && professional.albums.length > 0 && (
                <section>
                  <h2 className="text-xl font-black text-primary mb-6 flex items-center gap-2">
                    <Camera size={20} className="text-secondary" />
                    Principais Álbuns
                  </h2>
                  <AlbumCarousel albums={professional.albums} />
                </section>
              )}

              <section>
                <h2 className="text-xl font-black text-primary mb-6 flex items-center gap-2">
                  <Star size={20} className="text-secondary" />
                  O que os clientes dizem
                </h2>
                <ReviewList reviews={professional.reviews || []} />
              </section>

              <section>
                <h2 className="text-xl font-black text-primary mb-6 flex items-center gap-2">
                  <ExternalLink size={20} className="text-secondary" />
                  Galeria de Projetos
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {professional.portfolio.map((img, i) => (
                    <motion.img
                      key={i}
                      src={img}
                      whileHover={{ scale: 1.05 }}
                      className="aspect-square rounded-2xl object-cover shadow-md cursor-pointer"
                      alt={`Obra ${i}`}
                    />
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-2xl border border-border bg-white p-8 shadow-2xl shadow-primary/5">
                <h3 className="text-2xl font-black text-primary mb-6">Contratação Segura</h3>

                <div className="space-y-6 mb-8">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border">
                    <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-secondary shadow-sm">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest leading-none">Status</p>
                      <p className="text-sm font-black text-secondary mt-1">Verificado ObraBase</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-background border border-border text-center">
                      <p className="text-xl font-black text-primary">{professional.projectsCount}</p>
                      <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest mt-1">Obras</p>
                    </div>
                    <div className="p-4 rounded-xl bg-background border border-border text-center">
                      <p className="text-xl font-black text-primary">{professional.rating}</p>
                      <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest mt-1">Rating</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full rounded-xl bg-secondary py-4 font-black text-white shadow-xl shadow-secondary/20 hover:bg-secondary/90 transition-all active:scale-95 flex items-center justify-center gap-3">
                    <MessageCircle size={20} />
                    Solicitar Orçamento
                  </button>
                  <button className="w-full rounded-xl bg-primary py-4 font-black text-white hover:bg-primary/90 transition-all active:scale-95 flex items-center justify-center gap-3">
                    <MessageCircle size={20} />
                    Falar no Chat
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-secondary/20 bg-secondary/5 p-6">
                <h4 className="text-sm font-black text-secondary flex items-center gap-2 mb-3">
                  <CheckCircle2 size={16} className="text-accent" />
                  Garantia de Qualidade
                </h4>
                <p className="text-xs font-bold text-secondary/70 leading-relaxed">
                  Este profissional passou pelo nosso processo rigoroso de verificação. Garantimos o suporte do ObraBase durante toda a sua obra.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Action Bar - Fixed Bottom */}
        <div className="fixed bottom-20 left-0 right-0 z-40 border-t border-border bg-white/90 px-6 py-4 backdrop-blur-md md:hidden">
          <div className="flex gap-3">
            <button className="flex-1 rounded-xl bg-secondary py-4 font-black text-white shadow-lg active:scale-95">
              Orçamento
            </button>
            <button className="rounded-xl bg-primary px-6 py-4 font-black text-white active:scale-95">
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
      className="p-6 pb-24 max-w-7xl mx-auto w-full"
    >
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl bg-background p-3 text-primary/60 transition-all active:scale-90 hover:bg-slate-200"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-black text-primary leading-none">Detalhes da Loja</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content: Products & Reviews */}
        <div className="lg:col-span-2 space-y-16">
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-primary">Vitrine de Produtos</h3>
              <span className="bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                {MOCK_PRODUCTS.filter(p => p.storeId === store.id).length} itens
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {MOCK_PRODUCTS.filter(p => p.storeId === store.id).map(product => (
                <ProductCard key={product.id} product={product} onClick={(p) => navigate(`/product/${p.id}`)} />
              ))}
            </div>
          </section>

          <section className="bg-background p-8 rounded-3xl border border-border">
            <h3 className="text-2xl font-black text-primary mb-2">Comentários e Notas</h3>
            <p className="mb-10 text-sm font-medium text-primary/60 italic">Veja por que os profissionais recomendam esta loja.</p>
            <ReviewList reviews={store.reviews || []} />
          </section>
        </div>

        {/* Sidebar: Store Info */}
        <div className="order-first lg:order-last">
          <div className="sticky top-28 space-y-8">
            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-border shadow-2xl shadow-primary/5">
              <div className="relative h-40 w-40 mb-6">
                <img src={store.avatar} className="h-full w-full rounded-2xl object-cover shadow-2xl" alt={store.name} />
                {store.isVerified && (
                  <div className="absolute -bottom-3 -right-3 rounded-xl bg-accent p-3 shadow-xl ring-4 ring-white">
                    <CheckCircle2 size={24} className="text-primary" />
                  </div>
                )}
              </div>
              <h2 className="text-4xl font-black text-primary leading-tight">{store.name}</h2>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-accent/10 px-4 py-1.5 rounded-xl border border-accent/20">
                  <Star size={20} className="fill-accent text-accent" />
                  <span className="text-lg font-black text-primary">{store.rating}</span>
                </div>
                <span className="text-primary/60 font-bold">({store.reviewCount})</span>
              </div>

              <div className="mt-6 flex flex-col items-center gap-2 text-slate-500 font-bold">
                <div className="flex items-center gap-2 text-sm bg-slate-100 px-4 py-2 rounded-lg">
                  <MapPin size={18} className="text-emerald-500" />
                  <span>{store.location}</span>
                </div>
              </div>

              {store.description && (
                <p className="mt-8 text-base font-medium text-slate-600 leading-relaxed italic">
                  "{store.description}"
                </p>
              )}
            </div>

            <div className="rounded-3xl border border-border bg-white p-8">
              <h3 className="text-lg font-black text-primary mb-6 flex items-center gap-2">
                <Tag size={20} className="text-secondary" />
                Departamentos
              </h3>
              <div className="flex flex-wrap gap-2">
                {store.categories.map(cat => (
                  <span key={cat} className="rounded-lg bg-background px-4 py-2 text-xs font-black text-primary/60 border border-transparent hover:border-secondary/20 transition-colors">
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-secondary/20 bg-secondary/5 p-6 flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-secondary text-white shadow-lg shadow-secondary/20">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h4 className="text-sm font-black text-secondary mb-1">Loja de Confiança</h4>
                <p className="text-xs font-bold text-secondary/70 leading-relaxed">
                  Histórico verificado pelo ObraBase. Garantia de entrega e procedência dos materiais.
                </p>
              </div>
            </div>
          </div>
        </div>
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
        <p className="text-primary/40">Produto não encontrado.</p>
      </div>
    );
  }

  return (
    <motion.div
      key="product-detail"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pb-32 max-w-7xl mx-auto w-full lg:px-8 lg:pt-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Image Gallery */}
        <div className="relative w-full overflow-hidden lg:rounded-3xl shadow-2xl">
          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar aspect-square bg-background">
            {(product.images || [product.image]).map((img, i) => (
              <img key={i} src={img} className="h-full w-full object-cover flex-shrink-0 snap-center" alt={product.name} />
            ))}
          </div>
          <button
            onClick={() => navigate(-1)}
            className="absolute left-6 top-6 rounded-xl bg-white/90 p-3 text-primary/60 backdrop-blur-md shadow-lg z-10 hover:bg-white transition-all active:scale-95"
          >
            <ArrowLeft size={24} />
          </button>
          {product.images && product.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 px-3 py-1.5 bg-black/20 backdrop-blur-md rounded-full">
              {product.images.map((_, i) => (
                <div key={i} className="h-2 w-2 rounded-full bg-white/50" />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Details */}
        <div className="p-6 lg:p-0">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(`/store/${product.storeId}`)}
              className="flex items-center gap-2 text-xs font-black text-secondary uppercase tracking-[0.2em] hover:text-secondary/80 transition-colors"
            >
              <StoreIcon size={14} />
              {product.storeName}
            </button>
            <div className="flex items-center gap-1.5 bg-accent/10 px-3 py-1 rounded-lg border border-accent/20">
              <Star size={16} className="fill-accent text-accent" />
              <span className="text-sm font-black text-primary">{product.rating || '4.8'}</span>
            </div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-black text-primary leading-tight mb-6">{product.name}</h1>

          <div className="flex items-baseline gap-4 mb-10">
            <span className="text-5xl font-black text-primary">R$ {product.price.toFixed(2)}</span>
            <span className="text-lg font-bold text-primary/40 line-through">R$ {(product.price * 1.15).toFixed(2)}</span>
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl bg-background p-6 border border-border">
              <h3 className="text-lg font-black text-primary mb-4 flex items-center gap-2">
                <Info size={20} className="text-secondary" />
                Especificações
              </h3>
              <p className="text-base text-primary/80 leading-relaxed font-medium">
                Material de alta performance para sua obra. Testado e aprovado pelos melhores profissionais da plataforma ObraBase.
              </p>
            </div>

            <div className="rounded-2xl bg-accent/10 p-6 border border-accent/20">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-primary shadow-lg shadow-accent/20">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h4 className="text-lg font-black text-primary">Compra Garantida</h4>
                  <p className="text-sm font-bold text-primary/70 leading-relaxed">
                    Receba seu product ou o ObraBase devolve o seu dinheiro. Segurança total para sua obra.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions for Desktop */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <button className="rounded-2xl bg-secondary py-6 font-black text-white shadow-2xl shadow-secondary/20 hover:bg-secondary/90 transition-all active:scale-95 flex items-center justify-center gap-3">
                <ShoppingBag size={24} />
                Comprar Agora
              </button>
              <button className="rounded-2xl bg-primary py-6 font-black text-white hover:bg-primary/90 transition-all active:scale-95 flex items-center justify-center gap-3">
                <MessageCircle size={24} />
                Dúvidas no Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Action Bar - Fixed Bottom */}
      <div className="fixed bottom-20 left-0 right-0 z-40 border-t border-border bg-white/90 px-6 py-4 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-md gap-3">
          <button className="flex-1 rounded-xl bg-secondary py-4 font-black text-white shadow-lg active:scale-95">
            Comprar Agora
          </button>
          <button className="rounded-xl bg-primary px-6 py-4 font-black text-white active:scale-95">
            Chat
          </button>
        </div>
      </div>
    </motion.div>
  );
}
