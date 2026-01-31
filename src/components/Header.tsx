'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Globe, Radio, X } from 'lucide-react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Globe className="w-8 h-8 text-accent" />
              <Radio className="w-4 h-4 text-accent absolute -bottom-1 -right-1 animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold gradient-text">
                GlobalTV
              </h1>
              <p className="text-xs text-foreground-secondary -mt-1">Live Streaming</p>
            </div>
          </Link>
        </div>

        {/* Center: Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1">
          {[
            { href: '/', label: 'Home' },
            { href: '/channels', label: 'Channels' },
            { href: '/guide', label: 'TV Guide' },
            { href: '/category/news', label: 'Categories' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-foreground-secondary hover:text-foreground hover:bg-white/5 rounded-lg transition-all"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Search + Live */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Toggle search"
          >
            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center relative">
            <Search
              size={18}
              className="absolute left-3 text-foreground-secondary pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-foreground-secondary"
            />
          </div>

          {/* Live Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-danger/10 rounded-full border border-danger/20">
            <span className="w-2 h-2 bg-danger rounded-full live-pulse-ring" />
            <span className="text-xs font-medium text-danger">LIVE</span>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-accent transition-all"
            />
          </div>
        </div>
      )}
    </header>
  );
}
