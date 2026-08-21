export interface ProjectItem {
  id: string;
  number: string;
  name: string;
  category: 'Client' | 'Personal' | 'Reels' | 'UGC' | 'AI Video' | 'Commercial';
  videoUrl: string;
  fallbackPoster?: string;
  description: string;
  tags?: string[];
  duration?: string;
  aspectRatio?: '9:16' | '16:9';
  client?: string;
  liveUrl?: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
}
