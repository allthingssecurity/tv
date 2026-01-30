import MainLayout from '@/components/MainLayout';
import EPGTimeline from '@/components/EPGTimeline';
import { channels } from '@/data/channels';

export const metadata = {
  title: 'TV Guide - GlobalTV',
  description: 'Full electronic program guide for all channels. See what\'s on now and what\'s coming up.',
};

export default function GuidePage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">TV Guide</h1>
          <p className="text-foreground-secondary">
            Full electronic program guide for all {channels.length}+ channels
          </p>
        </div>

        {/* EPG Timeline */}
        <EPGTimeline hoursToShow={6} />

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-foreground-secondary">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-accent/30 border border-accent" />
            <span>Currently airing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-background-tertiary border border-border" />
            <span>Upcoming</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-0.5 h-4 bg-accent" />
            <span>Current time</span>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 p-4 bg-background-secondary rounded-xl border border-border">
          <h3 className="font-semibold mb-2">Tips</h3>
          <ul className="text-sm text-foreground-secondary space-y-1">
            <li>Click on a channel logo to start watching</li>
            <li>Click on a program to watch that channel</li>
            <li>Use the navigation arrows to browse different time slots</li>
            <li>Click &quot;Now&quot; to jump back to the current time</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}
