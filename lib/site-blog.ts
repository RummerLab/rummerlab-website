import fs from 'fs';
import path from 'path';
import matter from '@11ty/gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import type { BlogGalleryImage, BlogPost } from '@/lib/blog';

const blogsDirectory = path.join(process.cwd(), '_blog');

export type { BlogGalleryImage, BlogPost };

const processMarkdown = (content: string): string => {
  const processedContent = remark().use(remarkHtml).processSync(content);
  return processedContent.toString();
};

const toBlogPost = (slug: string, fileContents: string): BlogPost => {
  const { data, content } = matter(fileContents);
  const htmlContent = processMarkdown(content);

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    excerpt: data.excerpt || undefined,
    coverImage: data.coverImage || undefined,
    coverImageAlt: data.coverImageAlt || undefined,
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

export const getAllSiteBlogPosts = (): BlogPost[] => {
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
      return toBlogPost(slug, fileContents);
    });

  return allPostsData.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
};

export const getSiteBlogPostBySlug = (slug: string): BlogPost | null => {
  if (slug.includes('..')) {
    throw new Error('Invalid slug format');
  }

  const fullPath = path.join(blogsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return toBlogPost(slug, fileContents);
};

export const getAllSiteBlogSlugs = (): string[] => {
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
};
