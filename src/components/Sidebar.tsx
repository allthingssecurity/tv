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
  X,
  ChevronRight,
} from 'lucide-react';
import { Category, categoryLabels } from '@/types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 bottom-0 w-64 bg-background-secondary border-r border-border z-50
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full overflow-y-auto py-4">
          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-2 right-2 p-2 hover:bg-background-tertiary rounded-lg"
          >
            <X size={20} />
          </button>

          {/* Main Navigation */}
          <nav className="px-3 mb-6">
            <p className="px-3 mb-2 text-xs font-semibold text-foreground-secondary uppercase tracking-wider">
              Menu
            </p>
            {mainNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all
                    ${
                      isActive
                        ? 'bg-accent text-white'
                        : 'hover:bg-background-tertiary text-foreground-secondary hover:text-foreground'
                    }
                  `}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                  {isActive && <ChevronRight size={16} className="ml-auto" />}
                </Link>
              );
            })}
          </nav>

          {/* Categories */}
          <nav className="px-3 flex-1">
            <p className="px-3 mb-2 text-xs font-semibold text-foreground-secondary uppercase tracking-wider">
              Categories
            </p>
            {(Object.keys(categoryLabels) as Category[]).map((category) => {
              const href = `/category/${category}`;
              const isActive = pathname === href;
              return (
                <Link
                  key={category}
                  href={href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 transition-all
                    ${
                      isActive
                        ? 'bg-accent/20 text-accent'
                        : 'hover:bg-background-tertiary text-foreground-secondary hover:text-foreground'
                    }
                  `}
                >
                  {categoryIconMap[category]}
                  <span className="text-sm">{categoryLabels[category]}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer Info */}
          <div className="px-6 py-4 border-t border-border mt-auto">
            <p className="text-xs text-foreground-secondary">
              GlobalTV Streaming
            </p>
            <p className="text-xs text-foreground-secondary mt-1">
              500+ Live Channels
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
