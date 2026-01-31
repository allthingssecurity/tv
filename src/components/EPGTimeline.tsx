'use client';

import { useEffect, useState, useRef } from 'react';
import { format, addHours, startOfHour, differenceInMinutes, isWithinInterval } from 'date-fns';
import { Channel, Program } from '@/types';
import { epgData, channels } from '@/data/channels';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import Link from 'next/link';

interface EPGTimelineProps {
  selectedChannels?: Channel[];
  hoursToShow?: number;
}

export default function EPGTimeline({
  selectedChannels,
  hoursToShow = 4,
}: EPGTimelineProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [startTime, setStartTime] = useState(startOfHour(new Date()));
  const containerRef = useRef<HTMLDivElement>(null);
  const channelsToShow = selectedChannels || channels.slice(0, 10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const timeSlots = Array.from({ length: hoursToShow }, (_, i) =>
    addHours(startTime, i)
  );

  const navigateTime = (direction: 'prev' | 'next') => {
    setStartTime((prev) =>
      addHours(prev, direction === 'next' ? hoursToShow : -hoursToShow)
    );
  };

  const goToNow = () => {
    setStartTime(startOfHour(new Date()));
  };

  const getProgramsForChannel = (channelId: string): Program[] => {
    const entry = epgData.find((e) => e.channelId === channelId);
    if (!entry) return [];

    const endTime = addHours(startTime, hoursToShow);
    return entry.programs.filter((program) => {
      const programStart = new Date(program.startTime);
      const programEnd = new Date(program.endTime);
      return programStart < endTime && programEnd > startTime;
    });
  };

  const getProgramStyle = (program: Program) => {
    const programStart = new Date(program.startTime);
    const programEnd = new Date(program.endTime);
    const viewEnd = addHours(startTime, hoursToShow);

    const effectiveStart = programStart < startTime ? startTime : programStart;
    const effectiveEnd = programEnd > viewEnd ? viewEnd : programEnd;

    const startOffset = differenceInMinutes(effectiveStart, startTime);
    const duration = differenceInMinutes(effectiveEnd, effectiveStart);
    const totalMinutes = hoursToShow * 60;

    const left = (startOffset / totalMinutes) * 100;
    const width = (duration / totalMinutes) * 100;

    return { left: `${left}%`, width: `${Math.max(width, 2)}%` };
  };

  const isCurrentProgram = (program: Program): boolean => {
    return isWithinInterval(currentTime, {
      start: new Date(program.startTime),
      end: new Date(program.endTime),
    });
  };

  const getNowIndicatorPosition = (): number => {
    const minutesFromStart = differenceInMinutes(currentTime, startTime);
    const totalMinutes = hoursToShow * 60;
    return (minutesFromStart / totalMinutes) * 100;
  };

  const showNowIndicator =
    currentTime >= startTime && currentTime < addHours(startTime, hoursToShow);

  // Get current program for mobile card view
  const getCurrentProgramForChannel = (channelId: string): Program | undefined => {
    const progs = getProgramsForChannel(channelId);
    return progs.find((p) => isCurrentProgram(p));
  };

  const getUpcomingProgramsForChannel = (channelId: string): Program[] => {
    const progs = getProgramsForChannel(channelId);
    return progs.filter((p) => new Date(p.startTime) > currentTime).slice(0, 3);
  };

  return (
    <div className="glass rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/[0.02]">
        <h2 className="text-lg font-semibold">TV Guide</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={goToNow}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-accent hover:bg-accent-hover rounded-lg transition-colors"
          >
            <Clock size={14} />
            Now
          </button>
          <button
            onClick={() => navigateTime('prev')}
            className="p-1.5 hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Previous time slot"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => navigateTime('next')}
            className="p-1.5 hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Next time slot"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden divide-y divide-white/5">
        {channelsToShow.map((channel) => {
          const currentProg = getCurrentProgramForChannel(channel.id);
          const upcoming = getUpcomingProgramsForChannel(channel.id);
          return (
            <div key={channel.id} className="p-4">
              <Link
                href={`/watch/${channel.id}`}
                className="flex items-center gap-3 mb-3"
              >
                <img
                  src={channel.logo}
                  alt={channel.name}
                  className="w-10 h-10 object-contain bg-white/5 rounded-lg p-1"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{channel.name}</p>
                  <p className="text-xs text-foreground-secondary">{channel.country}</p>
                </div>
                {currentProg && (
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-accent/15 rounded-full border border-accent/20">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full live-indicator" />
                    <span className="text-[10px] text-accent font-bold">NOW</span>
                  </span>
                )}
              </Link>
              {currentProg && (
                <div className="mb-2 p-2.5 bg-accent/10 rounded-lg border border-accent/15">
                  <p className="text-sm font-medium">{currentProg.title}</p>
                  <p className="text-xs text-foreground-secondary mt-0.5">
                    {format(new Date(currentProg.startTime), 'h:mm')} - {format(new Date(currentProg.endTime), 'h:mm a')}
                  </p>
                </div>
              )}
              {upcoming.length > 0 && (
                <div className="scroll-row gap-2 -mx-1 px-1">
                  {upcoming.map((prog) => (
                    <div
                      key={prog.id}
                      className="flex-shrink-0 w-[160px] p-2 bg-white/[0.03] rounded-lg border border-white/5"
                    >
                      <p className="text-xs font-medium truncate">{prog.title}</p>
                      <p className="text-[10px] text-foreground-secondary mt-0.5">
                        {format(new Date(prog.startTime), 'h:mm a')}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop Timeline */}
      <div ref={containerRef} className="hidden lg:block overflow-x-auto">
        {/* Time Headers */}
        <div className="flex border-b border-white/5 sticky top-0 z-10 bg-background-secondary/80 backdrop-blur-sm">
          <div className="w-48 flex-shrink-0 p-3 border-r border-white/5 bg-white/[0.02]">
            <span className="text-sm font-medium text-foreground-secondary">Channel</span>
          </div>
          <div className="flex-1 relative">
            <div className="flex">
              {timeSlots.map((time, index) => (
                <div
                  key={index}
                  className="flex-1 p-3 border-r border-white/5 last:border-r-0 text-center"
                >
                  <span className="text-sm font-medium">{format(time, 'h:mm a')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Channels and Programs */}
        <div className="relative">
          {channelsToShow.map((channel) => (
            <div key={channel.id} className="flex border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors">
              <Link
                href={`/watch/${channel.id}`}
                className="w-48 flex-shrink-0 p-3 border-r border-white/5 flex items-center gap-3 hover:bg-white/[0.03] transition-colors"
              >
                <img
                  src={channel.logo}
                  alt={channel.name}
                  className="w-8 h-8 object-contain bg-white/5 rounded p-0.5"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{channel.name}</p>
                  <p className="text-xs text-foreground-secondary truncate">{channel.country}</p>
                </div>
              </Link>

              <div className="flex-1 relative h-16">
                {getProgramsForChannel(channel.id).map((program) => {
                  const style = getProgramStyle(program);
                  const isCurrent = isCurrentProgram(program);
                  return (
                    <Link
                      key={program.id}
                      href={`/watch/${channel.id}`}
                      className={`
                        absolute top-1 bottom-1 rounded-lg px-2 py-1 overflow-hidden
                        text-xs transition-all cursor-pointer
                        ${
                          isCurrent
                            ? 'bg-accent/20 border border-accent/40 hover:bg-accent/30'
                            : 'bg-white/[0.03] border border-white/5 hover:bg-white/[0.06]'
                        }
                      `}
                      style={style}
                      title={`${program.title}\n${format(new Date(program.startTime), 'h:mm a')} - ${format(new Date(program.endTime), 'h:mm a')}`}
                    >
                      <p className="font-medium truncate">{program.title}</p>
                      <p className="text-foreground-secondary truncate">
                        {format(new Date(program.startTime), 'h:mm')} - {format(new Date(program.endTime), 'h:mm a')}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {showNowIndicator && (
            <div
              className="epg-now-indicator"
              style={{
                left: `calc(192px + ${getNowIndicatorPosition()}%)`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
