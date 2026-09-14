import React, { useState } from 'react';
import { 
  Smile, 
  Sun, 
  Music, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Image as ImageIcon, 
  Play, 
  Pause,
  Upload,
  Plus
} from 'lucide-react';
import { PageWidgets, MoodOption, WeatherOption } from '../types';
import { MOOD_OPTIONS, WEATHER_OPTIONS, AESTHETIC_POLAROIDS } from '../data/stickersData';
import { cozyAudio } from '../utils/audioSynth';

interface WidgetsSectionProps {
  widgets: PageWidgets;
  onUpdateWidgets: (updated: Partial<PageWidgets>) => void;
  isReadOnly?: boolean;
}

export const WidgetsSection: React.FC<WidgetsSectionProps> = ({
  widgets,
  onUpdateWidgets,
  isReadOnly = false,
}) => {
  const [isPlayingMiniAudio, setIsPlayingMiniAudio] = useState(false);
  const [showMoodPicker, setShowMoodPicker] = useState(false);
  const [showWeatherPicker, setShowWeatherPicker] = useState(false);
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const [newCustomTask, setNewCustomTask] = useState('');

  const currentMoodObj = MOOD_OPTIONS.find((m) => m.id === widgets.mood) || MOOD_OPTIONS[0];
  const currentWeatherObj = WEATHER_OPTIONS.find((w) => w.id === widgets.weather) || WEATHER_OPTIONS[0];

  const toggleSelfCareTask = (id: string) => {
    if (isReadOnly) return;
    cozyAudio.playCutePop();
    const updatedTasks = widgets.selfCareTasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    onUpdateWidgets({ selfCareTasks: updatedTasks });
  };

  const addCustomTask = () => {
    if (!newCustomTask.trim() || isReadOnly) return;
    cozyAudio.playCutePop();
    const newTask = {
      id: `task-${Date.now()}`,
      label: newCustomTask.trim(),
      done: false,
      icon: '🌸',
    };
    onUpdateWidgets({
      selfCareTasks: [...widgets.selfCareTasks, newTask],
    });
    setNewCustomTask('');
  };

  const handleToggleMiniAudio = () => {
    cozyAudio.playCutePop();
    const playing = cozyAudio.toggleAmbientLofi((state) => {
      setIsPlayingMiniAudio(state);
    });
    setIsPlayingMiniAudio(playing);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdateWidgets({
            polaroidImage: event.target.result as string,
            showPolaroid: true,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const completedTasksCount = widgets.selfCareTasks.filter((t) => t.done).length;

  return (
    <div className="space-y-4 mb-4 select-none" id="diary-widgets-container">
      {/* Top row badges: Mood, Weather, Music */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Mood Tracker Widget */}
        {widgets.showMood && (
          <div className="relative">
            <button
              id="widget-mood-button"
              disabled={isReadOnly}
              onClick={() => !isReadOnly && setShowMoodPicker(!showMoodPicker)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-pink-200/80 bg-pink-50/90 hover:bg-pink-100/90 text-rose-800 text-xs font-quicksand font-semibold transition-all shadow-xs ${
                isReadOnly ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <span className="text-base">{currentMoodObj.emoji}</span>
              <span>Humor: {currentMoodObj.label}</span>
            </button>

            {/* Mood picker popover */}
            {showMoodPicker && !isReadOnly && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowMoodPicker(false)} />
                <div className="absolute left-0 top-10 bg-white p-2 rounded-2xl shadow-xl border border-pink-200 z-40 w-48 space-y-1 animate-in fade-in zoom-in-95">
                  <p className="px-2 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Como você está se sentindo? 💖
                  </p>
                  {MOOD_OPTIONS.map((mood) => (
                    <button
                      key={mood.id}
                      onClick={() => {
                        cozyAudio.playCutePop();
                        onUpdateWidgets({ mood: mood.id });
                        setShowMoodPicker(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-pink-50 text-left text-xs font-quicksand font-medium text-gray-700"
                    >
                      <span className="text-base">{mood.emoji}</span>
                      <span>{mood.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Weather Widget */}
        {widgets.showWeather && (
          <div className="relative">
            <button
              id="widget-weather-button"
              disabled={isReadOnly}
              onClick={() => !isReadOnly && setShowWeatherPicker(!showWeatherPicker)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-sky-200/80 bg-sky-50/90 hover:bg-sky-100/90 text-sky-800 text-xs font-quicksand font-semibold transition-all shadow-xs ${
                isReadOnly ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <span className="text-base">{currentWeatherObj.emoji}</span>
              <span>{currentWeatherObj.label}</span>
            </button>

            {/* Weather picker popover */}
            {showWeatherPicker && !isReadOnly && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowWeatherPicker(false)} />
                <div className="absolute left-0 top-10 bg-white p-2 rounded-2xl shadow-xl border border-sky-200 z-40 w-48 space-y-1 animate-in fade-in zoom-in-95">
                  <p className="px-2 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Clima de hoje 🌤️
                  </p>
                  {WEATHER_OPTIONS.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => {
                        cozyAudio.playCutePop();
                        onUpdateWidgets({ weather: w.id });
                        setShowWeatherPicker(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-sky-50 text-left text-xs font-quicksand font-medium text-gray-700"
                    >
                      <span className="text-base">{w.emoji}</span>
                      <span>{w.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Mini Playlist Widget */}
        {widgets.showPlaylist && (
          <div 
            id="widget-playlist-card"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-200/80 bg-purple-50/90 text-purple-900 text-xs font-quicksand font-semibold shadow-xs"
          >
            {/* Spinning vinyl disc */}
            <div 
              onClick={handleToggleMiniAudio}
              className={`w-6 h-6 rounded-full bg-neutral-900 border border-purple-300 flex items-center justify-center cursor-pointer transition-transform ${
                isPlayingMiniAudio ? 'animate-spin' : ''
              }`}
              title="Tocar melodia de fundo"
            >
              <div className="w-2 h-2 rounded-full bg-pink-300" />
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] font-bold truncate max-w-[130px]">
                {widgets.songTitle || 'Lo-Fi Chill & Dreams 🎵'}
              </span>
            </div>

            <button
              onClick={handleToggleMiniAudio}
              className="p-1 rounded-full hover:bg-purple-200/60 text-purple-700 cursor-pointer"
            >
              {isPlayingMiniAudio ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
          </div>
        )}
      </div>

      {/* Grid of Cards: Polaroid & Self-Care Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-start">
        {/* Polaroid Scrapbook Widget */}
        {widgets.showPolaroid && widgets.polaroidImage && (
          <div 
            id="widget-polaroid-container"
            className="md:col-span-5 bg-white p-2.5 pb-4 rounded-xl shadow-md border border-rose-100 relative group rotate-[-1.5deg] hover:rotate-0 transition-transform duration-200 max-w-[240px] mx-auto md:mx-0"
          >
            {/* Decorative washi tape at top of polaroid */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-pink-200/90 border-t border-b border-pink-300/60 rotate-1 shadow-2xs washi-tape-strip" />

            <div className="w-full h-36 rounded-lg overflow-hidden bg-rose-50 border border-gray-100 relative">
              <img
                src={widgets.polaroidImage}
                alt="Polaroid Memory"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {!isReadOnly && (
                <button
                  onClick={() => setShowPhotoPicker(true)}
                  className="absolute bottom-1 right-1 p-1 bg-white/90 rounded-full text-gray-700 hover:bg-rose-100 shadow-xs text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Trocar foto"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Handwritten Caption */}
            {isReadOnly ? (
              <p className="mt-2 text-center font-caveat text-sm text-gray-700">
                {widgets.polaroidCaption || 'momento especial ✨'}
              </p>
            ) : (
              <input
                type="text"
                value={widgets.polaroidCaption || ''}
                onChange={(e) => onUpdateWidgets({ polaroidCaption: e.target.value })}
                placeholder="Legenda da polaroid..."
                className="w-full mt-2 text-center font-caveat text-base text-gray-700 border-b border-dashed border-rose-200 focus:outline-hidden focus:border-rose-400 bg-transparent"
              />
            )}

            {/* Photo Selector Modal */}
            {showPhotoPicker && !isReadOnly && (
              <div className="fixed inset-0 bg-black/30 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl border border-rose-100 space-y-3 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between">
                    <h4 className="font-playfair font-bold text-gray-800 text-sm">
                      Escolher Foto Aesthetic 🌸
                    </h4>
                    <button
                      onClick={() => setShowPhotoPicker(false)}
                      className="text-gray-400 hover:text-gray-600 text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 font-quicksand">
                    Selecione uma foto do nosso scrapbook ou envie uma do seu computador:
                  </p>

                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
                    {AESTHETIC_POLAROIDS.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          cozyAudio.playCutePop();
                          onUpdateWidgets({
                            polaroidImage: p.url,
                            polaroidCaption: p.caption,
                          });
                          setShowPhotoPicker(false);
                        }}
                        className="cursor-pointer rounded-xl overflow-hidden border border-rose-100 hover:ring-2 hover:ring-rose-400 transition-all group/item relative"
                      >
                        <img
                          src={p.url}
                          alt={p.caption}
                          referrerPolicy="no-referrer"
                          className="w-full h-20 object-cover group-hover/item:scale-105 transition-transform"
                        />
                        <span className="absolute bottom-0 inset-x-0 bg-black/40 text-white text-[9px] p-1 truncate font-quicksand">
                          {p.caption}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Manual file upload */}
                  <div className="pt-2 border-t border-rose-100">
                    <label className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-dashed border-rose-300 bg-rose-50/50 hover:bg-rose-100/60 text-xs font-quicksand font-semibold text-rose-700 cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Fazer upload de foto própria</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleFileUpload(e);
                          setShowPhotoPicker(false);
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Self-Care Checklist Widget */}
        {widgets.showSelfCare && (
          <div 
            id="widget-selfcare-container"
            className={`${
              widgets.showPolaroid ? 'md:col-span-7' : 'md:col-span-12'
            } bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-rose-200/80 shadow-xs space-y-2.5`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-base">🕯️</span>
                <h4 className="font-quicksand font-bold text-xs text-rose-900">
                  Autocuidado do Dia
                </h4>
              </div>
              <span className="text-[11px] font-quicksand font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                {completedTasksCount} / {widgets.selfCareTasks.length} feitos 💖
              </span>
            </div>

            {/* Checklist items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {widgets.selfCareTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleSelfCareTask(task.id)}
                  className={`flex items-center gap-2 p-1.5 rounded-xl border transition-all ${
                    isReadOnly ? 'cursor-default' : 'cursor-pointer'
                  } ${
                    task.done
                      ? 'bg-rose-50/80 border-rose-200/80 text-rose-900 line-through opacity-85'
                      : 'bg-white border-rose-100 text-gray-700 hover:border-rose-300'
                  }`}
                >
                  {task.done ? (
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-rose-300 shrink-0" />
                  )}
                  <span className="text-xs font-quicksand font-medium truncate">
                    {task.icon} {task.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Add task if not readonly */}
            {!isReadOnly && (
              <div className="flex items-center gap-1.5 pt-1">
                <input
                  type="text"
                  value={newCustomTask}
                  onChange={(e) => setNewCustomTask(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addCustomTask()}
                  placeholder="Adicionar hábito de autocuidado..."
                  className="flex-1 px-2.5 py-1 text-xs font-quicksand rounded-xl border border-rose-200 focus:outline-hidden focus:border-rose-400 bg-white/70"
                />
                <button
                  onClick={addCustomTask}
                  className="p-1 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-bold"
                  title="Adicionar"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Daily Affirmation Banner Widget */}
      {widgets.showAffirmation && (
        <div 
          id="widget-affirmation-container"
          className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/70 shadow-2xs flex items-center gap-2.5"
        >
          <span className="text-lg">💌</span>
          <div className="flex-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700/80 font-quicksand block">
              Mensagem para a Minha Alma
            </span>
            {isReadOnly ? (
              <p className="font-dancing text-base sm:text-lg text-amber-950 italic">
                "{widgets.dailyAffirmation || 'Eu sou luz, gentileza e poesia viva.'}"
              </p>
            ) : (
              <input
                type="text"
                value={widgets.dailyAffirmation || ''}
                onChange={(e) => onUpdateWidgets({ dailyAffirmation: e.target.value })}
                placeholder="Escreva sua afirmação positiva de hoje..."
                className="w-full font-dancing text-base sm:text-lg text-amber-950 italic bg-transparent border-b border-dashed border-amber-300 focus:outline-hidden"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
