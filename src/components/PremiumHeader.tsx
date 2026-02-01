'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Globe, Radio, X, Menu, Sparkles, ChevronDown } from 'lucide-react';

export default function PremiumHeader() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/channels', label: 'Channels' },
        { href: '/guide', label: 'TV Guide' },
        { href: '/category/news', label: 'Categories', hasDropdown: true },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                        ? 'py-2 liquid-glass shadow-2xl shadow-black/20'
                        : 'py-4 bg-gradient-to-b from-black/60 to-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="flex items-center justify-between">

                        {/* Left: Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            {/* Logo Icon */}
                            <div className="relative">
                                <div className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                                <div className="relative w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                                    <Globe className="w-5 h-5 text-white" />
                                </div>
                                {/* Pulsing Radio Wave */}
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full flex items-center justify-center">
                                    <Radio className="w-2.5 h-2.5 text-white animate-pulse" />
                                </div>
                            </div>

                            {/* Logo Text */}
                            <div className="hidden sm:block">
                                <h1 className="text-xl font-black tracking-tight">
                                    <span className="gradient-text-hero">Global</span>
                                    <span className="text-white">TV</span>
                                </h1>
                                <div className="flex items-center gap-1.5 -mt-0.5">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">Live Streaming</span>
                                </div>
                            </div>
                        </Link>

                        {/* Center: Navigation (Desktop) */}
                        <nav className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-2xl bg-white/5 backdrop-blur-sm">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="relative px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-1.5 group"
                                >
                                    <span>{item.label}</span>
                                    {item.hasDropdown && (
                                        <ChevronDown size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                                    )}
                                </Link>
                            ))}
                        </nav>

                        {/* Right: Search + Actions */}
                        <div className="flex items-center gap-3">

                            {/* Desktop Search */}
                            <div className="hidden md:flex items-center relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
                                <div className="relative flex items-center">
                                    <Search
                                        size={16}
                                        className="absolute left-4 text-gray-500 pointer-events-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search channels..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-52 lg:w-64 pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-gray-600"
                                    />
                                </div>
                            </div>

                            {/* Mobile Search Toggle */}
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="md:hidden p-2.5 rounded-xl hover:bg-white/10 transition-colors"
                                aria-label="Toggle search"
                            >
                                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                            </button>

                            {/* Live Indicator Badge */}
                            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl border border-red-500/20">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                                <span className="text-xs font-bold text-red-400 tracking-wider">LIVE</span>
                            </div>

                            {/* Premium Badge */}
                            <Link
                                href="/channels"
                                className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300"
                            >
                                <Sparkles size={16} />
                                <span>Explore</span>
                            </Link>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2.5 rounded-xl hover:bg-white/10 transition-colors"
                                aria-label="Toggle menu"
                            >
                                <Menu size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search Bar */}
                    {isSearchOpen && (
                        <div className="md:hidden mt-4 pb-2">
                            <div className="relative">
                                <Search
                                    size={16}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Search channels, categories..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-purple-500/50 transition-all"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" />

                    {/* Menu Content */}
                    <div
                        className="absolute top-20 left-4 right-4 p-6 rounded-2xl liquid-glass"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <nav className="space-y-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-between p-4 rounded-xl hover:bg-white/10 transition-colors"
                                >
                                    <span className="font-medium">{item.label}</span>
                                    <ChevronDown size={18} className="text-gray-500 -rotate-90" />
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile Premium Button */}
                        <div className="mt-6 pt-6 border-t border-white/10">
                            <Link
                                href="/channels"
                                className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl text-white font-semibold"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Sparkles size={18} />
                                <span>Explore All Channels</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
