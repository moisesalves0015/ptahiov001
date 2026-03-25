import React from 'react';
import { Home, Film, ShoppingBag, Bell, User } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { AppView } from '../types';

interface BottomNavProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

export function BottomNav({ currentView, onViewChange }: BottomNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'feed', icon: Film, label: 'Feed', path: '/feed' },
    { id: 'marketplace', icon: ShoppingBag, label: 'Loja', path: '/marketplace' },
    { id: 'notifications', icon: Bell, label: 'Alertas', path: '/notifications' },
    { id: 'profile', icon: User, label: 'Eu', path: '/profile' },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center justify-around px-2 pb-safe backdrop-blur-xl md:hidden transition-all duration-300 ${
      currentView === 'feed' 
        ? 'bg-black/20 border-t border-white/10' 
        : 'bg-white/80 border-t border-border'
    }`}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;

        return (
          <Link
            key={item.id}
            to={item.path}
            className="relative flex flex-col items-center justify-center gap-1 transition-all active:scale-90"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300 ${
                isActive 
                  ? (currentView === 'feed' ? 'bg-white text-black shadow-xl shadow-white/10' : 'bg-primary text-white shadow-xl shadow-primary/20')
                  : (currentView === 'feed' ? 'text-white/40 hover:bg-white/5' : 'text-primary/40 hover:bg-background')
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span
              className={`text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                isActive 
                  ? (currentView === 'feed' ? 'text-white opacity-100' : 'text-primary opacity-100')
                  : 'text-primary/40 opacity-0'
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
