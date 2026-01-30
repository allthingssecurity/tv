'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Play, Radio } from 'lucide-react';
import { Channel } from '@/types';

interface FeaturedCarouselProps {
  channels: Channel[];
}

export default function FeaturedCarousel({ channels }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % channels.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [channels.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + channels.length) % channels.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % channels.length);
  };

  const currentChannel = channels[currentIndex];
  if (!currentChannel) return null;

  return (
    <section className="relative mb-10 rounded-2xl overflow-hidden">
      {/* Background */}
      <div className="relative aspect-[21/9] md:aspect-[3/1] bg-gradient-to-br from-accent/30 via-background-tertiary to-background">
        {/* Animated background patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full">
            {/* Channel Logo */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-48 md:h-48 bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-center shadow-2xl">
                <img
                  src={currentChannel.logo}
                  alt={currentChannel.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <span className="flex items-center gap-1.5 px-2 py-1 bg-danger/30 rounded-full">
                  <Radio size={12} className="text-danger live-indicator" />
                  <span className="text-xs font-bold text-danger">LIVE NOW</span>
                </span>
                <span className="px-2 py-1 bg-accent/30 rounded-full text-xs font-medium text-accent">
                  {currentChannel.quality}
                </span>
              </div>
              
              <h2 className="text-2xl md:text-4xl font-bold mb-2">
                {currentChannel.name}
              </h2>
              
              <p className="text-foreground-secondary mb-4">
                {currentChannel.country} • {currentChannel.language}
              </p>

              <Link
                href={`/watch/${currentChannel.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover rounded-xl font-semibold transition-all shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105"
              >
                <Play size={20} className="fill-current" />
                Watch Now
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-background/50 hover:bg-background/80 rounded-full backdrop-blur-sm transition-all opacity-0 hover:opacity-100 md:opacity-50"
          aria-label="Previous channel"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-background/50 hover:bg-background/80 rounded-full backdrop-blur-sm transition-all opacity-0 hover:opacity-100 md:opacity-50"
          aria-label="Next channel"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {channels.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              w-2 h-2 rounded-full transition-all
              ${index === currentIndex ? 'w-6 bg-accent' : 'bg-white/30 hover:bg-white/50'}
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
