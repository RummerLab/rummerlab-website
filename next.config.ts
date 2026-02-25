import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
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
    ]
  },
  async headers() {
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    const expiresHeader = oneYearFromNow.toUTCString();

    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, stale-while-revalidate=86400, immutable',
          },
          {
            key: 'Expires',
            value: expiresHeader,
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, stale-while-revalidate=86400, immutable',
          },
          {
            key: 'Expires',
            value: expiresHeader,
          },
        ],
      },
    ];
  },
}

export default config
