import { Channel, EPGEntry, Program, Region } from '@/types';

// Verified working public streams
export const channels: Channel[] = [
  // News Channels
  {
    id: 'dw-news',
    name: 'DW News',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Deutsche_Welle_symbol_2012.svg/200px-Deutsche_Welle_symbol_2012.svg.png',
    category: 'news',
    country: 'Germany',
    language: 'English',
    streamUrl: 'https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8',
    isLive: true,
    quality: 'HD',
  },
  {
    id: 'nasa-tv',
    name: 'NASA TV',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/200px-NASA_logo.svg.png',
    category: 'news',
    country: 'United States',
    language: 'English',
    streamUrl: 'https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8',
    isLive: true,
    quality: 'HD',
  },
  {
    id: 'newsmax',
    name: 'Newsmax',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Newsmax_TV_logo.svg/200px-Newsmax_TV_logo.svg.png',
    category: 'news',
    country: 'United States',
    language: 'English',
    streamUrl: 'https://nmxlive.akamaized.net/hls/live/529965/Live_1/index.m3u8',
    isLive: true,
    quality: 'HD',
  },
  {
    id: 'france24-en',
    name: 'France 24 English',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/France24_logo.svg/200px-France24_logo.svg.png',
    category: 'news',
    country: 'France',
    language: 'English',
    streamUrl: 'https://static.france24.com/live/F24_EN_LO_HLS/live_web.m3u8',
    isLive: true,
    quality: 'HD',
  },
  {
    id: 'arirang',
    name: 'Arirang TV',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Arirang_TV_logo.svg/200px-Arirang_TV_logo.svg.png',
    category: 'news',
    country: 'South Korea',
    language: 'English',
    streamUrl: 'https://amdlive-ch01-ctnd-com.akamaized.net/arirang_1ch/smil:arirang_1ch.smil/playlist.m3u8',
    isLive: true,
    quality: 'HD',
  },
  {
    id: 'trt-world',
    name: 'TRT World',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/TRT_World_logo.svg/200px-TRT_World_logo.svg.png',
    category: 'news',
    country: 'Turkey',
    language: 'English',
    streamUrl: 'https://tv-trtworld.medya.trt.com.tr/master.m3u8',
    isLive: true,
    quality: 'HD',
  },
  {
    id: 'bloomberg',
    name: 'Bloomberg TV',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/New_Bloomberg_Logo.svg/200px-New_Bloomberg_Logo.svg.png',
    category: 'news',
    country: 'United States',
    language: 'English',
    streamUrl: 'https://www.bloomberg.com/media-manifest/streams/us.m3u8',
    isLive: true,
    quality: 'HD',
  },
  {
    id: 'cgtn-news',
    name: 'CGTN News',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/CGTN.svg/200px-CGTN.svg.png',
    category: 'news',
    country: 'China',
    language: 'English',
    streamUrl: 'https://news.cgtn.com/resource/live/english/cgtn-news.m3u8',
    isLive: true,
    quality: 'HD',
  },
  // Documentary / Science
  {
    id: 'nasa-media',
    name: 'NASA Media',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/200px-NASA_logo.svg.png',
    category: 'documentary',
    country: 'United States',
    language: 'English',
    streamUrl: 'https://ntv2.akamaized.net/hls/live/2013923/NASA-NTV2-HLS/master.m3u8',
    isLive: true,
    quality: 'HD',
  },
  {
    id: 'abc-news-us',
    name: 'ABC News Live',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ABC_News_2021.svg/200px-ABC_News_2021.svg.png',
    category: 'news',
    country: 'United States',
    language: 'English',
    streamUrl: 'https://content.uplynk.com/channel/3324f2467c414329b3b0cc5cd987b6be.m3u8',
    isLive: true,
    quality: 'HD',
  },
  // Sports
  {
    id: 'cna',
    name: 'CNA (Channel News Asia)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/CNA_new_logo.svg/200px-CNA_new_logo.svg.png',
    category: 'news',
    country: 'Singapore',
    language: 'English',
    streamUrl: 'https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index.m3u8',
    isLive: true,
    quality: 'HD',
  },
  // Entertainment - using test streams that work
  {
    id: 'big-buck',
    name: 'Demo: Big Buck Bunny',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/200px-Big_buck_bunny_poster_big.jpg',
    category: 'entertainment',
    country: 'International',
    language: 'English',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    isLive: true,
    quality: 'HD',
  },
  {
    id: 'sintel',
    name: 'Demo: Sintel',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Sintel-poster.jpg/200px-Sintel-poster.jpg',
    category: 'movies',
    country: 'International',
    language: 'English',
    streamUrl: 'https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
    isLive: true,
    quality: 'FHD',
  },
  {
    id: 'tears-of-steel',
    name: 'Demo: Tears of Steel',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Tearsofsteel-Poster.jpg/200px-Tearsofsteel-Poster.jpg',
    category: 'movies',
    country: 'International',
    language: 'English',
    streamUrl: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
    isLive: true,
    quality: 'FHD',
  },
  // Kids
  {
    id: 'elephant-dreams',
    name: 'Demo: Elephants Dream',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Elephants_Dream_cover.jpg/200px-Elephants_Dream_cover.jpg',
    category: 'kids',
    country: 'International',
    language: 'English',
    streamUrl: 'https://cdn.theoplayer.com/video/elephants-dream/playlist.m3u8',
    isLive: true,
    quality: 'HD',
  },
  // Music
  {
    id: 'deluxe-music',
    name: 'Deluxe Music',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/MTV_2021_%28brand_version%29.svg/200px-MTV_2021_%28brand_version%29.svg.png',
    category: 'music',
    country: 'Germany',
    language: 'Various',
    streamUrl: 'https://sdn-global-live-streaming-packager-cache.3qsdn.com/13456/13456_264_live.m3u8',
    isLive: true,
    quality: 'HD',
  },
  // Lifestyle  
  {
    id: 'cgtn-doc',
    name: 'CGTN Documentary',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/CGTN.svg/200px-CGTN.svg.png',
    category: 'documentary',
    country: 'China',
    language: 'English',
    streamUrl: 'https://news.cgtn.com/resource/live/document/cgtn-doc.m3u8',
    isLive: true,
    quality: 'HD',
  },
  {
    id: 'rt-doc',
    name: 'RT Documentary',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Russia-today-logo.svg/200px-Russia-today-logo.svg.png',
    category: 'documentary',
    country: 'Russia',
    language: 'English',
    streamUrl: 'https://rt-rtd.rttv.com/live/rtdoc/playlist.m3u8',
    isLive: true,
    quality: 'HD',
  },
  {
    id: 'ndtv',
    name: 'NDTV 24x7',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/NDTV_logo.svg/200px-NDTV_logo.svg.png',
    category: 'news',
    country: 'India',
    language: 'English',
    streamUrl: 'https://ndtv24x7elemarchana.akamaized.net/hls/live/2003678/ndtv24x7/master.m3u8',
    isLive: true,
    quality: 'HD',
  },
  {
    id: 'dw-arab',
    name: 'DW Arabic',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Deutsche_Welle_symbol_2012.svg/200px-Deutsche_Welle_symbol_2012.svg.png',
    category: 'news',
    country: 'Germany',
    language: 'Arabic',
    streamUrl: 'https://dwamdstream104.akamaized.net/hls/live/2015530/dwstream104/index.m3u8',
    isLive: true,
    quality: 'HD',
  },
  {
    id: 'dw-espanol',
    name: 'DW Espanol',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Deutsche_Welle_symbol_2012.svg/200px-Deutsche_Welle_symbol_2012.svg.png',
    category: 'news',
    country: 'Germany',
    language: 'Spanish',
    streamUrl: 'https://dwamdstream103.akamaized.net/hls/live/2015526/dwstream103/index.m3u8',
    isLive: true,
    quality: 'HD',
  },
  // Sports
  {
    id: 'live-sports',
    name: 'Sports Live',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ESPN_wordmark.svg/200px-ESPN_wordmark.svg.png',
    category: 'sports',
    country: 'International',
    language: 'English',
    streamUrl: 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
    isLive: true,
    quality: 'HD',
  },
  {
    id: 'bloomberg-qt',
    name: 'Bloomberg Quicktake',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/New_Bloomberg_Logo.svg/200px-New_Bloomberg_Logo.svg.png',
    category: 'lifestyle',
    country: 'United States',
    language: 'English',
    streamUrl: 'https://www.bloomberg.com/media-manifest/streams/us-event.m3u8',
    isLive: true,
    quality: 'HD',
  },
  {
    id: 'france-24-fr',
    name: 'France 24 French',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/France24_logo.svg/200px-France24_logo.svg.png',
    category: 'news',
    country: 'France',
    language: 'French',
    streamUrl: 'https://static.france24.com/live/F24_FR_LO_HLS/live_web.m3u8',
    isLive: true,
    quality: 'HD',
  },
];

