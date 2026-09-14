import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Lock, 
  Sparkles, 
  Send, 
  BookOpen, 
  X, 
  Search,
  Filter,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DiaryPage, PageComment } from '../types';
import { DiaryPageCanvas } from './DiaryPageCanvas';
import { MOOD_OPTIONS } from '../data/stickersData';
import { cozyAudio } from '../utils/audioSynth';

interface CommunityFeedProps {
  posts: DiaryPage[];
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, comment: PageComment) => void;
  onOpenInEditor: (page: DiaryPage) => void;
  currentUserName: string;
  currentUserAvatar: string;
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({
  posts,
  onLikePost,
  onAddComment,
  onOpenInEditor,
  currentUserName,
  currentUserAvatar,
}) => {
  const [selectedPageForModal, setSelectedPageForModal] = useState<DiaryPage | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [activeMoodFilter, setActiveMoodFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});

  const handleLike = (postId: string) => {
    cozyAudio.playSparkle();
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.8 },
      colors: ['#F472B6', '#FDA4AF', '#FBCFE8'],
    });
    onLikePost(postId);
  };

  const handleSendComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    cozyAudio.playCutePop();
    const newComment: PageComment = {
      id: `comment-${Date.now()}`,
      author: currentUserName,
      avatar: currentUserAvatar,
      text,
      timestamp: 'agora mesmo',
    };

    onAddComment(postId, newComment);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    setExpandedComments((prev) => ({ ...prev, [postId]: true }));
  };

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMood =
      activeMoodFilter === 'all' || post.widgets.mood === activeMoodFilter;
    return matchesSearch && matchesMood;
  });

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 space-y-6" id="community-feed-container">
      {/* Club Banner Header */}
      <div className="bg-linear-to-r from-purple-100/90 via-pink-100/80 to-rose-100/90 p-5 sm:p-7 rounded-3xl border border-rose-200/80 shadow-xs text-center relative overflow-hidden">
        <div className="absolute top-2 right-3 text-4xl opacity-20 pointer-events-none select-none">
          🎀
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-purple-200 text-purple-700 font-quicksand text-xs font-bold mb-2 shadow-2xs">
          <Lock className="w-3.5 h-3.5 text-purple-500" />
          <span>Círculo Íntimo & Feed Privado</span>
        </div>
        <h2 className="font-playfair font-bold text-2xl sm:text-3xl text-gray-800 tracking-tight">
          Clube das Garotas & Diários Decorados 🌸
        </h2>
        <p className="text-xs sm:text-sm font-quicksand text-gray-600 max-w-xl mx-auto mt-1.5 leading-relaxed">
          Um espaço calmo e secreto onde compartilhamos nossas páginas decoradas, colagens de adesivos, autocuidado e palavras doces.
        </p>

        {/* Club status badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] font-quicksand font-semibold text-gray-500">
          <span className="px-2.5 py-1 rounded-full bg-white/60 border border-pink-200 text-pink-700">
            🗝️ Chave do Clube: Ativa
          </span>
          <span className="px-2.5 py-1 rounded-full bg-white/60 border border-purple-200 text-purple-700">
            💌 {posts.length} Páginas Compartilhadas
          </span>
          <span className="px-2.5 py-1 rounded-full bg-white/60 border border-rose-200 text-rose-700">
            ✨ Ambiente 100% Livre de Toxicidade
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/80 p-3 rounded-2xl border border-rose-100 shadow-2xs">
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar páginas ou autoras..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-rose-100 bg-rose-50/40 text-xs font-quicksand focus:outline-hidden focus:border-rose-300"
          />
        </div>

        {/* Mood filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveMoodFilter('all')}
            className={`px-2.5 py-1 rounded-xl text-xs font-quicksand font-semibold shrink-0 transition-all ${
              activeMoodFilter === 'all'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-rose-50 text-gray-600 hover:bg-rose-100'
            }`}
          >
            Todos os Humores
          </button>
          {MOOD_OPTIONS.slice(0, 4).map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMoodFilter(m.id)}
              className={`px-2.5 py-1 rounded-xl text-xs font-quicksand font-semibold shrink-0 transition-all flex items-center gap-1 ${
                activeMoodFilter === m.id
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-rose-50 text-gray-600 hover:bg-rose-100'
              }`}
            >
              <span>{m.emoji}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Feed Posts Grid / Stream */}
      <div className="space-y-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-white/60 rounded-3xl border border-rose-100 p-6 space-y-2">
            <span className="text-4xl">💭</span>
            <h3 className="font-playfair font-bold text-gray-700">Nenhuma página encontrada</h3>
            <p className="text-xs text-gray-500 font-quicksand">
              Tente remover os filtros ou seja a primeira a publicar uma nova folha decorada!
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const hasLiked = post.hasLiked;
            const commentsList = post.comments || [];
            const isCommentsOpen = expandedComments[post.id] ?? false;

            return (
              <article
                key={post.id}
                id={`community-post-card-${post.id}`}
                className="bg-white/95 backdrop-blur-xs rounded-3xl border border-rose-200/90 shadow-sm overflow-hidden transition-all hover:shadow-md"
              >
                {/* Post Author Bar */}
                <div className="p-4 sm:p-5 flex items-center justify-between border-b border-rose-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author?.avatar || currentUserAvatar}
                      alt={post.author?.name || 'Garota do Clube'}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-rose-200"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-quicksand font-bold text-sm text-gray-800">
                          {post.author?.name || 'Membro do Clube'}
                        </span>
                        <span className="text-[11px] text-gray-400 font-quicksand">
                          {post.author?.handle || '@amiga'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-gray-500 font-quicksand">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span className="text-rose-600 font-medium">Feed Privado 💌</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      cozyAudio.playCutePop();
                      setSelectedPageForModal(post);
                    }}
                    className="px-3 py-1.5 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-quicksand font-bold flex items-center gap-1 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Ver no Livro</span>
                  </button>
                </div>

                {/* Decorated Page Mini Preview inside card */}
                <div className="p-3 sm:p-5 bg-rose-50/30">
                  <div className="relative border border-rose-200/80 rounded-2xl overflow-hidden shadow-xs bg-white">
                    {/* Washi tape header banner */}
                    {post.washiTapes && post.washiTapes.length > 0 && (
                      <div 
                        className="h-4 w-32 mx-auto mt-2 rounded-xs shadow-2xs opacity-90 washi-tape-strip flex items-center justify-center"
                        style={{ backgroundColor: post.washiTapes[0].color }}
                      >
                        <span className="text-[9px] font-quicksand font-bold uppercase text-black/40">
                          {post.washiTapes[0].pattern}
                        </span>
                      </div>
                    )}

                    <div className="p-5 space-y-3">
                      {/* Title */}
                      <h3 className="font-playfair font-bold text-lg sm:text-xl text-gray-800">
                        {post.title}
                      </h3>

                      {/* Content snippet */}
                      <p className="font-caveat text-xl sm:text-2xl text-gray-700 leading-relaxed line-clamp-4">
                        {post.content}
                      </p>

                      {/* Stickers badge preview */}
                      {post.stickers && post.stickers.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-rose-100">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-quicksand">
                            Adesivos colados:
                          </span>
                          {post.stickers.map((stk, idx) => (
                            <span
                              key={idx}
                              className="text-xl p-1 rounded-lg bg-rose-50/80 border border-rose-100"
                              title={stk.content}
                            >
                              {stk.content}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Polaroid preview if present */}
                      {post.widgets?.showPolaroid && post.widgets?.polaroidImage && (
                        <div className="inline-flex items-center gap-3 p-2 rounded-xl bg-white border border-rose-200 shadow-2xs">
                          <img
                            src={post.widgets.polaroidImage}
                            alt="Polaroid Memory"
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <span className="font-caveat text-base text-gray-700">
                            {post.widgets.polaroidCaption || 'foto decorativa 🌷'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Interaction Footer: Likes & Comments Bar */}
                <div className="p-4 sm:p-5 flex items-center justify-between border-t border-rose-100">
                  <div className="flex items-center gap-4">
                    {/* Like button */}
                    <button
                      id={`post-like-btn-${post.id}`}
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-quicksand font-bold transition-all ${
                        hasLiked
                          ? 'bg-rose-100 text-rose-700 scale-105 shadow-xs'
                          : 'bg-rose-50/60 hover:bg-rose-100/60 text-gray-600'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          hasLiked ? 'fill-rose-500 text-rose-500' : 'text-gray-400'
                        }`}
                      />
                      <span>{post.likesCount || 0} Corações</span>
                    </button>

                    {/* Comments toggle button */}
                    <button
                      onClick={() =>
                        setExpandedComments((prev) => ({
                          ...prev,
                          [post.id]: !prev[post.id],
                        }))
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50/60 hover:bg-purple-100/60 text-purple-700 text-xs font-quicksand font-bold transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-purple-400" />
                      <span>{commentsList.length} Comentários</span>
                    </button>
                  </div>

                  {/* Open in editor / remix */}
                  <button
                    onClick={() => {
                      cozyAudio.playCutePop();
                      onOpenInEditor(post);
                    }}
                    className="text-xs font-quicksand font-semibold text-rose-600 hover:text-rose-800 hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Copiar Estilo para Meu Diário</span>
                    <span className="sm:hidden">Copiar</span>
                  </button>
                </div>

                {/* Comments Section Drawer */}
                {isCommentsOpen && (
                  <div className="p-4 sm:p-5 bg-rose-50/40 border-t border-rose-100 space-y-3 animate-in fade-in duration-150">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-quicksand">
                      Comentários carinhosos das garotas 💌
                    </p>

                    {/* Existing Comments List */}
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {commentsList.map((comm) => (
                        <div
                          key={comm.id}
                          className="flex items-start gap-2.5 p-2.5 rounded-2xl bg-white border border-rose-100 shadow-2xs"
                        >
                          <img
                            src={comm.avatar}
                            alt={comm.author}
                            referrerPolicy="no-referrer"
                            className="w-7 h-7 rounded-full object-cover ring-1 ring-rose-200 mt-0.5"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-quicksand font-bold text-gray-800">
                                {comm.author}
                              </span>
                              <span className="text-[10px] text-gray-400 font-quicksand">
                                {comm.timestamp}
                              </span>
                            </div>
                            <p className="text-xs font-quicksand text-gray-600 mt-0.5">
                              {comm.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Write a comment input */}
                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="text"
                        value={commentInputs[post.id] || ''}
                        onChange={(e) =>
                          setCommentInputs((prev) => ({
                            ...prev,
                            [post.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => e.key === 'Enter' && handleSendComment(post.id)}
                        placeholder="Deixe uma mensagem fofa para a autora..."
                        className="flex-1 px-3.5 py-2 rounded-xl border border-rose-200 text-xs font-quicksand bg-white focus:outline-hidden focus:border-rose-400"
                      />
                      <button
                        onClick={() => handleSendComment(post.id)}
                        className="px-3.5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-quicksand font-bold flex items-center gap-1 transition-all"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Enviar</span>
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>

      {/* Full Book Modal View */}
      {selectedPageForModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white/95 rounded-3xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl border border-rose-200 max-h-[95vh] overflow-y-auto relative">
            <div className="flex items-center justify-between pb-3 border-b border-rose-100 mb-4 sticky top-0 bg-white/95 z-30">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📖</span>
                <div>
                  <h3 className="font-playfair font-bold text-gray-800 text-lg">
                    Folha Original do Diário
                  </h3>
                  <p className="text-[11px] font-quicksand text-gray-500">
                    Por {selectedPageForModal.author.name} • {selectedPageForModal.date}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPageForModal(null)}
                className="p-1.5 rounded-full hover:bg-rose-100 text-gray-500 hover:text-rose-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Read-Only Canvas */}
            <DiaryPageCanvas
              page={selectedPageForModal}
              onUpdatePage={() => {}}
              selectedStickerId={null}
              setSelectedStickerId={() => {}}
              isReadOnly={true}
            />

            <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  cozyAudio.playCutePop();
                  onOpenInEditor(selectedPageForModal);
                  setSelectedPageForModal(null);
                }}
                className="px-4 py-2 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white font-quicksand font-bold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Usar como Inspiração no Meu Diário</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
