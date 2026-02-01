'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Play, Volume2, Sparkles, Radio, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { Channel } from '@/types';

interface CinematicHeroProps {
  channels: Channel[];
}

export default function CinematicHero({ channels }: CinematicHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentChannel = channels[currentIndex];

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const goNext = useCallback(() => {
    goToSlide((currentIndex + 1) % channels.length);
  }, [currentIndex, channels.length, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide((currentIndex - 1 + channels.length) % channels.length);
  }, [currentIndex, channels.length, goToSlide]);

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(goNext, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [goNext]);

  // Mouse parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x: x * 20, y: y * 20 });
  };

  if (!currentChannel) return null;

  return (
    <section
      ref={heroRef}
      className="relative min-h-[85vh] lg:min-h-[90vh] overflow-hidden -mx-4 lg:-mx-6"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh-hero" />

      {/* Floating Particles - Using deterministic values to avoid hydration mismatch */}
      <div className="particles-bg">
        {[...Array(20)].map((_, i) => {
          // Use deterministic pseudo-random values based on index
          const seed = i * 7919; // Prime number for better distribution
          const left = ((seed % 100) + (i * 4.7)) % 100;
          const delay = ((seed % 20) + (i * 0.9)) % 20;
          const duration = 15 + ((seed % 10) + (i * 0.5)) % 10;
          const size = 2 + ((seed % 4) + (i * 0.2)) % 4;

          return (
            <div
              key={i}
              className="particle"
              style={{
                left: `${left}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                width: `${size}px`,
                height: `${size}px`,
                background: i % 3 === 0
                  ? 'rgba(124, 58, 237, 0.4)'
                  : i % 3 === 1
                    ? 'rgba(6, 182, 212, 0.4)'
                    : 'rgba(244, 114, 182, 0.4)',
              }}
            />
          );
        })}
      </div>

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50 z-10" />

      {/* Content Container */}
      <div className="relative z-20 h-full min-h-[85vh] lg:min-h-[90vh] flex items-center px-6 lg:px-12">
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left: Channel Info */}
          <div
            className={`space-y-6 transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-x-[-20px]' : 'opacity-100 translate-x-0'}`}
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Live Badge */}
              <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 backdrop-blur-xl rounded-full border border-red-500/30">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                <span className="text-sm font-bold text-red-400 tracking-wider">LIVE NOW</span>
              </div>

              {/* Quality Badge */}
              <div className={`quality-badge ${currentChannel.quality === '4K' ? 'quality-4k' : currentChannel.quality === 'FHD' ? 'quality-fhd' : 'quality-hd'}`}>
                {currentChannel.quality}
              </div>

              {/* Trending Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 backdrop-blur-xl rounded-full border border-purple-500/30">
                <Zap size={14} className="text-purple-400" />
                <span className="text-xs font-semibold text-purple-300">TRENDING</span>
              </div>
            </div>

            {/* Channel Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight">
              <span className="gradient-text-hero">{currentChannel.name}</span>
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-gray-400 max-w-xl leading-relaxed">
              Stream live from <span className="text-white font-medium">{currentChannel.country}</span> in stunning {currentChannel.quality} quality.
              Experience world-class {currentChannel.category} content 24/7.
            </p>

            {/* Stats Row */}
            <div className="flex items-center gap-6 py-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Live Stream</p>
              </div>
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-gray-700 to-transparent" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">1M+</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Viewers</p>
              </div>
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-gray-700 to-transparent" />
              <div className="text-center">
                <div className="audio-wave-pro">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Audio</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href={`/watch/${currentChannel.id}`}
                className="btn-premium group"
              >
                <Play size={20} className="fill-current" />
                <span>Watch Now</span>
                <Sparkles size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <button className="btn-glass">
                <Volume2 size={18} />
                <span>Preview</span>
              </button>
            </div>
          </div>

          {/* Right: Channel Logo Card */}
          <div
            className={`relative justify-self-center lg:justify-self-end transition-all duration-700 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg) translateZ(0)`,
            }}
          >
            {/* Glow Effect Behind Card */}
            <div
              className="absolute -inset-8 rounded-3xl opacity-50 blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, rgba(6, 182, 212, 0.2) 50%, transparent 70%)',
              }}
            />

            {/* Main Card */}
            <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[400px] lg:h-[400px] float-animation">
              {/* Card Container */}
              <div className="absolute inset-0 aurora-border rounded-3xl">
                <div className="holo-card absolute inset-[2px] rounded-[22px] p-8 lg:p-12 flex items-center justify-center">
                  {/* Inner Glow */}
                  <div
                    className="absolute inset-0 rounded-[22px]"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, rgba(124, 58, 237, 0.15) 0%, transparent 50%)',
                    }}
                  />

                  {/* Logo */}
                  <img
                    src={currentChannel.logo}
                    alt={currentChannel.name}
                    className="relative max-w-[75%] max-h-[75%] object-contain drop-shadow-2xl"
                    style={{
                      filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
                    }}
                  />
                </div>
              </div>

              {/* Floating Accent Circles */}
              <div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 blur-xl"
                style={{ animation: 'float 4s ease-in-out infinite' }}
              />
              <div
                className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 blur-xl"
                style={{ animation: 'float 5s ease-in-out infinite reverse' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goPrev}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 p-3 liquid-glass rounded-full opacity-40 hover:opacity-100 transition-all hover:scale-110 group"
        aria-label="Previous channel"
      >
        <ChevronLeft size={24} className="group-hover:text-purple-400 transition-colors" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 p-3 liquid-glass rounded-full opacity-40 hover:opacity-100 transition-all hover:scale-110 group"
        aria-label="Next channel"
      >
        <ChevronRight size={24} className="group-hover:text-cyan-400 transition-colors" />
      </button>

      {/* Bottom: Carousel Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {channels.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentIndex && <div className="carousel-dot-fill" />}
          </button>
        ))}
      </div>

      {/* Channel Thumbnails Preview */}
      <div className="absolute bottom-8 right-8 z-30 hidden xl:flex items-center gap-3">
        {channels.map((channel, index) => (
          <button
            key={channel.id}
            onClick={() => goToSlide(index)}
            className={`relative w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 ${index === currentIndex
              ? 'ring-2 ring-purple-500 scale-110'
              : 'opacity-50 hover:opacity-100 hover:scale-105'
              }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-black/90" />
            <img
              src={channel.logo}
              alt={channel.name}
              className="relative w-full h-full object-contain p-2"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
