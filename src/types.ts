export type PaperStyle = 'lined' | 'grid' | 'dots' | 'kraft' | 'plain';

export type HandwritingFont = 
  | 'caveat' 
  | 'dancing' 
  | 'sacramento' 
  | 'patrick' 
  | 'kalam' 
  | 'comfortaa' 
  | 'quicksand';

export interface PlacedSticker {
  id: string;
  stickerId: string;
  category: string;
  content: string; // emoji or SVG or image path
  isTextBadge?: boolean;
  x: number; // percentage 0-100 or px
  y: number; // percentage 0-100 or px
  rotation: number; // degrees -45 to 45
  scale: number; // 0.6 to 2.0
  zIndex: number;
}

export interface PlacedWashiTape {
  id: string;
  pattern: string; // color/pattern name
  color: string;
  styleClass: string;
  x: number;
  y: number;
  rotation: number;
  width: number;
}

export interface MoodOption {
  id: string;
  emoji: string;
  label: string;
  color: string;
  bg: string;
}

export interface WeatherOption {
  id: string;
  emoji: string;
  label: string;
}

export interface SelfCareTask {
  id: string;
  label: string;
  done: boolean;
  icon: string;
}

export interface PageWidgets {
  showMood: boolean;
  mood?: string;
  showWeather: boolean;
  weather?: string;
  showPlaylist: boolean;
  songTitle?: string;
  songArtist?: string;
  showSelfCare: boolean;
  selfCareTasks: SelfCareTask[];
  showAffirmation: boolean;
  dailyAffirmation?: string;
  showPolaroid: boolean;
  polaroidImage?: string;
  polaroidCaption?: string;
}

export interface PageComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
}

export interface DiaryPage {
  id: string;
  title: string;
  content: string;
  date: string;
  themeId: string;
  paperStyle: PaperStyle;
  fontFamily: HandwritingFont;
  fontSize: number;
  textColor: string;
  textAlign: 'left' | 'center' | 'right';
  stickers: PlacedSticker[];
  washiTapes: PlacedWashiTape[];
  widgets: PageWidgets;
  isPublicToClub: boolean;
  createdAt: number;
  author: {
    name: string;
    avatar: string;
    handle: string;
  };
  likesCount: number;
  hasLiked?: boolean;
  comments: PageComment[];
}

export interface PastelTheme {
  id: string;
  name: string;
  badge: string;
  bgApp: string;
  bgPage: string;
  accent: string;
  accentSoft: string;
  accentBorder: string;
  textPrimary: string;
  textMuted: string;
  bannerGradient: string;
  primaryButton: string;
}

export interface StickerCategory {
  id: string;
  name: string;
  icon: string;
  stickers: Array<{
    id: string;
    content: string;
    label: string;
    isTextBadge?: boolean;
    bg?: string;
  }>;
}
