import type { NextConfig } from 'next'
import { SECURITY_HEADERS } from './lib/security-headers'

const config: NextConfig = {
  images: {
    qualities: [75, 85],
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'physioshark.org',
      },
      {
        protocol: 'https',
        hostname: 'jodierummer.com',
      },
      {
        protocol: 'https',
        hostname: 'scholar.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
      },
      // News sources
      {
        protocol: 'https',
        hostname: 'media.guim.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'imageio.forbes.com',
      },
      {
        protocol: 'https',
        hostname: '**.abc-cdn.net.au',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.wp.com',
      },
      {
        protocol: 'https',
        hostname: '**.wordpress.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'images.theconversation.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/media.html',
        destination: '/media',
        permanent: true,
      },
      {
        source: '/publications.html',
        destination: '/publications',
        permanent: true,
      },
      {
        source: '/embed',
        destination: '/collaborators/embed',
        permanent: true,
      },
      {
        source: '/lab',
        destination: '/team',
        permanent: true,
      },
      {
        source: '/rummerlab',
        destination: '/team',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/podcast',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/podcast/:slug',
        permanent: true,
      },
    ]
  },
  async headers() {
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    const expiresHeader = oneYearFromNow.toUTCString();
    const isDev = process.env.NODE_ENV === 'development';

    // Long immutable cache can confuse Next dev image disk cache on some setups (paths keyed by max-age).
    const staticImageHeaders = isDev
      ? [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ]
      : [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=31536000, stale-while-revalidate=86400, immutable',
          },
          { key: 'Expires', value: expiresHeader },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ];

    return [
      {
        source: '/:path*',
        headers: [...SECURITY_HEADERS],
      },
      {
        source: '/images/:path*',
        headers: staticImageHeaders,
      },
    ];
  },
}

export default config
