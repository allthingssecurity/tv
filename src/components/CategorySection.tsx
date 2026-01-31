'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Newspaper, Trophy, Tv, Film, Baby, BookOpen, Music, Heart } from 'lucide-react';
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
  limit = 8,
}: CategorySectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const categoryChannels = channels
    .filter((c) => c.category === category)
    .slice(0, limit);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 10);
    setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' });
  };

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
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-foreground-secondary hover:text-accent hover:bg-white/5 rounded-lg transition-all"
          >
            View all
            <ChevronRight size={16} />
          </Link>
        )}
      </div>

      {/* Horizontal Scroll Row */}
      <div className={`scroll-container ${showLeftArrow ? 'show-fade-left' : ''} ${showRightArrow ? 'show-fade-right' : ''}`}>
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="scroll-arrow scroll-arrow-left hidden lg:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        <div ref={scrollRef} className="scroll-row">
          {categoryChannels.map((channel, i) => (
            <div key={channel.id} className="w-[180px] sm:w-[200px] lg:w-[220px]">
              <ChannelCard channel={channel} index={i} />
            </div>
          ))}
        </div>
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="scroll-arrow scroll-arrow-right hidden lg:flex"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </section>
  );
}
