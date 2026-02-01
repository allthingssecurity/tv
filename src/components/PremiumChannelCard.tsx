'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Play, Radio, Eye, Users } from 'lucide-react';
import { Channel } from '@/types';

interface PremiumChannelCardProps {
    channel: Channel;
    index?: number;
    variant?: 'default' | 'compact' | 'featured';
}

export default function PremiumChannelCard({
    channel,
    index = 0,
    variant = 'default'
}: PremiumChannelCardProps) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLAnchorElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePos({ x, y });
    };

    const qualityStyles: Record<string, string> = {
        SD: 'bg-gray-600/80 text-gray-300',
        HD: 'quality-hd',
        FHD: 'quality-fhd',
        '4K': 'quality-4k',
    };

    const staggerClass = `stagger-${Math.min(index + 1, 10)}`;

    // Compact variant
    if (variant === 'compact') {
        return (
            <Link
                href={`/watch/${channel.id}`}
                className={`flex items-center gap-4 p-4 liquid-glass-hover rounded-2xl group fade-slide-up ${staggerClass}`}
            >
                <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
                    <img
                        src={channel.logo}
                        alt={channel.name}
                        className="w-full h-full object-contain p-2"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate group-hover:text-purple-400 transition-colors">
                        {channel.name}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">{channel.country} • {channel.language}</p>
                </div>
                {channel.isLive && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/15 rounded-full">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="text-xs font-bold text-red-400">LIVE</span>
                    </div>
                )}
            </Link>
        );
    }

    // Featured variant
    if (variant === 'featured') {
        return (
            <Link
                ref={cardRef}
                href={`/watch/${channel.id}`}
                className={`channel-card holo-card group rounded-2xl overflow-hidden fade-slide-up ${staggerClass}`}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Container */}
                <div className="relative aspect-video bg-gradient-to-br from-purple-900/40 via-background to-cyan-900/30 p-8 flex items-center justify-center overflow-hidden">
                    {/* Animated Spotlight */}
                    <div
                        className="absolute inset-0 transition-opacity duration-500"
                        style={{
                            background: isHovered
                                ? `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(124, 58, 237, 0.2) 0%, transparent 50%)`
                                : 'none',
                        }}
                    />

                    {/* Logo */}
                    <img
                        src={channel.logo}
                        alt={channel.name}
                        className="relative max-w-[55%] max-h-[55%] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Play Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/50 transition-all duration-500">
                        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 shadow-2xl shadow-purple-500/30">
                            <Play size={32} className="ml-1 text-white fill-current" />
                        </div>
                    </div>

                    {/* Quality Badge */}
                    <span className={`absolute top-4 right-4 quality-badge ${qualityStyles[channel.quality]}`}>
                        {channel.quality}
                    </span>

                    {/* Live Badge */}
                    {channel.isLive && (
                        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-red-500/90 rounded-lg backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            <span className="text-xs font-bold text-white">LIVE</span>
                        </div>
                    )}

                    {/* Viewer Count */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <Users size={14} className="text-purple-400" />
                        <span className="text-xs text-gray-300">{((index * 17 + 23) % 90 + 10)}K watching</span>
                    </div>
                </div>

                {/* Info */}
                <div className="p-5 bg-gradient-to-b from-gray-900/80 to-black/90">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h3 className="font-bold text-lg group-hover:text-purple-400 transition-colors">
                                {channel.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                {channel.country} • {channel.language}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    // Default variant - Premium Card
    return (
        <Link
            ref={cardRef}
            href={`/watch/${channel.id}`}
            className={`channel-card group rounded-2xl overflow-hidden fade-slide-up ${staggerClass}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                transform: isHovered
                    ? `perspective(1000px) rotateY(${(mousePos.x - 0.5) * 8}deg) rotateX(${(0.5 - mousePos.y) * 8}deg)`
                    : 'none',
            }}
        >
            {/* Card Inner */}
            <div className="holo-card rounded-2xl overflow-hidden">
                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-purple-900/30 via-background-secondary to-cyan-900/20 p-6 flex items-center justify-center overflow-hidden">
                    {/* Animated Spotlight on Hover */}
                    <div
                        className="absolute inset-0 transition-opacity duration-300"
                        style={{
                            background: isHovered
                                ? `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(124, 58, 237, 0.25) 0%, transparent 40%)`
                                : 'none',
                        }}
                    />

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-cyan-500/10 to-transparent" />

                    {/* Logo */}
                    <img
                        src={channel.logo}
                        alt={channel.name}
                        className="relative max-w-[65%] max-h-[65%] object-contain transition-all duration-500 group-hover:scale-110"
                        style={{
                            filter: isHovered ? 'drop-shadow(0 10px 30px rgba(124, 58, 237, 0.3))' : 'none',
                        }}
                    />

                    {/* Play Button on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-400">
                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-400 shadow-xl">
                            <Play size={24} className="ml-1 text-white fill-current" />
                        </div>
                    </div>

                    {/* Quality Badge */}
                    <span className={`absolute top-3 right-3 quality-badge ${qualityStyles[channel.quality]}`}>
                        {channel.quality}
                    </span>

                    {/* Live Indicator */}
                    {channel.isLive && (
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-red-500/90 rounded-md backdrop-blur-sm">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                            </span>
                            <span className="text-[10px] font-bold text-white tracking-wide">LIVE</span>
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div className="p-4 bg-gradient-to-b from-gray-900/60 to-gray-950/80">
                    <h3 className="font-semibold text-sm truncate group-hover:text-purple-400 transition-colors">
                        {channel.name}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-500 truncate">
                            {channel.country}
                        </p>
                        <div className="flex items-center gap-1 text-gray-600">
                            <Eye size={12} />
                            <span className="text-[10px]">{((index * 13 + 7) % 45 + 5)}K</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
