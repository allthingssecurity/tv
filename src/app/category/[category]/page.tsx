import { notFound } from 'next/navigation';
import MainLayout from '@/components/MainLayout';
import ChannelGrid from '@/components/ChannelGrid';
import { channels } from '@/data/channels';
import { Category, categoryLabels } from '@/types';
import { ChevronRight, Newspaper, Trophy, Tv, Film, Baby, BookOpen, Music, Heart } from 'lucide-react';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const categoryIcons: Record<Category, React.ReactNode> = {
  news: <Newspaper size={24} />,
  sports: <Trophy size={24} />,
  entertainment: <Tv size={24} />,
  movies: <Film size={24} />,
  kids: <Baby size={24} />,
  documentary: <BookOpen size={24} />,
  music: <Music size={24} />,
  lifestyle: <Heart size={24} />,
};

const categoryDescriptions: Record<Category, string> = {
  news: 'Stay informed with 24/7 news coverage from around the world. Breaking news, politics, business, and more.',
  sports: 'Live sports action from the biggest leagues and tournaments worldwide. Football, basketball, tennis, and more.',
  entertainment: 'The best in entertainment programming. Talk shows, reality TV, dramas, and comedy.',
  movies: 'Classic films, blockbusters, and indie gems. Your cinema experience at home.',
  kids: 'Safe and fun content for children of all ages. Cartoons, educational shows, and family entertainment.',
  documentary: 'Explore the world through compelling documentaries. Nature, science, history, and culture.',
  music: 'Music channels featuring the latest hits, classic tunes, concerts, and music videos.',
  lifestyle: 'Lifestyle content including cooking, home improvement, travel, and wellness.',
};

export async function generateStaticParams() {
  return Object.keys(categoryLabels).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const isValidCategory = category in categoryLabels;
  if (!isValidCategory) return { title: 'Category Not Found' };

  const cat = category as Category;
  return {
    title: `${categoryLabels[cat]} Channels - GlobalTV`,
    description: categoryDescriptions[cat],
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!(category in categoryLabels)) {
    notFound();
  }

  const cat = category as Category;
  const categoryChannels = channels.filter((c) => c.category === cat);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto page-enter">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-foreground-secondary mb-6">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/channels" className="hover:text-accent transition-colors">Channels</Link>
          <ChevronRight size={14} />
          <span className="text-foreground">{categoryLabels[cat]}</span>
        </nav>

        {/* Category Header */}
        <div className="glass rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-transparent pointer-events-none" />
          <div className="relative flex items-start gap-4">
            <div className="p-4 bg-accent/15 rounded-xl text-accent border border-accent/20">
              {categoryIcons[cat]}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{categoryLabels[cat]}</h1>
              <p className="text-foreground-secondary max-w-2xl">
                {categoryDescriptions[cat]}
              </p>
              <p className="text-sm text-accent mt-4">
                {categoryChannels.length} channels available
              </p>
            </div>
          </div>
        </div>

        {/* Channels Grid */}
        {categoryChannels.length > 0 ? (
          <ChannelGrid channels={categoryChannels} columns={5} />
        ) : (
          <div className="text-center py-16">
            <p className="text-xl font-semibold mb-2">No channels found</p>
            <p className="text-foreground-secondary">
              Check back later for more {categoryLabels[cat].toLowerCase()} channels
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
