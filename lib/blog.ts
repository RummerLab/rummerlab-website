import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const blogsDirectory = path.join(process.cwd(), '_blogs');

export interface BlogGalleryImage {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  coverImage?: string;
  paper?: string;
  podcast?: string;
  spotify?: string;
  youtube?: string;
  journal?: string;
  journalUrl?: string;
  doi?: string;
  gallery?: BlogGalleryImage[];
  content: string;
  htmlContent: string;
}

const processMarkdown = (content: string): string => {
  const processedContent = remark().use(remarkHtml).processSync(content);
  return processedContent.toString();
};

export const getAllBlogPosts = (): BlogPost[] => {
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const htmlContent = processMarkdown(content);

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || undefined,
        coverImage: data.coverImage || undefined,
        paper: data.paper || undefined,
        podcast: data.podcast || undefined,
        spotify: data.spotify || undefined,
        youtube: data.youtube || undefined,
        journal: data.journal || undefined,
        journalUrl: data.journalUrl || undefined,
        doi: data.doi || undefined,
        gallery: data.gallery || undefined,
        content,
        htmlContent,
      };
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
};

export const getBlogPostBySlug = (slug: string): BlogPost | null => {
  const fullPath = path.join(blogsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const htmlContent = processMarkdown(content);

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    excerpt: data.excerpt || undefined,
    coverImage: data.coverImage || undefined,
    paper: data.paper || undefined,
    podcast: data.podcast || undefined,
    spotify: data.spotify || undefined,
    youtube: data.youtube || undefined,
    journal: data.journal || undefined,
    journalUrl: data.journalUrl || undefined,
    doi: data.doi || undefined,
    gallery: data.gallery || undefined,
    content,
    htmlContent,
  };
};

export const getAllBlogSlugs = (): string[] => {
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
};

