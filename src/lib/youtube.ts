interface YouTubeVideo {
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  views: number;
  uploaded_time: string;
  duration: string;
  duration_seconds: number;
  channel_name: string;
}

interface CachedData {
  podcasts: YouTubeVideo[];
  last_updated: string;
  cached_at: number;
}

const PLAYLIST_ID = 'PL-vuWWQkFkr-CyVjXDBhjoiElmibTC5jV';
const CACHE_DURATION = 60 * 60 * 1000;
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_MINUTE = 2;

let cache: CachedData | null = null;
let requestTimestamps: number[] = [];

function isRateLimited(): boolean {
  const now = Date.now();
  requestTimestamps = requestTimestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW);
  
  if (requestTimestamps.length >= MAX_REQUESTS_PER_MINUTE) {
    console.warn('Rate limit hit: Too many YouTube API requests');
    return true;
  }
  
  return false;
}

function isCacheValid(): boolean {
  if (!cache) return false;
  const now = Date.now();
  return (now - cache.cached_at) < CACHE_DURATION;
}

function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0 hours';

  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  const totalHours = totalSeconds / 3600;

  return totalHours.toFixed(2) + ' hours';
}

function getDurationInSeconds(isoDuration: string): number {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');

  return hours * 3600 + minutes * 60 + seconds;
}

export async function fetchPlaylistVideos(): Promise<{ podcasts: YouTubeVideo[], last_updated: string }> {
  if (isCacheValid() && cache) {
    console.log('Returning cached YouTube data (cache valid for', Math.round((CACHE_DURATION - (Date.now() - cache.cached_at)) / 1000 / 60), 'more minutes)');
    return {
      podcasts: cache.podcasts,
      last_updated: cache.last_updated
    };
  }

  if (isRateLimited()) {
    console.warn('Rate limited: Returning cached data or empty array');
    if (cache) {
      return {
        podcasts: cache.podcasts,
        last_updated: cache.last_updated
      };
    }
    throw new Error('Rate limited and no cached data available');
  }

  console.log('Fetching fresh YouTube data (cache expired or missing)');
  requestTimestamps.push(Date.now());

  const API_KEY = import.meta.env.YOUTUBE_API_KEY;

  if (!API_KEY) {
    console.error('YOUTUBE_API_KEY is not set');
    throw new Error('YouTube API key is not configured');
  }

  try {
    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}`
    );

    if (!playlistResponse.ok) {
      throw new Error(`Failed to fetch playlist: ${playlistResponse.status}`);
    }

    const playlistData = await playlistResponse.json();
    
    if (!playlistData.items || playlistData.items.length === 0) {
      throw new Error('No videos found in playlist');
    }

    const videoIds = playlistData.items
      .map((item: any) => item.snippet.resourceId.videoId)
      .join(',');

    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${API_KEY}`
    );

    if (!videosResponse.ok) {
      throw new Error(`Failed to fetch video details: ${videosResponse.status}`);
    }

    const videosData = await videosResponse.json();

    const videos: YouTubeVideo[] = videosData.items.map((video: any) => ({
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.maxresdefault?.url || video.snippet.thumbnails.high.url,
      url: `https://www.youtube.com/watch?v=${video.id}`,
      views: parseInt(video.statistics.viewCount || '0'),
      uploaded_time: video.snippet.publishedAt,
      duration: formatDuration(video.contentDetails.duration),
      duration_seconds: getDurationInSeconds(video.contentDetails.duration),
      channel_name: video.snippet.channelTitle,
    }));

    const now = new Date();
    const last_updated = now.toISOString();

    cache = {
      podcasts: videos,
      last_updated: last_updated,
      cached_at: Date.now()
    };

    console.log('YouTube data fetched and cached successfully');

    return {
      podcasts: videos,
      last_updated: last_updated
    };
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    
    if (cache) {
      console.log('Returning stale cache due to API error');
      return {
        podcasts: cache.podcasts,
        last_updated: cache.last_updated
      };
    }
    
    throw error;
  }
}
