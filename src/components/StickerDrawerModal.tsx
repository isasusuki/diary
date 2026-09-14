import React, { useState } from 'react';
import { 
  Smile, 
  Sparkles, 
  X, 
  Search,
  Tag
} from 'lucide-react';
import { STICKER_CATEGORIES, WASHI_TAPE_PRESETS } from '../data/stickersData';
import { PlacedSticker, PlacedWashiTape } from '../types';
import { cozyAudio } from '../utils/audioSynth';

interface StickerDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSticker: (sticker: Omit<PlacedSticker, 'id' | 'zIndex'>) => void;
  onAddWashiTape: (tape: Omit<PlacedWashiTape, 'id'>) => void;
}

export const StickerDrawerModal: React.FC<StickerDrawerModalProps> = ({
  isOpen,
  onClose,
  onAddSticker,
  onAddWashiTape,
}) => {
  const [activeTab, setActiveTab] = useState<'stickers' | 'washi'>('stickers');
  const [activeCategory, setActiveCategory] = useState<string>('coquette');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const currentCategoryObj = STICKER_CATEGORIES.find((c) => c.id === activeCategory) || STICKER_CATEGORIES[0];

  const handleSelectSticker = (stickerItem: { id: string; content: string; label: string; isTextBadge?: boolean; bg?: string }) => {
    cozyAudio.playCutePop();
    // Place randomly near top center with slight rotation
    const randomOffset = (Math.random() - 0.5) * 20;
    const randomRot = Math.floor((Math.random() - 0.5) * 24);

    onAddSticker({
      stickerId: stickerItem.id,
      category: activeCategory,
      content: stickerItem.content,
      isTextBadge: stickerItem.isTextBadge,
      x: Math.max(10, Math.min(80, 50 + randomOffset)),
      y: Math.max(15, Math.min(75, 40 + randomOffset)),
      rotation: randomRot,
      scale: 1.2,
    });
  };

  const handleSelectWashi = (washi: typeof WASHI_TAPE_PRESETS[0]) => {
    cozyAudio.playCutePop();
    const randomX = Math.floor(Math.random() * 50) + 20;
    const randomRot = Math.floor((Math.random() - 0.5) * 8);

    onAddWashiTape({
      pattern: washi.name,
      color: washi.color,
      styleClass: washi.style,
      x: randomX,
      y: -10,
      rotation: randomRot,
      width: 130,
    });
  };

  // Filter stickers if search
  const filteredStickers = searchTerm
    ? STICKER_CATEGORIES.flatMap((c) => c.stickers).filter((s) =>
        s.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : currentCategoryObj.stickers;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="sticker-drawer-modal-container"
        className="bg-white/95 backdrop-blur-md rounded-3xl max-w-lg w-full p-5 shadow-2xl border border-rose-100 flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-rose-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎀</span>
            <div>
              <h3 className="font-playfair font-bold text-gray-800 text-base">
                Estojo de Adesivos & Fitas Fofas
              </h3>
              <p className="text-[11px] font-quicksand text-gray-500">
                Toque em qualquer item para colar no seu diário
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-rose-100 text-gray-400 hover:text-rose-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch: Stickers vs Washi Tape */}
        <div className="flex items-center gap-2 my-3">
          <button
            onClick={() => {
              cozyAudio.playCutePop();
              setActiveTab('stickers');
            }}
            className={`flex-1 py-1.5 px-3 rounded-xl font-quicksand text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'stickers'
                ? 'bg-rose-100 text-rose-700 shadow-xs'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Smile className="w-3.5 h-3.5" />
            <span>Adesivos Fofos</span>
          </button>

          <button
            onClick={() => {
              cozyAudio.playCutePop();
              setActiveTab('washi');
            }}
            className={`flex-1 py-1.5 px-3 rounded-xl font-quicksand text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'washi'
                ? 'bg-rose-100 text-rose-700 shadow-xs'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Fitas Washi Tape</span>
          </button>
        </div>

        {/* Stickers Content */}
        {activeTab === 'stickers' ? (
          <>
            {/* Search Input */}
            <div className="relative mb-2.5">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Procurar laço, morango, gatinho, brilho..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-rose-100 bg-rose-50/40 text-xs font-quicksand focus:outline-hidden focus:border-rose-300"
              />
            </div>

            {/* Category pills if not searching */}
            {!searchTerm && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 scrollbar-none">
                {STICKER_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      cozyAudio.playCutePop();
                      setActiveCategory(cat.id);
                    }}
                    className={`shrink-0 px-2.5 py-1 rounded-xl text-xs font-quicksand font-medium flex items-center gap-1 transition-all ${
                      activeCategory === cat.id
                        ? 'bg-rose-500 text-white shadow-xs font-semibold'
                        : 'bg-rose-50/60 text-gray-600 hover:bg-rose-100/60'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Sticker grid */}
            <div className="flex-1 overflow-y-auto max-h-72 p-1">
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                {filteredStickers.map((stk) => (
                  <button
                    key={stk.id}
                    id={`sticker-picker-${stk.id}`}
                    onClick={() => handleSelectSticker(stk)}
                    className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-rose-50/40 hover:bg-rose-100/80 border border-rose-100/60 hover:border-rose-300 hover:scale-110 active:scale-95 transition-all group"
                  >
                    {stk.isTextBadge ? (
                      <span className="px-2 py-1 rounded-full text-[11px] font-quicksand font-bold bg-white text-rose-800 border border-rose-200 shadow-2xs">
                        {stk.content}
                      </span>
                    ) : (
                      <span className="text-3xl select-none group-hover:rotate-6 transition-transform">
                        {stk.content}
                      </span>
                    )}
                    <span className="text-[10px] text-gray-500 font-quicksand mt-1 truncate max-w-full">
                      {stk.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Washi Tape Selection */
          <div className="flex-1 overflow-y-auto max-h-72 space-y-2.5 p-1">
            <p className="text-xs text-gray-500 font-quicksand mb-2">
              Escolha uma fita adesiva para decorar as bordas ou o topo do seu caderno:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {WASHI_TAPE_PRESETS.map((washi) => (
                <div
                  key={washi.id}
                  onClick={() => handleSelectWashi(washi)}
                  style={{ backgroundColor: washi.color }}
                  className="p-3 rounded-xl border border-black/10 cursor-pointer hover:scale-102 transition-transform shadow-xs flex items-center justify-between"
                >
                  <span className="text-xs font-quicksand font-bold uppercase tracking-wider text-black/60">
                    {washi.name}
                  </span>
                  <span className="text-xs bg-white/80 px-2 py-0.5 rounded-full font-quicksand font-bold text-gray-700">
                    + Colar
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer tip */}
        <div className="pt-3 border-t border-rose-100 text-center">
          <p className="text-[11px] font-quicksand text-rose-500/80 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3" />
            Dica: você pode arrastar, girar, redimensionar e excluir qualquer adesivo direto no papel!
          </p>
        </div>
      </div>
    </div>
  );
};
