
export type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  imageHint: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  authorImage: string;
  authorImageHint: string;
  image: string;
  imageHint: string;
  content: string;
};

export type LatestVideo = {
  id: number;
  title: string;
  description: string;
  youtubeId: string;
};

// AI Chat Types
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  id?: string;
}
