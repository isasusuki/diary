import React, { useState } from 'react';
import { 
  Type, 
  Palette, 
  FileText, 
  Smile, 
  Settings2, 
  Save, 
  Share2, 
  PlusCircle, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Sliders,
  Sparkles,
  Lock,
  Globe,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DiaryPage, PlacedSticker, PlacedWashiTape, PaperStyle, HandwritingFont } from '../types';
import { FONT_OPTIONS, AESTHETIC_INK_COLORS } from '../data/stickersData';
import { DiaryPageCanvas } from './DiaryPageCanvas';
import { StickerDrawerModal } from './StickerDrawerModal';
import { cozyAudio } from '../utils/audioSynth';

interface DiaryEditorProps {
  currentPage: DiaryPage;
  onUpdateCurrentPage: (updated: Partial<DiaryPage>) => void;
  onSavePage: (page: DiaryPage) => void;
  onShareToClub: (page: DiaryPage) => void;
  onNewPage: () => void;
}

export const DiaryEditor: React.FC<DiaryEditorProps> = ({
  currentPage,
  onUpdateCurrentPage,
  onSavePage,
  onShareToClub,
  onNewPage,
}) => {
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [isStickerModalOpen, setIsStickerModalOpen] = useState(false);
  const [showWidgetsMenu, setShowWidgetsMenu] = useState(false);
  const [showInkMenu, setShowInkMenu] = useState(false);
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [showPaperMenu, setShowPaperMenu] = useState(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);

  const handleAddSticker = (stickerData: Omit<PlacedSticker, 'id' | 'zIndex'>) => {
    const newSticker: PlacedSticker = {
      ...stickerData,
      id: `stk-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      zIndex: (currentPage.stickers.length || 0) + 2,
    };
    onUpdateCurrentPage({
      stickers: [...currentPage.stickers, newSticker],
    });
    setSelectedStickerId(newSticker.id);
  };

  const handleAddWashiTape = (tapeData: Omit<PlacedWashiTape, 'id'>) => {
    const newTape: PlacedWashiTape = {
      ...tapeData,
      id: `washi-${Date.now()}`,
    };
    onUpdateCurrentPage({
      washiTapes: [...currentPage.washiTapes, newTape],
    });
  };

  const triggerSparkles = () => {
    cozyAudio.playSparkle();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#F472B6', '#E9D5FF', '#FEF08A', '#BAE6FD', '#FDA4AF'],
    });
  };

  const handleSave = () => {
    triggerSparkles();
    onSavePage(currentPage);
    setSaveSuccessNotice('Página salva com carinho no seu diário! 🌸');
    setTimeout(() => setSaveSuccessNotice(null), 3000);
  };

  const handlePublishToClub = () => {
    triggerSparkles();
    onShareToClub(currentPage);
    setSaveSuccessNotice('Publicada no Feed Privado do Clube das Garotas! 💌✨');
    setTimeout(() => setSaveSuccessNotice(null), 3000);
  };

  const currentFontObj = FONT_OPTIONS.find((f) => f.id === currentPage.fontFamily) || FONT_OPTIONS[0];

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 space-y-4" id="diary-editor-container">
      {/* Save Success Notice Banner */}
      {saveSuccessNotice && (
        <div className="bg-pink-100/90 border border-pink-200 text-rose-800 px-4 py-2.5 rounded-2xl text-center text-xs sm:text-sm font-quicksand font-bold shadow-sm animate-in fade-in slide-in-from-top-2 flex items-center justify-center gap-2">
          <span>🎀</span>
          <span>{saveSuccessNotice}</span>
        </div>
      )}

      {/* Editor Main Control Toolbar */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 border border-rose-100 shadow-sm flex flex-wrap items-center justify-between gap-2.5">
        {/* Left Toolbar: Font, Size, Ink, Paper, Align */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Font Selector */}
          <div className="relative">
            <button
              id="toolbar-font-btn"
              onClick={() => {
                cozyAudio.playCutePop();
                setShowFontMenu(!showFontMenu);
              }}
              className="px-2.5 py-1.5 rounded-xl border border-rose-100 bg-rose-50/50 hover:bg-rose-100/60 text-gray-700 text-xs font-quicksand font-semibold flex items-center gap-1.5 shadow-2xs"
              title="Escolher fonte manuscrita"
            >
              <Type className="w-3.5 h-3.5 text-rose-400" />
              <span className="truncate max-w-[100px]">{currentFontObj.name.split(' ')[0]}</span>
            </button>

            {showFontMenu && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowFontMenu(false)} />
                <div className="absolute left-0 top-10 bg-white p-2 rounded-2xl shadow-xl border border-rose-100 z-40 w-64 space-y-1 animate-in fade-in zoom-in-95">
                  <p className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider font-quicksand">
                    Fontes Manuscritas & Aesthetic ✨
                  </p>
                  {FONT_OPTIONS.map((font) => (
                    <button
                      key={font.id}
                      onClick={() => {
                        cozyAudio.playCutePop();
                        onUpdateCurrentPage({ fontFamily: font.id });
                        setShowFontMenu(false);
                      }}
                      className={`w-full flex flex-col px-3 py-1.5 rounded-xl text-left transition-colors ${
                        currentPage.fontFamily === font.id
                          ? 'bg-rose-50 text-rose-800'
                          : 'hover:bg-rose-50/50 text-gray-700'
                      }`}
                    >
                      <span className="text-xs font-quicksand font-bold">{font.name}</span>
                      <span className={`${font.cssClass} text-base text-gray-600`}>
                        {font.sample}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Font Size Adjuster */}
          <div className="flex items-center bg-rose-50/60 rounded-xl border border-rose-100 p-0.5 text-xs font-quicksand">
            <button
              onClick={() => {
                cozyAudio.playCutePop();
                onUpdateCurrentPage({ fontSize: Math.max(16, currentPage.fontSize - 2) });
              }}
              className="px-2 py-1 hover:bg-white rounded-lg text-gray-600 font-bold"
              title="Diminuir tamanho da fonte"
            >
              A-
            </button>
            <span className="px-1.5 font-semibold text-gray-700">{currentPage.fontSize}</span>
            <button
              onClick={() => {
                cozyAudio.playCutePop();
                onUpdateCurrentPage({ fontSize: Math.min(36, currentPage.fontSize + 2) });
              }}
              className="px-2 py-1 hover:bg-white rounded-lg text-gray-600 font-bold"
              title="Aumentar tamanho da fonte"
            >
              A+
            </button>
          </div>

          {/* Ink Color Picker */}
          <div className="relative">
            <button
              id="toolbar-ink-btn"
              onClick={() => {
                cozyAudio.playCutePop();
                setShowInkMenu(!showInkMenu);
              }}
              className="p-1.5 rounded-xl border border-rose-100 bg-rose-50/50 hover:bg-rose-100/60 flex items-center gap-1 text-xs font-quicksand font-medium"
              title="Cor da tinta da caneta"
            >
              <div
                className="w-4 h-4 rounded-full border border-black/10"
                style={{ backgroundColor: currentPage.textColor }}
              />
              <Palette className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {showInkMenu && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowInkMenu(false)} />
                <div className="absolute left-0 top-10 bg-white p-3 rounded-2xl shadow-xl border border-rose-100 z-40 w-52 space-y-2 animate-in fade-in zoom-in-95">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-quicksand">
                    Cores de Caneta Aesthetic 🖋️
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {AESTHETIC_INK_COLORS.map((ink) => (
                      <button
                        key={ink.hex}
                        onClick={() => {
                          cozyAudio.playCutePop();
                          onUpdateCurrentPage({ textColor: ink.hex });
                          setShowInkMenu(false);
                        }}
                        style={{ backgroundColor: ink.hex }}
                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 shadow-xs ${
                          currentPage.textColor === ink.hex
                            ? 'border-rose-400 scale-110 ring-2 ring-rose-200'
                            : 'border-white'
                        }`}
                        title={ink.name}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Paper Texture Selector */}
          <div className="relative">
            <button
              id="toolbar-paper-btn"
              onClick={() => {
                cozyAudio.playCutePop();
                setShowPaperMenu(!showPaperMenu);
              }}
              className="px-2.5 py-1.5 rounded-xl border border-rose-100 bg-rose-50/50 hover:bg-rose-100/60 text-gray-700 text-xs font-quicksand font-semibold flex items-center gap-1 shadow-2xs"
              title="Mudar textura do papel"
            >
              <FileText className="w-3.5 h-3.5 text-amber-500" />
              <span className="capitalize">{currentPage.paperStyle}</span>
            </button>

            {showPaperMenu && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowPaperMenu(false)} />
                <div className="absolute left-0 top-10 bg-white p-2 rounded-2xl shadow-xl border border-rose-100 z-40 w-44 space-y-1 animate-in fade-in zoom-in-95">
                  <p className="px-2 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider font-quicksand">
                    Estilo da Folha 📜
                  </p>
                  {[
                    { id: 'lined', label: 'Pautado Rosa' },
                    { id: 'grid', label: 'Quadriculado' },
                    { id: 'dots', label: 'Pontilhado' },
                    { id: 'kraft', label: 'Papel Kraft' },
                    { id: 'plain', label: 'Liso Suave' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        cozyAudio.playCutePop();
                        onUpdateCurrentPage({ paperStyle: p.id as PaperStyle });
                        setShowPaperMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-quicksand font-medium transition-colors ${
                        currentPage.paperStyle === p.id
                          ? 'bg-rose-100 text-rose-800 font-bold'
                          : 'hover:bg-rose-50 text-gray-700'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Text Alignment */}
          <div className="flex items-center bg-rose-50/60 rounded-xl border border-rose-100 p-0.5">
            <button
              onClick={() => onUpdateCurrentPage({ textAlign: 'left' })}
              className={`p-1 rounded-lg ${
                currentPage.textAlign === 'left' ? 'bg-white text-rose-600 shadow-2xs' : 'text-gray-400'
              }`}
            >
              <AlignLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onUpdateCurrentPage({ textAlign: 'center' })}
              className={`p-1 rounded-lg ${
                currentPage.textAlign === 'center' ? 'bg-white text-rose-600 shadow-2xs' : 'text-gray-400'
              }`}
            >
              <AlignCenter className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onUpdateCurrentPage({ textAlign: 'right' })}
              className={`p-1 rounded-lg ${
                currentPage.textAlign === 'right' ? 'bg-white text-rose-600 shadow-2xs' : 'text-gray-400'
              }`}
            >
              <AlignRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Toolbar: Stickers, Widgets, Save, Share, New */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Sticker & Washi Drawer Button */}
          <button
            id="toolbar-open-stickers-btn"
            onClick={() => {
              cozyAudio.playCutePop();
              setIsStickerModalOpen(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-pink-100 hover:bg-pink-200/80 text-rose-800 text-xs font-quicksand font-bold flex items-center gap-1.5 transition-all shadow-xs hover:scale-102 active:scale-95"
          >
            <span>🎀</span>
            <span>Adesivos & Fitas</span>
            {currentPage.stickers.length > 0 && (
              <span className="px-1.5 py-0.2 bg-white rounded-full text-[10px] text-pink-700">
                {currentPage.stickers.length}
              </span>
            )}
          </button>

          {/* Widgets Toggle Popover */}
          <div className="relative">
            <button
              id="toolbar-widgets-toggle-btn"
              onClick={() => {
                cozyAudio.playCutePop();
                setShowWidgetsMenu(!showWidgetsMenu);
              }}
              className="px-2.5 py-1.5 rounded-xl border border-rose-100 bg-rose-50/50 hover:bg-rose-100/60 text-gray-700 text-xs font-quicksand font-semibold flex items-center gap-1.5 shadow-2xs"
            >
              <Settings2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Widgets</span>
            </button>

            {showWidgetsMenu && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowWidgetsMenu(false)} />
                <div className="absolute right-0 top-10 bg-white p-3 rounded-2xl shadow-xl border border-rose-100 z-40 w-60 space-y-2 animate-in fade-in zoom-in-95">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-quicksand">
                    Personalizar Widgets na Página ✨
                  </p>
                  {[
                    { key: 'showMood', label: 'Humor do Dia', icon: '💖' },
                    { key: 'showWeather', label: 'Clima & Céu', icon: '🌤️' },
                    { key: 'showPlaylist', label: 'Tocando Agora (Lo-Fi)', icon: '🎵' },
                    { key: 'showSelfCare', label: 'Autocuidado Checklist', icon: '🕯️' },
                    { key: 'showPolaroid', label: 'Foto Polaroid Scrapbook', icon: '📷' },
                    { key: 'showAffirmation', label: 'Afirmação / Nota do Universo', icon: '💌' },
                  ].map((widget) => {
                    const isEnabled = currentPage.widgets[widget.key as keyof typeof currentPage.widgets];
                    return (
                      <label
                        key={widget.key}
                        className="flex items-center justify-between p-1.5 rounded-xl hover:bg-rose-50/60 cursor-pointer text-xs font-quicksand font-medium text-gray-700"
                      >
                        <span className="flex items-center gap-2">
                          <span>{widget.icon}</span>
                          <span>{widget.label}</span>
                        </span>
                        <input
                          type="checkbox"
                          checked={Boolean(isEnabled)}
                          onChange={(e) => {
                            cozyAudio.playCutePop();
                            onUpdateCurrentPage({
                              widgets: {
                                ...currentPage.widgets,
                                [widget.key]: e.target.checked,
                              },
                            });
                          }}
                          className="rounded text-rose-500 focus:ring-rose-400 accent-rose-500"
                        />
                      </label>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* New Page button */}
          <button
            id="toolbar-new-page-btn"
            onClick={() => {
              cozyAudio.playCutePop();
              if (confirm('Criar uma nova folha em branco no diário? Lembre-se de salvar a atual se quiser guardá-la.')) {
                onNewPage();
              }
            }}
            className="p-1.5 rounded-xl border border-rose-100 bg-white hover:bg-rose-50 text-gray-600 hover:text-rose-600 text-xs font-quicksand font-medium"
            title="Nova folha limpa"
          >
            <PlusCircle className="w-4 h-4" />
          </button>

          {/* Save Page */}
          <button
            id="toolbar-save-page-btn"
            onClick={handleSave}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-quicksand font-bold flex items-center gap-1.5 shadow-xs transition-all hover:scale-102 active:scale-95"
          >
            <Save className="w-3.5 h-3.5 text-rose-500" />
            <span>Salvar</span>
          </button>

          {/* Share to Private Club */}
          <button
            id="toolbar-share-club-btn"
            onClick={handlePublishToClub}
            className="px-3.5 py-1.5 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 text-xs font-quicksand font-bold flex items-center gap-1.5 shadow-sm transition-all hover:scale-102 active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Postar no Clube</span>
          </button>
        </div>
      </div>

      {/* Diary Page Interactive Canvas */}
      <DiaryPageCanvas
        page={currentPage}
        onUpdatePage={onUpdateCurrentPage}
        selectedStickerId={selectedStickerId}
        setSelectedStickerId={setSelectedStickerId}
      />

      {/* Stickers & Washi Tape Modal */}
      <StickerDrawerModal
        isOpen={isStickerModalOpen}
        onClose={() => setIsStickerModalOpen(false)}
        onAddSticker={handleAddSticker}
        onAddWashiTape={handleAddWashiTape}
      />
    </div>
  );
};
