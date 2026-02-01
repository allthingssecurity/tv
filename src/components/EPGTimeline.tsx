'use client';

import { useEffect, useState, useRef } from 'react';
import { format, addHours, startOfHour, differenceInMinutes, isWithinInterval } from 'date-fns';
import { Channel, Program } from '@/types';
import { epgData, channels } from '@/data/channels';
import { ChevronLeft, ChevronRight, Clock, Play, Radio } from 'lucide-react';
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
  const channelsToShow = selectedChannels || channels.slice(0, 8);

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

  const getCurrentProgramForChannel = (channelId: string): Program | undefined => {
    const progs = getProgramsForChannel(channelId);
    return progs.find((p) => isCurrentProgram(p));
  };

  const getUpcomingProgramsForChannel = (channelId: string): Program[] => {
    const progs = getProgramsForChannel(channelId);
    return progs.filter((p) => new Date(p.startTime) > currentTime).slice(0, 3);
  };

  return (
    <div className="rounded-xl overflow-hidden bg-gradient-to-b from-gray-900/50 to-black/50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold">TV Guide</h2>
          <span className="text-sm text-gray-500">{format(currentTime, 'EEEE, MMMM d')}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToNow}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 rounded-lg transition-all shadow-lg shadow-purple-500/20"
          >
            <Clock size={14} />
            Now
          </button>
          <button
            onClick={() => navigateTime('prev')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Previous time slot"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => navigateTime('next')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
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
            <div key={channel.id} className="p-4 hover:bg-white/[0.02] transition-colors">
              <Link
                href={`/watch/${channel.id}`}
                className="flex items-center gap-3 mb-3 group"
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
                  <img
                    src={channel.logo}
                    alt={channel.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate group-hover:text-purple-400 transition-colors">{channel.name}</p>
                  <p className="text-xs text-gray-500">{channel.country}</p>
                </div>
                {currentProg && (
                  <span className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </span>
                    <span className="text-[10px] text-purple-300 font-bold">NOW</span>
                  </span>
                )}
              </Link>

              {currentProg && (
                <div className="mb-3 p-3 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Play size={12} className="text-purple-400" />
                    <p className="text-sm font-semibold">{currentProg.title}</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {format(new Date(currentProg.startTime), 'h:mm')} - {format(new Date(currentProg.endTime), 'h:mm a')}
                  </p>
                </div>
              )}

              {upcoming.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-1 scroll-row">
                  {upcoming.map((prog) => (
                    <div
                      key={prog.id}
                      className="flex-shrink-0 w-[160px] p-3 bg-white/[0.03] rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors"
                    >
                      <p className="text-xs font-medium truncate">{prog.title}</p>
                      <p className="text-[10px] text-gray-500 mt-1">
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
        <div className="flex border-b border-white/5 sticky top-0 z-10 bg-black/80 backdrop-blur-xl">
          <div className="w-52 flex-shrink-0 p-4 border-r border-white/5">
            <span className="text-sm font-medium text-gray-400">Channel</span>
          </div>
          <div className="flex-1 relative">
            <div className="flex">
              {timeSlots.map((time, index) => (
                <div
                  key={index}
                  className="flex-1 p-4 border-r border-white/5 last:border-r-0 text-center"
                >
                  <span className="text-sm font-medium text-gray-300">{format(time, 'h:mm a')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Channels and Programs */}
        <div className="relative">
          {channelsToShow.map((channel, idx) => (
            <div
              key={channel.id}
              className={`flex border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors ${idx % 2 === 0 ? 'bg-white/[0.01]' : ''}`}
            >
              <Link
                href={`/watch/${channel.id}`}
                className="w-52 flex-shrink-0 p-4 border-r border-white/5 flex items-center gap-3 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-transparent transition-all group"
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex-shrink-0">
                  <img
                    src={channel.logo}
                    alt={channel.name}
                    className="w-full h-full object-contain p-1.5"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate group-hover:text-purple-400 transition-colors">{channel.name}</p>
                  <p className="text-xs text-gray-500 truncate">{channel.country}</p>
                </div>
              </Link>

              <div className="flex-1 relative h-20">
                {getProgramsForChannel(channel.id).map((program) => {
                  const style = getProgramStyle(program);
                  const isCurrent = isCurrentProgram(program);
                  return (
                    <Link
                      key={program.id}
                      href={`/watch/${channel.id}`}
                      className={`
                        absolute top-2 bottom-2 rounded-xl px-3 py-2 overflow-hidden
                        text-xs transition-all cursor-pointer group
                        ${isCurrent
                          ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/40 hover:from-purple-500/30 hover:to-cyan-500/30'
                          : 'bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/10'
                        }
                      `}
                      style={style}
                      title={`${program.title}\n${format(new Date(program.startTime), 'h:mm a')} - ${format(new Date(program.endTime), 'h:mm a')}`}
                    >
                      <div className="flex items-center gap-1.5 mb-0.5">
                        {isCurrent && <Radio size={10} className="text-purple-400 animate-pulse" />}
                        <p className="font-semibold truncate group-hover:text-purple-400 transition-colors">{program.title}</p>
                      </div>
                      <p className="text-gray-500 truncate">
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
                left: `calc(208px + ${getNowIndicatorPosition()}% * (100% - 208px) / 100)`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
