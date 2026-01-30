'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, Globe, Radio } from 'lucide-react';

interface HeaderProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

export default function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background-secondary/95 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 hover:bg-background-tertiary rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Globe className="w-8 h-8 text-accent" />
              <Radio className="w-4 h-4 text-accent absolute -bottom-1 -right-1 animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
                GlobalTV
              </h1>
              <p className="text-xs text-foreground-secondary -mt-1">Live Streaming</p>
            </div>
          </Link>
        </div>

        {/* Center: Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            href="/"
            className="px-4 py-2 text-sm font-medium hover:bg-background-tertiary rounded-lg transition-colors"
          >
            Home
          </Link>
          <Link
            href="/channels"
            className="px-4 py-2 text-sm font-medium hover:bg-background-tertiary rounded-lg transition-colors"
          >
            Channels
          </Link>
          <Link
            href="/guide"
            className="px-4 py-2 text-sm font-medium hover:bg-background-tertiary rounded-lg transition-colors"
          >
            TV Guide
          </Link>
          <Link
            href="/categories"
            className="px-4 py-2 text-sm font-medium hover:bg-background-tertiary rounded-lg transition-colors"
          >
            Categories
          </Link>
        </nav>

        {/* Right: Search */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden p-2 hover:bg-background-tertiary rounded-lg transition-colors"
            aria-label="Toggle search"
          >
            <Search size={20} />
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
              className="w-64 pl-10 pr-4 py-2 bg-background-tertiary border border-border rounded-full text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </div>

          {/* Live Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-danger/20 rounded-full">
            <span className="w-2 h-2 bg-danger rounded-full live-indicator" />
            <span className="text-xs font-medium text-danger">LIVE</span>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-4 border-t border-border bg-background-secondary">
          <div className="relative mt-4">
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
              className="w-full pl-10 pr-4 py-3 bg-background-tertiary border border-border rounded-xl text-sm focus:outline-none focus:border-accent transition-all"
            />
          </div>
        </div>
      )}
    </header>
  );
}
