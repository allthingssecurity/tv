import Link from 'next/link';
import MainLayout from '@/components/MainLayout';
import { Home, Search, Tv } from 'lucide-react';

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-24 h-24 glass rounded-full flex items-center justify-center mb-6 neon-glow">
          <Tv size={48} className="text-foreground-secondary" />
        </div>

        <h1 className="text-4xl font-bold mb-2 gradient-text">404</h1>
        <h2 className="text-xl font-semibold mb-4">Channel Not Found</h2>
        <p className="text-foreground-secondary max-w-md mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back to watching great content.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover rounded-xl font-medium transition-all hover:scale-105 active:scale-95"
          >
            <Home size={18} />
            Go Home
          </Link>
          <Link
            href="/channels"
            className="flex items-center justify-center gap-2 px-6 py-3 glass-hover rounded-xl font-medium"
          >
            <Search size={18} />
            Browse Channels
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
