'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Play, Radio } from 'lucide-react';
import { Channel } from '@/types';
import GradientMeshBg from './GradientMeshBg';

interface FeaturedCarouselProps {
  channels: Channel[];
}

export default function FeaturedCarousel({ channels }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgressKey((k) => k + 1);
  }, []);

  const goToPrev = useCallback(() => {
    goToSlide((currentIndex - 1 + channels.length) % channels.length);
  }, [currentIndex, channels.length, goToSlide]);

  const goToNext = useCallback(() => {
    goToSlide((currentIndex + 1) % channels.length);
  }, [currentIndex, channels.length, goToSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % channels.length;
        setProgressKey((k) => k + 1);
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [channels.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
  };

  const currentChannel = channels[currentIndex];
  if (!currentChannel) return null;

  return (
    <section
      className="relative mb-10 -mx-4 lg:-mx-6 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[3/1]">
        {/* Gradient Mesh Background */}
        <GradientMeshBg />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Content */}
        <div className="relative h-full flex items-center px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full">
            {/* Channel Logo */}
            <div className="flex-shrink-0">
              <div className="w-28 h-28 md:w-44 md:h-44 glass rounded-2xl p-5 flex items-center justify-center shadow-2xl">
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
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-danger/15 rounded-full border border-danger/20">
                  <Radio size={12} className="text-danger live-indicator" />
                  <span className="text-xs font-bold text-danger">LIVE NOW</span>
                </span>
                <span className="px-2.5 py-1 bg-accent/15 rounded-full border border-accent/20 text-xs font-medium text-accent">
                  {currentChannel.quality}
                </span>
              </div>

              <h2 className="text-2xl md:text-4xl font-bold mb-2">
                {currentChannel.name}
              </h2>

              <p className="text-foreground-secondary mb-4">
                {currentChannel.country} &bull; {currentChannel.language}
              </p>

              <Link
                href={`/watch/${currentChannel.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover rounded-xl font-semibold transition-all shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105 active:scale-95"
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
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 glass rounded-full transition-all opacity-0 hover:opacity-100 md:opacity-60 hover:bg-white/10"
          aria-label="Previous channel"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 glass rounded-full transition-all opacity-0 hover:opacity-100 md:opacity-60 hover:bg-white/10"
          aria-label="Next channel"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Progress Bar Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {channels.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="carousel-progress h-1 rounded-full w-8 lg:w-12"
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentIndex && (
              <div key={progressKey} className="carousel-progress-fill rounded-full" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
