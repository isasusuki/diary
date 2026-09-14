import React from 'react';
import { PlacedWashiTape } from '../types';
import { Trash2 } from 'lucide-react';

interface WashiTapeItemProps {
  tape: PlacedWashiTape;
  isReadOnly?: boolean;
  onDelete?: () => void;
}

export const WashiTapeItem: React.FC<WashiTapeItemProps> = ({
  tape,
  isReadOnly = false,
  onDelete,
}) => {
  return (
    <div
      id={`washi-tape-${tape.id}`}
      style={{
        left: `${tape.x}%`,
        top: `${tape.y}px`,
        transform: `rotate(${tape.rotation}deg)`,
        width: `${tape.width}px`,
        backgroundColor: tape.color,
      }}
      className="absolute h-6 z-20 shadow-xs backdrop-blur-xs opacity-90 washi-tape-strip flex items-center justify-between px-2 cursor-pointer group"
    >
      {/* Decorative semi-transparent jagged/tape styling */}
      <div className="w-1.5 h-full bg-white/30 rounded-xs" />
      <span className="text-[10px] font-quicksand font-bold tracking-widest uppercase text-black/40 truncate select-none">
        {tape.pattern}
      </span>
      <div className="w-1.5 h-full bg-white/30 rounded-xs" />

      {/* Delete button on hover if not readonly */}
      {!isReadOnly && onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          title="Remover fita"
          className="absolute -top-6 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center justify-center p-1 rounded-full bg-white text-red-500 shadow-md border border-rose-100 text-xs"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
