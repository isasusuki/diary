import React, { useRef } from 'react';
import { DiaryPage, PlacedSticker } from '../types';
import { StickerItem } from './StickerItem';
import { WashiTapeItem } from './WashiTapeItem';
import { WidgetsSection } from './WidgetsSection';
import { FONT_OPTIONS } from '../data/stickersData';

interface DiaryPageCanvasProps {
  page: DiaryPage;
  onUpdatePage: (updated: Partial<DiaryPage>) => void;
  selectedStickerId: string | null;
  setSelectedStickerId: (id: string | null) => void;
  isReadOnly?: boolean;
}

export const DiaryPageCanvas: React.FC<DiaryPageCanvasProps> = ({
  page,
  onUpdatePage,
  selectedStickerId,
  setSelectedStickerId,
  isReadOnly = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Paper texture class mapping
  const paperClassMap = {
    lined: 'paper-lined bg-[#FFFDFE]',
    grid: 'paper-grid bg-[#FFFDFE]',
    dots: 'paper-dots bg-[#FFFDFE]',
    kraft: 'paper-kraft text-[#453225]',
    plain: 'paper-plain bg-[#FFFEFC]',
  };

  // Font CSS class mapping
  const currentFontObj = FONT_OPTIONS.find((f) => f.id === page.fontFamily) || FONT_OPTIONS[0];

  // Update sticker
  const handleUpdateSticker = (stickerId: string, updated: Partial<PlacedSticker>) => {
    const newStickers = page.stickers.map((s) =>
      s.id === stickerId ? { ...s, ...updated } : s
    );
    onUpdatePage({ stickers: newStickers });
  };

  // Delete sticker
  const handleDeleteSticker = (stickerId: string) => {
    const newStickers = page.stickers.filter((s) => s.id !== stickerId);
    onUpdatePage({ stickers: newStickers });
    if (selectedStickerId === stickerId) setSelectedStickerId(null);
  };

  // Bring sticker to front
  const handleBringToFront = (stickerId: string) => {
    const maxZ = Math.max(1, ...page.stickers.map((s) => s.zIndex || 1));
    handleUpdateSticker(stickerId, { zIndex: maxZ + 1 });
  };

  // Delete washi tape
  const handleDeleteWashi = (tapeId: string) => {
    const newTapes = page.washiTapes.filter((t) => t.id !== tapeId);
    onUpdatePage({ washiTapes: newTapes });
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto my-4 transition-all select-text">
      {/* Outer physical book spine / spiral binding effect */}
      <div className="relative rounded-3xl shadow-xl shadow-rose-950/5 border-2 border-rose-100/90 overflow-visible bg-white/40 p-2 sm:p-3">
        {/* Binder spiral rings along the top */}
        <div className="absolute -top-3 left-12 right-12 flex justify-between px-4 z-30 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-2.5 h-6 bg-linear-to-b from-rose-200 via-rose-300 to-rose-400 rounded-full shadow-xs border border-rose-300/80" />
            </div>
          ))}
        </div>

        {/* Paper Canvas Container */}
        <div
          ref={containerRef}
          id="diary-canvas-sheet"
          onClick={() => setSelectedStickerId(null)}
          className={`relative min-h-[640px] rounded-2xl p-6 sm:p-10 shadow-inner border border-rose-100/70 transition-colors duration-200 overflow-hidden ${
            paperClassMap[page.paperStyle] || paperClassMap.lined
          }`}
          style={{
            color: page.textColor,
          }}
        >
          {/* Washi Tapes Layer */}
          {page.washiTapes.map((tape) => (
            <WashiTapeItem
              key={tape.id}
              tape={tape}
              isReadOnly={isReadOnly}
              onDelete={() => handleDeleteWashi(tape.id)}
            />
          ))}

          {/* Diary Header: Date & Ribbon */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-rose-200/50 gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌸</span>
              {isReadOnly ? (
                <span className="font-quicksand font-bold text-xs sm:text-sm text-gray-500 tracking-wide">
                  {page.date}
                </span>
              ) : (
                <input
                  type="text"
                  value={page.date}
                  onChange={(e) => onUpdatePage({ date: e.target.value })}
                  placeholder="Data de hoje..."
                  className="font-quicksand font-bold text-xs sm:text-sm text-gray-600 bg-transparent border-b border-transparent hover:border-rose-200 focus:border-rose-400 focus:outline-hidden"
                />
              )}
            </div>

            {page.author && (
              <div className="flex items-center gap-2">
                <img
                  src={page.author.avatar}
                  alt={page.author.name}
                  referrerPolicy="no-referrer"
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-rose-200"
                />
                <span className="text-xs font-quicksand font-medium text-gray-500">
                  {page.author.name}
                </span>
              </div>
            )}
          </div>

          {/* Widgets Section (Mood, Weather, Playlist, Self-Care, Affirmation, Polaroid) */}
          <WidgetsSection
            widgets={page.widgets}
            onUpdateWidgets={(updated) =>
              onUpdatePage({ widgets: { ...page.widgets, ...updated } })
            }
            isReadOnly={isReadOnly}
          />

          {/* Diary Page Title */}
          <div className="mb-4">
            {isReadOnly ? (
              <h2
                className={`${currentFontObj.cssClass} font-bold text-2xl sm:text-3xl leading-snug`}
                style={{ textAlign: page.textAlign, color: page.textColor }}
              >
                {page.title}
              </h2>
            ) : (
              <input
                type="text"
                value={page.title}
                onChange={(e) => onUpdatePage({ title: e.target.value })}
                placeholder="Título do meu dia..."
                className={`w-full ${currentFontObj.cssClass} font-bold text-2xl sm:text-3xl leading-snug bg-transparent border-b border-dashed border-rose-200 focus:border-rose-400 focus:outline-hidden py-1`}
                style={{ textAlign: page.textAlign, color: page.textColor }}
              />
            )}
          </div>

          {/* Diary Page Body / Content */}
          <div className="relative mb-8">
            {isReadOnly ? (
              <div
                className={`${currentFontObj.cssClass} whitespace-pre-wrap leading-relaxed min-h-[220px]`}
                style={{
                  fontSize: `${page.fontSize}px`,
                  textAlign: page.textAlign,
                  color: page.textColor,
                }}
              >
                {page.content}
              </div>
            ) : (
              <textarea
                value={page.content}
                onChange={(e) => onUpdatePage({ content: e.target.value })}
                placeholder="Querido diário... conte aqui seus pensamentos, sonhos, momentos doces e segredos..."
                rows={12}
                className={`w-full ${currentFontObj.cssClass} leading-relaxed bg-transparent border-none focus:outline-hidden resize-none transition-all`}
                style={{
                  fontSize: `${page.fontSize}px`,
                  textAlign: page.textAlign,
                  color: page.textColor,
                }}
              />
            )}
          </div>

          {/* Placed Interactive Stickers Layer */}
          {page.stickers.map((stk) => (
            <StickerItem
              key={stk.id}
              sticker={stk}
              isSelected={selectedStickerId === stk.id}
              isReadOnly={isReadOnly}
              onSelect={() => setSelectedStickerId(stk.id)}
              onUpdate={(updated) => handleUpdateSticker(stk.id, updated)}
              onDelete={() => handleDeleteSticker(stk.id)}
              onBringToFront={() => handleBringToFront(stk.id)}
              containerRef={containerRef}
            />
          ))}

          {/* Paper footer aesthetic stamp */}
          <div className="mt-8 pt-4 border-t border-rose-200/40 flex items-center justify-between text-xs text-rose-300 font-quicksand">
            <span className="flex items-center gap-1">
              <span>✨</span>
              <span className="italic">Diário Chérie</span>
            </span>
            <span className="text-[11px] font-dancing text-rose-400">
              amor próprio & doçura
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
