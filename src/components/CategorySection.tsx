'use client';

import Link from 'next/link';
import { ChevronRight, Newspaper, Trophy, Tv, Film, Baby, BookOpen, Music, Heart } from 'lucide-react';
import { Category, categoryLabels } from '@/types';
import { channels } from '@/data/channels';
import ChannelCard from './ChannelCard';

interface CategorySectionProps {
  category: Category;
  showAll?: boolean;
  limit?: number;
}

const categoryIcons: Record<Category, React.ReactNode> = {
  news: <Newspaper size={20} />,
  sports: <Trophy size={20} />,
  entertainment: <Tv size={20} />,
  movies: <Film size={20} />,
  kids: <Baby size={20} />,
  documentary: <BookOpen size={20} />,
  music: <Music size={20} />,
  lifestyle: <Heart size={20} />,
};

const categoryColors: Record<Category, string> = {
  news: 'from-red-500/20 to-orange-500/20',
  sports: 'from-green-500/20 to-emerald-500/20',
  entertainment: 'from-purple-500/20 to-pink-500/20',
  movies: 'from-blue-500/20 to-cyan-500/20',
  kids: 'from-yellow-500/20 to-amber-500/20',
  documentary: 'from-teal-500/20 to-green-500/20',
  music: 'from-pink-500/20 to-rose-500/20',
  lifestyle: 'from-rose-500/20 to-red-500/20',
};

export default function CategorySection({
  category,
  showAll = true,
  limit = 4,
}: CategorySectionProps) {
  const categoryChannels = channels
    .filter((c) => c.category === category)
    .slice(0, limit);

  if (categoryChannels.length === 0) return null;

  return (
    <section className="mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${categoryColors[category]}`}>
            {categoryIcons[category]}
          </div>
          <div>
            <h2 className="text-xl font-bold">{categoryLabels[category]}</h2>
            <p className="text-sm text-foreground-secondary">
              {channels.filter((c) => c.category === category).length} channels
            </p>
          </div>
        </div>

        {showAll && (
          <Link
            href={`/category/${category}`}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-foreground-secondary hover:text-accent hover:bg-background-tertiary rounded-lg transition-all"
          >
            View all
            <ChevronRight size={16} />
          </Link>
        )}
      </div>

      {/* Channels Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categoryChannels.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}
      </div>
    </section>
  );
}
