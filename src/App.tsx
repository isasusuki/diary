/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DiaryEditor } from './components/DiaryEditor';
import { MyPagesCollection } from './components/MyPagesCollection';
import { CommunityFeed } from './components/CommunityFeed';
import { PASTEL_THEMES } from './data/themes';
import { INITIAL_USER_PAGE, DEFAULT_COMMUNITY_PAGES } from './data/defaultCommunityPosts';
import { DiaryPage, PastelTheme, PageComment } from './types';

export default function App() {
  // Current user mock profile
  const [userName] = useState('Isa Susuki');
  const [userAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80');

  // Navigation tab
  const [activeTab, setActiveTab] = useState<'editor' | 'pages' | 'community'>('editor');

  // Theme
  const [currentTheme, setCurrentTheme] = useState<PastelTheme>(() => {
    const saved = localStorage.getItem('pastel_diary_theme');
    if (saved) {
      const found = PASTEL_THEMES.find((t) => t.id === saved);
      if (found) return found;
    }
    return PASTEL_THEMES[0];
  });

  // Saved personal pages
  const [savedPages, setSavedPages] = useState<DiaryPage[]>(() => {
    const saved = localStorage.getItem('pastel_diary_my_pages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return [INITIAL_USER_PAGE];
  });

  // Community posts in the private feed
  const [communityPosts, setCommunityPosts] = useState<DiaryPage[]>(() => {
    const saved = localStorage.getItem('pastel_diary_community_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return DEFAULT_COMMUNITY_PAGES;
  });

  // Active page being edited
  const [currentPage, setCurrentPage] = useState<DiaryPage>(() => {
    return savedPages[0] || INITIAL_USER_PAGE;
  });

  // Persist theme
  useEffect(() => {
    localStorage.setItem('pastel_diary_theme', currentTheme.id);
  }, [currentTheme]);

  // Persist pages
  useEffect(() => {
    localStorage.setItem('pastel_diary_my_pages', JSON.stringify(savedPages));
  }, [savedPages]);

  // Persist community posts
  useEffect(() => {
    localStorage.setItem('pastel_diary_community_posts', JSON.stringify(communityPosts));
  }, [communityPosts]);

  // Helper to get formatted current date in Portuguese
  const getFormattedToday = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    };
    const formatted = date.toLocaleDateString('pt-BR', options);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  // Create a brand new page
  const handleNewPage = () => {
    const newPage: DiaryPage = {
      id: `page-${Date.now()}`,
      title: 'Minhas anotações doces de hoje 🌸',
      content: '',
      date: getFormattedToday(),
      themeId: currentTheme.id,
      paperStyle: 'lined',
      fontFamily: 'caveat',
      fontSize: 22,
      textColor: '#4A2838',
      textAlign: 'left',
      stickers: [
        {
          id: `stk-init-${Date.now()}`,
          stickerId: 'ribbon-pink',
          category: 'coquette',
          content: '🎀',
          x: 82,
          y: 8,
          rotation: 8,
          scale: 1.3,
          zIndex: 4,
        },
      ],
      washiTapes: [
        {
          id: `washi-init-${Date.now()}`,
          pattern: 'Xadrez Vichy Rosa',
          color: '#FBCFE8',
          styleClass: 'bg-pink-100 border-dashed border-pink-300',
          x: 40,
          y: -10,
          rotation: -2,
          width: 120,
        },
      ],
      widgets: {
        showMood: true,
        mood: 'radiant',
        showWeather: true,
        weather: 'sunny',
        showPlaylist: true,
        songTitle: 'Strawberry Kisses 🍓',
        songArtist: 'Lo-Fi Chill Hop & Music Box',
        showSelfCare: true,
        selfCareTasks: [
          { id: '1', label: 'Beber 2L de água fresca', done: false, icon: '💧' },
          { id: '2', label: 'Skincare hidratante', done: false, icon: '🧴' },
          { id: '3', label: '15 minutos de leitura agradável', done: false, icon: '📖' },
          { id: '4', label: 'Escrever no diário com calma', done: true, icon: '✍️' },
        ],
        showAffirmation: true,
        dailyAffirmation: 'Eu mereço viver cada dia com leveza, carinho e gentileza.',
        showPolaroid: false,
      },
      isPublicToClub: false,
      createdAt: Date.now(),
      author: {
        name: userName,
        avatar: userAvatar,
        handle: '@isabelaS',
      },
      likesCount: 0,
      hasLiked: false,
      comments: [],
    };

    setCurrentPage(newPage);
    setActiveTab('editor');
  };

  // Save current page
  const handleSavePage = (pageToSave: DiaryPage) => {
    setSavedPages((prev) => {
      const existingIdx = prev.findIndex((p) => p.id === pageToSave.id);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = pageToSave;
        return updated;
      }
      return [pageToSave, ...prev];
    });
  };

  // Share to Private Community Feed
  const handleShareToClub = (pageToShare: DiaryPage) => {
    const updatedPage: DiaryPage = {
      ...pageToShare,
      isPublicToClub: true,
      author: {
        name: userName,
        avatar: userAvatar,
        handle: '@isabelaS',
      },
    };

    // Save in personal pages
    handleSavePage(updatedPage);

    // Save/update in community posts
    setCommunityPosts((prev) => {
      const existingIdx = prev.findIndex((p) => p.id === updatedPage.id);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = updatedPage;
        return updated;
      }
      return [updatedPage, ...prev];
    });
  };

  // Like a community post
  const handleLikePost = (postId: string) => {
    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const hasLiked = post.hasLiked ?? false;
          return {
            ...post,
            hasLiked: !hasLiked,
            likesCount: hasLiked ? Math.max(0, post.likesCount - 1) : post.likesCount + 1,
          };
        }
        return post;
      })
    );
  };

  // Add comment to a community post
  const handleAddComment = (postId: string, comment: PageComment) => {
    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...(post.comments || []), comment],
          };
        }
        return post;
      })
    );
  };

  // Open page from collection or community into the editor
  const handleSelectPageForEdit = (page: DiaryPage) => {
    setCurrentPage(page);
    setActiveTab('editor');
  };

  // Delete page from collection
  const handleDeletePage = (id: string) => {
    setSavedPages((prev) => prev.filter((p) => p.id !== id));
    if (currentPage.id === id) {
      handleNewPage();
    }
  };

  return (
    <div 
      className={`min-h-screen ${currentTheme.bgApp} transition-colors duration-300 flex flex-col`}
      style={{
        backgroundImage: `radial-gradient(${currentTheme.accent}15 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }}
    >
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
        myPagesCount={savedPages.length}
        userName={userName}
        userAvatar={userAvatar}
      />

      {/* Main App Content View */}
      <main className="flex-1 pb-16">
        {activeTab === 'editor' && (
          <DiaryEditor
            currentPage={currentPage}
            onUpdateCurrentPage={(updated) =>
              setCurrentPage((prev) => ({ ...prev, ...updated }))
            }
            onSavePage={handleSavePage}
            onShareToClub={handleShareToClub}
            onNewPage={handleNewPage}
          />
        )}

        {activeTab === 'pages' && (
          <MyPagesCollection
            pages={savedPages}
            onSelectPage={handleSelectPageForEdit}
            onDeletePage={handleDeletePage}
            onNewPage={handleNewPage}
            onShareToClub={handleShareToClub}
          />
        )}

        {activeTab === 'community' && (
          <CommunityFeed
            posts={communityPosts}
            onLikePost={handleLikePost}
            onAddComment={handleAddComment}
            onOpenInEditor={handleSelectPageForEdit}
            currentUserName={userName}
            currentUserAvatar={userAvatar}
          />
        )}
      </main>

      {/* Bottom Aesthetic Footer */}
      <footer className="bg-white/60 backdrop-blur-xs border-t border-rose-100 py-4 text-center text-xs font-quicksand text-gray-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-rose-700 font-semibold">
            <span>🎀</span>
            <span>Diário Chérie</span>
            <span>•</span>
            <span className="text-gray-400 font-normal">Seu cantinho de calma e fofura</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>Fontes Manuscritas</span>
            <span>•</span>
            <span>Adesivos Interativos</span>
            <span>•</span>
            <span>Feed Privado Seguro</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
