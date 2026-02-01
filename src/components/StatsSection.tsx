'use client';

import { useEffect, useState, useRef } from 'react';
import { Globe, Tv, Users, Zap, Play, Star, Clock } from 'lucide-react';

interface StatItem {
    value: string;
    numValue: number;
    suffix: string;
    label: string;
    icon: React.ReactNode;
    gradient: string;
}

const stats: StatItem[] = [
    {
        value: '500+',
        numValue: 500,
        suffix: '+',
        label: 'Live Channels',
        icon: <Tv size={24} />,
        gradient: 'from-purple-500 to-violet-600'
    },
    {
        value: '50+',
        numValue: 50,
        suffix: '+',
        label: 'Countries',
        icon: <Globe size={24} />,
        gradient: 'from-cyan-500 to-blue-600'
    },
    {
        value: '10M',
        numValue: 10,
        suffix: 'M',
        label: 'Total Viewers',
        icon: <Users size={24} />,
        gradient: 'from-pink-500 to-rose-600'
    },
    {
        value: '4K',
        numValue: 4,
        suffix: 'K',
        label: 'Ultra HD Quality',
        icon: <Zap size={24} />,
        gradient: 'from-amber-500 to-orange-600'
    },
];

function AnimatedCounter({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isVisible, value, duration]);

    return (
        <span ref={ref} className="stat-number">
            {count}
            {suffix}
        </span>
    );
}

export default function StatsSection() {
    return (
        <section className="relative py-16 px-4 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20 mb-4">
                        <Star size={16} className="text-purple-400" />
                        <span className="text-sm font-medium text-purple-300">Trusted by Millions Worldwide</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold">
                        <span className="gradient-text">Global Streaming Platform</span>
                    </h2>
                    <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                        Join millions of viewers streaming premium content from around the world, 24/7
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.label}
                            className={`relative group p-6 lg:p-8 rounded-2xl liquid-glass-hover overflow-hidden fade-slide-up stagger-${index + 1}`}
                        >
                            {/* Gradient Background on Hover */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                            />

                            {/* Icon */}
                            <div
                                className={`w-14 h-14 mb-4 rounded-xl bg-gradient-to-br ${stat.gradient} bg-opacity-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                style={{
                                    background: `linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(6, 182, 212, 0.1))`,
                                }}
                            >
                                <div className={`bg-gradient-to-br ${stat.gradient} bg-clip-text`}>
                                    {stat.icon}
                                </div>
                            </div>

                            {/* Value */}
                            <AnimatedCounter value={stat.numValue} suffix={stat.suffix} />

                            {/* Label */}
                            <p className="text-sm text-gray-500 mt-2">{stat.label}</p>

                            {/* Corner Decoration */}
                            <div
                                className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}
                            />
                        </div>
                    ))}
                </div>

                {/* Bottom Banner */}
                <div className="mt-12 p-6 lg:p-8 rounded-2xl liquid-glass overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-pink-500/5" />

                    <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                                <Play size={24} className="text-white ml-0.5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Start Watching Now</h3>
                                <p className="text-gray-500 text-sm">No signup required • Stream instantly</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Clock size={18} />
                                <span className="text-sm">24/7 Live Streaming</span>
                            </div>
                            <div className="w-px h-6 bg-gray-700" />
                            <div className="flex -space-x-2">
                                {[...Array(4)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 border-2 border-background flex items-center justify-center text-xs font-bold"
                                    >
                                        {['👤', '👥', '🌍', '⭐'][i]}
                                    </div>
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">+10M viewers</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