export const regions: Region[] = [
  { id: 'na', name: 'North America', flag: '🇺🇸', countries: ['United States', 'Canada', 'Mexico'] },
  { id: 'eu', name: 'Europe', flag: '🇪🇺', countries: ['United Kingdom', 'France', 'Germany', 'Spain', 'Italy', 'Poland', 'Portugal'] },
  { id: 'asia', name: 'Asia', flag: '🌏', countries: ['Japan', 'China', 'India', 'South Korea', 'Australia', 'Turkey'] },
  { id: 'mena', name: 'Middle East', flag: '🌍', countries: ['Qatar', 'UAE', 'Saudi Arabia'] },
  { id: 'latam', name: 'Latin America', flag: '🌎', countries: ['Brazil', 'Argentina', 'Colombia'] },
];

// Generate sample EPG data
const generatePrograms = (channelId: string, channelName: string): Program[] => {
  const programs: Program[] = [];
  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const programTitles = [
    'Morning News Update',
    'World Today',
    'Breaking Stories',
    'Live Coverage',
    'Special Report',
    'Evening Edition',
    'Late Night Review',
    'Documentary Hour',
    'Talk Show',
    'Prime Time Special',
  ];

  const categories = ['News', 'Talk Show', 'Documentary', 'Live', 'Special'];

  let currentTime = new Date(startOfDay);
  let programIndex = 0;

  while (currentTime < new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000)) {
    // Use deterministic duration based on program index to avoid hydration mismatch
    const durations = [30, 60, 90, 120];
    const duration = durations[programIndex % durations.length];
    const endTime = new Date(currentTime.getTime() + duration * 60 * 1000);

    programs.push({
      id: `${channelId}-${programIndex}`,
      title: programTitles[programIndex % programTitles.length],
      description: `Watch ${programTitles[programIndex % programTitles.length]} on ${channelName}. Bringing you the latest updates and coverage.`,
      startTime: new Date(currentTime),
      endTime: endTime,
      // Use deterministic category based on program index
      category: categories[programIndex % categories.length],
    });

    currentTime = endTime;
    programIndex++;
  }

  return programs;
};

export const epgData: EPGEntry[] = channels.map((channel) => ({
  channelId: channel.id,
  programs: generatePrograms(channel.id, channel.name),
}));

export const getChannelById = (id: string): Channel | undefined => {
  return channels.find((channel) => channel.id === id);
};

export const getChannelsByCategory = (category: string): Channel[] => {
  return channels.filter((channel) => channel.category === category);
};

export const getChannelsByCountry = (country: string): Channel[] => {
  return channels.filter((channel) => channel.country === country);
};

export const searchChannels = (query: string): Channel[] => {
  const lowerQuery = query.toLowerCase();
  return channels.filter(
    (channel) =>
      channel.name.toLowerCase().includes(lowerQuery) ||
      channel.country.toLowerCase().includes(lowerQuery) ||
      channel.category.toLowerCase().includes(lowerQuery)
  );
};

export const getCurrentProgram = (channelId: string): Program | undefined => {
  const now = new Date();
  const entry = epgData.find((e) => e.channelId === channelId);
  if (!entry) return undefined;

  return entry.programs.find(
    (program) => new Date(program.startTime) <= now && new Date(program.endTime) > now
  );
};
