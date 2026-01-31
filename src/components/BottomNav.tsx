'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Tv, Calendar, LayoutGrid, Search } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/channels', label: 'Channels', icon: Tv },
  { href: '/guide', label: 'Guide', icon: Calendar },
  { href: '/category/news', label: 'Categories', icon: LayoutGrid },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bottom-nav glass">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all
                ${active
                  ? 'text-accent'
                  : 'text-foreground-secondary hover:text-foreground'
                }
              `}
            >
              {active && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-accent rounded-full" />
              )}
              <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
