'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import {
    ChevronRight, ChevronLeft,
    Newspaper, Trophy, Tv, Film,
    Baby, BookOpen, Music, Heart,
    ArrowRight, Sparkles
} from 'lucide-react';
import { Category, categoryLabels } from '@/types';
import { channels } from '@/data/channels';
import PremiumChannelCard from './PremiumChannelCard';

interface PremiumCategorySectionProps {
    category: Category;
    showAll?: boolean;
    limit?: number;
}

const categoryIcons: Record<Category, React.ReactNode> = {
    news: <Newspaper size={22} />,
    sports: <Trophy size={22} />,
    entertainment: <Tv size={22} />,
    movies: <Film size={22} />,
    kids: <Baby size={22} />,
    documentary: <BookOpen size={22} />,
    music: <Music size={22} />,
    lifestyle: <Heart size={22} />,
};

const categoryGradients: Record<Category, string> = {
    news: 'from-red-500 to-orange-500',
    sports: 'from-emerald-500 to-green-500',
    entertainment: 'from-purple-500 to-pink-500',
    movies: 'from-blue-500 to-cyan-500',
    kids: 'from-yellow-400 to-amber-500',
    documentary: 'from-teal-500 to-cyan-500',
    music: 'from-pink-500 to-rose-500',
    lifestyle: 'from-rose-400 to-red-500',
};

const categoryDescriptions: Record<Category, string> = {
    news: 'Breaking news from around the globe',
    sports: 'Live sports action & highlights',
    entertainment: 'Premium shows & entertainment',
    movies: 'Blockbuster movies & classics',
    kids: 'Fun & educational for children',
    documentary: 'Award-winning documentaries',
    music: 'Live concerts & music videos',
    lifestyle: 'Travel, food & lifestyle content',
};

export default function PremiumCategorySection({
    category,
    showAll = true,
    limit = 8,
}: PremiumCategorySectionProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const categoryChannels = channels
        .filter((c) => c.category === category)
        .slice(0, limit);

    const updateScrollState = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 10);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        updateScrollState();
        el.addEventListener('scroll', updateScrollState, { passive: true });
        window.addEventListener('resize', updateScrollState);

        return () => {
            el.removeEventListener('scroll', updateScrollState);
            window.removeEventListener('resize', updateScrollState);
        };
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        const el = scrollRef.current;
        if (!el) return;
        const amount = el.clientWidth * 0.75;
        el.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' });
    };

    if (categoryChannels.length === 0) return null;

    return (
        <section className="mb-14">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div
                        className={`category-icon bg-gradient-to-br ${categoryGradients[category]}`}
                        style={{
                            background: `linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(6, 182, 212, 0.1))`,
                        }}
                    >
                        <div className={`bg-gradient-to-br ${categoryGradients[category]} bg-clip-text`}>
                            {categoryIcons[category]}
                        </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl lg:text-2xl font-bold">{categoryLabels[category]}</h2>
                            <span className="px-2 py-0.5 bg-purple-500/20 rounded-full text-xs font-medium text-purple-300">
                                {channels.filter((c) => c.category === category).length} channels
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5 hidden sm:block">
                            {categoryDescriptions[category]}
                        </p>
                    </div>
                </div>

                {/* View All Link */}
                {showAll && (
                    <Link
                        href={`/category/${category}`}
                        className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-cyan-500/20 border border-transparent hover:border-purple-500/20 transition-all duration-300"
                    >
                        <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                            View all
                        </span>
                        <ArrowRight size={16} className="text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                )}
            </div>

            {/* Channel Cards Container */}
            <div
                className={`scroll-container relative ${canScrollLeft ? 'show-fade-left' : ''} ${canScrollRight ? 'show-fade-right' : ''}`}
            >
                {/* Left Arrow */}
                {canScrollLeft && (
                    <button
                        onClick={() => scroll('left')}
                        className="scroll-arrow scroll-arrow-left hidden lg:flex"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={20} />
                    </button>
                )}

                {/* Scrollable Row */}
                <div ref={scrollRef} className="scroll-row">
                    {categoryChannels.map((channel, i) => (
                        <div key={channel.id} className="w-[200px] sm:w-[220px] lg:w-[240px]">
                            <PremiumChannelCard channel={channel} index={i} />
                        </div>
                    ))}

                    {/* View All Card */}
                    {showAll && categoryChannels.length >= limit && (
                        <Link
                            href={`/category/${category}`}
                            className="w-[200px] sm:w-[220px] lg:w-[240px] min-h-[200px] flex flex-col items-center justify-center gap-4 rounded-2xl liquid-glass-hover group"
                        >
                            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${categoryGradients[category]} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <Sparkles size={28} className="text-white" />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                                    View All
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {channels.filter((c) => c.category === category).length - limit}+ more
                                </p>
                            </div>
                        </Link>
                    )}
                </div>

                {/* Right Arrow */}
                {canScrollRight && (
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
