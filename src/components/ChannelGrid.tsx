'use client';

import { Channel } from '@/types';
import ChannelCard from './ChannelCard';

interface ChannelGridProps {
  channels: Channel[];
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'compact' | 'featured';
  columns?: 2 | 3 | 4 | 5 | 6;
}

export default function ChannelGrid({
  channels,
  title,
  subtitle,
  variant = 'default',
  columns = 4,
}: ChannelGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
  };

  if (variant === 'compact') {
    return (
      <section className="mb-8">
        {(title || subtitle) && (
          <div className="mb-4">
            {title && <h2 className="text-xl font-bold">{title}</h2>}
            {subtitle && (
              <p className="text-sm text-foreground-secondary mt-1">{subtitle}</p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {channels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} variant="compact" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h2 className="text-xl font-bold">{title}</h2>}
          {subtitle && (
            <p className="text-sm text-foreground-secondary mt-1">{subtitle}</p>
          )}
        </div>
      )}
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {channels.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} variant={variant} />
        ))}
      </div>
    </section>
  );
}
