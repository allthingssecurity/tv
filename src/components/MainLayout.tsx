'use client';

import Header from './Header';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <Sidebar />

      {/* Main Content */}
      <main className="pt-16 lg:pl-16 xl:pl-16 pb-20 lg:pb-0">
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
