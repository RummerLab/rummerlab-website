import { Metadata } from 'next';
import { getInstagramPosts } from '@/lib/services/instagram';
import InstagramFeed from '@/components/InstagramFeed';

export const metadata: Metadata = {
  title: 'Posts | RummerLab',
  description: 'Latest updates and posts from the RummerLab team',
};

export default async function PostsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Latest Updates</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Stay up to date with our latest research, fieldwork, and lab activities
        </p>
      </div>

      {/* Instagram Feed */}
      <div className="mb-12">
        <InstagramFeed />
      </div>
    </div>
  );
}

