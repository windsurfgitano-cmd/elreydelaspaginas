export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  content: string;
  image?: string;      // URL imagen hero (Unsplash CC0)
  imageAlt?: string;   // Alt text para a11y
}

export const posts: Post[] = [];
