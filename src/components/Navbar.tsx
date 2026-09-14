import React, { useState } from 'react';
import { 
  BookHeart, 
  Sparkles, 
  Users, 
  Palette, 
  Music, 
  Volume2, 
  VolumeX, 
  Lock,
  ChevronDown,
  Download
} from 'lucide-react';
import { PastelTheme } from '../types';
import { PASTEL_THEMES } from '../data/themes';
import { cozyAudio } from '../utils/audioSynth';

interface NavbarProps {
  activeTab: 'editor' | 'pages' | 'community';
  setActiveTab: (tab: 'editor' | 'pages' | 'community') => void;
  currentTheme: PastelTheme;
  setCurrentTheme: (theme: PastelTheme) => void;
  myPagesCount: number;
  userName: string;
  userAvatar: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentTheme,
  setCurrentTheme,
  myPagesCount,
  userName,
  userAvatar,
}) => {
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const toggleMusic = () => {
    cozyAudio.playCutePop();
    const playing = cozyAudio.toggleAmbientLofi((state) => {
      setIsPlayingMusic(state);
    });
    setIsPlayingMusic(playing);
  };

  const downloadStandaloneHtml = async () => {
    cozyAudio.playSparkle();
    try {
      const response = await fetch('/diario-cherie.html');
      const htmlContent = await response.text();
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'index.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open('/diario-cherie.html', '_blank');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-rose-100 shadow-sm transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('editor')} 
          className="flex items-center gap-2.5 cursor-pointer group select-none"
          id="navbar-brand-btn"
        >
          <div className="w-10 h-10 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition-transform duration-200">
            🎀
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-playfair font-semibold text-lg tracking-tight text-gray-800 group-hover:text-rose-600 transition-colors">
                Diário Chérie
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100/80 text-rose-700 font-quicksand font-medium hidden sm:inline-block">
                Aesthetic & Girly
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-quicksand hidden md:block">
              Seu refúgio secreto de memórias e páginas decoradas
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center bg-rose-50/70 p-1 rounded-2xl border border-rose-100 shadow-inner">
          <button
            id="tab-btn-editor"
            onClick={() => {
              cozyAudio.playCutePop();
              setActiveTab('editor');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-quicksand text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'editor'
                ? 'bg-white text-rose-600 shadow-xs scale-[1.02]'
                : 'text-gray-500 hover:text-rose-500 hover:bg-white/50'
            }`}
          >
            <BookHeart className="w-4 h-4 text-rose-400" />
            <span>Escrever</span>
          </button>

          <button
            id="tab-btn-pages"
            onClick={() => {
              cozyAudio.playCutePop();
              setActiveTab('pages');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-quicksand text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'pages'
                ? 'bg-white text-rose-600 shadow-xs scale-[1.02]'
                : 'text-gray-500 hover:text-rose-500 hover:bg-white/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="hidden xs:inline">Minhas Páginas</span>
            <span className="xs:hidden">Páginas</span>
            {myPagesCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[10px] rounded-full bg-rose-200 text-rose-800 font-bold">
                {myPagesCount}
              </span>
            )}
          </button>

          <button
            id="tab-btn-community"
            onClick={() => {
              cozyAudio.playCutePop();
              setActiveTab('community');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-quicksand text-xs sm:text-sm font-semibold transition-all relative ${
              activeTab === 'community'
                ? 'bg-white text-purple-600 shadow-xs scale-[1.02]'
                : 'text-gray-500 hover:text-purple-500 hover:bg-white/50'
            }`}
          >
            <Users className="w-4 h-4 text-purple-400" />
            <span className="flex items-center gap-1">
              Feed do Clube
              <Lock className="w-2.5 h-2.5 text-purple-400" />
            </span>
          </button>
        </nav>

        {/* Right side tools: Audio, Themes & Profile */}
        <div className="flex items-center gap-2">
          {/* Lo-Fi ambient music player button */}
          <button
            id="lofi-ambient-toggle-btn"
            onClick={toggleMusic}
            title={isPlayingMusic ? 'Pausar música ambiente' : 'Ouvir sininhos relaxantes'}
            className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-quicksand font-medium ${
              isPlayingMusic
                ? 'bg-rose-100 border-rose-300 text-rose-700 animate-pulse shadow-xs'
                : 'bg-white/90 border-rose-100 text-gray-500 hover:bg-rose-50 hover:text-rose-600'
            }`}
          >
            <Music className={`w-4 h-4 ${isPlayingMusic ? 'text-rose-500 animate-bounce' : 'text-gray-400'}`} />
            {isPlayingMusic ? (
              <Volume2 className="w-3.5 h-3.5 text-rose-500" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
            )}
            <span className="hidden lg:inline">{isPlayingMusic ? 'Tocando Lo-Fi' : 'Música'}</span>
          </button>

          {/* Theme Selector Dropdown */}
          <div className="relative">
            <button
              id="theme-picker-menu-btn"
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-2 rounded-xl bg-white/90 border border-rose-100 text-gray-600 hover:bg-rose-50 hover:text-rose-600 flex items-center gap-1.5 text-xs font-quicksand font-medium transition-all shadow-xs"
              title="Mudar paleta pastel"
            >
              <Palette className="w-4 h-4 text-rose-400" />
              <span className="hidden sm:inline">{currentTheme.badge}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {showThemeMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowThemeMenu(false)}
                />
                <div 
                  id="theme-dropdown-container"
                  className="absolute right-0 mt-2 w-56 p-2 rounded-2xl bg-white shadow-xl border border-rose-100 z-50 space-y-1 animate-in fade-in zoom-in-95 duration-150"
                >
                  <p className="px-3 py-1 text-[11px] font-semibold tracking-wider uppercase text-gray-400 font-quicksand">
                    Paletas Pasteis 🌸
                  </p>
                  {PASTEL_THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      id={`theme-btn-${theme.id}`}
                      onClick={() => {
                        cozyAudio.playCutePop();
                        setCurrentTheme(theme);
                        setShowThemeMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-quicksand font-medium text-left transition-all ${
                        currentTheme.id === theme.id
                          ? 'bg-rose-50 text-rose-700 font-semibold'
                          : 'text-gray-600 hover:bg-rose-50/50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span 
                          className="w-3 h-3 rounded-full border border-black/10 inline-block"
                          style={{ backgroundColor: theme.accent }}
                        />
                        {theme.name}
                      </span>
                      {currentTheme.id === theme.id && (
                        <span className="text-rose-500 text-xs">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Download Standalone Single-File HTML Button */}
          <button
            id="download-standalone-html-btn"
            onClick={downloadStandaloneHtml}
            title="Baixar Diário em arquivo único index.html (roda direto no seu navegador sem instalar nada!)"
            className="px-2.5 py-1.5 rounded-xl bg-pink-100 hover:bg-pink-200 border border-pink-200 text-rose-700 flex items-center gap-1.5 text-xs font-quicksand font-bold transition-all shadow-xs hover:scale-102 active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-rose-600" />
            <span className="hidden sm:inline">Baixar index.html</span>
          </button>

          {/* User mini pill */}
          <div 
            id="user-profile-pill"
            className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full bg-white border border-rose-100 shadow-xs"
          >
            <img
              src={userAvatar}
              alt={userName}
              referrerPolicy="no-referrer"
              className="w-6 h-6 rounded-full object-cover ring-1 ring-rose-200"
            />
            <span className="text-xs font-quicksand font-semibold text-gray-700 hidden sm:inline">
              {userName}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
