export interface Channel {
  id: string;
  name: string;
  logo: string;
  category: Category;
  country: string;
  language: string;
  streamUrl: string;
  isLive: boolean;
  currentProgram?: Program;
  quality: 'SD' | 'HD' | 'FHD' | '4K';
}

export interface Program {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  category: string;
  thumbnail?: string;
}

export interface EPGEntry {
  channelId: string;
  programs: Program[];
}

export type Category = 
  | 'news'
  | 'sports'
  | 'entertainment'
  | 'movies'
  | 'kids'
  | 'documentary'
  | 'music'
  | 'lifestyle';

export interface Region {
  id: string;
  name: string;
  flag: string;
  countries: string[];
}

export const categoryLabels: Record<Category, string> = {
  news: 'News',
  sports: 'Sports',
  entertainment: 'Entertainment',
  movies: 'Movies',
  kids: 'Kids',
  documentary: 'Documentary',
  music: 'Music',
  lifestyle: 'Lifestyle',
};

export const categoryIcons: Record<Category, string> = {
  news: 'Newspaper',
  sports: 'Trophy',
  entertainment: 'Tv',
  movies: 'Film',
  kids: 'Baby',
  documentary: 'BookOpen',
  music: 'Music',
  lifestyle: 'Heart',
};
