export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  imageUrl: string;
  category: string;
  url: string;
}

export interface MediumFeedResponse {
  status: string;
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
  };
  items: MediumPost[];
}

export interface MediumPost {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure: object;
  categories: string[];
}
