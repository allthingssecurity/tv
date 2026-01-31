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
        {[
          { value: `${channels.length}+`, label: 'Live Channels' },
          { value: '50+', label: 'Countries' },
          { value: '24/7', label: 'Streaming' },
          { value: '4K', label: 'Ultra HD' },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className={`p-4 glass-hover rounded-xl text-center fade-slide-up stagger-${i + 1}`}
          >
            <p className="text-3xl font-bold gradient-text">{stat.value}</p>
            <p className="text-sm text-foreground-secondary mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* TV Guide Preview */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">What&apos;s On Now</h2>
        <EPGTimeline hoursToShow={3} />
      </section>

      {/* Category Sections */}
      {homeCategories.map((category) => (
        <CategorySection key={category} category={category} limit={8} />
      ))}
    </MainLayout>
  );
}
