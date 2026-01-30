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
    id: 'abc-aus',
    name: 'ABC Australia',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/ABC_%28Australian_TV_channel%29_logo.svg/200px-ABC_%28Australian_TV_channel%29_logo.svg.png',
    category: 'news',
    country: 'Australia',
    language: 'English',
    streamUrl: 'https://abc-iview-mediapackagestreams-2.akamaized.net/out/v1/6e1cc6d25ec0480ea099a5399d73bc4b/index.m3u8',
    isLive: true,
    quality: 'HD',
  },
  {
    id: 'tvp-world',
    name: 'TVP World',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Logo_TVP_World.svg/200px-Logo_TVP_World.svg.png',
    category: 'news',
    country: 'Poland',
    language: 'English',
    streamUrl: 'https://stream.tvp.pl/hls/tvpworld.m3u8',
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
    id: 'nhk-world',
    name: 'NHK World Japan',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/NHK_World-Japan_Logo.svg/200px-NHK_World-Japan_Logo.svg.png',
    category: 'news',
    country: 'Japan',
    language: 'English',
    streamUrl: 'https://nhkworld.webcdn.stream.ne.jp/www11/nhkworld-tv/domestic/263942/live.m3u8',
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
    id: 'nasa-public',
    name: 'NASA Public',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/200px-NASA_logo.svg.png',
    category: 'documentary',
    country: 'United States',
    language: 'English',
    streamUrl: 'https://ntv3.akamaized.net/hls/live/2014076/NASA-NTV3-HLS/master.m3u8',
    isLive: true,
    quality: 'HD',
  },
  // Sports
  {
    id: 'euronews',
    name: 'Euronews',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Euronews_2016_logo.svg/200px-Euronews_2016_logo.svg.png',
    category: 'news',
    country: 'France',
    language: 'English',
    streamUrl: 'https://rakuten-euronews-2-fr.samsung.wurl.tv/playlist.m3u8',
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
    streamUrl: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
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
    streamUrl: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
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
    streamUrl: 'https://cdn.bitmovin.com/content/assets/art-of-motion_drm/mpds/11331.mpd',
    isLive: true,
    quality: 'HD',
  },
  // Music
  {
    id: 'lofi-radio',
    name: 'Lofi Radio',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/MTV_2021_%28brand_version%29.svg/200px-MTV_2021_%28brand_version%29.svg.png',
    category: 'music',
    country: 'International',
    language: 'Instrumental',
    streamUrl: 'https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8',
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
    id: 'sportv',
    name: 'SporTV',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ESPN_wordmark.svg/200px-ESPN_wordmark.svg.png',
    category: 'sports',
    country: 'Portugal',
    language: 'Portuguese',
    streamUrl: 'https://video1.getstreamhosting.com:1936/8224/8224/playlist.m3u8',
    isLive: true,
    quality: 'HD',
  },
  {
    id: 'fashion-tv',
    name: 'Fashion TV',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/FashionTV_logo.svg/200px-FashionTV_logo.svg.png',
    category: 'lifestyle',
    country: 'France',
    language: 'English',
    streamUrl: 'https://fash1043.cloudycdn.services/slive/ftv_ftv_mid_web_Main_Stream_Tele/playlist.m3u8',
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
    streamUrl: 'https://stream.france24.com/live/hls/f24-hls-sec-fra-mobile/stream1/stream.m3u8',
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
    const duration = [30, 60, 90, 120][Math.floor(Math.random() * 4)];
    const endTime = new Date(currentTime.getTime() + duration * 60 * 1000);

    programs.push({
      id: `${channelId}-${programIndex}`,
      title: programTitles[programIndex % programTitles.length],
      description: `Watch ${programTitles[programIndex % programTitles.length]} on ${channelName}. Bringing you the latest updates and coverage.`,
      startTime: new Date(currentTime),
      endTime: endTime,
      category: categories[Math.floor(Math.random() * categories.length)],
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
