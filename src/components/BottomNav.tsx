'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Tv, Calendar, Grid3x3, Play } from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/channels', icon: Tv, label: 'Channels' },
  { href: '/guide', icon: Calendar, label: 'Guide' },
  { href: '/category/news', icon: Grid3x3, label: 'Categories' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden liquid-glass bottom-nav">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-all duration-300 ${isActive
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'
                }`}
            >
              {/* Active Background */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl" />
              )}

              {/* Icon */}
              <item.icon
                size={20}
                className={`relative transition-transform duration-300 ${isActive ? 'scale-110' : ''
                  }`}
              />

              {/* Label */}
              <span className={`relative text-[10px] mt-1 font-medium transition-all ${isActive ? 'opacity-100' : 'opacity-60'
                }`}>
                {item.label}
              </span>

              {/* Active Indicator Dot */}
              {isActive && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full" />
              )}
            </Link>
          );
        })}

        {/* Center Play Button */}
        <Link
          href="/channels"
          className="relative -mt-6 flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300"
        >
          <Play size={24} className="text-white ml-0.5 fill-current" />

          {/* Glow Ring */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 animate-ping opacity-20" />
        </Link>
      </div>
    </nav>
  );
}
