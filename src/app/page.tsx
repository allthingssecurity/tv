import MainLayout from '@/components/MainLayout';
import CinematicHero from '@/components/CinematicHero';
import StatsSection from '@/components/StatsSection';
import PremiumCategorySection from '@/components/PremiumCategorySection';
import EPGTimeline from '@/components/EPGTimeline';
import { channels } from '@/data/channels';
import { Category } from '@/types';
import { Clock, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  // Get featured channels (first 5)
  const featuredChannels = channels.slice(0, 5);

  // Categories to display on home page
  const homeCategories: Category[] = ['news', 'sports', 'entertainment', 'documentary'];

  return (
    <MainLayout>
      {/* Cinematic Hero Section */}
      <CinematicHero channels={featuredChannels} />

      {/* Stats Section */}
      <StatsSection />

      {/* What's On Now - EPG Preview */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
              <Clock size={22} className="text-purple-400" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl lg:text-2xl font-bold">What&apos;s On Now</h2>
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-semibold text-green-400">LIVE</span>
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-0.5 hidden sm:block">
                Currently streaming across all channels
              </p>
            </div>
          </div>

          <Link
            href="/guide"
            className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-cyan-500/20 border border-transparent hover:border-purple-500/20 transition-all duration-300"
          >
            <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
              Full Guide
            </span>
            <ArrowRight size={16} className="text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* EPG Timeline */}
        <div className="rounded-2xl overflow-hidden liquid-glass p-1">
          <EPGTimeline hoursToShow={3} />
        </div>
      </section>

      {/* Featured Banner */}
      <section className="mb-14">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/40 via-background-secondary to-cyan-900/40 p-8 lg:p-12">
          {/* Background Decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4">
                <Sparkles size={16} className="text-amber-400" />
                <span className="text-sm font-medium text-amber-300">Premium Experience</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-3">
                Experience TV Like Never Before
              </h3>
              <p className="text-gray-400 max-w-xl">
                Crystal clear 4K streaming, zero buffering, and channels from every corner of the globe.
                Your entertainment, redefined.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/channels"
                className="btn-premium"
              >
                <Sparkles size={18} />
                <span>Browse Channels</span>
              </Link>
              <Link
                href="/guide"
                className="btn-glass"
              >
                <Clock size={18} />
                <span>View Schedule</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Sections */}
      {homeCategories.map((category) => (
        <PremiumCategorySection key={category} category={category} limit={8} />
      ))}

      {/* Footer CTA */}
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="gradient-text">Ready to Start Watching?</span>
          </h3>
          <p className="text-gray-500 mb-8">
            Jump into hundreds of live channels from around the world. No signup required.
          </p>
          <Link
            href="/channels"
            className="btn-premium inline-flex"
          >
            <span>Explore All Channels</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
