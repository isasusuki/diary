import { StickerCategory, MoodOption, WeatherOption, HandwritingFont } from '../types';

export const STICKER_CATEGORIES: StickerCategory[] = [
  {
    id: 'coquette',
    name: 'Laços & Coquette',
    icon: '🎀',
    stickers: [
      { id: 'ribbon-pink', content: '🎀', label: 'Laço Rosa' },
      { id: 'heart-sparkle', content: '💖', label: 'Coração Rosa' },
      { id: 'heart-ribbon', content: '💝', label: 'Coração de Presente' },
      { id: 'ballet', content: '🩰', label: 'Sapatilha de Ballet' },
      { id: 'dress', content: '👗', label: 'Vestidinho' },
      { id: 'crown', content: '👑', label: 'Coroa de Princesa' },
      { id: 'pearl-shell', content: '🦪', label: 'Pérola' },
      { id: 'mirror', content: '🪞', label: 'Espelho Vintage' },
      { id: 'perfume', content: '🧴', label: 'Perfume Francês' },
      { id: 'pink-flower', content: '🌸', label: 'Flor de Cerejeira' },
      { id: 'hibiscus', content: '🌺', label: 'Hibisco Doce' },
      { id: 'white-heart', content: '🤍', label: 'Coração Branco' },
    ],
  },
  {
    id: 'animals',
    name: 'Bichinhos Fofos',
    icon: '🧸',
    stickers: [
      { id: 'teddy', content: '🧸', label: 'Ursinho de Pelúcia' },
      { id: 'bunny', content: '🐰', label: 'Coelhinha Fofa' },
      { id: 'cat-sweet', content: '🐱', label: 'Gatinha Miau' },
      { id: 'puppy', content: '🐶', label: 'Cachorrinho Carinhoso' },
      { id: 'chick', content: '🐥', label: 'Pintinho Fofo' },
      { id: 'butterfly', content: '🦋', label: 'Borboleta Azul' },
      { id: 'hamster', content: '🐹', label: 'Hamster Bochechudo' },
      { id: 'swan', content: '🦢', label: 'Cisne Gracioso' },
      { id: 'unicorn', content: '🦄', label: 'Unicórnio Pastel' },
    ],
  },
  {
    id: 'sweets',
    name: 'Doces & Delícias',
    icon: '🍓',
    stickers: [
      { id: 'strawberry', content: '🍓', label: 'Morango Fresco' },
      { id: 'cupcake', content: '🧁', label: 'Cupcake com Confeito' },
      { id: 'boba', content: '🧋', label: 'Boba Milk Tea' },
      { id: 'cherry', content: '🍒', label: 'Cerejinhas' },
      { id: 'cake', content: '🍰', label: 'Fatia de Bolo' },
      { id: 'icecream', content: '🍦', label: 'Sorvete de Casquinha' },
      { id: 'pudding', content: '🍮', label: 'Pudim' },
      { id: 'lollipop', content: '🍭', label: 'Pirulito' },
      { id: 'tea', content: '🫖', label: 'Chá da Tarde' },
      { id: 'croissant', content: '🥐', label: 'Croissant Quentinho' },
      { id: 'cookie', content: '🍪', label: 'Cookie com Gotas' },
    ],
  },
  {
    id: 'magic',
    name: 'Brilhos & Magia',
    icon: '✨',
    stickers: [
      { id: 'sparkles', content: '✨', label: 'Brilhos Estelares' },
      { id: 'star-glow', content: '🌟', label: 'Estrela Cintilante' },
      { id: 'crescent-moon', content: '🌙', label: 'Lua Crescente' },
      { id: 'shooting-star', content: '💫', label: 'Estrela Cadente' },
      { id: 'crystal-ball', content: '🔮', label: 'Cristal Mágico' },
      { id: 'rainbow', content: '🌈', label: 'Arco-Íris' },
      { id: 'magic-wand', content: '🪄', label: 'Varinha Encantada' },
      { id: 'cloud-soft', content: '☁️', label: 'Nuvem Marshmallow' },
    ],
  },
  {
    id: 'stationery',
    name: 'Papelaria & Selos',
    icon: '💌',
    stickers: [
      { id: 'letter-love', content: '💌', label: 'Cartinha de Amor' },
      { id: 'postage-stamp', content: '🏷️', label: 'Selo Vintage' },
      { id: 'paperclip', content: '📎', label: 'Clipes Dourado' },
      { id: 'pin', content: '📌', label: 'Alfinete de Diário' },
      { id: 'fountain-pen', content: '✒️', label: 'Caneta Tinteiro' },
      { id: 'bookmark', content: '🔖', label: 'Marcador de Página' },
      { id: 'gift', content: '🎁', label: 'Pacotinho Fofo' },
      { id: 'flower-bouquet', content: '💐', label: 'Buquê de Flores' },
      { id: 'tulip', content: '🌷', label: 'Tulipa Rosa' },
    ],
  },
  {
    id: 'words',
    name: 'Frases & Badges',
    icon: '💖',
    stickers: [
      { id: 'word-aesthetic', content: 'Aesthetic ✨', label: 'Aesthetic', isTextBadge: true, bg: '#FCE7F3' },
      { id: 'word-dreamer', content: 'Dreamy Soul 💭', label: 'Dreamy', isTextBadge: true, bg: '#F3E8FF' },
      { id: 'word-princess', content: 'Soft Princess 👑', label: 'Princess', isTextBadge: true, bg: '#FEF9C3' },
      { id: 'word-selfcare', content: 'Self Care Day 🕯️', label: 'Self Care', isTextBadge: true, bg: '#D1FAE5' },
      { id: 'word-secret', content: 'Secret Thoughts 🗝️', label: 'Secret', isTextBadge: true, bg: '#FEE2E2' },
      { id: 'word-xoxo', content: 'XOXO 💋', label: 'XOXO', isTextBadge: true, bg: '#FFE4E6' },
      { id: 'word-grateful', content: 'Grateful & Happy 🌸', label: 'Grateful', isTextBadge: true, bg: '#EDE9FE' },
      { id: 'word-glow', content: 'Glow Up Era 💅', label: 'Glow Up', isTextBadge: true, bg: '#FFEDD5' },
    ],
  },
];

