import React, { useState } from 'react';
import { Search, Menu, X, Sparkles, BookOpen, Heart, HelpCircle, Share2, Check } from 'lucide-react';

interface HeaderProps {
  onSearchClick: () => void;
  onOpenAbout: () => void;
  onOpenTemplates: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick, onOpenAbout, onOpenTemplates }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-700 text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 bg-white rounded-xl shadow-md p-1.5 border border-emerald-200">
            <BookOpen className="w-7 h-7 text-emerald-600" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-black text-amber-950 shadow">
              ★
            </span>
          </div>
          <div>
            <div className="text-[14px] md:text-base font-extrabold tracking-tight leading-tight text-white drop-shadow-sm flex items-center gap-1.5">
              <span>Media Ajar &amp; Game</span>
            </div>
            <div className="text-[12px] md:text-xs font-semibold text-emerald-100 flex items-center gap-1">
              <span className="text-amber-300 font-bold">Edukasi</span>
              <span>Interaktif</span>
              <span className="hidden sm:inline-block px-1.5 py-0.2 bg-emerald-800/80 text-[10px] rounded-full text-emerald-200 ml-1 border border-emerald-500/30">
                Kurikulum Merdeka
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSearchClick}
            aria-label="Cari Media Ajar"
            className="w-10 h-10 rounded-full bg-white text-emerald-700 shadow hover:bg-emerald-50 active:scale-95 transition flex items-center justify-center"
          >
            <Search className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label="Menu"
            className="w-10 h-10 rounded-full bg-emerald-800/80 text-white hover:bg-emerald-900 active:scale-95 transition flex items-center justify-center border border-emerald-500/40"
          >
            {drawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Dropdown / Drawer Menu */}
      {drawerOpen && (
        <div className="border-t border-emerald-600/50 bg-emerald-800 text-white px-4 py-3 transition animate-in fade-in slide-in-from-top-2">
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium">
            <button
              onClick={() => {
                onOpenTemplates();
                setDrawerOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-700/60 hover:bg-emerald-700 text-left transition"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Template Instan</span>
            </button>
            <button
              onClick={() => {
                onOpenAbout();
                setDrawerOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-700/60 hover:bg-emerald-700 text-left transition"
            >
              <HelpCircle className="w-4 h-4 text-sky-300" />
              <span>Panduan Guru</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-700/60 hover:bg-emerald-700 text-left transition"
            >
              {copiedLink ? <Check className="w-4 h-4 text-green-300" /> : <Share2 className="w-4 h-4 text-emerald-300" />}
              <span>{copiedLink ? 'Link Tersalin!' : 'Bagikan Aplikasi'}</span>
            </button>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-900/60 text-emerald-200">
              <Heart className="w-4 h-4 text-rose-400" />
              <span className="truncate">Untuk Guru Indonesia</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
