'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Tv,
  Calendar,
  Newspaper,
  Trophy,
  Film,
  Baby,
  BookOpen,
  Music,
  Heart,
} from 'lucide-react';
import { Category, categoryLabels } from '@/types';

const categoryIconMap: Record<Category, React.ReactNode> = {
  news: <Newspaper size={18} />,
  sports: <Trophy size={18} />,
  entertainment: <Tv size={18} />,
  movies: <Film size={18} />,
  kids: <Baby size={18} />,
  documentary: <BookOpen size={18} />,
  music: <Music size={18} />,
  lifestyle: <Heart size={18} />,
};

const mainNav = [
  { href: '/', label: 'Home', icon: <Home size={20} /> },
  { href: '/channels', label: 'All Channels', icon: <Tv size={20} /> },
  { href: '/guide', label: 'TV Guide', icon: <Calendar size={20} /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        hidden lg:block fixed top-16 left-0 bottom-0 w-16 hover:w-56
        glass z-40
        transition-all duration-300 ease-in-out overflow-hidden group/sidebar
      "
    >
      <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden py-4">
        {/* Main Navigation */}
        <nav className="px-2 mb-6">
          <p className="px-2 mb-2 text-[10px] font-semibold text-foreground-secondary uppercase tracking-wider opacity-0 group-hover/sidebar:opacity-100 transition-opacity whitespace-nowrap">
            Menu
          </p>
          {mainNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all whitespace-nowrap
                  ${
                    isActive
                      ? 'bg-accent text-white'
                      : 'hover:bg-white/5 text-foreground-secondary hover:text-foreground'
                  }
                `}
                title={item.label}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="font-medium text-sm opacity-0 group-hover/sidebar:opacity-100 transition-opacity">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Categories */}
        <nav className="px-2 flex-1">
          <p className="px-2 mb-2 text-[10px] font-semibold text-foreground-secondary uppercase tracking-wider opacity-0 group-hover/sidebar:opacity-100 transition-opacity whitespace-nowrap">
            Categories
          </p>
          {(Object.keys(categoryLabels) as Category[]).map((category) => {
            const href = `/category/${category}`;
            const isActive = pathname === href;
            return (
              <Link
                key={category}
                href={href}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 transition-all whitespace-nowrap
                  ${
                    isActive
                      ? 'bg-accent/20 text-accent'
                      : 'hover:bg-white/5 text-foreground-secondary hover:text-foreground'
                  }
                `}
                title={categoryLabels[category]}
              >
                <span className="flex-shrink-0">{categoryIconMap[category]}</span>
                <span className="text-sm opacity-0 group-hover/sidebar:opacity-100 transition-opacity">
                  {categoryLabels[category]}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Info */}
        <div className="px-4 py-4 border-t border-white/5 mt-auto">
          <p className="text-[10px] text-foreground-secondary opacity-0 group-hover/sidebar:opacity-100 transition-opacity whitespace-nowrap">
            GlobalTV Streaming
          </p>
        </div>
      </div>
    </aside>
  );
}
