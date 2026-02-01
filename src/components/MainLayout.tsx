'use client';

import PremiumHeader from './PremiumHeader';
import BottomNav from './BottomNav';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <PremiumHeader />

      {/* Main Content */}
      <main className="pt-20 lg:pt-24 pb-24 lg:pb-12 px-4 lg:px-6 max-w-7xl mx-auto page-enter">
        {children}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <BottomNav />
    </div>
  );
}
