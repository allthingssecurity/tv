import { notFound } from 'next/navigation';
import MainLayout from '@/components/MainLayout';
import VideoPlayer from '@/components/VideoPlayer';
import ChannelGrid from '@/components/ChannelGrid';
import { channels, getChannelById, getCurrentProgram, epgData } from '@/data/channels';
import { format } from 'date-fns';
import { Clock, Globe, Languages, Tv, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface WatchPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return channels.map((channel) => ({
    id: channel.id,
  }));
}

export async function generateMetadata({ params }: WatchPageProps) {
  const { id } = await params;
  const channel = getChannelById(id);
  if (!channel) return { title: 'Channel Not Found' };

  return {
    title: `Watch ${channel.name} Live - GlobalTV`,
    description: `Stream ${channel.name} live from ${channel.country}. ${channel.category} channel in ${channel.quality} quality.`,
  };
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = await params;
  const channel = getChannelById(id);

  if (!channel) {
    notFound();
  }

  const currentProgram = getCurrentProgram(channel.id);
  const relatedChannels = channels
    .filter((c) => c.category === channel.category && c.id !== channel.id)
    .slice(0, 8);

  const channelEpg = epgData.find((e) => e.channelId === channel.id);
  const now = new Date();
  const upcomingPrograms = channelEpg?.programs
    .filter((p) => new Date(p.startTime) > now)
    .slice(0, 5) || [];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto page-enter">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-foreground-secondary mb-4">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/channels" className="hover:text-accent transition-colors">Channels</Link>
          <ChevronRight size={14} />
          <span className="text-foreground">{channel.name}</span>
        </nav>

        {/* Video Player */}
        <div className="mb-6">
          <VideoPlayer
            src={channel.streamUrl}
            channelName={channel.name}
            channelLogo={channel.logo}
            quality={channel.quality}
          />
        </div>

        {/* Channel Info & Program Details */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Channel Details */}
          <div className="lg:col-span-2">
            <div className="glass rounded-xl p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-white/5 rounded-xl p-2 flex-shrink-0">
                  <img
                    src={channel.logo}
                    alt={channel.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{channel.name}</h1>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-foreground-secondary">
                    <span className="flex items-center gap-1.5">
                      <Globe size={14} />
                      {channel.country}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Languages size={14} />
                      {channel.language}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Tv size={14} />
                      {channel.category.charAt(0).toUpperCase() + channel.category.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Current Program */}
              {currentProgram && (
                <div className="bg-accent/5 border border-accent/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-danger/15 rounded-full border border-danger/20">
                      <span className="w-1.5 h-1.5 bg-danger rounded-full live-pulse-ring" />
                      <span className="text-xs font-bold text-danger">NOW PLAYING</span>
                    </span>
                    {/* Audio wave */}
                    <div className="audio-wave">
                      <span /><span /><span /><span /><span />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{currentProgram.title}</h3>
                  <p className="text-sm text-foreground-secondary mb-2">
                    {currentProgram.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                    <Clock size={14} />
                    {format(new Date(currentProgram.startTime), 'h:mm a')} - {format(new Date(currentProgram.endTime), 'h:mm a')}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Programs */}
          <div className="glass rounded-xl p-4">
            <h3 className="font-semibold mb-4">Coming Up</h3>
            <div className="space-y-3">
              {upcomingPrograms.map((program) => (
                <div
                  key={program.id}
                  className="p-3 bg-white/[0.03] rounded-lg hover:bg-white/[0.06] transition-colors border border-white/5"
                >
                  <p className="text-sm font-medium truncate">{program.title}</p>
                  <p className="text-xs text-foreground-secondary mt-1">
                    {format(new Date(program.startTime), 'h:mm a')}
                  </p>
                </div>
              ))}
              {upcomingPrograms.length === 0 && (
                <p className="text-sm text-foreground-secondary text-center py-4">
                  No upcoming programs
                </p>
              )}
            </div>
            <Link
              href="/guide"
              className="block mt-4 text-center text-sm text-accent hover:underline"
            >
              View Full TV Guide
            </Link>
          </div>
        </div>

        {/* Related Channels -- horizontal scroll */}
        {relatedChannels.length > 0 && (
          <ChannelGrid
            channels={relatedChannels}
            title={`More ${channel.category.charAt(0).toUpperCase() + channel.category.slice(1)} Channels`}
            subtitle="You might also like"
            layout="scroll"
          />
        )}
      </div>
    </MainLayout>
  );
}