export const WASHI_TAPE_PRESETS = [
  { id: 'washi-gingham', name: 'Xadrez Vichy Rosa', color: '#FBCFE8', pattern: 'bg-stripes-pink', style: 'bg-pink-100 border-dashed border-pink-300' },
  { id: 'washi-strawberry', name: 'Morangos Pastel', color: '#FFE4E6', pattern: 'bg-strawberry', style: 'bg-rose-100 border-rose-200' },
  { id: 'washi-lavender', name: 'Lavanda Shimmer', color: '#E9D5FF', pattern: 'bg-lavender', style: 'bg-purple-100 border-purple-200' },
  { id: 'washi-mint', name: 'Menta Fresca', color: '#A7F3D0', pattern: 'bg-mint', style: 'bg-emerald-100 border-emerald-200' },
  { id: 'washi-butter', name: 'Amarelo Manteiga', color: '#FEF08A', pattern: 'bg-butter', style: 'bg-amber-100 border-amber-200' },
  { id: 'washi-sky', name: 'Céu de Algodão', color: '#BAE6FD', pattern: 'bg-sky', style: 'bg-sky-100 border-sky-200' },
];

export const MOOD_OPTIONS: MoodOption[] = [
  { id: 'radiant', emoji: '💖', label: 'Radiante', color: '#EC4899', bg: 'bg-pink-100' },
  { id: 'calm', emoji: '🌸', label: 'Tranquila', color: '#F472B6', bg: 'bg-rose-50' },
  { id: 'dreamy', emoji: '✨', label: 'Sonhadora', color: '#A855F7', bg: 'bg-purple-50' },
  { id: 'grateful', emoji: '🕯️', label: 'Grata', color: '#EAB308', bg: 'bg-amber-50' },
  { id: 'tired', emoji: '🧸', label: 'Cansadinha', color: '#64748B', bg: 'bg-slate-100' },
  { id: 'sensitive', emoji: '🌧️', label: 'Sensível', color: '#0284C7', bg: 'bg-sky-50' },
];

export const WEATHER_OPTIONS: WeatherOption[] = [
  { id: 'sunny', emoji: '☀️', label: 'Ensolarado' },
  { id: 'breeze', emoji: '🌤️', label: 'Brisa Suave' },
  { id: 'rainy', emoji: '🌧️', label: 'Chuvinha Leve' },
  { id: 'cloudy', emoji: '☁️', label: 'Nublado Aconchegante' },
  { id: 'sparkly', emoji: '✨', label: 'Dia Mágico' },
];

export const FONT_OPTIONS: Array<{ id: HandwritingFont; name: string; sample: string; cssClass: string }> = [
  { id: 'caveat', name: 'Caveat (Manuscrita Casual)', sample: 'Querido diário, hoje...', cssClass: 'font-caveat' },
  { id: 'dancing', name: 'Dancing Script (Cursiva Graciosa)', sample: 'Querido diário, hoje...', cssClass: 'font-dancing' },
  { id: 'sacramento', name: 'Sacramento (Romântica & Elegante)', sample: 'Querido diário, hoje...', cssClass: 'font-sacramento' },
  { id: 'patrick', name: 'Patrick Hand (Caderno Escolar Fofo)', sample: 'Querido diário, hoje...', cssClass: 'font-patrick' },
  { id: 'kalam', name: 'Kalam (Caneta Gel Esferográfica)', sample: 'Querido diário, hoje...', cssClass: 'font-kalam' },
  { id: 'comfortaa', name: 'Comfortaa (Arredondada Aesthetic)', sample: 'Querido diário, hoje...', cssClass: 'font-comfortaa' },
  { id: 'quicksand', name: 'Quicksand (Minimalista Fofa)', sample: 'Querido diário, hoje...', cssClass: 'font-quicksand' },
];

export const AESTHETIC_INK_COLORS = [
  { name: 'Tinta Carvão Suave', hex: '#373036' },
  { name: 'Rosa Queimado', hex: '#9D4063' },
  { name: 'Framboesa Pastel', hex: '#BE185D' },
  { name: 'Lavanda Profunda', hex: '#6B21A8' },
  { name: 'Chocolate Aconchegante', hex: '#57331D' },
  { name: 'Verde Sálvia Suave', hex: '#166534' },
  { name: 'Azul Denim Pastel', hex: '#1E40AF' },
];

export const AESTHETIC_POLAROIDS = [
  {
    id: 'tulips',
    url: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=500&auto=format&fit=crop&q=60',
    caption: 'tulipas frescas na mesa 🌷',
  },
  {
    id: 'coffee',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&auto=format&fit=crop&q=60',
    caption: 'café da tarde & calmaria ☕',
  },
  {
    id: 'journal',
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60',
    caption: 'escrevendo poesias 📖',
  },
  {
    id: 'strawberries',
    url: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&auto=format&fit=crop&q=60',
    caption: 'morangos com chantilly 🍓',
  },
  {
    id: 'sunset',
    url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&auto=format&fit=crop&q=60',
    caption: 'céu cor-de-rosa de hoje ✨',
  },
];
