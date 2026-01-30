import MainLayout from '@/components/MainLayout';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import CategorySection from '@/components/CategorySection';
import EPGTimeline from '@/components/EPGTimeline';
import { channels } from '@/data/channels';
import { Category } from '@/types';

export default function HomePage() {
  // Get featured channels (first 5)
  const featuredChannels = channels.slice(0, 5);

  // Categories to display on home page
  const homeCategories: Category[] = ['news', 'sports', 'entertainment', 'documentary'];

  return (
    <MainLayout>
      {/* Hero Carousel */}
      <FeaturedCarousel channels={featuredChannels} />

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="p-4 bg-background-secondary rounded-xl border border-border text-center">
          <p className="text-3xl font-bold text-accent">{channels.length}+</p>
          <p className="text-sm text-foreground-secondary mt-1">Live Channels</p>
        </div>
        <div className="p-4 bg-background-secondary rounded-xl border border-border text-center">
          <p className="text-3xl font-bold text-accent">50+</p>
          <p className="text-sm text-foreground-secondary mt-1">Countries</p>
        </div>
        <div className="p-4 bg-background-secondary rounded-xl border border-border text-center">
          <p className="text-3xl font-bold text-accent">24/7</p>
          <p className="text-sm text-foreground-secondary mt-1">Streaming</p>
        </div>
        <div className="p-4 bg-background-secondary rounded-xl border border-border text-center">
          <p className="text-3xl font-bold text-accent">4K</p>
          <p className="text-sm text-foreground-secondary mt-1">Ultra HD</p>
        </div>
      </section>

      {/* TV Guide Preview */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">What&apos;s On Now</h2>
        <EPGTimeline hoursToShow={3} />
      </section>

      {/* Category Sections */}
      {homeCategories.map((category) => (
        <CategorySection key={category} category={category} limit={4} />
      ))}
    </MainLayout>
  );
}
