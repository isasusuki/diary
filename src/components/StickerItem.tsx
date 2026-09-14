import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, Trash2, ZoomIn, ZoomOut, ArrowUpCircle } from 'lucide-react';
import { PlacedSticker } from '../types';
import { cozyAudio } from '../utils/audioSynth';

interface StickerItemProps {
  sticker: PlacedSticker;
  isSelected: boolean;
  isReadOnly?: boolean;
  onSelect: () => void;
  onUpdate: (updated: Partial<PlacedSticker>) => void;
  onDelete: () => void;
  onBringToFront: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const StickerItem: React.FC<StickerItemProps> = ({
  sticker,
  isSelected,
  isReadOnly = false,
  onSelect,
  onUpdate,
  onDelete,
  onBringToFront,
  containerRef,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0, startStickerX: 0, startStickerY: 0 });

  // Handle Dragging
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isReadOnly) return;
    e.stopPropagation();
    onSelect();
    setIsDragging(true);

    const container = containerRef.current;
    if (!container) return;

    dragStartPos.current = {
      x: e.clientX,
      y: e.clientY,
      startStickerX: sticker.x,
      startStickerY: sticker.y,
    };

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isReadOnly) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const deltaX = ((e.clientX - dragStartPos.current.x) / rect.width) * 100;
    const deltaY = ((e.clientY - dragStartPos.current.y) / rect.height) * 100;

    let newX = dragStartPos.current.startStickerX + deltaX;
    let newY = dragStartPos.current.startStickerY + deltaY;

    // Bound between 0 and 96%
    newX = Math.max(0, Math.min(94, newX));
    newY = Math.max(0, Math.min(94, newY));

    onUpdate({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  };

  const handleRotate = (e: React.MouseEvent) => {
    e.stopPropagation();
    cozyAudio.playCutePop();
    const newRot = (sticker.rotation + 15) % 360;
    onUpdate({ rotation: newRot > 180 ? newRot - 360 : newRot });
  };

  const handleScale = (delta: number, e: React.MouseEvent) => {
    e.stopPropagation();
    cozyAudio.playCutePop();
    const newScale = Math.max(0.6, Math.min(2.5, Number((sticker.scale + delta).toFixed(2))));
    onUpdate({ scale: newScale });
  };

  return (
    <div
      id={`placed-sticker-${sticker.id}`}
      style={{
        left: `${sticker.x}%`,
        top: `${sticker.y}%`,
        transform: `rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
        zIndex: sticker.zIndex,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={(e) => {
        e.stopPropagation();
        if (!isReadOnly) onSelect();
      }}
      className={`absolute select-none cursor-grab active:cursor-grabbing transition-shadow ${
        isSelected && !isReadOnly
          ? 'ring-2 ring-rose-400 ring-offset-2 ring-offset-transparent rounded-xl bg-white/30 backdrop-blur-xs'
          : 'hover:scale-105'
      }`}
    >
      {/* Sticker Content */}
      <div className="relative p-1">
        {sticker.isTextBadge ? (
          <div className="px-3 py-1 rounded-full font-quicksand font-bold text-xs shadow-xs border border-rose-200/80 text-rose-800 bg-white/95 whitespace-nowrap">
            {sticker.content}
          </div>
        ) : (
          <div className="text-4xl sm:text-5xl filter drop-shadow-sm select-none">
            {sticker.content}
          </div>
        )}
      </div>

      {/* Floating Action Bar when selected */}
      {isSelected && !isReadOnly && (
        <div 
          className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/95 border border-rose-200 rounded-full px-2 py-1 shadow-lg z-50 animate-in fade-in zoom-in-90 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            title="Girar adesivo"
            onClick={handleRotate}
            className="p-1 rounded-full hover:bg-rose-100 text-rose-600 transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            title="Aumentar"
            onClick={(e) => handleScale(0.15, e)}
            className="p-1 rounded-full hover:bg-rose-100 text-rose-600 transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            title="Diminuir"
            onClick={(e) => handleScale(-0.15, e)}
            className="p-1 rounded-full hover:bg-rose-100 text-rose-600 transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            title="Trazer para frente"
            onClick={(e) => {
              e.stopPropagation();
              onBringToFront();
            }}
            className="p-1 rounded-full hover:bg-rose-100 text-rose-600 transition-colors"
          >
            <ArrowUpCircle className="w-3.5 h-3.5" />
          </button>
          <button
            title="Remover adesivo"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 rounded-full hover:bg-red-100 text-red-500 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
