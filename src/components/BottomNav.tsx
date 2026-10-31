import React from 'react';
import { Home, Star, Folder, Info, Settings } from 'lucide-react';

export type NavTab = 'beranda' | 'favorit' | 'template' | 'tentang' | 'pengaturan';

interface BottomNavProps {
  currentTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  favoritesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onChangeTab,
  favoritesCount,
}) => {
  const tabs = [
    { id: 'beranda' as NavTab, label: 'Beranda', icon: Home },
    { id: 'favorit' as NavTab, label: 'Favorit', icon: Star, badge: favoritesCount > 0 ? favoritesCount : undefined },
    { id: 'template' as NavTab, label: 'Template', icon: Folder },
    { id: 'tentang' as NavTab, label: 'Tentang', icon: Info },
    { id: 'pengaturan' as NavTab, label: 'Pengaturan', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] py-1.5 px-3">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-150 select-none ${
                isActive
                  ? 'text-emerald-700 font-extrabold scale-105'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'stroke-[2.5] text-emerald-600 scale-110' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-emerald-600 text-[9px] font-black text-white shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-0.5 tracking-tight ${
                  isActive ? 'text-emerald-800 font-extrabold' : 'text-slate-500'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
