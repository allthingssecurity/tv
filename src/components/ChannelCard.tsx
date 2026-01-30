'use client';

import Link from 'next/link';
import { Play, Radio } from 'lucide-react';
import { Channel } from '@/types';

interface ChannelCardProps {
  channel: Channel;
  variant?: 'default' | 'compact' | 'featured';
}

export default function ChannelCard({ channel, variant = 'default' }: ChannelCardProps) {
  const qualityColors: Record<string, string> = {
    SD: 'bg-gray-500',
    HD: 'bg-blue-500',
    FHD: 'bg-purple-500',
    '4K': 'bg-gradient-to-r from-amber-500 to-orange-500',
  };

  if (variant === 'compact') {
    return (
      <Link
        href={`/watch/${channel.id}`}
        className="flex items-center gap-3 p-3 bg-background-secondary hover:bg-background-tertiary border border-border hover:border-border-hover rounded-xl transition-all group"
      >
        <div className="relative w-12 h-12 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={channel.logo}
            alt={channel.name}
            className="w-full h-full object-contain p-1"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate group-hover:text-accent transition-colors">
            {channel.name}
          </h3>
          <p className="text-xs text-foreground-secondary">{channel.country}</p>
        </div>
        {channel.isLive && (
          <span className="flex items-center gap-1 px-2 py-1 bg-danger/20 rounded-full">
            <span className="w-1.5 h-1.5 bg-danger rounded-full live-indicator" />
            <span className="text-xs text-danger font-medium">LIVE</span>
          </span>
        )}
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link
        href={`/watch/${channel.id}`}
        className="channel-card relative group overflow-hidden rounded-2xl bg-background-secondary border border-border"
      >
        {/* Background with gradient */}
        <div className="relative aspect-video bg-gradient-to-br from-accent/20 to-background-tertiary p-8 flex items-center justify-center">
          <img
            src={channel.logo}
            alt={channel.name}
            className="max-w-[60%] max-h-[60%] object-contain drop-shadow-2xl"
          />
          
          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 flex items-center justify-center transition-all duration-300">
            <div className="w-16 h-16 flex items-center justify-center bg-accent rounded-full opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg shadow-accent/40">
              <Play size={28} className="ml-1 text-white" />
            </div>
          </div>

          {/* Quality badge */}
          <span className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-bold text-white ${qualityColors[channel.quality]}`}>
            {channel.quality}
          </span>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">
                {channel.name}
              </h3>
              <p className="text-sm text-foreground-secondary mt-0.5">
                {channel.country} • {channel.language}
              </p>
            </div>
            {channel.isLive && (
              <span className="flex items-center gap-1.5 px-2 py-1 bg-danger/20 rounded-full flex-shrink-0">
                <Radio size={12} className="text-danger live-indicator" />
                <span className="text-xs text-danger font-semibold">LIVE</span>
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link
      href={`/watch/${channel.id}`}
      className="channel-card group overflow-hidden rounded-xl bg-background-secondary border border-border hover:border-accent/50"
    >
      {/* Logo Container */}
      <div className="relative aspect-video bg-gradient-to-br from-background-tertiary to-background p-6 flex items-center justify-center">
        <img
          src={channel.logo}
          alt={channel.name}
          className="max-w-[70%] max-h-[70%] object-contain"
        />
        
        {/* Hover Play */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 flex items-center justify-center transition-all duration-300">
          <div className="w-12 h-12 flex items-center justify-center bg-accent rounded-full opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300">
            <Play size={20} className="ml-0.5 text-white" />
          </div>
        </div>

        {/* Quality badge */}
        <span className={`absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-bold text-white ${qualityColors[channel.quality]}`}>
          {channel.quality}
        </span>

        {/* Live indicator */}
        {channel.isLive && (
          <span className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 bg-danger/90 rounded">
            <span className="w-1.5 h-1.5 bg-white rounded-full live-indicator" />
            <span className="text-[10px] text-white font-bold">LIVE</span>
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-medium text-sm truncate group-hover:text-accent transition-colors">
          {channel.name}
        </h3>
        <p className="text-xs text-foreground-secondary mt-0.5 truncate">
          {channel.country}
        </p>
      </div>
    </Link>
  );
}
