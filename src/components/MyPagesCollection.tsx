import React, { useState } from 'react';
import { 
  BookHeart, 
  Trash2, 
  Edit3, 
  Share2, 
  PlusCircle, 
  Calendar, 
  Sparkles,
  Heart,
  Eye
} from 'lucide-react';
import { DiaryPage } from '../types';
import { MOOD_OPTIONS } from '../data/stickersData';
import { cozyAudio } from '../utils/audioSynth';

interface MyPagesCollectionProps {
  pages: DiaryPage[];
  onSelectPage: (page: DiaryPage) => void;
  onDeletePage: (id: string) => void;
  onNewPage: () => void;
  onShareToClub: (page: DiaryPage) => void;
}

export const MyPagesCollection: React.FC<MyPagesCollectionProps> = ({
  pages,
  onSelectPage,
  onDeletePage,
  onNewPage,
  onShareToClub,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPages = pages.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 space-y-6" id="my-pages-collection-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/90 p-5 rounded-3xl border border-rose-100 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-pink-100 border border-pink-200 flex items-center justify-center text-2xl shadow-xs">
            📚
          </div>
          <div>
            <h2 className="font-playfair font-bold text-xl sm:text-2xl text-gray-800">
              Meu Caderno de Memórias
            </h2>
            <p className="text-xs font-quicksand text-gray-500">
              Você tem {pages.length} {pages.length === 1 ? 'página escrita' : 'páginas escritas'} com carinho
            </p>
          </div>
        </div>

        <button
          id="btn-create-new-page-from-collection"
          onClick={() => {
            cozyAudio.playCutePop();
            onNewPage();
          }}
          className="px-4 py-2 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-quicksand font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-102 active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Escrever Nova Página</span>
        </button>
      </div>

      {/* Pages Grid */}
      {filteredPages.length === 0 ? (
        <div className="text-center py-16 bg-white/80 rounded-3xl border border-rose-100 p-6 space-y-3">
          <span className="text-5xl">📖</span>
          <h3 className="font-playfair font-bold text-gray-700 text-lg">
            Seu diário ainda está esperando suas palavras
          </h3>
          <p className="text-xs text-gray-500 font-quicksand max-w-sm mx-auto">
            Abra uma folha em branco, escolha uma fonte manuscrita, cole adesivos fofos e guarde seus momentos especiais.
          </p>
          <button
            onClick={() => {
              cozyAudio.playCutePop();
              onNewPage();
            }}
            className="mt-2 px-5 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-quicksand font-bold text-xs inline-flex items-center gap-2 shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Criar Primeira Página</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPages.map((page) => {
            const moodObj = MOOD_OPTIONS.find((m) => m.id === page.widgets.mood);
            return (
              <div
                key={page.id}
                id={`my-page-card-${page.id}`}
                className="bg-white/95 rounded-3xl border border-rose-200/80 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Washi tape decoration on top left */}
                {page.washiTapes && page.washiTapes.length > 0 && (
                  <div
                    className="absolute -top-1 left-6 w-20 h-4 rounded-xs shadow-2xs opacity-85 washi-tape-strip -rotate-2"
                    style={{ backgroundColor: page.washiTapes[0].color }}
                  />
                )}

                <div>
                  {/* Top bar: Date & Mood */}
                  <div className="flex items-center justify-between text-xs text-gray-400 font-quicksand mb-3 pt-2">
                    <span className="flex items-center gap-1.5 font-semibold text-gray-600">
                      <Calendar className="w-3.5 h-3.5 text-rose-400" />
                      <span>{page.date}</span>
                    </span>

                    {moodObj && (
                      <span className="px-2 py-0.5 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-[11px] font-semibold flex items-center gap-1">
                        <span>{moodObj.emoji}</span>
                        <span>{moodObj.label}</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-playfair font-bold text-lg text-gray-800 line-clamp-1 group-hover:text-rose-600 transition-colors">
                    {page.title || 'Página sem título'}
                  </h3>

                  {/* Content snippet */}
                  <p className="font-caveat text-xl text-gray-600 line-clamp-3 my-2 leading-snug">
                    {page.content || 'Página em branco...'}
                  </p>

                  {/* Stickers preview tags */}
                  {page.stickers && page.stickers.length > 0 && (
                    <div className="flex items-center gap-1 overflow-x-auto py-1.5">
                      {page.stickers.slice(0, 5).map((stk, idx) => (
                        <span
                          key={idx}
                          className="text-lg p-1 bg-rose-50/60 rounded-lg border border-rose-100"
                        >
                          {stk.content}
                        </span>
                      ))}
                      {page.stickers.length > 5 && (
                        <span className="text-[10px] font-bold text-gray-400 font-quicksand">
                          +{page.stickers.length - 5}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-rose-100 flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        cozyAudio.playCutePop();
                        onSelectPage(page);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-quicksand font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Abrir & Editar</span>
                    </button>

                    <button
                      onClick={() => {
                        cozyAudio.playSparkle();
                        onShareToClub(page);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-quicksand font-bold text-xs flex items-center gap-1 transition-colors"
                      title="Postar no feed privado"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Compartilhar</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm('Tem certeza de que deseja apagar esta página do diário?')) {
                        onDeletePage(page.id);
                      }
                    }}
                    className="p-1.5 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                    title="Excluir página"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
