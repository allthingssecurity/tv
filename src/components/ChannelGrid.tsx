'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Channel } from '@/types';
import ChannelCard from './ChannelCard';

interface ChannelGridProps {
  channels: Channel[];
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'compact' | 'featured';
  columns?: 2 | 3 | 4 | 5 | 6;
  layout?: 'grid' | 'scroll';
}

export default function ChannelGrid({
  channels,
  title,
  subtitle,
  variant = 'default',
  columns = 4,
  layout = 'grid',
}: ChannelGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
  };

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 10);
    setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    if (layout !== 'scroll') return;
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    return () => el.removeEventListener('scroll', checkScroll);
  }, [layout]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  if (layout === 'scroll') {
    return (
      <section className="mb-8">
        {(title || subtitle) && (
          <div className="mb-4">
            {title && <h2 className="text-xl font-bold">{title}</h2>}
            {subtitle && (
              <p className="text-sm text-foreground-secondary mt-1">{subtitle}</p>
            )}
          </div>
        )}
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
            {channels.map((channel, i) => (
              <div key={channel.id} className="w-[200px] sm:w-[220px] lg:w-[240px]">
                <ChannelCard channel={channel} variant={variant} index={i} />
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

  if (variant === 'compact') {
    return (
      <section className="mb-8">
        {(title || subtitle) && (
          <div className="mb-4">
            {title && <h2 className="text-xl font-bold">{title}</h2>}
            {subtitle && (
              <p className="text-sm text-foreground-secondary mt-1">{subtitle}</p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {channels.map((channel, i) => (
            <ChannelCard key={channel.id} channel={channel} variant="compact" index={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h2 className="text-xl font-bold">{title}</h2>}
          {subtitle && (
            <p className="text-sm text-foreground-secondary mt-1">{subtitle}</p>
          )}
        </div>
      )}
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {channels.map((channel, i) => (
          <ChannelCard key={channel.id} channel={channel} variant={variant} index={i} />
        ))}
      </div>
    </section>
  );
}
